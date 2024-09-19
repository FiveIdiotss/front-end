import React from 'react';

import Image from 'next/image';
import { relativeDateFormat } from '@/app/util/relativeDateFormat';
import { PushItemType } from '@/app/Models/pushType';
import CloseIcon from '@/app/_icons/common/CloseIcon';

interface Props {
    item: PushItemType;
    handleRoute: (url: string, notificationId: number) => void;
    handleDeletePush: (notificationId: number) => void;
}

function PushSubBoardCard({ item, handleRoute, handleDeletePush }: Props) {
    const isRequset = item.notificationType === 'REPLY_REQUEST';
    const isQuest = item.notificationType === 'REPLY_QUEST';

    return (
        <>
            {(isRequset || isQuest) && (
                <div
                    onClick={() =>
                        handleRoute(`/posts/${isRequset ? 'request' : 'quest'}/${item.otherPK}`, item.notificationId)
                    }
                    className="flex w-full flex-col gap-2 text-sm"
                >
                    <div className="flex w-full flex-row items-start gap-2">
                        <span className="flex-grow text-left">
                            <span className="text-gray-500">{isRequset ? '[요청 게시판] ' : '[질문 게시판] '}</span>
                            {item.title}
                        </span>
                        <button
                            className="rounded-lg p-1 hover:bg-red-50"
                            onClick={(e) => {
                                handleDeletePush(item.notificationId), e.stopPropagation();
                            }}
                        >
                            <CloseIcon className="h-5 w-5 shrink-0 text-red-500" />
                        </button>
                    </div>

                    <div className="flex w-full flex-row items-center gap-2">
                        <Image src={item.senderImageUrl} alt="user" className="rounded-full" width={20} height={20} />
                        <span className="font-medium text-green-600">{item.senderName}</span>
                        <span>님이 댓글을 남겼습니다.</span>
                    </div>
                    <div className="flex w-full flex-row items-center gap-1  text-gray-500">
                        <span className="line-clamp-1 flex-grow text-left ">
                            댓글: <span>{item.content}</span>
                        </span>
                        <span className="text- w-20 shrink-0 text-end text-xs  ">
                            {relativeDateFormat(item.arriveTime).relativeDateOrTime}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default PushSubBoardCard;
