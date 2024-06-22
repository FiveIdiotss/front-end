import Image from 'next/image';
import React from 'react';
import ChatItem from './ChatItem';
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
    chat: any;
    isSender: boolean;
    receiverImageUrl: string;
    receiverName: string;
};

function ChatItemContainer({ chat, isSender, receiverImageUrl, receiverName }: Props) {
    return (
        <div className={`flex ${isSender ? 'flex-row-reverse' : 'flex-row'} gap-1 px-4 py-3`}>
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
                    <div className={`flex flex-col ${isSender ? 'items-end ' : 'hidden items-start'} justify-end`}>
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                    <ChatItem isSender={isSender} chat={chat} />
                    <div className={`flex flex-col ${isSender ? 'hidden items-end' : 'items-start'} justify-end`}>
                        <span className="font-sans text-xs font-normal">{dateTransform(chat.localDateTime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItemContainer;
