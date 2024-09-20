'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import { ChatRoomType } from '@/app/Models/chatType';
import { relativeDateFormat } from '@/app/util/relativeDateFormat';

function ChatListCard({ user }: { user: ChatRoomType }) {
    const router = useRouter();

    const onClickChat = () => {
        router.push(`/chat/${user.chatRoomId}`);
    };

    console.log(user.latestMessageDTO.localDateTime);

    const { relativeDateOrTime: lastMessageDate } = relativeDateFormat(user.latestMessageDTO.localDateTime); //last message시간

    return (
        <li
            onClick={onClickChat}
            key={user.chatRoomId}
            className={`flex w-full  cursor-pointer flex-col items-center overflow-hidden border-b  bg-white  `}
        >
            <div className=" flex min-h-16  w-full flex-col items-center  gap-1 p-3 hover:bg-indigo-50     ">
                <div className="flex w-full flex-col  p-1 text-sm  text-gray-700 ">
                    <div className="flex flex-row">
                        <span className="flex h-fit flex-shrink-0 flex-row items-center gap-2  ">
                            {/* <div className="h-1 w-1 rounded-full bg-yellow-300" /> */}
                            &nbsp;
                        </span>
                        {user.boardTitle}
                    </div>
                </div>
                <div className=" flex w-full flex-row items-center  gap-4   font-medium   ">
                    <div className="relative h-10 w-10 shrink-0">
                        <Image
                            src={user.receiverImageUrl}
                            alt="avatar"
                            className=" rounded-full object-cover"
                            fill
                            sizes="50px"
                        />
                    </div>
                    <div className="flex flex-grow flex-col ">
                        <div className="flex flex-row items-center">
                            <span className="flex-grow text-base font-semibold">{user.receiverName}</span>
                            <span className="w-20   text-right    text-xs font-medium text-gray-400">
                                {lastMessageDate}
                            </span>
                        </div>
                        <div className="flex w-full flex-row items-center gap-6 ">
                            <span className="line-clamp-1  flex-grow  text-sm font-normal text-gray-400">
                                {user.latestMessageDTO.content === ' ' ? '메세지 없음' : user.latestMessageDTO.content}
                            </span>

                            <span
                                className={`flex h-6 w-6  shrink-0 items-center justify-center rounded-full bg-red-500 p-1  text-xs font-semibold text-white ${
                                    user.unreadMessageCount === 0 ? 'opacity-0' : 'opacity-100'
                                } `}
                            >
                                {user.unreadMessageCount > 99 ? '99+' : user.unreadMessageCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ChatListCard;
