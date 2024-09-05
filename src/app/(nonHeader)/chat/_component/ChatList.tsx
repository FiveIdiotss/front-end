'use client';
import ChatListCard from './ChatListCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatRoomType, getChatRooms } from '../_lib/chatRooms';
import Loading from '@/app/_component/Loading';
import CategorySearch from '@/app/(header)/posts/_component/postsNav/CategorySearch';
import { Client } from '@stomp/stompjs';
import NoDataMessage from '@/app/_component/NoDataMessage';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';
type UreadChatRoomType = {
    chatRoomId: number;
    unreadMessageCount: number;
    latestMessageDTO: {
        content: string;
        localDateTime: string;
    };
};

function ChatList() {
    const stompClientRef = useRef<Client | null>(null); //stompClientRef
    const [isPageRendered, setIsPageRendered] = useState<boolean>(false); //컴포넌트가 처음 사용자에게 보여질때 한번만 실행
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        data: users,
        error,
        isPending,
    } = useQuery({
        queryKey: ['chat', 'List'],
        queryFn: getChatRooms,
        staleTime: 2 * 60 * 1000, //1분
        gcTime: 5 * 60 * 1000,
    });

    const handleUnreadCount = async (chatRoom: UreadChatRoomType) => {
        await queryClient.setQueryData(['chat', 'List'], (oldData: any) => {
            console.log('oldData', oldData);
            console.log('chatRoom', chatRoom);
            return oldData.map((user: ChatRoomType) => {
                if (user.chatRoomId === chatRoom.chatRoomId) {
                    return {
                        ...user,
                        latestMessageDTO: {
                            content: chatRoom.latestMessageDTO.content,
                            localDateTime: chatRoom.latestMessageDTO.localDateTime,
                        },
                        unreadMessageCount: chatRoom.unreadMessageCount,
                    };
                }
                return user;
            });
        });
    };

    useEffect(() => {
        if (!users || isPageRendered) return;
        setIsPageRendered(true); //컴포넌트가 처음 사용자에게 보여질때 한번만 실행

        //컴포넌트가 처음 사용자에게 보여질때 한번만 실행

        console.log('연결결결결');
        const initializeChat = async () => {
            const stomp = new Client({
                brokerURL: 'wss://menteetor.site/ws',

                debug: (str: string) => {
                    console.log('연결 상태', str);
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
            stompClientRef.current = stomp;
            stomp.activate();
            stomp.onConnect = () => {
                users.forEach((user) => {
                    const subscriptionDestination = `/sub/unreadCount/${user.chatRoomId}`;

                    stomp.subscribe(subscriptionDestination, (frame) => {
                        try {
                            const chatRoom: UreadChatRoomType = JSON.parse(frame.body); //안읽은 메시지

                            console.log('unreadCount', chatRoom);
                            handleUnreadCount(chatRoom);
                        } catch (error) {
                            console.error('오류가 발생했습니다:', error);
                        }
                    });
                });
            };
        };
        initializeChat();
    }, [users]);
    useEffect(() => {
        return () => {
            console.log('컴포넌트 언마운트');

            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('unreadCount 구독 해제');

                stompClientRef.current.deactivate();
            }
        };
    }, []);

    useEffect(() => {
        console.log('RoomListData', users);
    }, [users]);

    if (isPending) {
        return <Loading />;
    }
    if (!users || users.length === 0) {
        return <NoDataMessage text="채팅 없음" />;
    }

    if (error) {
        console.log('error입니다.', error);
    }

    return (
        <div className="w-full flex-col">
            <button
                onClick={() => router.back()}
                className="flex  w-full flex-row items-center gap-2  p-4 text-gray-600 "
            >
                <ArrowRightIcon className="h-8 w-8 rotate-180" />
                이전
            </button>
            <div className=" flex h-full   w-full flex-col border-r  p-6">
                <div className=" flex w-full flex-row  items-center justify-between  border-b-2 border-neutral-600  pb-3">
                    <div className="w-[350px]">
                        <CategorySearch />
                    </div>
                </div>
                <ul className="flex w-full flex-col ">
                    {users.map((user) => {
                        return <ChatListCard key={user.chatRoomId} user={user}></ChatListCard>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ChatList;