import React from 'react';

import ChatRoomContent from './chatRoomContent/ChatRoomContent';

import ChatInputForm from './ChatInputForm';
import ChatRoomHeader from './ChatRoomHeader';
import { auth } from '@/auth';

async function ChatContent({ roomId }: { roomId: number }) {
    const session = await auth();
    return (
        <div className=" flex flex-1 flex-col border-r ">
            {/* 대화중인 상대 유저정보 상단바 */}
            <ChatRoomHeader />
            {/* 채팅내용 */}
            <ChatRoomContent roomId={roomId} memberDto={session?.user?.memberDTO} />
            {/* 채팅입력창 */}
            <div className="flex h-fit w-full flex-col ">
                <ChatInputForm roomId={roomId} memberDto={session?.user?.memberDTO} />
            </div>
        </div>
    );
}

export default ChatContent;
