'use client';
import React, { useEffect, useState } from 'react';
import ChatRoomContent from './chatRoomContent/ChatRoomContent';
import ChatInputForm from './ChatInputForm';
import ChatRoomHeader from './ChatRoomHeader';
import { Session } from 'next-auth';
import ChatRoomStatus from './chatRoomStatus/ChatRoomStatus';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import { useChatRoomQuery } from '../_lib/chatRoomService';
import ChatRoomNoticeModal from './ChatRoomNoticeModal';
import dayjs from 'dayjs';

function ChatRoom({ roomId, session }: { roomId: number; session: Session }) {
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const { setUserInformation } = useChatInfoStore();

    const chatRoomQuery = useChatRoomQuery(roomId);
    const { data: chatRooomDetail, isPending, error } = chatRoomQuery;

    const handleModalOpen = (isOpen: boolean) => {
        setIsNoticeModalOpen(isOpen);
    };

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

    useEffect(() => {
        // 현재 방의 roomId가 hiddenRooms 배열에 없고, 즉 "더 이상 보지 않기" 상태가 아니라면
        // 또한, 현재 시간이 targetDateTime 이전일 경우에만 모달을 열도록 설정

        const targetDateTime = dayjs(`${chatRooomDetail?.date} ${chatRooomDetail?.startTime}`);
        const hiddenRooms = JSON.parse(localStorage.getItem('hideNoticeModalRooms') || '[]');
        const isNotHidden = !hiddenRooms.includes(roomId);
        const isBeforeTargetTime = !dayjs().isAfter(targetDateTime);
        if (isNotHidden && isBeforeTargetTime) {
            handleModalOpen(true); // 모달을 열기 위한 함수 호출
        }
    }, []); //

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
        <>
            <div className="mx-auto flex h-dvh w-full max-w-screen-tablet flex-row mobile:border-x ">
                <div className="relative flex flex-grow flex-col pt-[50px] mobile:border-r ">
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
            {isNoticeModalOpen && <ChatRoomNoticeModal roomId={roomId} onClose={() => handleModalOpen(false)} />}
        </>
    );
}

export default ChatRoom;
