import Axios from '@/app/util/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MentoContent } from '../posts/_lib/posts';
import { pushNotification } from '@/app/util/pushNotification';

export type Bookmarks = {
    bookmark: MentoContent[];
    ids: number[];
};

export const getBookmark = async () => {
    const response = await Axios.get('/api/boards/favorites');
    const ids = response.data.map((bookmark: any) => bookmark.boardId);
    const data: Bookmarks = {
        bookmark: response.data,
        ids: ids,
    };

    return data;
}; //북마크 조회(컨텐츠까지 조회), 북마크된 게시글의 id만 추출

const addBookmark = async (boardId: number) => {
    const response = await Axios.post(`api/board/favorite/${boardId}`);
    return response.data;
}; //북마크 추가
const deleteBookmark = async (boardId: number) => {
    const response = await Axios.delete(`api/board/favorite/${boardId}`);
    return response.data;
}; //북마크 삭제

export const useAddBookmarkMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (boardId: number) => addBookmark(boardId),
        onMutate: async (boardId: number) => {
            await queryClient.cancelQueries();
            const previousData = queryClient.getQueryData(['bookmarks']);
            queryClient.setQueryData(['bookmarks'], (old: any) => {
                return {
                    ...old,
                    ids: [...old.ids, boardId],
                };
            });
            return { previousData };
        },
        onSuccess: (res) => {
            pushNotification('북마크가 추가되었습니다.', 'success', 'dark');
        },
        onError: (error: AxiosError, previousData) => {
            console.log(error);
            pushNotification('북마크 추가에 실패했습니다.', 'error', 'dark');
            queryClient.setQueryData(['bookmarks'], previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookmarks'],
                exact: true,
            });
        },
    });

    return mutation;
}; //북마크 추가 mutation

export const useDeleteBookmarkMutation = () => {
    {
        const queryClient = useQueryClient();

        const mutation = useMutation({
            mutationFn: (boardId: number) => deleteBookmark(boardId),
            onMutate: async (boardId: number) => {
                await queryClient.cancelQueries();
                const previousData = queryClient.getQueryData(['bookmarks']);
                queryClient.setQueryData(['bookmarks'], (old: any) => {
                    return {
                        ...old,
                        ids: old.ids.filter((id: number) => id !== boardId),
                    };
                });
                return { previousData };
            },
            onSuccess: () => {
                pushNotification('북마크가 삭제되었습니다.', 'success', 'dark');
            },
            onError: (error: AxiosError, previousData) => {
                console.log('이전데이터', previousData);

                pushNotification('북마크 삭제에 실패했습니다.', 'error', 'dark');
                queryClient.setQueryData(['bookmarks'], previousData);
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: ['bookmarks'],
                    exact: true,
                });
            },
        });

        return mutation;
    }
}; //북마크 삭제 mutation
