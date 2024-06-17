import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('multipartFile', file);

    const response = await Axios.post('/api/saveSubBoardImage', formData);
    console.log(response.data.data);

    return response.data.data;
};

type QuestRequestType = {
    title: string;
    content: string;
    boardCategory: string;
};

const postQuest = async (data: QuestRequestType) => {
    const response = await Axios.post('/api/subBoard', data);
    return response.data.data;
};
const postRequest = async (data: QuestRequestType) => {
    const response = await Axios.post('/api/requestBoard', data);
    return response.data.data;
};

export const useQuestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: QuestRequestType) => postQuest(data),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'quests'],
                refetchType: 'all',
            });
            alert('성공적으로 등록되었습니다.');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error.response?.data.message);
            pushNotification(error.response?.data.message || '오류입니다', 'error', 'dark');
        },
    });
    return mutation;
};

export const useRequestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: QuestRequestType) => postRequest(data),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'requests'],
                refetchType: 'all',
            });
            alert('성공적으로 등록되었습니다.');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error.response?.data.message);
            pushNotification(error.response?.data.message || '오류입니다', 'error', 'dark');
        },
    });
    return mutation;
};
