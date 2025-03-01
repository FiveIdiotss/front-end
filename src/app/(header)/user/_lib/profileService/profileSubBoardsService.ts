import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { SubBoardResponseType } from '@/app/Models/subBoardType';
import { QUEST_SUBBOARD_QUERYKEY, REQUEST_SUBBOARD_QUERYKEY } from '@/app/queryKeys/keys';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export const getMemberSubBoards = async ({
    subBoardType,
    page,
    size,
}: {
    subBoardType: 'QUEST' | 'REQUEST';
    page: number;
    size: number;
}): Promise<SubBoardResponseType> => {
    const session = await getSession();

    const params = {
        page,
        size,
        subBoardType,
    };
    const response = await Axios.get(`/api/subBoards/${session?.user?.memberDTO.id}`, { params });
    return response.data.data;
}; //멤버가 작성한 질문,요청 목록을 가져오는 함수

//----------------------------------hooks----------------------------------

export const useMemberSubBoardsQuery = ({ subBoardType }: { subBoardType: 'QUEST' | 'REQUEST' }) => {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const sizeParam = searchParams.get('size') ? Number(searchParams.get('size')) : 10;

    const query = useQuery<SubBoardResponseType, AxiosError<ErrorResponse>>({
        queryKey: [
            ...(subBoardType === 'QUEST' ? QUEST_SUBBOARD_QUERYKEY : REQUEST_SUBBOARD_QUERYKEY),
            'user',
            pageParam,
            sizeParam,
        ],
        queryFn: () =>
            getMemberSubBoards({
                subBoardType: subBoardType,
                page: pageParam,
                size: sizeParam,
            }),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
    return query;
};
