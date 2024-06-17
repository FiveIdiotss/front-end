import axios from 'axios';
import { getSession } from 'next-auth/react';
const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
Axios.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        const token = session?.user?.access_Token; // 세션에서 액세스 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default Axios;
