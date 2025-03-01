import Axios from '@/app/util/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubBoardDetailType } from '@/app/Models/subBoardType';
import { pushNotification } from '@/app/util/pushNotification';
import { AxiosError } from 'axios';
import {
    QUEST_SUBBOARD_QUERYKEY,
    REQUEST_SUBBOARD_QUERYKEY,
    createSubBoardDetailKey,
} from '@/app/queryKeys/subBoardKey';
import { useRouter } from 'next/navigation';
import { getRevalidate } from '@/app/_lib/revalidateService';

const addLike = async (postId: number) => {
    const response = await Axios.post(`/api/like/${postId}`);
    return response.data.data;
};
const postUnlike = async (postId: number) => {
    const response = await Axios.delete(`/api/like/${postId}`);
    return response.data.data;
};

export const useAddLikeMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ({ boardId, boardType }: { boardId: number; boardType: 'QUEST' | 'REQUEST' }) => addLike(boardId),
        onMutate: async ({ boardId, boardType }) => {
            console.log('boardId', boardId);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(createSubBoardDetailKey(boardId));

            queryClient.setQueryData(createSubBoardDetailKey(boardId), (old: SubBoardDetailType) => {
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
        onSuccess: async (res) => {
            pushNotification({
                msg: '게시글에 좋아요를 눌렀습니다',
                type: 'success',
                theme: 'light',
                isIcon: false,
                textColor: 'rgb(101 84 189 )',
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
        onSettled: async (data, error, variable) => {
            await getRevalidate(variable.boardType === 'QUEST' ? 'quest' : 'request');
            router.refresh();
        },
    });

    return mutation;
}; //좋아요 추가 mutation

export const useUnLikeMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ boardId, boardType }: { boardId: number; boardType: 'QUEST' | 'REQUEST' }) =>
            postUnlike(boardId),
        onMutate: async ({ boardId, boardType }) => {
            console.log('boardId', boardId);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(createSubBoardDetailKey(boardId));

            queryClient.setQueryData(createSubBoardDetailKey(boardId), (old: SubBoardDetailType) => {
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
        onSuccess: async (res) => {},
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
        onSettled: async (data, error, variable) => {
            await getRevalidate(variable.boardType === 'QUEST' ? 'quest' : 'request');
            router.refresh();
        },
    });

    return mutation;
};
