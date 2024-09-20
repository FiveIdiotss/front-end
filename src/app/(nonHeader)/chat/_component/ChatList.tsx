'use client';
import ChatListCard from './ChatListCard';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useChatListsQuery } from '../_lib/chatListsService';
import Loading from '@/app/_component/Loading';
import CategorySearch from '@/app/(header)/posts/_component/postsNav/CategorySearch';
import { Client } from '@stomp/stompjs';
import NoDataMessage from '@/app/_component/NoDataMessage';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import { ChatRoomType, UreadChatRoomType } from '@/app/Models/chatType';
import { Session } from 'next-auth';

function ChatList({ session }: { session?: Session | null }) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const stompClientRef = useRef<Client | null>(null); //stompClientRef
    const [isPageRendered, setIsPageRendered] = useState<boolean>(false); //컴포넌트가 처음 사용자에게 보여질때 한번만 실행

    const chatRoomsQuery = useChatListsQuery({
        loginId: session?.user?.memberDTO.id,
    }); //채팅방 목록

    const { data: users, error, isPending } = chatRoomsQuery; //채팅방 목록

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

        console.log('연결됨');
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
            console.log('채팅방 목록 컴포넌트 언마운트');

            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('unreadCount 구독 해제');

                stompClientRef.current.deactivate();
            }
        };
    }, []);

    // useEffect(() => {
    //     console.log('RoomListData', users);
    // }, [users]);

    if (isPending) {
        return <Loading description="채팅 목록을 불러오는 중입니다." />;
    }

    if (error) {
        console.log('error입니다.', error);
    }

    return (
        <div className="mx-auto flex w-full max-w-screen-mobile flex-grow flex-col bg-white mobile:border-x ">
            <div className="flex w-full flex-row items-center justify-between border-b  px-3 py-3">
                <button
                    onClick={() => router.back()}
                    className="  flex flex-row items-center gap-1 text-sm   text-gray-600 "
                >
                    <ArrowRightIcon className="mb-[1px] h-6 w-6 rotate-180" />
                    뒤로가기
                </button>

                <span className="text-sm  text-gray-600">
                    {/* <span className="text-sm font-medium text-primary">{session?.user?.memberDTO.name}</span>&nbsp;님 */}
                    채팅
                </span>
            </div>
            <div className=" flex w-full   flex-grow flex-col  ">
                {users?.length === 0 && (
                    <div className="flex w-full flex-grow items-center ">
                        <NoDataMessage text="채팅 없음" />
                    </div>
                )}
                <ul className=" flex w-full flex-col">
                    {/* <span className="ml-4 font-medium">채팅</span> */}
                    {/* <div className="w-full border-t" /> */}
                    {users?.map((user) => {
                        return <ChatListCard key={user.chatRoomId} user={user}></ChatListCard>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ChatList;
