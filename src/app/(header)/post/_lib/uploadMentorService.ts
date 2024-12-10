import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { newMentorFormType } from '@/app/Models/mentorType';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const postMentor = async ({
    request,
    formType,
    boardId,
}: {
    request: newMentorFormType;
    formType: 'put' | 'post';
    boardId?: number;
}) => {
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
    console.log(request);

    if (request.images.length > 0) {
        formData.append('images', request.images[0]);
    }

    formData.forEach((value, key) => {
        console.log(key, value);
    });

    if (formType === 'post') {
        const response = await Axios.post('/api/board', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } else {
        const response = await Axios.put(`/api/board/${boardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    }
};

//-------------------------------------------hooks-------------------------------------------

export const usePostMentorMutation = () => {
    const mutation = useMutation({
        mutationFn: (parmeter: newMentorFormType) =>
            postMentor({
                request: parmeter,
                formType: 'post',
            }),
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

export const useUpdateMentorMutation = (boardId?: number) => {
    const mutation = useMutation({
        mutationFn: (parmeter: newMentorFormType) =>
            postMentor({
                request: parmeter,
                formType: 'put',
                boardId: boardId,
            }),
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
