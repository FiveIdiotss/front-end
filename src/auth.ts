import axios from 'axios';

import NextAuth, { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
type MemberDto = {
    id: number;
    email: string;
    name: string;
    year: number;
    gender: string;
    schoolName: string;
    majorName: string;
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

async function refreshAccessToken(token: any) {
    console.log('토큰 정보', token);
    try {
        const response = await fetch(`${process.env.AUTH_URL}/api/refresh`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.refresh_Token}`,
            },
        });
        const data = await response.text();
        const access_Token = data;
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
    handlers: { GET, POST },
    auth,
} = NextAuth({
    session: {},

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
                    const response = await axios.post(`${process.env.AUTH_URL}/api/member/signIn`, data);
                    const userResponse = response.data;

                    const user: User = {
                        access_Token: userResponse.tokenDTO.accessToken,
                        refresh_Token: userResponse.tokenDTO.refreshToken,
                        memberDTO: userResponse.memberDTO,
                    };

                    return user;
                } catch (error) {
                    console.log('error', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const payloadPart = user.access_Token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadPart));
                token.refresh_Token = user.refresh_Token; // 리프레시 토큰
                token.access_Token = user.access_Token; // 액세스 토큰
                token.access_TokenExpires = decodedPayload.exp; // 토큰 만료 시간
                token.memberDTO = user.memberDTO; // 사용자 정보
                return token;
            }
            const now = Math.floor(Date.now() / 1000);
            const accessTokenExpires = token.access_TokenExpires as number;
            if (accessTokenExpires - now < 45) {
                return refreshAccessToken(token);
            }
            return token;
        },

        async session({ session, token }: any) {
            const sessionUser = {
                ...token,
            };
            delete sessionUser.refresh_Token;
            delete sessionUser.access_TokenExpires;
            session.user = sessionUser;
            console.log('세션', session);
            return session;
        },
    },
});
