import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { SubBoardDTOType } from '@/app/Models/subBoardType';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const getHomeHotSubBoards = async ({
    subBoardType,
}: {
    subBoardType: 'QUEST' | 'REQUEST';
}): Promise<SubBoardDTOType[]> => {
    const params = { subBoardType };
    const response = await Axios.get('/api/subBoards/top5', { params });
    return response.data.data;
};

//-----------hooks--------

export const useHomeHotSuboardsQuery = ({ subBoardType }: { subBoardType: 'QUEST' | 'REQUEST' }) => {
    const query = useQuery<SubBoardDTOType[], AxiosError<ErrorResponse>>({
        queryKey: ['homeHotSuboards', { subBoardType }],
        queryFn: () => getHomeHotSubBoards({ subBoardType }),
    });
    return query;
};
