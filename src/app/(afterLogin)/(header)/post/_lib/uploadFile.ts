import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('multipartFile', file);

    const response = await Axios.post('/api/image', formData);
    console.log(response.data.data);

    return response.data.data;
};

type QuestRequestType = {
    request: {
        title: string;
        content: string;
        boardCategory: string;
        subBoardType: 'QUEST' | 'REQUEST';
        platform: 'WEB' | 'APP';
    };

    images: File[] | [];
};

const postQuestRequest = async (data: QuestRequestType) => {
    const formData = new FormData();
    const requestBlob = new Blob(
        [
            JSON.stringify({
                title: data.request.title,
                content: data.request.content,
                boardCategory: data.request.boardCategory,
                subBoardType: data.request.subBoardType,
                platform: data.request.platform,
            }),
        ],
        { type: 'application/json' },
    );
    formData.append('request', requestBlob);

    // Append each image in the data.images array to formData
    if (data.images.length > 0) {
        console.log('data.images', data.images);
        formData.append('images', data.images[0]);
    }
    console.log('formData', formData.get('images'));

    try {
        const response = await Axios.post('/api/subBoard', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error uploading data:', error);
        throw error;
    }
};

export const useQuestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: QuestRequestType) => postQuestRequest(data),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'quests'],
                refetchType: 'all',
            });
            alert('성공적으로 등록되었습니다.');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error.response?.data.message);
            pushNotification({
                msg: error.response?.data.message || '오류입니다',
                type: 'error',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //질문 게시판 등록

export const useRequestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: QuestRequestType) => postQuestRequest(data),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'requests'],
                refetchType: 'all',
            });
            alert('성공적으로 등록되었습니다.');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error.response?.data.message);
            pushNotification({
                msg: error.response?.data.message || '오류입니다',
                type: 'error',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //요청 게시판 등록
