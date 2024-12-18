import { MentorResponseType } from '@/app/Models/mentorType';
import { PageInfotype } from '@/app/Models/pageInfoType';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubBoardResponseType } from '@/app/Models/subBoardType';
import { HOME_MENTOR_QUERYKEY } from '@/app/queryKeys/mentorKey';
import {
    QUEST_SUBBOARD_QUERYKEY,
    REQUEST_SUBBOARD_QUERYKEY,
    createSubBoardPostsKey,
} from '@/app/queryKeys/subBoardKey';

export const getHomeMentorPosts = async () => {
    const params = {
        page: 1,
        size: 7,
        schoolFilter: false,
        favoriteFilter: false,
    };

    const res = await Axios.get('/api/boards/filter', { params: params });
    return res.data.data as Promise<MentorResponseType>; //나중에 타입 수정해야함
};

export const getHomeQuestsOrRequests = async ({
    pageParam,
    size,
    subBoardType,
}: {
    pageParam: number;
    size: number;
    subBoardType: 'QUEST' | 'REQUEST';
    //메인 게시판에서 사용하는 경우 pageParam,size,subBoardType은 필수
}) => {
    const params = {
        page: pageParam,
        size: size,
        schoolFilter: false,
        subBoardType: subBoardType,
        favoriteFilter: false,
    };

    const response = await Axios.get(`/api/subBoards`, { params: params });

    return response.data.data as Promise<SubBoardResponseType>;
};

//----------------------------------useQuery----------------------------------

export const useHomeMentorPostsQeury = () => {
    const query = useQuery<MentorResponseType, AxiosError<ErrorResponse>>({
        queryKey: HOME_MENTOR_QUERYKEY,
        queryFn: getHomeMentorPosts,
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const useHomeQuestsQuery = () => {
    const query = useQuery<SubBoardResponseType, AxiosError<ErrorResponse>>({
        queryKey: QUEST_SUBBOARD_QUERYKEY,
        queryFn: () =>
            getHomeQuestsOrRequests({
                pageParam: 1,
                size: 7,
                subBoardType: 'QUEST',
            }),
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};
export const useHomeRequestsQuery = () => {
    const query = useQuery<SubBoardResponseType, AxiosError<ErrorResponse>>({
        queryKey: REQUEST_SUBBOARD_QUERYKEY,
        queryFn: () =>
            getHomeQuestsOrRequests({
                pageParam: 1,
                size: 7,
                subBoardType: 'REQUEST',
            }),
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};
