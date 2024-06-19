'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import {
    DefaultError,
    InfiniteData,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { Message, getChatContentList } from '../../_lib/chatContentList';
import { useInView } from 'react-intersection-observer';
import { MemberDto } from '@/auth';
import { set } from 'lodash';
import Loading from '@/app/_component/Loading';
import DotLoadingIcon from '@/app/(afterLogin)/_component/icon/DotLoadingIcon';
import FileIcon from '@/app/(afterLogin)/_component/icon/FileIcon';
import FilterIcon from '@/app/(afterLogin)/_component/icon/FilterIcon';
import Link from 'next/link';
import ChatRoomContentPreload from './ChatRoomContentPreload';

function dateTransform(date: string) {
    try {
        const dateObj = new Date(date);
        let hours = dateObj.getHours();

        const minutes = dateObj.getMinutes();
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${hours >= 12 ? '오후' : '오전'} ${formattedHours}:${formattedMinutes}`;
    } catch (error) {
        console.error('Error occured while transforming date:', error);
        return '';
    }
}

function ChatRoomContent({ roomId, memberDto }: { roomId: number; memberDto?: MemberDto }) {
    const queryClient = useQueryClient();
    const [contentScrollHeight, setContentScrollHeight] = useState({
        previous: 0,
        current: 0,
    });
    const {
        receiverImageUrl,
        receiverId,
        receiverName,
        chatList,
        // chatRoomId,
        isSending,
        isReceiving,
        setIsReceiving,

        setChatList,
        setChatReset,
        setIsSending,
    } = useChatStore();
    const senderId = memberDto?.id; //세션정보에서 senderId 추출
    const {
        data: initialChatList,
        isFetching,
        isPending,
        isError,
        hasNextPage,

        fetchNextPage,
    } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [string, number, string], number>({
        queryKey: ['chat', roomId, 'massage'],
        queryFn: getChatContentList,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => (allPages.length > 0 ? allPages.length + 1 : undefined),
        // getPreviousPageParam: (firstPage) => firstPage.at(-1)?.chatId,
        enabled: !!senderId && !!receiverId && !!roomId,
        staleTime: 0,
        // gcTime: 0,
    }); //채팅리스트 무한스크롤 데이터 불러오기
    const [pageRendered, setPageRendered] = useState(false); //채팅리스트가 처음 사용자에게 보여질때 맨아래로 스크롤

    useEffect(() => {
        if (isError || isPending) return;
        if (chatList.length === 0) {
            if (initialChatList.pages[0].length > 0) {
                initialChatList.pages.forEach((data) => {
                    setChatList(data);
                });
                console.log('initialChatList', initialChatList);
            }
        } else {
            setChatList(initialChatList.pages[initialChatList.pages.length - 1]);
            console.log('initialChatList', initialChatList);
        }
    }, [initialChatList]); //이전 채팅리스트 초기화()

    const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 ref
    const { ref, inView } = useInView({
        threshold: 0,
        delay: 300,
    }); //무한스크롤 경계선 감지 기능, inView가 true가 되면 fetchNextPage실행

    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainerRef.current && !pageRendered && chatList.length > 0) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            setPageRendered(true); //채팅리스트가 처음 사용자에게  보여질때 한번만 맨아래로 스크롤
            setContentScrollHeight({
                previous: scrollContainerRef.current.scrollHeight,
                current: scrollContainerRef.current.scrollHeight,
            }); //컨텐트의 스크롤 높이를 저장

            return;
        }
        if (scrollContainer && isReceiving) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const contentHeight = scrollContainer.scrollHeight - contentScrollHeight.previous;
            // const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight - contentHeight);
            // console.log('isScrolledToBottom ', isScrolledToBottom);
            console.log('contentHeight', contentHeight);
            // if (isScrolledToBottom < contentHeight + 2) {
            //     scrollContainer.scrollTop = scrollContainer.scrollHeight;
            // }
            setIsReceiving(false);
            // setContentScrollHeight({s
            //     previous: contentScrollHeight.current,
            //     current: scrollContainer.scrollHeight,
            // });
        }
    }, [chatList]); //채팅리스트가 처음 사용자에게 보여질때 맨아래로 스크롤

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainerRef.current && isSending) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            setIsSending(false);
            return;
        }

        if (inView && hasNextPage && scrollContainer) {
            const previousScrollHeight = scrollContainer.scrollHeight;
            console.log('데이터 불러오기 전 scrollHeight', previousScrollHeight);

            fetchNextPage().then(() => {
                requestAnimationFrame(() => {
                    const currentScrollHeight = scrollContainer.scrollHeight;
                    console.log('데이터 불러온 후 scrollHeight', currentScrollHeight);
                    console.log('계산전', scrollContainer.scrollTop);
                    console.log(
                        '스크롤 계산후',
                        scrollContainer.scrollTop + currentScrollHeight - previousScrollHeight,
                    );
                    scrollContainer.scrollTop += currentScrollHeight - previousScrollHeight;
                });
            });
        }
    }, [inView, isSending]); //무한스크롤

    // useEffect(() => {
    //     if (isReceiving) {
    //         const scrollContainer = scrollContainerRef.current;
    //         if (scrollContainer) {
    //             const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    //             const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
    //             console.log('받는메시시 스크롤 높이', isScrolledToBottom);
    //             if (isScrolledToBottom < 100) {
    //                 scrollContainer.scrollTop = scrollContainer.scrollHeight;
    //             }
    //             setIsReceiving(false);
    //         }
    //     }
    // }, [isReceiving]); //채팅방에 새로운 메시지가 도착했을때 스크롤을 맨아래로

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['chat', 'List'],
            exact: true,
        });
        return () => {
            queryClient.removeQueries({
                queryKey: ['chat', roomId, 'massage'],
                exact: true,
            });
            setChatReset();
        };
    }, []); //채팅방 나갈때 초기화
    if (isPending) {
        return <Loading />;
    }
    return (
        <div className="chatScroll  flex w-full  flex-grow flex-col overflow-y-scroll " ref={scrollContainerRef}>
            <div ref={ref} className={`flex w-full justify-center ${!hasNextPage ? 'hidden' : ''}  `}>
                <div className="h-10 w-10">
                    <DotLoadingIcon />
                </div>
            </div>

            {[...chatList].reverse().map((chat, index) => {
                const isSender = chat.senderId === senderId;

                return (
                    <div
                        key={uuidv4()}
                        className={`flex ${isSender ? 'flex-row-reverse' : 'flex-row'} gap-1 px-4 py-3`}
                    >
                        {!isSender && (
                            <div>
                                <Image
                                    src={receiverImageUrl}
                                    alt="avatar"
                                    className="rounded-2xl object-cover"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        )}
                        <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} justify-center gap-1`}>
                            {!isSender && <span className="font-sans text-xs font-medium">{receiverName}</span>}
                            <div className="flex flex-row gap-1">
                                <div
                                    className={`flex flex-col ${isSender ? 'items-end ' : 'hidden items-start'} justify-end`}
                                >
                                    <span className="font-sans text-xs font-normal">
                                        {dateTransform(chat.localDateTime)}
                                    </span>
                                </div>
                                <ChatRoomContentPreload isSender={isSender} chat={chat} />
                                <div
                                    className={`flex flex-col ${isSender ? 'hidden items-end' : 'items-start'} justify-end`}
                                >
                                    <span className="font-sans text-xs font-normal">
                                        {dateTransform(chat.localDateTime)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatRoomContent;
