import Axios from '@/app/util/axiosInstance';
import { SubBoardDetailType, SubBoardResponseType } from '@/app/Models/subBoardType';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { createSubBoardDetailKey, createSubBoardPostsKey } from '@/app/queryKeys/subBoardKey';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import {
    DETAIL_REQUEST_QUERYKEY,
    DETAIL_SUBBOARD_QUERYKEY,
    QUEST_SUBBOARD_QUERYKEY,
    REQUEST_SUBBOARD_QUERYKEY,
} from '@/app/queryKeys/keys';
import { fetchWithToken } from '@/app/util/fetchInstance';

interface ParamsType {
    page: number;
    size: number;
    boardCategory?: string;
    keyWord?: string;
    schoolFilter: boolean;
    subBoardType: string;
    favoriteFilter: boolean;
}

export const getSubBoardsPosts = async ({
    pageParam,
    size,
    categoryParam,
    searchParam,
    isSchool,
    subBoardType,
    isStar,
}: {
    pageParam: number;
    size: number;
    categoryParam?: string;
    searchParam?: string;
    isSchool?: boolean;
    subBoardType: 'QUEST' | 'REQUEST';
    isStar?: boolean;
    //메인 게시판에서 사용하는 경우 pageParam,size,subBoardType은 필수
}): Promise<SubBoardResponseType> => {
    const params: ParamsType = {
        page: pageParam,
        size: size,
        boardCategory: categoryParam,
        keyWord: searchParam,
        schoolFilter: isSchool ? isSchool : false, //학교 필터가 없으면 false
        subBoardType: subBoardType,
        favoriteFilter: isStar || false, //카테고리 필터가 없으면 false(카테고리에 북마크가 포함 되어있기 때문)
    };
    if (categoryParam === '') delete params.boardCategory; //카테고리가 없을때
    if (searchParam === '') delete params.keyWord; //검색어가 없을때
    if (!categoryParam && !searchParam) {
        delete params.boardCategory;
        delete params.keyWord;
    }
    console.log('params', params);

    // const response = await Axios.get(`/api/subBoards`, { params: params });
    const response = await fetchWithToken<SubBoardResponseType>('/api/subBoards', {
        method: 'GET',
        params: params,
        next: {
            revalidate: 60,
            tags: [
                ...(subBoardType === 'QUEST' ? QUEST_SUBBOARD_QUERYKEY : REQUEST_SUBBOARD_QUERYKEY),
                String(params.page),
                String(params.size),
                String(params.boardCategory),
                String(params.keyWord),
                String(params.schoolFilter),
                String(params.favoriteFilter),
            ],
        },
    });
    return response.data;
}; //ssr

export const getSubBoardDetail = async (subBoardId: number) => {
    const response = await Axios.get(`/api/subBoard/${subBoardId}`);
    return response.data.data as Promise<SubBoardDetailType>;
};

//----------------------------------useQuery----------------------------------

export const useSubBoardPostsQuery = ({ subBoardType }: { subBoardType: 'QUEST' | 'REQUEST' }) => {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1;
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';
    const schoolParam = Boolean(searchParams.get('schoolFilter')) || false;
    const starParam = Boolean(searchParams.get('star')) || false;
    const sizeParam = 15; //홈페이지에서는 7개, 포스트페이지에서는 15개

    const query = useQuery<SubBoardResponseType, ErrorResponse>({
        queryKey: [
            ...(subBoardType === 'QUEST' ? QUEST_SUBBOARD_QUERYKEY : REQUEST_SUBBOARD_QUERYKEY),
            pageParam,
            sizeParam,
            categoryParam,
            searchParam,
            schoolParam,
            starParam,
        ],

        queryFn: () =>
            getSubBoardsPosts({
                pageParam,
                size: sizeParam,
                categoryParam,
                searchParam,
                isSchool: schoolParam,
                subBoardType: subBoardType,
                isStar: starParam,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const useSubBoardDetailQuery = ({ subBoardId, enabled = true }: { subBoardId: number; enabled?: boolean }) => {
    const query = useQuery({
        queryKey: [...DETAIL_SUBBOARD_QUERYKEY, subBoardId],
        queryFn: () => getSubBoardDetail(subBoardId),
        enabled: enabled,
    });
    return query;
};
