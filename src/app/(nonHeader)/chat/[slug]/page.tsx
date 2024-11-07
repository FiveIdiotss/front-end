import React from 'react';
import ChatRoom from './_component/ChatRoom';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Axios from '@/app/util/axiosInstance';
import { ChatRoomType } from '@/app/Models/chatType';

const baseUrl = process.env.HOST_URL;

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const response = await Axios.get(`/api/chat/chatRoom?chatRoomId=${params.slug}`);
    const roomData: ChatRoomType = response.data.data;
    if (!roomData) {
        return {
            title: '채팅',
        };
    }
    return {
        title: { absolute: roomData.receiverName + '님과의 채팅' + ' - ' + roomData.boardTitle },
    };
}
// const response = await Axios.get(`/api/chat/chatRoom?chatRoomId=${chatRoomId}`);

async function ChatViewPage({ params }: { params: { slug: string } }) {
    const roomId = Number(params.slug);
    const session = await auth();

    if (!session) {
        return redirect(`${baseUrl}/account/login?loginRequired=true`);
    }

    return <ChatRoom roomId={roomId} session={session} />;
}

export default ChatViewPage;
