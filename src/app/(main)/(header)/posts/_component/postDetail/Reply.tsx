import ResetIcon from '@/app/_icons/common/ResetIcon';
import React, { useEffect, useRef } from 'react';
import { usePostReplyMutation, useRepliesQeury } from '../../_lib/replySerive';
import ReplyCard from './ReplyCard';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import SimplePagination from '@/app/(main)/_component/common/SimplePagination';

interface Props {
    replyCount: number;
    subBoardId: number;
    writerId: number;
    sessionId?: number;
    boardType: 'QUEST' | 'REQUEST';
}

function Reply({ replyCount, subBoardId, writerId, sessionId, boardType }: Props) {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const repliesQeury = useRepliesQeury({ subBoardId, boardType });
    const { data: repliesData, error, isPending } = repliesQeury;

    const postMutation = usePostReplyMutation();

    const handleSubmit = () => {
        if (inputRef.current) {
            postMutation.mutate({ postId: String(subBoardId), content: inputRef.current.value, boardType: boardType });
            inputRef.current.value = '';
        }
    };
    useEffect(() => {
        console.log('댓글 목록', repliesData);
    }, [repliesData]);

    return (
        <>
            <div className="mt-6 flex w-full flex-col gap-4 ">
                <div className=" flex w-full flex-row items-center justify-between ">
                    <span className="text-sm text-neutral-600">댓글 {replyCount || 0}</span>
                    <button onClick={() => repliesQeury.refetch()}>
                        <ResetIcon className="h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-800" />
                    </button>
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
                    {isPending && <Loading className="h-40" description="댓글 데이터를 불러오는 중입니다." />}
                    {error && <ErrorDataUI text="댓글을 불러오는데 실패하였습니다." className="h-40" />}
                    {!isPending &&
                        !error &&
                        repliesData.data.map((reply) => (
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
                <SimplePagination totalPages={repliesData?.pageInfo.totalPages || 1} isPageScroll={false} />
            </div>
        </>
    );
}

export default Reply;
