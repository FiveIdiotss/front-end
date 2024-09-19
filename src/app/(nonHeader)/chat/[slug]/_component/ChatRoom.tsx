'use client';
import React, { useEffect } from 'react';
import ChatRoomContent from './chatRoomContent/ChatRoomContent';
import ChatInputForm from './ChatInputForm';
import ChatRoomHeader from './ChatRoomHeader';
import { Session } from 'next-auth';
import ChatRoomStatus from './chatRoomStatus/ChatRoomStatus';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import { useChatRoomQuery } from '../_lib/chatRoomService';
import { ro } from '@faker-js/faker';

function ChatRoom({ roomId, session }: { roomId: number; session: Session }) {
    const { setUserInformation } = useChatInfoStore();

    const chatRoomQuery = useChatRoomQuery(roomId);
    const { data: chatRooomDetail, isPending, error } = chatRoomQuery;

    useEffect(() => {
        if (chatRooomDetail) {
            const isLoginMentor = session.user?.memberDTO.id === chatRooomDetail.mentorId;
            const loginId = session.user?.memberDTO.id;
            const loginName = session.user?.memberDTO.name;
            session?.user?.memberDTO.id ===
                setUserInformation({
                    receiverId: chatRooomDetail.receiverId,
                    boardTitle: chatRooomDetail.boardTitle,
                    receiverImageUrl: chatRooomDetail.receiverImageUrl,
                    receiverName: chatRooomDetail.receiverName,
                    loginId: loginId,
                    loginName: loginName,
                    isLoginMentor: isLoginMentor,
                    startTime: chatRooomDetail.startTime,
                    consultTime: chatRooomDetail.consultTime,
                    date: chatRooomDetail.date,
                    chatRoomId: chatRooomDetail.chatRoomId,
                });
            console.log('현재 채팅방 정보 조회', chatRooomDetail);
        }
    }, [chatRooomDetail]); //채팅방 정보 조회

    useEffect(() => {
        if (error) {
            console.log('채팅방 정보 조회 에러', error);
        }
    }, [error]);

    if (isPending) return <Loading description="채팅방 데이터를 불러오는 중입니다..." />;
    if (error)
        return (
            <ErrorDataUI
                text={
                    error.response?.data.message ||
                    '채팅방 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.'
                }
            />
        );

    return (
        <div className="flex h-dvh w-full flex-row ">
            <div className="relative flex flex-grow flex-col pt-16 mobile:border-r ">
                {/* 대화중인 상대 유저정보 상단바 */}
                <ChatRoomHeader chatRoomData={chatRooomDetail} />
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
