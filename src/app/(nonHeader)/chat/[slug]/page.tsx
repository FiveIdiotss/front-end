import React from 'react';
import ChatRoom from './_component/ChatRoom';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

async function ChatViewPage({ params }: { params: { slug: string } }) {
    const roomId = Number(params.slug);
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    return <ChatRoom roomId={roomId} session={session} />;
}

export default ChatViewPage;
