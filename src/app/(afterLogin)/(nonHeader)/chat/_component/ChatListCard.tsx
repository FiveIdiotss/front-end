'use client';
import React, { use, useState } from 'react';
import Image from 'next/image';
import { ChatRoomType } from '../_lib/chatRooms';
import ArrowRightIcon from '@/app/_icons/icon/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import DownListsIcon from '@/app/_icons/icon/DownListsIcon';
import UpListsIcon from '@/app/_icons/icon/UpListsIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

function ChatListCard({ user }: { user: ChatRoomType }) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const router = useRouter();

    const now = dayjs();
    const date = dayjs(user.latestMessageDTO.localDateTime);

    let displayDate;
    if (now.isSame(date, 'day')) {
        displayDate = date.format('A hh:mm');
    } else if (now.isSame(date, 'year')) {
        displayDate = date.format('YYYY/MM/DD');
    } else {
        displayDate = '';
    }

    const handleDetailToggle = () => {
        setIsDetailOpen(!isDetailOpen);
    };
    const onClickChat = () => {
        router.push(`/chat/${user.chatRoomId}`);
    };

    const unreadCountFomat = (unreadCount: number) => {
        if (unreadCount === 0) {
            return '';
        } else {
            return unreadCount > 99 ? '메시지 99+' : `메시지 ${unreadCount}건`;
        }
    };

    return (
        <li key={user.chatRoomId} className={`flex w-full  cursor-pointer flex-col  items-center border-b-2  `}>
            <div className=" flex  h-[70px] w-full flex-row items-center  px-3   " onClick={handleDetailToggle}>
                {isDetailOpen ? (
                    <UpListsIcon className="mr-5 h-6 w-6 text-blue-500" />
                ) : (
                    <DownListsIcon className="mr-5 h-6 w-6 text-neutral-500" />
                )}
                <div className="flex flex-grow flex-row overflow-hidden truncate font-semibold  ">
                    {user.boardTitle}
                </div>
                <div className="flex   flex-row items-center  gap-6 ">
                    <span className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-white">매칭 대기</span>
                    {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="w-20   text-center  text-sm font-medium text-neutral-500">{displayDate}</span>
                        <span className=" text-sm font-semibold text-red-500">
                            {unreadCountFomat(user.unreadMessageCount)}
                        </span>
                    </div>
                </div>
            </div>
            {isDetailOpen && (
                <div
                    className="flex  h-[70px] w-full flex-row items-center gap-5 border-t pl-14 pr-3 hover:bg-neutral-100  "
                    onClick={onClickChat}
                >
                    <div className=" flex flex-grow  items-center gap-2 overflow-hidden">
                        {user.unreadMessageCount !== 0 && (
                            <span className="flex h-5  min-w-5 items-center justify-center rounded-full bg-red-500 p-1  text-xs font-semibold text-white ">
                                {user.unreadMessageCount > 99 ? '99+' : user.unreadMessageCount}
                            </span>
                        )}
                        {/* {user.latestMessageDTO.hasImage ? '이미지' : user.latestMessageDTO.content} */}
                        <span className="text-md truncate font-light text-neutral-800">
                            {user.latestMessageDTO.content === ' ' ? '메세지 없음' : user.latestMessageDTO.content}
                        </span>
                    </div>
                    <div className="flex flex-shrink-0 flex-row items-center ">
                        <Image
                            src={user.receiverImageUrl}
                            alt="avatar"
                            className=" mr-2 rounded-full object-cover"
                            width={32}
                            height={32}
                        />

                        <span className="mr-7 text-sm">
                            <span className="font-extrabold text-blue-500">{user.receiverName}</span> 님과 대화중
                        </span>
                        <ArrowRightIcon className="h-6 w-6 text-neutral-600" />
                    </div>
                </div>
            )}
        </li>
    );
}

export default ChatListCard;
