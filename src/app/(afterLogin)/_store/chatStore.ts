import { create } from 'zustand';
import { ChatUsers } from '../chat/_component/ChatList';

type ChatStore = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    latestMessageSentTime: string;
    receiverAvatar: string;

    setUserInformation: ({
        chatRoomId,
        receiverId,
        receiverName,
        latestMessageSentTime,
        receiverAvatar,
    }: ChatUsers) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    chatRoomId: -1,
    receiverId: -1,
    receiverName: '',
    latestMessageSentTime: '',
    receiverAvatar: '',
    setUserInformation: ({
        chatRoomId,
        receiverId,
        receiverName,
        latestMessageSentTime,
        receiverAvatar,
    }: ChatUsers) => {
        set({ chatRoomId, receiverId, receiverName, latestMessageSentTime, receiverAvatar });
    },
}));
