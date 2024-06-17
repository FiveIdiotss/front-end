import Axios from '@/app/util/axiosInstance';
export type Message = {
    content: string;
    senderName: string;
    senderId: number;
    chatRoomId: number;
    localDateTime: string;
    // chatId: number;
    readCount: number;
    fileURL: string;
    fileType: string;
};
type Props = {
    pageParam?: number;
    queryKey: [string, number, string];
};
export async function getChatContentList({ queryKey, pageParam }: Props) {
    const [_, roomId] = queryKey;
    try {
        const params = {
            page: pageParam,
            size: 25,
        };
        const res = await Axios.get(`/api/chat/messages/${roomId}`, { params });
        return res.data.data.content as Promise<Message[]>; //나중에 타입 수정해야함
    } catch (error) {
        console.error('Error occured while fetching posts:', error);
        throw new Error('Error occured while fetching posts 오류 발생');
    }
}
