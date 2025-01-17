import Axios from '@/app/util/axiosInstance';
import { MentorResponseType } from '@/app/Models/mentorType';
import { MentorDetailType } from '@/app/Models/mentorType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse, FetchErrorResponseType } from '@/app/Models/AxiosResponse';
import { useSearchParams } from 'next/navigation';
import { createDetailMentorKey, createMentorPostsKey, MENTOR_QUERYKEY } from '@/app/queryKeys/mentorKey';
import { DETAIL_MENTOR_QUERYKEY } from '@/app/queryKeys/keys';
import { fetchWithToken } from '@/app/util/fetchInstance';
import { usePostsParam } from '../utils/usePostsParam';

type ParamsType = {
    page: number;
    size: number;
    boardCategory?: string;
    keyWord?: string;
    schoolFilter: boolean;
    favoriteFilter: boolean;
};

export const getMentorPosts = async ({
    pageParam,
    size,
    categoryParam,
    searchParam,
    isSchool,
    isStar,
}: {
    pageParam: number;
    size: number;
    categoryParam?: string;
    searchParam?: string;
    isSchool?: boolean;
    isStar?: boolean;
    //메인 게시판에서 사용하는 경우 pageParam,size,subBoardType은 필수
}): Promise<MentorResponseType> => {
    const params: ParamsType = {
        page: pageParam,
        size: size,
        boardCategory: categoryParam,
        keyWord: searchParam,
        schoolFilter: isSchool ? isSchool : false, //학교 필터가 없으면 false
        favoriteFilter: isStar || false, //카테고리 필터가 없으면 false(카테고리에 북마크가 포함 되어있기 때문)
    };
    if (categoryParam === '') delete params.boardCategory; //카테고리가 없을때
    if (searchParam === '') delete params.keyWord; //검색어가 없을때
    if (!categoryParam && !searchParam) {
        delete params.boardCategory;
        delete params.keyWord;
    }

    // const res = await Axios.get('/api/boards/filter', { params: params });
    const response = await fetchWithToken<MentorResponseType>(`/api/boards/filter`, {
        method: 'GET',
        params: params,
        next: {
            revalidate: 60,
            tags: [
                ...MENTOR_QUERYKEY,
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
};

export const getMentorDetail = async (id: number) => {
    const res = await Axios.get(`/api/board/${id}`);
    return res.data.data as Promise<MentorDetailType>;
};
export const deleteMentor = async (id: number) => {
    const res = await Axios.delete(`/api/board/${id}`);
    return res.data.data;
};

//----------------------------------useQuery----------------------------------

export const useMentorPostsQuery = () => {
    const {
        keys: paramKeys,
        pageParam,
        categoryParam,
        sizeParam,
        searchParam,
        schoolFilter,
        starParam,
    } = usePostsParam(); //params 쿼리키 가져오기

    const query = useQuery<MentorResponseType, FetchErrorResponseType>({
        queryKey: [...MENTOR_QUERYKEY, ...paramKeys],
        queryFn: () =>
            getMentorPosts({
                pageParam,
                size: sizeParam,
                categoryParam,
                searchParam,
                isSchool: schoolFilter,
                isStar: starParam,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const useMentorDetailQuery = ({ mentorId, enabled = true }: { mentorId: number; enabled?: boolean }) => {
    const query = useQuery<MentorDetailType, AxiosError<ErrorResponse>>({
        queryKey: [...DETAIL_MENTOR_QUERYKEY, mentorId],
        queryFn: () => getMentorDetail(mentorId),
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
        enabled: enabled,
    });
    return query;
};

export const useDeleteMentorMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: number) => deleteMentor(id),
        onSuccess: () => {
            alert('멘토링이 삭제되었습니다.');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            alert('멘토링 삭제에 실패했습니다.');
        },
    });
    return mutation;
};
