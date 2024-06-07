import { ErrorResponse } from '@/app/Models/AxiosResponse';
import Axios from '@/app/util/axiosInstance';
import { faker } from '@faker-js/faker';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

export type ChatUsers = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    receiverImageUrl: string;
    latestMessageDTO: {
        content: string;
        hasImage: boolean;
        localDateTime: string;
    };
}; // 채팅방 리스트

const avatar = faker.image.avatar();
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getChatList(): Promise<ChatUsers[]> {
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
