import React from 'react';

import Image from 'next/image';
import ChatRoomContent from './ChatRoomContent';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';

import ChatInputForm from './ChatInputForm';
import ChatRoomHeader from './ChatRoomHeader';

function ChatContent() {
    return (
        <div className=" flex flex-1 flex-col ">
            {/* 대화중인 상대 유저정보 상단바 */}
            <ChatRoomHeader />
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
