import Axios from '@/app/util/axiosInstance';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { AxiosError } from 'axios';
import { ChatRoomType } from '@/app/Models/chatType';
import { useQuery } from '@tanstack/react-query';

const getChatRoom = async (chatRoomId: number): Promise<ChatRoomType> => {
    const response = await Axios.get(`/api/chat/chatRoom?chatRoomId=${chatRoomId}`);
    return response.data.data;
};

export const useChatRoomQuery = (roomId: number) => {
    const query = useQuery<ChatRoomType, AxiosError<ErrorResponse>>({
        queryKey: ['chat', roomId],
        queryFn: () => getChatRoom(roomId),
        staleTime: 0,
        gcTime: 5 * 60 * 1000,
    });
    return query;
};
