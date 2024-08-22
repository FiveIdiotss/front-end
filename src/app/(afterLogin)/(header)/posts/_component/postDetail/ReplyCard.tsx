'use client';
import React, { useEffect, useState } from 'react';
import { usePostReplyDeleteMutation } from '../../_lib/replySerive';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ConfirmationModal from '@/app/_component/ConfirmationModal';
import useConfirmationModal from '@/app/util/ConfirmModalHook';
import { ReplyType } from '@/app/Models/replyType';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

function ReplyCard({
    reply,
    subBoardId,
    writerId,
    sessionId,
    boardType,
}: {
    reply: ReplyType;
    subBoardId: number;
    writerId: number;
    sessionId?: number;
    boardType: 'REQUEST' | 'QUEST';
}) {
    const now = dayjs();
    const date = dayjs(reply.localDateTime);
    const deleteMutation = usePostReplyDeleteMutation();

    let displayDate;
    if (now.isSame(date, 'day')) {
        displayDate = date.fromNow();
    } else {
        displayDate = date.format('YYYY.MM.DD HH:mm');
    }

    const handleDelete = () => {
        deleteMutation.mutate({ replyId: String(reply.replyId), postId: String(subBoardId), boardType: boardType });
    };
    const { handleOpenModal: handleOpenDeleteModal, ConfirmationModalComponent } = useConfirmationModal({
        onConfirm: handleDelete,
        title: '댓글을 삭제하시겠습니까?',
    });
    useEffect(() => {
        console.log('reply', reply);
        console.log('writerId', writerId);
    }, [reply, writerId]);

    const isWriter = reply.memberId === writerId; //작성자인지 확인
    const isDeleteButtonVisible = sessionId === reply.memberId && sessionId; //로그인한 사용자와 댓글 작성자가 같은지 확인

    return (
        <>
            <div className="flex w-full flex-row  border-b ">
                <div className="flex w-full flex-col justify-between gap-2 p-3">
                    <div className="flex flex-row items-center gap-2">
                        <Image src={reply.imageUrl} alt="profile" width={18} height={18} className="rounded-full" />
                        {!isWriter && <span className="text-xs text-neutral-600">{reply.memberName}</span>}
                        {isWriter && <span className="text-xs text-blue-600">글쓴이</span>}·
                        <span className="text-xs text-neutral-500">{reply.majorName}</span>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <span className=" text-sm ">{reply.content}</span>
                    </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-end justify-between gap-2 ">
                    <span className="p-3 text-xs text-neutral-500">{displayDate}</span>
                    {isDeleteButtonVisible && (
                        <div className="flex justify-center p-3 ">
                            <button className=" text-xs font-medium  text-red-600" onClick={handleOpenDeleteModal}>
                                삭제
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {ConfirmationModalComponent}
        </>
    );
}

export default ReplyCard;
