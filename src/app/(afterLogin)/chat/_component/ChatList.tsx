'use client';
import Axios from '@/app/util/axiosInstance';
import ChatListCard from './ChatListCard';
// import { ChatUser, getChatList } from '../_lib/chatList';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getChatList } from '../_lib/chatList';
export type ChatUsers = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    receiverImageUrl: string;
    latestMessageDTO: {
        content: string;
        hasImage: boolean;
        localDateTime: string;
    };
};

function ChatList() {
    const { data: users, error } = useQuery<ChatUsers[]>({
        queryKey: ['chat', 'List'],
        queryFn: getChatList,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
    useEffect(() => {
        console.log('RoomListData', users);
    }, [users]);
    useEffect(() => {
        console.log('error입니다.', error);
        console.log('sdfdf', error);
    }, [error]);

    return (
        <div className=" flex   w-80 flex-col border-r">
            <span className="flex h-12 w-full items-center pl-4  text-neutral-500">대화목록</span>
            <div className="flex h-full flex-col overflow-y-scroll">
                {users &&
                    users.map((user) => {
                        return <ChatListCard key={user.receiverId} user={user}></ChatListCard>;
                    })}
            </div>
        </div>
    );
}

export default ChatList;
