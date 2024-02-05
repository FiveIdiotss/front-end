import axios from 'axios';
import { auth } from '@/auth';
const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

Axios.interceptors.request.use(async (config) => {
    const session = await auth();
    const token = session?.user?.accessToken; // 세션에서 액세스 토큰 가져오기

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 설정
    }

    return config;
});

export default Axios;
