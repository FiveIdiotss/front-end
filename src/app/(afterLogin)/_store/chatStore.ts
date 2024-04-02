import { create } from 'zustand';
import { ChatUsers } from '../chat/_component/ChatList';
import { Message } from '../chat/_lib/chatContentList';

type ChatStore = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    receiverImageUrl: string;
    latestMessageDTO: {
        content: string;
        hasImage: boolean;
        localDateTime: string;
    }; //채팅방 정보

    chatList: Message[];
    isSending: boolean;
    image: string;

    setIsSending: (isSending: boolean) => void;

    setUserInformation: ({
        chatRoomId,
        receiverId,
        receiverName,
        receiverImageUrl,
        latestMessageDTO,
    }: ChatUsers) => void;
    setChat: (chatList: Message) => void;
    setChatList: (chatList: Message[]) => void;
};
export const useChatStore = create<ChatStore>((set) => ({
    chatRoomId: -1,
    receiverId: -1,
    receiverName: '',
    receiverImageUrl: '',
    latestMessageDTO: {
        content: '',
        hasImage: false,
        localDateTime: '',
    }, //채팅방 정보

    chatList: [],
    isSending: false,
    image: '',
    setUserInformation: ({ chatRoomId, receiverId, receiverName, receiverImageUrl, latestMessageDTO }: ChatUsers) => {
        set({ chatRoomId, receiverId, receiverName, receiverImageUrl, latestMessageDTO });
    }, //채팅방 정보 설정

    setChat: (newChatList: Message) => {
        set((state) => ({
            chatList: [newChatList, ...state.chatList],
        }));
    }, //로컬에서 새로운 채팅리스트 추가
    setChatList: (newChatList: Message[]) => {
        set((state) => ({ chatList: [...state.chatList, ...newChatList] }));
    }, //서버에서 새로운 채팅리스트 추가
    setIsSending: (isSending: boolean) => {
        set({ isSending });
    },
}));
