import Axios from '@/app/util/axiosInstance';
import { PageInfotype } from '@/app/(afterLogin)/Models/pageInfoType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { pushNotification } from '@/app/util/pushNotification';

export type ReplyType = {
    replyId: number;
    memberId: number;
    imageUrl: string;
    memberName: string;
    majorName: string;
    localDateTime: string;
    content: string;
};
type ReplyResponseType = {
    data: ReplyType[];

    pageInfo: PageInfotype;
};

export const getReplies = async (postId: number, pageParam: number, size: number) => {
    const params = {
        page: pageParam,
        size,
        isRecent: true,
    };
    const response = await Axios.get(`/api/reply/${postId}`, { params: params });
    return response.data.data as Promise<ReplyResponseType>;
}; //댓글 조회

const postReply = async (postId: string, content: string) => {
    const response = await Axios.post(`/api/reply/${postId}`, { content });
    return response.data.data;
}; //댓글 등록
const deleteReply = async (replyId: string) => {
    const response = await Axios.delete(`/api/reply/${replyId}`);
    return response.data;
}; //댓글 삭제

export const usePostReplyMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ postId, content, boardType }: { postId: string; content: string; boardType: string }) =>
            postReply(postId, content),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', variable.boardType, 'detail', String(variable.postId)], //postId를 타겟하여 캐시를 삭제
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
};
export const usePostDeleteMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ replyId, postId, boardType }: { replyId: string; postId: string; boardType: string }) =>
            deleteReply(replyId),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', variable.boardType, 'detail', String(variable.postId)],
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
};
