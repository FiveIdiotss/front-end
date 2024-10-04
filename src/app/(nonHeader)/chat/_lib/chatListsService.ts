import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { ChatRoomType } from '@/app/Models/chatType';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

async function getChatLists(loginId?: number): Promise<ChatRoomType[]> {
    let params = {
        memberId: loginId,
    };

    const res = await Axios.get(`/api/chat/chatRooms`, {
        params,
    });

    return res.data.data;
}

//---------------hooks----------------

export const useChatListsQuery = ({ loginId }: { loginId?: number }) => {
    const query = useQuery<ChatRoomType[], AxiosError<ErrorResponse>>({
        queryKey: ['chat', 'List'],
        queryFn: () => getChatLists(loginId),
        // staleTime: 2 * 60 * 1000, //1분
        // gcTime: 5 * 60 * 1000,
        enabled: Boolean(loginId),
    });
    return query;
};
