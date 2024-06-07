'use client';
import ChatListCard from './ChatListCard';
// import { ChatUser, getChatList } from '../_lib/chatList';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getChatList } from '../_lib/chatList';
import Loading from '@/app/_component/Loading';
import CategorySearch from '@/app/(afterLogin)/(header)/posts/_component/postsNav/CategorySearch';

function ChatList() {
    const {
        data: users,
        error,
        isPending,
    } = useQuery({
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
    if (isPending) {
        return <Loading />;
    }
    if (!users) {
        return <div>없음</div>;
    }

    if (error) {
        console.log('error입니다.', error);
    }

    return (
        <div className=" flex h-full   w-full flex-col border-r  p-6">
            <div className=" flex w-full flex-row  items-center justify-between  border-b-2 border-neutral-600  pb-3">
                <div className="w-[350px]">
                    <CategorySearch />
                </div>
            </div>
            <ul className="flex flex-col ">
                {users.map((user) => {
                    return <ChatListCard key={user.receiverId} user={user}></ChatListCard>;
                })}
            </ul>
        </div>
    );
}

export default ChatList;
