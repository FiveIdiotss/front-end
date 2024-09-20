import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type SearchResultsType = {
    boards_title: string[];
    subBoards_quest_title: string[];
    subBoards_request_title: string[];
    boards_content: string[];
    subBoards_quest_content: string[];
    subBoards_request_content: string[];
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
