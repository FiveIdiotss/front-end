import LikeIcon from '@/app/_icons/common/LikeIcon';
import React from 'react';
import { useAddLikeMutation, useUnLikeMutation } from '../../_lib/likeService';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';
import ShareBoxIcon from '@/app/_icons/common/ShareBoxIcon';

function Like({
    boardId,
    likeCount,
    like,
    boardType,
    isLogin,
}: {
    boardId: number;
    likeCount: number;
    like: boolean;
    boardType: 'QUEST' | 'REQUEST';
    isLogin: boolean;
}) {
    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    });
    const addLikeMutation = useAddLikeMutation();
    const unLikeMutation = useUnLikeMutation();

    const handleToggleLike = () => {
        if (!isLogin) {
            navigateToLogin();
            return;
        }
        if (like) {
            unLikeMutation.mutate({
                boardId: boardId,
                boardType: boardType,
            });
        } else {
            addLikeMutation.mutate({
                boardId: boardId,
                boardType: boardType,
            });
        }
    };
    const handleCopy = () => {
        const link = window.location.href; // 현재 페이지의 URL을 가져옵니다.

        navigator.clipboard
            .writeText(link)
            .then(() => {
                alert('링크가 클립보드에 복사되었습니다!');
            })
            .catch((err) => {
                console.error('클립보드 복사 실패:', err);
            });
    };
    return (
        <div className="flex w-full flex-row justify-end gap-4 py-3 ">
            <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-1 rounded-sm border border-gray-300 px-2 text-sm text-gray-600"
            >
                <ShareBoxIcon className="h-4 w-4" />
                공유하기
            </button>
            <button
                className=" flex  cursor-pointer flex-row items-center gap-3 rounded-sm border border-neutral-300 bg-indigo-50 p-2 shadow-sm transition-all duration-300 hover:bg-indigo-100 "
                onClick={handleToggleLike}
            >
                <LikeIcon className="h-5 w-5 text-primary " isLike={like} />
                <span className="text-sm text-gray-600">도움이 됐어요!</span>
                <span className={`text-sm  ${likeCount === 0 ? 'text-neutral-600 ' : 'text-primary'} `}>
                    {likeCount}
                </span>
            </button>
        </div>
    );
}

export default Like;
