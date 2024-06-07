import axios from 'axios';

import NextAuth, { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
import { ErrorResponse } from './app/Models/AxiosResponse';
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

async function refreshAccessToken(token: any) {
    console.log('토큰 정보', token);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.refresh_Token}`,
            },
        });
        const data: RefreshTokenResponse = await response.json();
        const access_Token = data.data.accessToken;
        const payloadPart = access_Token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadPart));

        return {
            ...token,
            access_Token: access_Token,
            access_TokenExpires: decodedPayload.exp,
        };
    } catch (error) {
        console.log('에러', error);
        return null;
    }
}
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

            if (user) {
                const payloadPart = user.access_Token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadPart));
                token.refresh_Token = user.refresh_Token; // 리프레시 토큰
                token.access_Token = user.access_Token; // 액세스 토큰
                token.access_TokenExpires = decodedPayload.exp; // 토큰 만료 시간
                token.memberDTO = user.memberDTO; // 사용자 정보
                console.log('실행', decodedPayload.iat, decodedPayload.exp);

                return token;
            }
            if (trigger === 'update' && session) {
                token = { ...token, memberDTO: session.user.memberDTO };
            }
            const now = Math.floor(Date.now() / 1000);
            const accessTokenExpires = token.access_TokenExpires as number;
            console.log('작동중');
            console.log('now, accessTokenExpires', now, accessTokenExpires);
            if (accessTokenExpires - now < 60) {
                console.log('토큰 만료');
                console.log('토큰 만료', accessTokenExpires - now);
                return refreshAccessToken(token);
            }
            return token;
        },

        async session({ session, token }: any) {
            // memberDTO를 제외한 나머지 토큰 정보를 세션에 추가

            const sessionUser = {
                ...token,
            };
            console.log('세션유저', sessionUser);
            delete sessionUser.refresh_Token;
            // delete sessionUser.access_TokenExpires;
            session.user = Object.assign(session.user, sessionUser);
            delete session.expires;

            console.log('세션', session);
            console.log(
                '만료 시간',
                new Date(token.access_TokenExpires * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
            );
            return session;
        },
    },
});
