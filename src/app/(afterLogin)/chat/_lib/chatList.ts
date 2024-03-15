import Axios from '@/app/util/axiosInstance';
import { auth } from '@/auth';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { getSession } from 'next-auth/react';
export type ChatUser = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    latestMessageSentTime: string;
};

const avatar = faker.image.avatar();
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getChatList() {
    let params = {
        memberId: 1,
    };

    try {
        const res = await Axios.get(`${url}/api/chat/chatRooms`, {
            params,
        });
        res.data = res.data.map((chat: ChatUser) => ({
            ...chat,
            receiverAvatar: avatar, // 'avatar'를 실제 avatar 값으로 대체해야 합니다.
        }));

        return res.data;
    } catch (error) {
        console.error('Error occured while fetching posts:', error);
        throw error;
    }
}
