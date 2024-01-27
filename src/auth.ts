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
    try {
        const response = await axios.post(`${process.env.AUTH_URL}/api/refresh`, {
            refreshToken: token.refreshToken,
        });
        const data = response.data;
        console.log('data', data);
        if (data) {
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
        }
        return token;
    } catch (error) {
        console.log(error);
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
                        accessToken: userResponse.accessToken,
                        refreshToken: userResponse.refreshToken,
                        ...userResponse,
                    };

                    return user;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const payloadPart = user.accessToken.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadPart));

            if (user) {
                token.refreshToken = user.refreshToken; // 리프레시 토큰
                token.accessToken = user.accessToken; // 액세스 토큰
                token.accessTokenExpires = decodedPayload.exp; // 토큰 만료 시간
                return token;
            }
            const now = Math.floor(Date.now() / 1000);
            const accessTokenExpires = token.accessTokenExpires as number;
            if (accessTokenExpires - now < 30) {
                return refreshAccessToken(token);
            }
            return token;
        },

        async session({ session, token }: any) {
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
