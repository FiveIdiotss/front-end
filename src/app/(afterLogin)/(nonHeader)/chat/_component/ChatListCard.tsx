'use client';
import React, { use, useState } from 'react';
import Image from 'next/image';
import { ChatUsers } from '../_lib/chatList';
import ArrowRightIcon from '@/app/(afterLogin)/_component/icon/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import DownListsIcon from '@/app/(afterLogin)/_component/icon/DownListsIcon';
import UpListsIcon from '@/app/(afterLogin)/_component/icon/UpListsIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

function ChatListCard({ user }: { user: ChatUsers }) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const { setUserInformation } = useChatStore();

    const router = useRouter();

    const now = dayjs();
    const date = dayjs(user.latestMessageDTO.localDateTime);

    let displayDate;
    if (now.isSame(date, 'day')) {
        displayDate = date.format('A hh:mm');
    } else {
        displayDate = date.format('YYYY.MM.DD');
    }

    const handleDetailToggle = () => {
        setIsDetailOpen(!isDetailOpen);
    };
    const onClickChat = () => {
        setUserInformation({
            receiverId: user.receiverId,
            boardTitle: user.boardTitle,
            receiverImageUrl: user.receiverImageUrl,
            receiverName: user.receiverName,
        });
        router.push(`/chat/${user.chatRoomId}`);
    };

    return (
        <li key={user.chatRoomId} className={`flex w-full cursor-pointer flex-col items-center  border-b-2  `}>
            <div className=" flex  h-[70px] w-full flex-row items-center  px-3   " onClick={handleDetailToggle}>
                {isDetailOpen ? (
                    <UpListsIcon className="mr-5 h-6 w-6 text-blue-500" />
                ) : (
                    <DownListsIcon className="mr-5 h-6 w-6 text-neutral-500" />
                )}
                <div className="flex flex-grow flex-row font-semibold  ">{user.boardTitle}</div>
                <div className="flex   flex-row items-center  gap-8 ">
                    <span className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-white">매칭 대기</span>
                    {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}

                    <span className="text-sm   font-medium  text-neutral-500">{displayDate}</span>
                </div>
            </div>
            {isDetailOpen && (
                <div
                    className="flex  h-[70px] w-full flex-row items-center border-t pl-12 pr-3 hover:bg-neutral-100  "
                    onClick={onClickChat}
                >
                    <div className="flex flex-grow flex-row">
                        <span className="line-clamp-1   text-sm font-light text-neutral-800">
                            {user.latestMessageDTO.hasImage ? '이미지' : user.latestMessageDTO.content}
                        </span>
                    </div>
                    <div className="flex flex-row items-center ">
                        <Image
                            src={user.receiverImageUrl}
                            alt="avatar"
                            className=" mr-2 rounded-full object-cover"
                            width={32}
                            height={32}
                        />

                        <span className="mr-7 text-sm">
                            <span className="font-extrabold text-blue-500">{user.receiverName}</span> 멘토님과 대화중
                        </span>
                        <ArrowRightIcon className="h-6 w-6 text-neutral-600" />
                    </div>
                </div>
            )}
        </li>
    );
}

export default ChatListCard;
