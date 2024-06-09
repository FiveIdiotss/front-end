import axios from 'axios';

import NextAuth, { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
import { ErrorResponse } from './app/Models/AxiosResponse';
import { JWT } from 'next-auth/jwt';
import { throttle } from 'lodash';

export type MemberDto = {
    id?: number;
    email?: string;
    name?: string;
    year?: number;
    gender?: string;
    schoolName?: string;
    majorName?: string;
    memberImageUrl?: string;
};
declare module 'next-auth' {
    interface User {
        /** The user's postal address. */
        access_Token: string;
        refresh_Token: string;
        memberDTO: MemberDto;
    }
    // interface Session {
    //     accessToken: string;
    // }
}
type RefreshTokenResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
    };
    message: string;
    success: boolean;
};

async function refreshAccessToken(token: JWT) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.refresh_Token}`,
            },
        });
        console.log('다시실행', token);
        console.log('다시실행');
        if (!response.ok) throw response;

        const responseTokens: RefreshTokenResponse = await response.json();
        const access_Token = responseTokens.data.accessToken; //액세스 토큰
        const refresh_Token = responseTokens.data.refreshToken; //리프레시 토큰

        const payloadPart = access_Token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadPart));
        const access_TokenExpires = decodedPayload.exp; //토큰 만료시간
        console.log('리프레쉬갱신', '토큰', access_Token, '만료시간', decodedPayload.exp);

        return {
            ...token,
            access_Token,
            refresh_Token,
            access_TokenExpires,
        };
    } catch (error) {
        console.error('리프레쉬 토큰 에러', error);
        return null;
    }
}
const throttledRefreshAccessToken = throttle(refreshAccessToken, 300000); // 5분에 한번씩만 실행, 한페이지에서 여러군데 jwt콜백이 실행되는 경우가 있어서 쓰로틀링을 통해 한번만 트리거되도록 함

export const {
    handlers,
    auth,
    unstable_update: update, //실험 기능
} = NextAuth({
    pages: {
        signIn: '/user/login',
        newUser: '/user/signup',
    },

    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const data = {
                    email: credentials.username,
                    password: credentials.password,
                };

                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/signIn`, data);
                    const userResponse = response.data.data;

                    const user: User = {
                        access_Token: userResponse.tokenDTO.accessToken,
                        refresh_Token: userResponse.tokenDTO.refreshToken,
                        memberDTO: userResponse.memberDTO,
                    };

                    return user;
                } catch (error: any) {
                    console.log(error.response);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, session, trigger }) {
            console.log('유저', user);
            console.log('세션', session);
            console.log('트리거', trigger);
            const now = Math.floor(Date.now() / 1000);
            const accessTokenExpires = token.access_TokenExpires as number;
            console.log('작동중');
            console.log('토큰 만료 몇초 남음', accessTokenExpires - now);

            if (user) {
                const payloadPart = user.access_Token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadPart));
                token.refresh_Token = user.refresh_Token; // 리프레시 토큰
                token.access_Token = user.access_Token; // 액세스 토큰
                token.access_TokenExpires = decodedPayload.exp; // 토큰 만료 시간
                token.memberDTO = user.memberDTO; // 사용자 정보
                console.log('실행', decodedPayload.iat, decodedPayload.exp);

                return token;
            } else if (accessTokenExpires - now >= 60) {
                if (trigger === 'update' && session) {
                    token = { ...token, memberDTO: session.user.memberDTO };
                }
                return token;
            } else {
                // if (!token.refresh_token) throw new Error('Missing refresh token');

                console.log('토큰 만료');
                console.log('토큰 만료', accessTokenExpires - now);
                console.log('재실행');

                return throttledRefreshAccessToken(token);
            }
        },

        async session({ session, token }: any) {
            // memberDTO를 제외한 나머지 토큰 정보를 세션에 추가

            const sessionUser = {
                ...token,
            };
            // console.log('세션유저', sessionUser);
            delete sessionUser.refresh_Token;
            // delete sessionUser.access_TokenExpires;
            session.user = Object.assign(session.user, sessionUser);
            delete session.expires;

            // console.log('세션', session);
            console.log(
                '만료 시간',
                new Date(token.access_TokenExpires * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
            );
            return session;
        },
    },
});
declare module 'next-auth/jwt' {
    interface JWT {
        access_Token: string;
        access_TokenExpires: number;
        refresh_Token: string;
        memberDTO: MemberDto;
        error?: 'RefreshAccessTokenError';
    }
} // Auth.js에서 사용할 JWT 타입을 확장
