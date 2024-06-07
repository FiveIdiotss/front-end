'use client';
import React, { use } from 'react';
import Image from 'next/image';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import { ChatUsers } from '../_lib/chatList';
import ArrowRightIcon from '@/app/(afterLogin)/_component/icon/ArrowRightIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
type Props = {
    user: ChatUsers;
};
function dateTransform(date: string) {
    try {
        const dateObj = new Date(date);
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();

        const minutes = dateObj.getMinutes();
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        if (year < new Date().getFullYear()) {
            console.log('year', year);

            return `${year}.${dateObj.getMonth() + 1}.${dateObj.getDate()}`;
        } //지난연도이면 년도까지 표시
        return `${hours >= 12 ? '오후' : '오전'} ${formattedHours}:${formattedMinutes}`;
    } catch (error) {
        console.error('Error occured while transforming date:', error);
        return '';
    }
}

function ChatListCard(props: Props) {
    const { user } = props;
    const { setUserInformation } = useChatStore();
    const { receiverId } = useChatStore();
    const router = useRouter();
    const onClickChat = () => {
        setUserInformation(user);
        router.push(`/chat/${user.receiverId}`);
    };

    return (
        <li
            key={user.chatRoomId}
            className={`flex h-20 w-full shrink-0 cursor-pointer  items-center border-b-2 px-3 py-2  hover:bg-neutral-100 `}
            onClick={onClickChat}
        >
            <Image
                src={user.receiverImageUrl}
                alt="avatar"
                className=" rounded-full object-cover"
                width={45}
                height={45}
            />
            <div className="ml-3 flex  flex-1 flex-col  ">
                <span className="">{user.receiverName}</span>
                <span className="line-clamp-2   text-xs font-light text-neutral-600">
                    {user.latestMessageDTO.hasImage ? '이미지' : user.latestMessageDTO.content}
                </span>
            </div>
            <div className="flex   flex-row items-center  gap-8 ">
                <span className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-white">매칭 대기</span>
                {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}

                <span className="text-sm   font-medium  text-neutral-600">
                    {dateTransform(user.latestMessageDTO.localDateTime)}
                </span>
                <ArrowRightIcon className="h-7 w-7 text-neutral-600" />
            </div>
        </li>
    );
}

export default ChatListCard;
