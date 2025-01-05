import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { newSubBoardFormType } from '@/app/Models/subBoardType';
import {
    DETAIL_QUEST_QUERYKEY,
    DETAIL_REQUEST_QUERYKEY,
    DETAIL_SUBBOARD_QUERYKEY,
    QUEST_SUBBOARD_QUERYKEY,
    REQUEST_SUBBOARD_QUERYKEY,
} from '@/app/queryKeys/keys';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const postQuestRequest = async ({
    request,
    formType,
    boardId,
}: {
    request: newSubBoardFormType;
    formType: 'post' | 'put';
    boardId?: number;
}) => {
    console.log('request', request);
    const formData = new FormData();
    const requestBlob = new Blob(
        [
            JSON.stringify({
                title: request.title,
                content: request.content,
                boardCategory: request.boardCategory,
                subBoardType: request.subBoardType,
                platform: request.platform,
            }),
        ],
        { type: 'application/json' },
    );
    formData.append('request', requestBlob);

    // Append each image in the data.images array to formData
    if (request.images.length > 0) {
        console.log('request.images', request.images);
        formData.append('images', request.images[0]);
    }
    console.log('formData', formData.get('images'));

    if (formType === 'post') {
        const response = await Axios.post('/api/subBoard', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.data;
    } else {
        const response = await Axios.put(`/api/subBoard/${boardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    }
};
//-------------------------------------------hooks-------------------------------------------

export const useQuestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (parameter: newSubBoardFormType) =>
            postQuestRequest({
                request: parameter,
                formType: 'post',
            }),
        onSuccess: async (data, variable) => {
            await fetch('/api/revalidate?tag=quest');
            queryClient.invalidateQueries({
                queryKey: [...QUEST_SUBBOARD_QUERYKEY, 'user'],
                refetchType: 'all',
            });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error.response?.data);
            pushNotification({
                msg: error.response?.data.message || '오류입니다',
                type: 'error',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //질문 게시판 등록

export const useUpdateQuestMutation = (boardId?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (parameter: newSubBoardFormType) =>
            postQuestRequest({
                request: parameter,
                formType: 'put',
                boardId: boardId,
            }),
        onSuccess: async (data, variable) => {
            await fetch('/api/revalidate?tag=quest');
            queryClient.invalidateQueries({
                queryKey: [...QUEST_SUBBOARD_QUERYKEY, 'user'],
                refetchType: 'all',
            });
            queryClient.invalidateQueries({
                queryKey: [...DETAIL_SUBBOARD_QUERYKEY, boardId],
                refetchType: 'all',
            });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.log('error', error);
            pushNotification({
                msg: error.response?.data.message || '오류입니다',
                type: 'error',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //질문 게시판 수정

export const useRequestMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (parameter: newSubBoardFormType) =>
            postQuestRequest({
                request: parameter,
                formType: 'post',
            }),
        onSuccess: async (data, variable) => {
            await fetch('/api/revalidate?tag=request');
            queryClient.invalidateQueries({
                queryKey: [...REQUEST_SUBBOARD_QUERYKEY, 'user'],
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
}; //요청 게시판 등록

export const useUpdateRequestMutation = (boardId?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (parameter: newSubBoardFormType) =>
            postQuestRequest({
                request: parameter,
                formType: 'put',
                boardId: boardId,
            }),
        onSuccess: async (data, variable) => {
            await fetch('/api/revalidate?tag=request');
            queryClient.invalidateQueries({
                queryKey: [...REQUEST_SUBBOARD_QUERYKEY, 'user'],
                refetchType: 'all',
            });
            queryClient.invalidateQueries({
                queryKey: [...DETAIL_SUBBOARD_QUERYKEY, boardId],
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
}; //질문 게시판 수정
