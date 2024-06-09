import { create } from 'zustand';
import { ChatUsers } from '../(nonHeader)/chat/_lib/chatList';
import { Message } from '../(nonHeader)/chat/_lib/chatContentList';

type ChatStore = {
    chatRoomId: number;
    receiverId: number;
    receiverName: string;
    receiverImageUrl: string;
    boardTitle: string;
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
        receiverId,
        boardTitle,
        receiverImageUrl,
        receiverName,
    }: {
        receiverId: number;
        boardTitle: string;
        receiverImageUrl: string;
        receiverName: string;
    }) => void;
    setChat: (chatList: Message) => void;
    setChatList: (chatList: Message[]) => void;
    setChatReset: () => void;
};
export const useChatStore = create<ChatStore>((set) => ({
    chatRoomId: -1,
    receiverId: -1,
    receiverName: '',
    receiverImageUrl: '',
    boardTitle: '',
    latestMessageDTO: {
        content: '',
        hasImage: false,
        localDateTime: '',
    }, //채팅방 정보

    chatList: [],
    isSending: false,
    image: '',
    setUserInformation: ({
        receiverId,
        boardTitle,
        receiverImageUrl,
        receiverName,
    }: {
        receiverId: number;
        boardTitle: string;
        receiverImageUrl: string;
        receiverName: string;
    }) => {
        set({ receiverId, boardTitle, receiverImageUrl, receiverName });
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
    setChatReset: () => {
        set({ chatList: [] });
    },
}));
