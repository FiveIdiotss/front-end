import Image from 'next/image';
import React from 'react';
import ChatItem from './ChatItem';
import { Message } from '../../_lib/chatContentList';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
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
};

function ChatItemContainer({ chat }: Props) {
    const { receiverImageUrl, receiverName, loginId, isLoginMentor } = useChatInfoStore(); // 채팅방 정보
    const isUserSentMessage = chat.senderId === loginId;

    return (
        <div className={`flex ${isUserSentMessage ? 'flex-row-reverse ' : 'flex-row'} w-full gap-1  px-4 py-3`}>
            {!isUserSentMessage && (
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
                className={`flex flex-col ${isUserSentMessage ? 'items-end' : 'items-start'} max-w-96   flex-grow justify-center gap-1 `}
            >
                {/* 이름 */}
                {!isUserSentMessage && <span className="font-sans text-xs font-medium">{receiverName}</span>}

                {/* 채팅 내용(보내는 사람의 경우 오른쪽, 받는 사람의 경우 왼쪽) */}
                <div className={`flex  w-full   flex-grow flex-row gap-1 ${isUserSentMessage ? 'justify-end' : ''} `}>
                    <div
                        className={`flex flex-shrink-0 flex-col ${isUserSentMessage ? 'items-end ' : 'hidden items-start'} justify-end`}
                    >
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                    <ChatItem isUserSentMessage={isUserSentMessage} chat={chat} isLoginMentor={isLoginMentor} />

                    <div
                        className={`flex flex-shrink-0 flex-col ${isUserSentMessage ? 'hidden ' : 'items-start'} justify-end`}
                    >
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItemContainer;
