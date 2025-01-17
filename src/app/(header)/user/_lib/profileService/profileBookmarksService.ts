import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { MentorResponseType } from '@/app/Models/mentorType';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

export const getMemberBookmarks = async ({
    page,
    size,
}: {
    page: number;
    size: number;
}): Promise<MentorResponseType> => {
    const params = {
        page,
        size,
        schoolFilter: false,
        favoriteFilter: true,
    };

    const response = await Axios.get('/api/boards/filter', { params: params });

    return response.data.data;
}; //북마크 데이터 조회

//-------------------------------------------------------------------------hooks-------------------------------------------------------------------------

export const useMemberBookmarksQuery = () => {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1;
    const sizeParam = Number(searchParams.get('size')) || 6;

    const query = useQuery<MentorResponseType, AxiosError<ErrorResponse>>({
        queryKey: ['posts', 'mento', 'user', 'bookMark', String(pageParam)],
        queryFn: () =>
            getMemberBookmarks({
                page: pageParam,
                size: sizeParam,
            }),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });

    return query;
};
