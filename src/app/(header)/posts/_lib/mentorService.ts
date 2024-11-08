import Axios from '@/app/util/axiosInstance';
import { MentorResponseType } from '@/app/Models/mentorType';
import { MentorDetailType } from '@/app/Models/mentorType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { useSearchParams } from 'next/navigation';
import { createDetailMentorKey, createMentorPostsKey } from '@/app/queryKeys/mentorKey';

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
}) => {
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

    const res = await Axios.get('/api/boards/filter', { params: params });
    return res.data.data as Promise<MentorResponseType>;
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
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || ''; //카테고리 선택
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const searchParam = searchParams.get('search') || ''; //검색어
    const schoolFilter = Boolean(searchParams.get('schoolFilter')) || false; //학교필터
    const starParam = Boolean(searchParams.get('star')) || false; //북마크 필터
    const sizeParam = 24; //홈페이지에서는 7개, 포스트페이지에서는 15개

    const query = useQuery<MentorResponseType, AxiosError<ErrorResponse>>({
        queryKey: createMentorPostsKey(pageParam, sizeParam, categoryParam, searchParam, schoolFilter, starParam),
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
        queryKey: createDetailMentorKey(mentorId),
        queryFn: () => getMentorDetail(mentorId),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
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
