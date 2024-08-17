import LikeIcon from '@/app/_icons/icon/LikeIcon';
import React from 'react';
import { useAddLikeMutation, useUnLikeMutation } from '../../_lib/like';

function Like({
    boardId,
    likeCount,
    like,
    boardType,
}: {
    boardId: number;
    likeCount: number;
    like: boolean;
    boardType: 'quests' | 'requests';
}) {
    const addLikeMutation = useAddLikeMutation();
    const unLikeMutation = useUnLikeMutation();

    const handleToggleLike = () => {
        if (like) {
            unLikeMutation.mutate({
                boardId: String(boardId),
                boardType: boardType,
            });
        } else {
            addLikeMutation.mutate({
                boardId: String(boardId),
                boardType: boardType,
            });
        }
    };
    return (
        <div className="flex w-full flex-row justify-end py-3 ">
            <button
                className=" flex  cursor-pointer flex-row items-center gap-3 rounded-sm border border-neutral-300 bg-indigo-50 p-2 shadow-sm transition-all duration-300 hover:bg-indigo-100 "
                onClick={handleToggleLike}
            >
                <LikeIcon className="h-5 w-5 text-primary " isLike={like} />
                <span className="text-sm text-neutral-600">도움이 됐어요!</span>
                <span className={`text-sm  ${likeCount === 0 ? 'text-neutral-600 ' : 'text-primary'} `}>
                    {likeCount}
                </span>
            </button>
        </div>
    );
}

export default Like;
