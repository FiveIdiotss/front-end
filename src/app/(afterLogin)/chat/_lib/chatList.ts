import Axios from '@/app/util/axiosInstance';
import { faker } from '@faker-js/faker';
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
    const session = await getSession();
    const memberId = session?.user?.memberDTO?.id;

    let params = {
        memberId: memberId,
    };

    try {
        const res = await Axios.get(`${url}/api/chat/chatRooms`, {
            params,
        });

        return res.data;
    } catch (error) {
        console.error('Error occured while fetching posts:', error);
        throw error;
    }
}
