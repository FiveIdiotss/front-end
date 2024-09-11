'use client';
import React, { useEffect } from 'react';
import ChatRoomContent from './chatRoomContent/ChatRoomContent';
import ChatInputForm from './ChatInputForm';
import ChatRoomHeader from './ChatRoomHeader';
import { Session } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { getChatRoom } from '../_lib/chatRoom';
import ChatRoomStatus from './chatRoomStatus/ChatRoomStatus';
import { ChatRoomType } from '@/app/Models/chatType';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';

function ChatRoom({ roomId, session }: { roomId: number; session: Session }) {
    const { setUserInformation } = useChatInfoStore();

    const { data, isPending, error } = useQuery<ChatRoomType>({
        queryKey: ['chat', roomId],
        queryFn: () => getChatRoom(roomId),
    });

    useEffect(() => {
        if (data) {
            const isLoginMentor = session.user?.memberDTO.id === data.mentorId;
            const loginId = session.user?.memberDTO.id;
            const loginName = session.user?.memberDTO.name;
            session?.user?.memberDTO.id ===
                setUserInformation({
                    receiverId: data.receiverId,
                    boardTitle: data.boardTitle,
                    receiverImageUrl: data.receiverImageUrl,
                    receiverName: data.receiverName,
                    loginId: loginId,
                    loginName: loginName,
                    isLoginMentor: isLoginMentor,
                    startTime: data.startTime,
                    consultTime: data.consultTime,
                    date: data.date,
                    chatRoomId: data.chatRoomId,
                });
            console.log('현제 채팅방 정보 조회', data);
        }
    }, [data]); //채팅방 정보 조회
    if (isPending) return <Loading description="채팅방 데이터를 불러오는 중입니다..." />;
    if (error) return <ErrorDataUI text="채팅방 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요." />;

    return (
        <div className="flex h-dvh w-full flex-row">
            <div className=" flex flex-grow flex-col border-r ">
                {/* 대화중인 상대 유저정보 상단바 */}
                <ChatRoomHeader chatRoomData={data} />
                {/* 채팅내용 */}
                <ChatRoomContent roomId={roomId} />
                {/* 채팅입력창 */}
                <div className="flex h-fit w-full flex-col ">
                    <ChatInputForm roomId={roomId} />
                </div>
            </div>
            <ChatRoomStatus />
        </div>
    );
}

export default ChatRoom;
