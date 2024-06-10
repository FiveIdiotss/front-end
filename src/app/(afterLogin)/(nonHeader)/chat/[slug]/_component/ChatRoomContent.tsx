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
    const {
        receiverImageUrl,
        receiverId,
        receiverName,
        chatList,
        // chatRoomId,
        isSending,

        setChatList,
        setChatReset,
        setIsSending,
    } = useChatStore();
    const senderId = memberDto?.id; //세션정보에서 senderId 추출
    const {
        data: initialChatList,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [string, number, string], number>({
        queryKey: ['chat', roomId, 'massage'],
        queryFn: getChatContentList,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => (allPages.length > 0 ? allPages.length + 1 : undefined),
        getPreviousPageParam: (firstPage) => firstPage.at(-1)?.chatId,
        enabled: !!senderId && !!receiverId && !!roomId,
    }); //채팅리스트 무한스크롤 데이터 불러오기
    const [pageRendered, setPageRendered] = useState(false); //채팅리스트가 처음 사용자에게 보여질때 맨아래로 스크롤

    useEffect(() => {
        if (!initialChatList) return;
        if (initialChatList.pages[0].length > 0) {
            setChatList(initialChatList.pages[initialChatList.pages.length - 1]);
            console.log('initialChatList', initialChatList);
        }
    }, [initialChatList]); //이전 채팅리스트 초기화

    const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 ref
    const { ref, inView } = useInView({
        threshold: 0,
        delay: 300,
    }); //무한스크롤 경계선 감지 기능, inView가 true가 되면 fetchNextPage실행

    // useEffect(() => {
    //     if (initialChatList)
    //         if (scrollContainerRef.current && initialChatList?.pages.length > 1 && !pageRendered) {
    //             console.log('scrollContainerRef.current.scrollTop', scrollContainerRef.current.scrollHeight);
    //             scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    //             setPageRendered(true);
    //         }
    // }, [chatList]); //채팅리스트가 처음 사용자에게 보여질때 맨아래로 스크롤
    useLayoutEffect(() => {
        // if (
        //     scrollContainerRef.current &&
        //     !pageRendered &&
        //     chatList.length === 0 &&
        //     initialChatList?.pages.length === 0
        // ) {
        //     scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        //     setPageRendered(true);
        //     return;
        // }
        if (scrollContainerRef.current && !pageRendered && chatList.length > 0) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            setPageRendered(true);
            return;
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
    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['chat', 'List'],
            exact: true,
        });
        return () => {
            setChatReset();
        };
    }, []); //채팅방 나갈때 초기화

    return (
        <div className="chatScroll  flex w-full  flex-grow flex-col overflow-y-scroll " ref={scrollContainerRef}>
            <div ref={ref}></div>
            {[...chatList].reverse().map((chat, index) => {
                const prevChat = chatList[index - 1];
                let isSameTime = false;

                if (prevChat && chat.senderId === prevChat.senderId) {
                    const chatDate = new Date(chat.localDateTime);
                    const prevChatDate = new Date(prevChat.localDateTime);

                    const isSameHour = chatDate.getHours() === prevChatDate.getHours();
                    const isSameMinute = chatDate.getMinutes() === prevChatDate.getMinutes();

                    isSameTime = isSameHour && isSameMinute;
                }
                if (chat.senderId === senderId) {
                    // 내가 보낸 채팅내용
                    return (
                        <div key={uuidv4()} className="flex w-full flex-row  justify-end gap-1 px-4 py-3">
                            <div className="flex h-full  flex-col items-end justify-end ">
                                {/* <span className=" text-xs font-normal text-primary">1</span> */}
                                <span className="font-sans text-xs font-normal">
                                    {dateTransform(chat.localDateTime)}
                                </span>
                            </div>

                            {chat.image && (
                                <Image
                                    src={chat.image}
                                    alt="image"
                                    className="rounded-l-xl rounded-br-xl object-cover"
                                    width={100}
                                    height={100}
                                />
                            )}
                            {!chat.image && (
                                <span className="inline-block  max-w-96  break-words rounded-l-xl rounded-br-xl bg-primary px-3 py-2  text-left font-sans text-sm text-white">
                                    {chat.content}
                                </span>
                            )}
                        </div>
                    );
                } else {
                    //    상대방과의 채팅내용
                    // if (isSameTime) {
                    //     return (
                    //         <div key={uuidv4()} className="flex flex-row gap-1 px-4 py-3">
                    //             <div className="ml-10 flex w-full flex-col items-start justify-center gap-1 ">
                    //                 <div className="flex flex-row gap-1 ">
                    //                     <span className="flex rounded-r-xl rounded-bl-xl  bg-neutral-200 px-3 py-2 text-center font-sans text-sm">
                    //                         {chat.content}
                    //                     </span>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     );
                    // } else {
                    return (
                        <div key={uuidv4()} className="flex flex-row gap-1 px-4 py-3">
                            {
                                <div>
                                    <Image
                                        src={receiverImageUrl}
                                        alt="avatar"
                                        className="rounded-2xl object-cover"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            }

                            <div className="flex w-full flex-col items-start justify-center gap-1  ">
                                <span className="font-sans text-xs font-medium ">{receiverName}</span>
                                <div className="flex flex-row gap-1 ">
                                    {!chat.image && (
                                        <span className="inline-block  max-w-96  break-words rounded-r-xl  rounded-bl-xl bg-neutral-200  px-3  py-2 text-center font-sans text-sm">
                                            {chat.content}
                                        </span>
                                    )}
                                    {chat.image && (
                                        <Image
                                            src={chat.image}
                                            alt="image"
                                            className="rounded-r-xl rounded-bl-xl object-cover"
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                    <div className="flex h-full  flex-col items-start justify-end ">
                                        <span className="font-sans text-xs font-normal">
                                            {dateTransform(chat.localDateTime)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                // }
            })}
        </div>
    );
}

export default ChatRoomContent;
