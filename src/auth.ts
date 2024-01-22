import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    pages: {
        signIn: '/user/login',
        newUser: '/user/signup',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch(`${process.env.AUTH_URL}/api/member/signIn`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials.username,
                        password: credentials.password,
                    }),
                });

                if (!authResponse.ok) {
                    const errorData = await authResponse.json();
                    console.error('Authorization error:', errorData);
                    throw new Error(`로그인 실패: ${errorData.message}`);
                }

                const user = await authResponse.json();
                console.log('user', user);
                return {
                    email: user.email,

                    ...user,
                };
            },
        }),
    ],
});
