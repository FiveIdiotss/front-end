import { create } from 'zustand';
// import { ChatUsers } from '../(nonHeader)/chat/_lib/chatList';
import { Message } from '../(nonHeader)/chat/[slug]/_lib/chatContentList';

type ChatStoreType = {
    //---------채팅방 정보----------
    chatRoomId: number | undefined; //채팅방 아이디

    receiverId: number | undefined; //받는 사람 아이디
    receiverName: string; //받는 사람 이름
    receiverImageUrl: string; //받는 사람 이미지
    boardTitle: string; //게시글 제목
    loginId: number | undefined; //보내는 사람 아이디
    loginName: string; //보내는 사람 이름
    isLoginMentor: boolean; //보내는 사람 멘토 여부{true:멘토, false:멘티}
    startTime: string; //매칭 시작시간
    consultTime: number; //상담시간
    date: string; //매칭날짜
    latestMessageDTO: {
        content: string;
        hasImage: boolean;
        localDateTime: string;
    }; //마지막 메시지에대한 정보

    //---------채팅리스트 정보----------
    chatList: Message[];
    isSending: boolean;
    isReceiving: boolean;
    image: string;

    setIsSending: (isSending: boolean) => void;
    setIsReceiving: (isReceiving: boolean) => void;

    setUserInformation: ({
        receiverId,
        boardTitle,
        receiverImageUrl,
        receiverName,
        loginId,
        loginName,
        isLoginMentor,
        startTime,
        consultTime,
        date,
        chatRoomId,
    }: {
        receiverId: number;
        boardTitle: string;
        receiverImageUrl: string;
        receiverName: string;
        loginId?: number;
        loginName?: string;
        isLoginMentor: boolean;
        startTime: string;
        consultTime: number;
        date: string;
        chatRoomId: number;
    }) => void; //채팅방 정보 설정

    setChat: (chatList: Message) => void; //로컬에서 새로운 채팅리스트 추가
    setChatList: (chatList: Message[]) => void; //서버에서 새로운 채팅리스트 추가
    setChatReset: () => void; //채팅리스트 초기화
};
export const useChatStore = create<ChatStoreType>((set) => ({
    chatRoomId: undefined,
    receiverId: undefined,
    receiverName: '',
    receiverImageUrl: '',
    boardTitle: '',
    startTime: '',
    consultTime: 0,
    date: '',
    loginId: undefined,
    loginName: '',
    isLoginMentor: false,
    latestMessageDTO: {
        content: '',
        hasImage: false,
        localDateTime: '',
    }, //채팅방 정보

    chatList: [],
    isSending: false,
    isReceiving: false,
    image: '', //채팅리스트 정보

    setUserInformation: ({
        receiverId,
        boardTitle,
        receiverImageUrl,
        receiverName,
        loginId,
        loginName,
        isLoginMentor,
        startTime,
        consultTime,
        date,
        chatRoomId,
    }: {
        receiverId: number;
        boardTitle: string;
        receiverImageUrl: string;
        receiverName: string;
        loginId?: number;
        loginName?: string;
        isLoginMentor: boolean;
        startTime: string;
        consultTime: number;
        date: string;
        chatRoomId: number;
    }) => {
        set({
            receiverId,
            boardTitle,
            receiverImageUrl,
            receiverName,
            loginId,
            loginName,
            isLoginMentor,
            startTime,
            consultTime,
            date,
            chatRoomId,
        });
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
    }, //보내는중인지 여부
    setIsReceiving: (isReceiving: boolean) => {
        set({ isReceiving });
    }, //받는중인지 여부
    setChatReset: () => {
        set({ chatList: [] });
    }, //채팅리스트 초기화
}));
