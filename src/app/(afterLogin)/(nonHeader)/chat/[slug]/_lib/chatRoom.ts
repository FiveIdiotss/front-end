import Axios from '@/app/util/axiosInstance';
import { ChatRoom } from '../../_lib/chatRooms';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { AxiosError } from 'axios';

export const getChatRoom = async (chatRoomId: number): Promise<ChatRoom> => {
    try {
        const response = await Axios.get(`/api/chat/chatRoom?slug=${chatRoomId}`);
        return response.data.data;
    } catch (error) {
        throw error as AxiosError<ErrorResponse>;
    }
};
