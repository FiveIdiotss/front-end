'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import DownListsIcon from '@/app/_icons/common/DownListsIcon';
import UpListsIcon from '@/app/_icons/common/UpListsIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { ChatRoomType } from '@/app/Models/chatType';

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
        <li
            key={user.chatRoomId}
            className={`flex  w-full  cursor-pointer flex-col  items-center border-b-2 border-gray-300  `}
        >
            <div
                className=" flex min-h-16  w-full flex-col items-center  gap-2 px-3 py-3  mobile:flex-row   "
                onClick={handleDetailToggle}
            >
                <div className="line-clamp-2 flex w-full flex-row justify-start  overflow-hidden font-medium mobile:w-fit mobile:flex-grow  ">
                    {isDetailOpen ? (
                        <UpListsIcon className="mr-5 h-6 w-6 text-blue-500" />
                    ) : (
                        <DownListsIcon className="mr-5 h-6 w-6 text-neutral-500" />
                    )}
                    <span className="font-normal text-gray-600">멘토링:&nbsp;</span>
                    <span className="text-gray-800">{user.boardTitle}</span>
                </div>
                <div className="flex w-full flex-row items-center   justify-end gap-3 mobile:w-fit  mobile:gap-6 ">
                    {/* <span className="rounded-md bg-yellow-400 px-4 py-2 text-xs font-medium text-white mobile:text-sm">
                        매칭 대기
                    </span> */}
                    {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}
                    <div className="flex flex-row items-center gap-2 ">
                        <span className="w-20   text-center  text-sm font-medium text-neutral-500">{displayDate}</span>
                        <span className=" text-sm font-semibold text-red-500">
                            {unreadCountFomat(user.unreadMessageCount)}
                            {/* {'메시지 2건'} */}
                        </span>
                    </div>
                </div>
            </div>

            {isDetailOpen && (
                <div
                    className="flex  h-[70px] w-full flex-row items-center gap-5 border-t border-gray-200 pl-14 pr-3 hover:bg-neutral-100  "
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
                        <div className="relative mr-2 h-7 w-7">
                            <Image
                                src={user.receiverImageUrl}
                                alt="avatar"
                                className=" rounded-full object-cover"
                                fill
                                sizes="35px"
                            />
                        </div>

                        <span className="mr-5 text-sm">
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
