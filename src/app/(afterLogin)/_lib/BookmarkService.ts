import Axios from '@/app/util/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { pushNotification } from '@/app/util/pushNotification';
import { MentoPostsType } from '../Models/mentoPostsType';

export const getBookmark = async (pageParam: number, size?: number): Promise<MentoPostsType> => {
    const params = {
        page: pageParam,
        size: size ? size : 24,
        schoolFilter: false,
        favoriteFilter: true,
    };

    const response = await Axios.get('/api/boards/filter', { params: params });

    return response.data.data;
}; //북마크 데이터 조회

const addBookmark = async (boardId: number) => {
    const response = await Axios.post(`api/board/favorite/${boardId}`);
    return response.data.data;
}; //북마크 추가
const deleteBookmark = async (boardId: number) => {
    const response = await Axios.delete(`api/board/favorite/${boardId}`);
    return response.data.data;
}; //북마크 삭제

export type BookmarkKeysType = {
    boardId: number;
    keys: string[];
};

export const useAddBookmarkMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ boardId }: BookmarkKeysType) => addBookmark(boardId),
        onMutate: async ({ boardId, keys }: BookmarkKeysType) => {
            console.log('boardId', boardId);
            console.log('keys', keys);
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(keys);

            queryClient.setQueryData(keys, (old: MentoPostsType | undefined) => {
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
        onSuccess: (res) => {
            pushNotification('북마크가 추가되었습니다.', 'success', 'dark');
        },
        onError: (error: AxiosError, variable, previousData) => {
            console.log('x', previousData);
            console.log(error);
            pushNotification('북마크 추가에 실패했습니다.', 'error', 'dark');
            queryClient.setQueryData(variable.keys, previousData);
        },
        onSettled: (data, error, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'mento'],
                refetchType: 'all',
            });
        },
    });

    return mutation;
}; //북마크 추가 mutation

export const useDeleteBookmarkMutation = () => {
    {
        const queryClient = useQueryClient();

        const mutation = useMutation({
            mutationFn: ({ boardId }: BookmarkKeysType) => deleteBookmark(boardId),
            onMutate: async ({ boardId, keys }: BookmarkKeysType) => {
                await queryClient.cancelQueries();
                const previousData = queryClient.getQueryData(keys);

                queryClient.setQueryData(keys, (old: MentoPostsType | undefined) => {
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
            onSuccess: () => {
                pushNotification('북마크가 삭제되었습니다.', 'success', 'dark');
            },
            onError: (error: AxiosError, variable, previousData) => {
                console.log('이전데이터xx', previousData);
                console.log('pageParamxx', variable);

                pushNotification('북마크 삭제에 실패했습니다.', 'error', 'dark');
                queryClient.setQueryData(variable.keys, previousData);
            },
            onSettled: (data, error, variable) => {
                console.log('이전데이터', data);
                queryClient.invalidateQueries({
                    queryKey: ['posts', 'mento'],
                    refetchType: 'all',
                });
            },
        });

        return mutation;
    }
}; //북마크 삭제 mutation
