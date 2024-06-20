'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { DefaultError, InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Message, getChatContentList } from '../../_lib/chatContentList';
import { useInView } from 'react-intersection-observer';
import { MemberDto } from '@/auth';
import Loading from '@/app/_component/Loading';
import DotLoadingIcon from '@/app/(afterLogin)/_component/icon/DotLoadingIcon';
import ChatRoomContentPreload from './ChatRoomContentPreload';
import ArrowDropIcon from '@/app/(afterLogin)/_component/icon/ArrowDropIcon';

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
    const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 ref
    const [isNewMessage, setIsNewMessage] = useState<boolean>(false); //새로운 메시지 팝업 여부
    const [isMessage, setIsMovingBar] = useState<boolean>(false); //스크롤바 이동 여부
    const {
        receiverImageUrl,
        receiverId,
        receiverName,
        chatList,
        isSending,
        isReceiving,
        setIsReceiving,
        setChatList,
        setChatReset,
        setIsSending,
    } = useChatStore();

    const senderId = memberDto?.id; //세션정보에서 senderId 추출

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 300,
    }); //무한스크롤 경계선 감지 기능, inView가 true가 되면 fetchNextPage실행
    const { ref: isMessageInViewRef, inView: inViewMessage } = useInView({}); //새로운 메시지 팝업 감지
    const { ref: isBottomRef, inView: inViewBottom } = useInView({});

    const {
        data: initialChatList, //서버에서 불러온 데이터 기반 채팅리스트 초기화
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
    }, [initialChatList]); //서버에서 불러온 데이터 기반 이전 채팅리스트 초기화

    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer && !pageRendered && chatList.length > 0) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            setPageRendered(true); //채팅리스트가 처음 사용자에게  보여질때 한번만 맨아래로 스크롤
            return;
        } //첫화면에서 맨아래로 스크롤

        if (scrollContainer && isReceiving) {
            if (inViewMessage) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
                return;
            } else {
                setIsNewMessage(true);
            }
            setIsReceiving(false);
        } //최근 3번째 채팅 메시지가 뷰에서 사라질때&&새로운 메시지가 도착했을때 새로운 메시지 팝업 여부

        if (scrollContainer && isSending) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            setIsSending(false);
            return;
        } //본인이 메시지 전송시  스크롤 맨아래로 이동
    }, [chatList]); //메시지 리스트 변경될때

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

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
    }, [inView]); //div 최상단 도달시 데이터 추가
    useEffect(() => {
        if (inViewBottom) {
            setIsNewMessage(false);
        }
    }, [inViewBottom]); //div 최하단 도달시 새로운 메시지 팝업 숨김

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['chat', 'List'],
            exact: true,
        }); //채팅방  들어올때 채팅리스트 새로고침

        return () => {
            queryClient.removeQueries({
                queryKey: ['chat', roomId, 'massage'],
                exact: true,
            });
            setChatReset();
        }; //채팅방 나갈때 초기화
    }, []);

    const handleScrollBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }; //스크롤 div 최하단 이동

    if (isPending) {
        return <Loading />;
    }
    return (
        <div className="chatScroll    flex  w-full flex-grow flex-col overflow-y-scroll " ref={scrollContainerRef}>
            {/* 무한스크롤 옵저버 */}
            <div ref={ref} className={`flex w-full justify-center ${!hasNextPage ? 'hidden' : ''}  `}>
                <div className="h-10 w-10">
                    <DotLoadingIcon />
                </div>
            </div>

            {/* 메시지카드를 렌더링하는 부분 */}
            {[...chatList].reverse().map((chat, index) => {
                const isSender = chat.senderId === senderId;

                return (
                    <>
                        {/*특정 메시지 사라짐 감지 옵저버*/}
                        <div
                            ref={chatList.length - index === 3 ? isMessageInViewRef : null}
                            className={`${chatList.length - index === 3 ? '' : 'hidden'}`}
                        />
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
                            <div
                                className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} justify-center gap-1`}
                            >
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
                    </>
                );
            })}

            {/* 신규메시지 여부와 스크롤을 하단으로 이동하는 버튼 */}
            <div
                className={`bg-slate-black sticky bottom-2 flex h-10 w-full items-center px-4 ${inViewMessage ? 'hidden' : 'justify-end'}`}
            >
                <div className={`flex flex-1 justify-center first-line:ml-10 ${isNewMessage ? '' : 'hidden'}`}>
                    <button
                        onClick={handleScrollBottom}
                        className="flex flex-row items-center gap-1 rounded-md border border-gray-300 bg-white bg-opacity-80 px-5 py-2 shadow-md"
                    >
                        <span className="text-sm font-medium text-green-600">*미확인 메세지</span>
                    </button>
                </div>
                <button
                    onClick={handleScrollBottom}
                    className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white bg-opacity-80 shadow-md"
                >
                    <ArrowDropIcon isOpen={false} className="h-7 w-7 text-neutral-500" />
                </button>
            </div>
            <div ref={isBottomRef} className="w-full" />
        </div>
    );
}

export default ChatRoomContent;
