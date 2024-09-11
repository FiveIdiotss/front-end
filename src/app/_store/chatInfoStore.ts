import { create } from 'zustand';

// 채팅방 정보를 저장하는 zustand store *채팅방 입장전 실행되며 채팅방 내부 정보 세팅, 채팅방 내부 채팅관련된 정보는 chatContentStore.ts에 저장

type ChatInfoType = {
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
    setAddConsultTime: (consultTime: number) => void;
};

export const useChatInfoStore = create<ChatInfoType>((set) => ({
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
    }, //채팅방 입장전 실행되며 채팅방 내부 정보 세팅하는 함수

    setAddConsultTime: (consultTime: number) => {
        set((state) => ({
            consultTime: state.consultTime + consultTime,
        }));
    }, //상담 시간을 추가하는 함수
}));
