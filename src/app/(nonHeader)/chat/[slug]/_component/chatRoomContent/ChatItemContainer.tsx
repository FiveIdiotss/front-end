import Image from 'next/image';
import React from 'react';
import ChatItem from './ChatItem';
import { Message } from '../../_lib/chatContentList';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import dayjs from 'dayjs';
import { useChatContentStore } from '@/app/_store/chatContentStore';

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

type Props = {
    chat: Message; // 채팅 메시지
    prevChat?: Message;
};

function ChatItemContainer({ chat, prevChat }: Props) {
    const { receiverImageUrl, receiverName, loginId, isLoginMentor } = useChatInfoStore(); // 채팅방 정보
    const { isOpponentEnter } = useChatContentStore();
    const isUserSentMessage = chat.senderId === loginId;
    const isDifferentTimeOrSender =
        !prevChat ||
        chat.senderId !== prevChat.senderId || // 발신자가 다르거나
        dayjs(chat.localDateTime).startOf('minute').diff(dayjs(prevChat.localDateTime).startOf('minute'), 'minute') >=
            2; // 시간이 2분 이상 차이 날 때

    return (
        <div
            className={`flex ${isUserSentMessage ? 'flex-row-reverse ' : 'flex-row'} w-full ${isDifferentTimeOrSender ? 'px-4 py-1' : 'py-1 pl-14 pr-4 '} gap-1   `}
        >
            {!isUserSentMessage && isDifferentTimeOrSender && (
                <div className="relative h-9 w-9 flex-shrink-0">
                    <Image
                        src={receiverImageUrl}
                        alt="avatar"
                        className=" rounded-full object-cover"
                        sizes="60px"
                        fill
                    />
                </div>
            )}

            <div
                className={`flex  flex-col ${isUserSentMessage ? 'items-end' : 'items-start'} max-w-96   flex-grow justify-center gap-1 `}
            >
                {/* 이름 */}
                {!isUserSentMessage && isDifferentTimeOrSender && (
                    <span className="font-sans text-xs font-medium">{receiverName}</span>
                )}

                {/* 채팅 내용(보내는 사람의 경우 오른쪽, 받는 사람의 경우 왼쪽) */}
                <div className={`flex  w-full   flex-grow flex-row gap-1 ${isUserSentMessage ? 'justify-end' : ''} `}>
                    {
                        <div
                            className={`flex flex-shrink-0 flex-col ${isUserSentMessage ? 'items-end ' : 'hidden items-start'} justify-end`}
                        >
                            {chat.readCount !== 2 && (
                                <span className="font-sans text-xs font-light  text-primary">{chat.readCount}</span>
                            )}
                            {isDifferentTimeOrSender && (
                                <span className="font-sans text-xs font-normal">
                                    {dateTransform(chat.localDateTime)}
                                </span>
                            )}
                        </div>
                    }
                    <ChatItem isUserSentMessage={isUserSentMessage} chat={chat} isLoginMentor={isLoginMentor} />
                    {isDifferentTimeOrSender && (
                        <div
                            className={`flex flex-shrink-0 flex-col ${isUserSentMessage ? 'hidden ' : 'items-start'} justify-end`}
                        >
                            <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatItemContainer;
