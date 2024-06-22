import React from 'react';
import ChatRoom from './_component/ChatRoom';
import ChatRoomStatus from './_component/chatRoomStatus/ChatRoomStatus';
import { auth } from '@/auth';

async function ChatViewPage({ params }: { params: { slug: string } }) {
    const roomId = Number(params.slug);
    const session = await auth();

    if (!session) {
        return <div>로그인후 이용해주세요.</div>;
    }

    return <ChatRoom roomId={roomId} session={session} />;
}

export default ChatViewPage;
