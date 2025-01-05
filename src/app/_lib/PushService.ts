import Axios from '@/app/util/axiosInstance';
import { PushItemsResponseType } from '../Models/pushType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../Models/AxiosResponse';
import { CHAT_QUERY_KEY, PUSH_LIST_QUERY_KEY, PUSH_QUERY_KEY } from '../queryKeys/pushKey';

export const getPushCount = async (): Promise<number> => {
    const response = await Axios.get('/api/count');
    return response.data.data;
};

export const getPushList = async ({
    pageParam,
    size,
}: {
    pageParam: number;
    size: number;
}): Promise<PushItemsResponseType> => {
    const params = {
        page: pageParam,
        size: size,
    };
    const response = await Axios.get('/api/push', { params });
    return response.data.data;
};

export const deletePush = async (notificationId: number) => {
    const response = await Axios.delete(`/api/push/${notificationId}`);
    return response.data.data;
};

const getChatCount = async (): Promise<number> => {
    const response = await Axios.get('/api/chat/count');
    return response.data.data;
};

//----------------------------------------------hooks----------------------------------------------

export const usePushCountQuery = () => {
    const query = useQuery<number, AxiosError<ErrorResponse>>({
        queryKey: PUSH_QUERY_KEY,
        queryFn: getPushCount,
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const usePushListQuery = () => {
    const query = useQuery<PushItemsResponseType, AxiosError<ErrorResponse>>({
        queryKey: PUSH_LIST_QUERY_KEY,
        queryFn: () =>
            getPushList({
                pageParam: 1,
                size: 15,
            }),
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const useDeletePushMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePush,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PUSH_LIST_QUERY_KEY,
            });
            // queryClient.invalidateQueries(['push', 'count']);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error(error);
        },
    });
    return mutation;
};

export const useChatCountQuery = () => {
    const query = useQuery<number, AxiosError<ErrorResponse>>({
        queryKey: CHAT_QUERY_KEY,
        queryFn: getChatCount,
        // staleTime: 1000 * 60,
        // gcTime: 1000 * 60 * 5,
    });
    return query;
};
