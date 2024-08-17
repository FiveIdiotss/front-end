import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type newPostFormData = {
    request: {
        title: string;
        introduce: string;
        target: string;
        content: string;
        consultTime: number;
        times: { startTime: string; endTime: string }[];
        availableDays: string[];
        boardCategory: string;
        platform: 'WEB' | 'APP';
    };
    images: File[];
};

const postMentor = async ({ request, images }: newPostFormData) => {
    const formData = new FormData();
    const requestBlob = new Blob(
        [
            JSON.stringify({
                title: request.title,
                introduce: request.introduce,
                target: request.target,
                content: request.content,
                consultTime: request.consultTime,
                times: request.times,
                availableDays: request.availableDays,
                boardCategory: request.boardCategory,
                platform: request.platform,
            }),
        ],
        { type: 'application/json' },
    );
    formData.append('request', requestBlob);

    if (images.length > 0) {
        formData.append('images', images[0]);
    }

    try {
        const response = await Axios.post('/api/board', formData, {
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

export const usePostMentorMutation = () => {
    const mutation = useMutation({
        mutationFn: postMentor,
        onError: (error: AxiosError<ErrorResponse>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
    });

    return mutation;
};
