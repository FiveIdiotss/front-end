import Axios from '@/app/util/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenQuestionDetailType } from './qeustsRequestService';
import { pushNotification } from '@/app/util/pushNotification';
import { AxiosError } from 'axios';

const addLike = async (postId: string) => {
    const response = await Axios.post(`api/like/${postId}`);
    return response.data.data;
};
const postUnlike = async (postId: string) => {
    const response = await Axios.delete(`api/like/${postId}`);
    return response.data.data;
};

export const useAddLikeMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ boardId, boardType }: { boardId: string; boardType: string }) => addLike(boardId),
        onMutate: async ({ boardId, boardType }) => {
            console.log('boardId', boardId);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(['posts', boardType, 'detail', boardId]);

            queryClient.setQueryData(['posts', boardType, 'detail', boardId], (old: OpenQuestionDetailType) => {
                return {
                    ...old,
                    subBoardDTO: {
                        ...old.subBoardDTO,
                        likeCount: old.subBoardDTO.likeCount + 1,
                        like: true,
                    },
                };
            });
            return { previousData };
        },
        onSuccess: (res) => {
            pushNotification({
                msg: '게시글에 좋아요를 눌렀습니다',
                type: 'success',
                theme: 'dark',
            });
        },
        onError: (error: AxiosError, variable, previousData) => {
            console.log('x', previousData);
            console.log(error);
            pushNotification({
                msg: '좋아요 누르기 불가',
                type: 'error',
                theme: 'dark',
            });
            queryClient.setQueryData(['posts', variable.boardType, 'detail', variable.boardId], previousData);
        },
        onSettled: (data, error, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', variable.boardType],
                refetchType: 'all',
            });
        },
    });

    return mutation;
}; //좋아요 추가 mutation

export const useUnLikeMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ boardId, boardType }: { boardId: string; boardType: string }) => postUnlike(boardId),
        onMutate: async ({ boardId, boardType }) => {
            console.log('boardId', boardId);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(['posts', boardType, 'detail', boardId]);

            queryClient.setQueryData(['posts', boardType, 'detail', boardId], (old: OpenQuestionDetailType) => {
                return {
                    ...old,
                    subBoardDTO: {
                        ...old.subBoardDTO,
                        likeCount: old.subBoardDTO.likeCount - 1,
                        like: false,
                    },
                };
            });
            return { previousData };
        },
        onSuccess: (res) => {},
        onError: (error: AxiosError, variable, previousData) => {
            console.log('x', previousData);
            console.log(error);
            pushNotification({
                msg: '좋아요 취소 불가',
                type: 'error',
                theme: 'dark',
            });
            queryClient.setQueryData(['posts', variable.boardType, 'detail', variable.boardId], previousData);
        },
        onSettled: (data, error, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', variable.boardType],
                refetchType: 'all',
            });
        },
    });

    return mutation;
};
