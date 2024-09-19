import Axios from '@/app/util/axiosInstance';
import { PushItemsResponseType } from '../Models/pushType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../Models/AxiosResponse';

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

//----------------------------------------------hooks----------------------------------------------

export const usePushCountQuery = () => {
    const query = useQuery<number, AxiosError<ErrorResponse>>({
        queryKey: ['push', 'count'],
        queryFn: getPushCount,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const usePushListQuery = () => {
    const query = useQuery<PushItemsResponseType, AxiosError<ErrorResponse>>({
        queryKey: ['push', 'list'],
        queryFn: () =>
            getPushList({
                pageParam: 1,
                size: 15,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    return query;
};

export const useDeletePushMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePush,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['push', 'list'],
            });
            // queryClient.invalidateQueries(['push', 'count']);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error(error);
        },
    });
    return mutation;
};
