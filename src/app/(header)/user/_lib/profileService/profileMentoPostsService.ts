import Axios from '@/app/util/axiosInstance';
import { AxiosError, AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import { MentorResponseType } from '@/app/Models/mentorType';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
export const getMemberPosts = async ({ page, size }: { page: number; size: number }): Promise<MentorResponseType> => {
    const session = await getSession();

    const param = {
        page,
        size,
    };

    const response = await Axios.get(`/api/memberBoards/${session?.user?.memberDTO.id}`, { params: param });
    return response.data.data;
};
//-------------------------------------------------------------------------hooks-------------------------------------------------------------------------

export const useMemberPostsQuery = () => {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const sizeParam = Number(searchParams.get('size')) || 6; //페이지 선택

    const query = useQuery<MentorResponseType, AxiosError<ErrorResponse>>({
        queryKey: ['posts', 'mento', 'user', 'self', String(pageParam)],
        queryFn: () => getMemberPosts({ page: pageParam, size: sizeParam }),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
    return query;
};
