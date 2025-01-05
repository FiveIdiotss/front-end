import Axios from '@/app/util/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { pushNotification } from '@/app/util/pushNotification';
import { MentorResponseType } from '@/app/Models/mentorType';
import { useRouter } from 'next/navigation';
import { MENTOR_QUERYKEY } from '../queryKeys/keys';

const addBookmark = async (boardId: number) => {
    const response = await Axios.post(`/api/board/favorite/${boardId}`);
    return response.data.data;
}; //북마크 추가
const deleteBookmark = async (boardId: number) => {
    const response = await Axios.delete(`/api/board/favorite/${boardId}`);
    return response.data.data;
}; //북마크 삭제

export type BookmarkKeysType = {
    boardId: number;
    keys: (number | string | boolean)[];
};

export const useAddBookmarkMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ({ boardId }: BookmarkKeysType) => addBookmark(boardId),
        onMutate: async ({ boardId, keys }: BookmarkKeysType) => {
            console.log('boardId', boardId);
            console.log('keys', keys);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(keys);

            queryClient.setQueryData(keys, (old: MentorResponseType | undefined) => {
                return {
                    ...old,
                    data: old?.data.map((post) => {
                        if (post.boardId === boardId) {
                            return {
                                ...post,
                                favorite: true,
                            };
                        }
                        return post;
                    }),
                };
            });
            return { previousData };
        },
        onSuccess: async (res) => {
            await fetch('/api/revalidate?tag=mento');

            pushNotification({
                msg: '북마크가 추가되었습니다.',
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
                msg: '북마크 추가에 실패했습니다.',
                type: 'error',
                theme: 'dark',
            });
            queryClient.setQueryData(variable.keys, previousData);
        },
        onSettled: async (data, error, variable) => {
            queryClient.invalidateQueries({
                queryKey: [...MENTOR_QUERYKEY, 'user'],
                refetchType: 'all',
            });
            await fetch('/api/revalidate?tag=mento');
            router.refresh();
        },
    });

    return mutation;
}; //북마크 추가 mutation

export const useDeleteBookmarkMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ({ boardId }: BookmarkKeysType) => deleteBookmark(boardId),
        onMutate: async ({ boardId, keys }: BookmarkKeysType) => {
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(keys);

            queryClient.setQueryData(keys, (old: MentorResponseType | undefined) => {
                return {
                    ...old,
                    data: old?.data.map((post) => {
                        if (post.boardId === boardId) {
                            return {
                                ...post,
                                favorite: false,
                            };
                        }
                        return post;
                    }),
                };
            });
            return { previousData };
        },
        onSuccess: async () => {
            // pushNotification({
            //     msg: '북마크가 삭제되었습니다.',
            //     type: 'success',
            //     theme: 'light',
            //     isIcon: false,
            //     textColor: ' #d1180b ',
            // });
            await fetch('/api/revalidate?tag=mento');
        },
        onError: (error: AxiosError, variable, previousData) => {
            console.log('이전데이터xx', previousData);
            console.log('pageParamxx', variable);

            pushNotification({
                msg: '북마크 삭제에 실패했습니다.',
                type: 'error',
                theme: 'dark',
            });
            queryClient.setQueryData(variable.keys, previousData);
        },
        onSettled: async (data, error, variable) => {
            // console.log('이전데이터', data);
            // queryClient.invalidateQueries({
            //     queryKey: ['posts', 'mento'],
            //     refetchType: 'all',
            // });
            await fetch('/api/revalidate?tag=mento');
            router.refresh();
        },
    });

    return mutation;
}; //북마크 삭제 mutation
