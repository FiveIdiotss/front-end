import { create } from 'zustand';
// import { ChatUsers } from '../(nonHeader)/chat/_lib/chatList';
import { Message } from '../(nonHeader)/chat/[slug]/_lib/chatContentList';

type ChatContentStoreType = {
    //---------채팅리스트 정보----------
    chatList: Message[];
    isSending: boolean;
    isReceiving: boolean;
    image: string;
    completeExtendMessagesId: number[];

    setIsSending: (isSending: boolean) => void;
    setIsReceiving: (isReceiving: boolean) => void;

    setChat: (chatList: Message) => void; //로컬에서 새로운 채팅리스트 추가
    setChatList: (chatList: Message[]) => void; //서버에서 새로운 채팅리스트 추가
    setChatReset: () => void; //채팅리스트 초기화
    setCompleteExtendMessagesId: (id: number) => void;
};

export const useChatContentStore = create<ChatContentStoreType>((set) => ({
    chatList: [],
    isSending: false,
    isReceiving: false,
    image: '', //채팅리스트 정보
    completeExtendMessagesId: [],

    setChat: (newChatList: Message) => {
        set((state) => ({
            chatList: [{ ...newChatList, chatId: state.chatList[0].chatId + 1 }, ...state.chatList],
        }));
    }, //로컬에서 새로운 채팅리스트 추가
    setChatList: (newChatList: Message[]) => {
        set((state) => ({ chatList: [...state.chatList, ...newChatList] }));
    }, //서버에서 새로운 채팅리스트 추가
    setIsSending: (isSending: boolean) => {
        set({ isSending });
    }, //보내는중인지 여부
    setIsReceiving: (isReceiving: boolean) => {
        set({ isReceiving });
    }, //받는중인지 여부
    setChatReset: () => {
        set({ chatList: [] });
    }, //채팅리스트 초기화
    setCompleteExtendMessagesId: (id: number) => {
        set((state) => ({
            completeExtendMessagesId: [...state.completeExtendMessagesId, id],
        }));
    },
}));
