import { PushItemType } from '@/app/Models/pushType';
import CloseIcon from '@/app/_icons/common/CloseIcon';
import { relativeDateFormat } from '@/app/util/relativeDateFormat';
import Image from 'next/image';
import React from 'react';
import { CloseButton } from 'react-toastify';
interface Props {
    item: PushItemType;
    handleRoute: (url: string, notificationId: number) => void;
    handleDeletePush: (notificationId: number) => void;
}

function PushMentorBoardCard({ item, handleRoute, handleDeletePush }: Props) {
    return (
        <>
            {item.notificationType === 'APPLY' && (
                <div
                    className="flex w-full flex-col gap-2 text-sm"
                    onClick={() => handleRoute(`/user/mentoring-request-received`, item.notificationId)}
                >
                    <div className="flex w-full flex-row items-start gap-2">
                        <span className="flex-grow text-left">
                            <span className="text-gray-500">[멘토링]</span> {item.title}
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
                    <div className="flex w-full flex-row items-center gap-2  text-sm">
                        <Image src={item.senderImageUrl} alt="user" className="rounded-full" width={20} height={20} />
                        <span className="font-medium text-green-600">{item.senderName}</span>
                        <span>님이 멘토링을 신청하였습니다.</span>
                    </div>
                    <div className="flex w-full flex-row items-center gap-1  text-gray-500">
                        <span className="line-clamp-1 flex-grow text-left ">
                            지원 메시지: <span>{item.content}</span>
                        </span>
                        <span className="text- w-20 shrink-0 text-end text-xs  ">
                            {relativeDateFormat(item.arriveTime).relativeDateOrTime}
                        </span>
                    </div>
                </div>
            )}

            {item.notificationType === 'MATCHING_COMPLETE' && (
                <div
                    className="flex w-full flex-col gap-2 text-sm"
                    onClick={() => handleRoute(`/user/mentoring-request`, item.notificationId)}
                >
                    <div className="flex w-full flex-row items-start gap-2">
                        <span className="flex-grow text-left">
                            <span className="text-gray-500">[멘토링]</span> {item.title}
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
                    <div className="flex w-full flex-row items-center gap-2  text-sm">
                        <Image src={item.senderImageUrl} alt="user" className="rounded-full" width={20} height={20} />
                        <span className="font-medium text-green-600">{item.senderName}</span>
                        <span>
                            님이 멘토링을 <span className="font-semibold text-blue-600">수락</span>하였습니다.{' '}
                            <span className="text-xs text-blue-600"></span>
                        </span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-end  gap-1 text-gray-500">
                        <span className="text- w-20 shrink-0 text-end text-xs  ">
                            {relativeDateFormat(item.arriveTime).relativeDateOrTime}
                        </span>
                    </div>
                </div>
            )}
            {item.notificationType === 'MATCHING_DECLINE' && (
                <div
                    className="flex w-full flex-col gap-2 text-sm"
                    onClick={() => handleRoute(`/user/mentoring-request`, item.notificationId)}
                >
                    <div className="flex w-full flex-row items-start gap-2">
                        <span className="flex-grow text-left">
                            <span className="text-gray-500">[멘토링]</span> {item.title}
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
                    <div className="flex w-full flex-row items-center gap-2  text-sm">
                        <Image src={item.senderImageUrl} alt="user" className="rounded-full" width={20} height={20} />
                        <span className="font-medium text-green-600">{item.senderName}</span>
                        <span>
                            님이 멘토링을 <span className="font-semibold text-red-600">거절</span>하였습니다. ✔️
                        </span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-end  gap-1 text-gray-500">
                        <span className="text- w-20 shrink-0 text-end text-xs  ">
                            {relativeDateFormat(item.arriveTime).relativeDateOrTime}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default PushMentorBoardCard;
