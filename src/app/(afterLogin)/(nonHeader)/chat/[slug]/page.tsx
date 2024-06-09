import React from 'react';
import ChatContent from './_component/ChatRoom';
import ChatRoomStatus from './_component/chatRoomStatus/ChatRoomStatus';

function ChatViewPage({ params }: { params: { slug: string } }) {
    const roomId = Number(params.slug);

    return (
        <div className="flex h-full w-full flex-row gap-7">
            <ChatContent roomId={roomId} />
            <ChatRoomStatus />
        </div>
    );
}

export default ChatViewPage;
