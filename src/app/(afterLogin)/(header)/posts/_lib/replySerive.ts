import Axios from '@/app/util/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { pushNotification } from '@/app/util/pushNotification';
import { useSearchParams } from 'next/navigation';
import { ReplyResponseType } from '@/app/Models/replyType';
import {
    QUEST_SUBBOARD_QUERYKEY,
    REQUEST_SUBBOARD_QUERYKEY,
    createSubBoardDetailKey,
    createSubBoardReplyKey,
} from '@/app/queryKeys/subBoardKey';

export const getReplies = async ({ postId, pageParam, size }: { postId: number; pageParam: number; size: number }) => {
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

//-----------------------------------------------useMutation------------------------------------------------

export const useRepliesQeury = ({ subBoardId, boardType }: { subBoardId: number; boardType: 'QUEST' | 'REQUEST' }) => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    const size = searchParams.get('size') || 10;

    const query = useQuery({
        queryKey: createSubBoardReplyKey(subBoardId, Number(page), Number(size)),
        queryFn: () =>
            getReplies({
                postId: subBoardId,
                pageParam: Number(page),
                size: Number(size),
            }),
    });
    return query;
};

export const usePostReplyMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({
            postId,
            content,
            boardType,
        }: {
            postId: string;
            content: string;
            boardType: 'QUEST' | 'REQUEST';
        }) => postReply(postId, content),
        onSuccess: (_, variable) => {
            queryClient.invalidateQueries({
                queryKey: createSubBoardDetailKey(Number(variable.postId)), //postId를 타겟하여 캐시를 삭제
                refetchType: 'all',
            });
            queryClient.invalidateQueries({
                queryKey: variable.boardType === 'QUEST' ? QUEST_SUBBOARD_QUERYKEY : REQUEST_SUBBOARD_QUERYKEY,
                refetchType: 'all',
            }); //모든 캐시 삭제
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
export const usePostReplyDeleteMutation = () => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    const size = searchParams.get('size') || 10;

    const mutation = useMutation({
        mutationFn: ({ replyId }: { replyId: string; postId: string; boardType: 'QUEST' | 'REQUEST' }) =>
            deleteReply(replyId),
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({
                queryKey: createSubBoardDetailKey(Number(variable.postId)),
                refetchType: 'all',
            }); //postId기반 상세페이지 캐시 삭제
            queryClient.invalidateQueries({
                queryKey: variable.boardType === 'QUEST' ? QUEST_SUBBOARD_QUERYKEY : REQUEST_SUBBOARD_QUERYKEY,
                refetchType: 'all',
            }); //quest, request 게시판 캐시 삭제
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
