import axios from 'axios';

import NextAuth, { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import 'next-auth/jwt';
declare module 'next-auth' {
    interface User {
        /** The user's postal address. */
        accessToken: string;
        refreshToken: string;
        majorName?: string;
        schoolName?: string;
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
        console.log('decodedPayload', decodedPayload);
        console.log('access_Token', access_Token);

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
    session: {
        strategy: 'jwt',
    },

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
                    console.log('user', userResponse);

                    const user: User = {
                        accessToken: userResponse.tokenDTO.accessToken,
                        refreshToken: userResponse.tokenDTO.refreshToken,
                        ...userResponse,
                    };
                    console.log('user', user);

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
                const payloadPart = user.accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadPart));
                token.refresh_Token = user.refreshToken; // 리프레시 토큰
                token.access_Token = user.accessToken; // 액세스 토큰
                token.access_TokenExpires = decodedPayload.exp; // 토큰 만료 시간
                return token;
            }
            const now = Math.floor(Date.now() / 1000);
            const accessTokenExpires = token.access_TokenExpires as number;
            console.log('토큰 만료 시간', accessTokenExpires);
            console.log('현재 시간', now);
            if (accessTokenExpires - now < 45) {
                console.log('토큰 리프레시', token);
                return refreshAccessToken(token);
            }
            console.log('토큰 리턴', token);
            return token;
        },

        async session({ session, token }: any) {
            console.log('세션', token);
            const sessionUser = {
                ...token,
            };
            delete sessionUser.refreshToken;
            delete sessionUser.accessTokenExpires;
            session.user = sessionUser;
            return session;
        },
    },
});
