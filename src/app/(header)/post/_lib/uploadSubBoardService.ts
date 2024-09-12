import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { newSubBoardFormType } from '@/app/Models/subBoardType';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const postQuestRequest = async (data: newSubBoardFormType) => {
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
//-------------------------------------------hooks-------------------------------------------

export const useQuestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: newSubBoardFormType) => postQuestRequest(data),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'quests'],
                refetchType: 'all',
            });
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
        mutationFn: (data: newSubBoardFormType) => postQuestRequest(data),

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
