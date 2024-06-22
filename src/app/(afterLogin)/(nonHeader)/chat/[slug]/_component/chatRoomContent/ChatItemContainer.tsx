import Image from 'next/image';
import React from 'react';
import ChatItem from './ChatItem';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import { Message } from '../../_lib/chatContentList';
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
    const { receiverImageUrl, receiverName, loginId, isLoginMentor } = useChatStore(); // 채팅방 정보
    const isUserSentMessage = chat.senderId === loginId;

    return (
        <div className={`flex ${isUserSentMessage ? 'flex-row-reverse' : 'flex-row'} gap-1 px-4 py-3`}>
            {!isUserSentMessage && (
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
            <div className={`flex flex-col ${isUserSentMessage ? 'items-end' : 'items-start'} justify-center gap-1`}>
                {!isUserSentMessage && <span className="font-sans text-xs font-medium">{receiverName}</span>}
                <div className="flex flex-row gap-1">
                    <div
                        className={`flex flex-col ${isUserSentMessage ? 'items-end ' : 'hidden items-start'} justify-end`}
                    >
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                    <ChatItem isUserSentMessage={isUserSentMessage} chat={chat} isLoginMentor={isLoginMentor} />
                    <div
                        className={`flex flex-col ${isUserSentMessage ? 'hidden items-end' : 'items-start'} justify-end`}
                    >
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItemContainer;
