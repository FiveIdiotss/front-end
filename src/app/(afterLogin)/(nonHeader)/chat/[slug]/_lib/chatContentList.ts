import Axios from '@/app/util/axiosInstance';
export type Message = {
    chatId: number;
    content: string;
    senderName: string;
    senderId: number;
    chatRoomId: number;
    localDateTime: string;
    // chatId: number;
    readCount: number;
    fileURL: string;
    messageType:
        | 'TEXT'
        | 'IMAGE'
        | 'VIDEO'
        | 'CONSULT_EXTEND'
        | 'CONSULT_EXTEND_ACCEPT'
        | 'CONSULT_EXTEND_DECLINE'
        | 'CONSULT_EXTEND_COMPLETE'; //CONSULT_EXTEND: 상담 연장(서버메시지)
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
