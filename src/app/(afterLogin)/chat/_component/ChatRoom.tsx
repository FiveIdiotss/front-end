'use client';
import React from 'react';

import Image from 'next/image';
import ChatRoomContent from './ChatRoomContent';
import { useChatStore } from '../../_store/chatStore';
import ChatInputForm from './ChatInputForm';

function ChatContent() {
    const { receiverId, receiverImageUrl, receiverName } = useChatStore();

    return (
        <div className=" flex flex-1 flex-col ">
            {/* 대화중인 상대 유저정보 상단바 */}
            <div className="flex h-14 w-full flex-row items-center p-3">
                <div>
                    <Image
                        src={receiverImageUrl}
                        alt="avatar"
                        className=" rounded-full object-cover"
                        width={45}
                        height={45}
                    />
                </div>
                <span className="ml-2 font-semibold">{receiverName}</span>
            </div>
            {/* 채팅내용 */}
            <ChatRoomContent />
            {/* 채팅입력창 */}
            <div className="flex h-fit w-full flex-col ">
                <ChatInputForm />
            </div>
        </div>
    );
}

export default ChatContent;
