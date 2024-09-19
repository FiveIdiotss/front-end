import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type SearchResultsType = {
    boardTitles: string[];
    subBoardTitles: string[];
};

const getSearchResults = async (keyword: string): Promise<SearchResultsType> => {
    const response = await Axios.get(`/api/search`, { params: { query: keyword } });
    return response.data.data;
};

//----------------------------------hooks----------------------------------

export const useSearchResultsQuery = ({ keyword, enabled = false }: { keyword: string; enabled?: boolean }) => {
    return useQuery<SearchResultsType, AxiosError<ErrorResponse>>({
        queryKey: ['home', 'search', keyword],
        queryFn: () => getSearchResults(keyword),
        enabled,
    });
};
