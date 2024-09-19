import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const getHotKeywords = async (): Promise<string[]> => {
    const response = await Axios.get('/api/popular-keywords');
    return response.data.data;
};

//----------------------------------------------hooks----------------------------------------------

export const useHotKeywordsQuery = () => {
    const query = useQuery({
        queryKey: ['hotKeywords'],
        queryFn: getHotKeywords,
        // staleTime: 1000 * 60 * 5, // 5분
        // gcTime: 1000 * 60 * 10, // 15분
    });
    return query;
};
