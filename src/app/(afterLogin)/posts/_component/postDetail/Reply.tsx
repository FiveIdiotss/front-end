import ResetIcon from '@/app/(afterLogin)/_component/icon/ResetIcon';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { getReplies, usePostReplyMutation } from '../../_lib/reply';
import DotLoadingIcon from '@/app/(afterLogin)/_component/icon/DotLoadingIcon';
import ReplyCard from './ReplyCard';
import ConfirmationModal from '@/app/_component/ConfirmationModal';
type Reply = {
    replyCount: number;
    subBoardId: number;
    writerId: number;
    sessionId?: number;
    boardType: 'requests' | 'quests';
};

function Reply({ replyCount, subBoardId, writerId, sessionId, boardType }: Reply) {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['posts', boardType, 'detail', String(subBoardId), 'reply', 1],
        queryFn: () => getReplies(subBoardId, 1, 10),
    });
    useEffect(() => {
        console.log('data', data);
    }, [data]);

    const postMutation = usePostReplyMutation();

    const handleSubmit = () => {
        if (inputRef.current) {
            postMutation.mutate({ postId: String(subBoardId), content: inputRef.current.value, boardType: boardType });
            inputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="mt-6 flex w-full flex-col gap-4 ">
                <div className=" flex w-full flex-row items-center justify-between ">
                    <span className="text-sm text-neutral-600">댓글 {replyCount}</span>
                    <ResetIcon className="h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-800" />
                </div>
                <div className="flex flex-row">
                    <textarea
                        ref={inputRef}
                        className="min-h-20 w-full resize-none border border-neutral-300 p-3 text-xs outline-none"
                        placeholder="댓글을 입력해주세요"
                    />
                    <div className="flex h-full w-20 cursor-pointer flex-col items-center justify-center bg-primary bg-opacity-75 p-[2px] text-white">
                        <span
                            className="flex h-full w-full items-center justify-center border border-white"
                            onClick={handleSubmit}
                        >
                            등록
                        </span>
                    </div>
                </div>
                <div className="flex w-full flex-col border-t-2  border-neutral-400">
                    {isPending && <DotLoadingIcon />}
                    {!isPending &&
                        data?.data.map((reply) => (
                            <ReplyCard
                                key={reply.replyId}
                                reply={reply}
                                subBoardId={subBoardId}
                                writerId={writerId}
                                sessionId={sessionId}
                                boardType={boardType}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

export default Reply;
