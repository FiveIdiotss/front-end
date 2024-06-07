import React from 'react';
import ChatRoomContent from '../_component/ChatRoomContent';
import ChatContent from '../_component/ChatRoom';

function ChatViewPage({ params }: { params: { slug: string } }) {
    const receiverId = Number(params.slug);

    return <ChatContent receiverId={receiverId} />;
}

export default ChatViewPage;
