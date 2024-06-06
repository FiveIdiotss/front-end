import Axios from '@/app/util/axiosInstance';
import { AxiosError, AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import { MentoPostsType } from '@/app/(afterLogin)/Models/mentoPostsType';
export const getProfilePosts = async (pageParam: number, size?: number) => {
    const session = await getSession();

    const param = {
        page: pageParam,
        size: size ? size : 24,
    };

    try {
        const response = await Axios.get(`/api/memberBoards/${session?.user?.memberDTO.id}`, { params: param });
        return response.data.data as MentoPostsType;
    } catch (error) {
        throw error as AxiosError;
    }
};
