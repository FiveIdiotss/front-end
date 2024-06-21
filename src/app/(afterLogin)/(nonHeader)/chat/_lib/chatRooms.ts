import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { faker } from '@faker-js/faker';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

export type ChatRoom = {
    chatRoomId: number; //채팅방 아이디
    receiverId: number; //상대방 아이디
    receiverName: string; //상대방 이름
    receiverImageUrl: string; //상대방 이미지
    latestMessageDTO: {
        content: string;
        localDateTime: string;
    }; //최근 메세지
    unreadMessageCount: number; //안읽은 메세지 갯수
    boardTitle: string; //매칭및 상담신청한 보드타이틀
    boardId: number; //매칭및 상담신청한 보드아이디
    matchingId: number; //현제 매칭 정보 조회용
}; // 채팅방 리스트

const avatar = faker.image.avatar();
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getChatRooms(): Promise<ChatRoom[]> {
    const session = await getSession();
    const memberId = session?.user?.memberDTO?.id;

    let params = {
        memberId: memberId,
    };

    try {
        const res = await Axios.get(`${url}/api/chat/chatRooms`, {
            params,
        });

        return res.data.data;
    } catch (error) {
        // console.error('채팅방 리스트 에러', error);
        throw error as AxiosError<ErrorResponse>;
    }
}
