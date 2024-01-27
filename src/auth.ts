import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: { GET, POST },
    auth,
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
                    const response = await axios.post(`${process.env.AUTH_URL}/member/signIn`, data);
                    const user = await response.data;
                    console.log('user', user);
                    console.log('response', response);
                    return {
                        email: user.email,
                        ...user,
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
});
