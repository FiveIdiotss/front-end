import ResetIcon from '@/app/_icons/common/ResetIcon';
import React, { useEffect, useRef } from 'react';
import { usePostReplyMutation, useRepliesQeury } from '../../_lib/replySerive';
import ReplyCard from './ReplyCard';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import SimplePagination from '@/app/_component/common/SimplePagination';
import Link from 'next/link';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { usePathname, useRouter } from 'next/navigation';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';

interface Props {
    replyCount: number;
    subBoardId: number;
    writerId: number;
    sessionId?: number;
    boardType: 'QUEST' | 'REQUEST';
}

function Reply({ replyCount, subBoardId, writerId, sessionId, boardType }: Props) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const pathName = usePathname();
    const router = useRouter();
    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    });

    const repliesQeury = useRepliesQeury({ subBoardId, boardType });
    const { data: repliesData, error, isPending } = repliesQeury;

    const postMutation = usePostReplyMutation();

    const handleSubmit = () => {
        if (inputRef.current) {
            postMutation.mutate(
                { postId: String(subBoardId), content: inputRef.current.value, boardType: boardType },
                {
                    onSuccess: () => {
                        router.refresh();
                    },
                },
            );
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
                <div className="relative flex w-full flex-row">
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
                    {!sessionId && (
                        <div className="absolute right-0  top-0 flex h-20  w-full items-center  justify-center bg-gray-800 bg-opacity-40 ">
                            <button
                                onClick={navigateToLogin}
                                className=" flex flex-row items-center gap-1 border bg-white px-4 py-2 text-xs text-gray-500 "
                            >
                                로그인 후 댓글을 작성할 수 있습니다.
                                <ArrowRightIcon className="h-4 w-4 " />
                            </button>
                        </div>
                    )}
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
