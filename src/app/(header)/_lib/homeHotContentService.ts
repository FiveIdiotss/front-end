import { ErrorResponse, FetchErrorResponseType } from '@/app/Models/AxiosResponse';
import { SubBoardDTOType } from '@/app/Models/subBoardType';
import Axios from '@/app/util/axiosInstance';
import { fetchWithToken } from '@/app/util/fetchInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const getHomeHotSubBoards = async ({
    subBoardType,
}: {
    subBoardType: 'QUEST' | 'REQUEST';
}): Promise<SubBoardDTOType[]> => {
    const params = { subBoardType };
    const response = await fetchWithToken<SubBoardDTOType[]>('/api/subBoards/top5', {
        method: 'GET',
        params: params,
        next: {
            revalidate: 60,
        },
    });

    return response.data;
};

//-----------hooks--------

export const useHomeHotSuboardsQuery = ({ subBoardType }: { subBoardType: 'QUEST' | 'REQUEST' }) => {
    const query = useQuery<SubBoardDTOType[], FetchErrorResponseType>({
        queryKey: ['homeHotSuboards', { subBoardType }],
        queryFn: () => getHomeHotSubBoards({ subBoardType }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    return query;
};
