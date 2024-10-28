import { auth } from '@/auth';
import axios from 'axios';
import { getSession } from 'next-auth/react';
const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
Axios.interceptors.request.use(
    async (config) => {
        //서버사이드와 클라이언트사이드에서 세션을 가져오는 방법이 다르기 때문에
        if (typeof window === 'undefined') {
            const session = await auth();
            const token = session?.user?.access_Token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } else {
            const session = await getSession();
            const token = session?.user?.access_Token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default Axios;
