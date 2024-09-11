export type ChatRoomType = {
    chatRoomId: number; //채팅방 아이디
    receiverId: number; //상대방 아이디
    receiverName: string; //상대방 이름
    receiverImageUrl: string; //상대방 이미지
    latestMessageDTO: {
        content: string;
        localDateTime: string;
    }; //최근 메세지
    unreadMessageCount: number; //안읽은 메세지 갯수
    boardTitle: string; //매칭및 상담신청한 보드타이틀
    boardId: number; //매칭및 상담신청한 보드아이디
    matchingId: number; //현제 매칭 정보 조회용
    mentorId: number; //멘토 아이디
    startTime: string; //매칭 시작시간
    consultTime: number; //상담시간
    date: string; //매칭날짜
}; // 채팅방 리스트

export type UreadChatRoomType = {
    chatRoomId: number;
    unreadMessageCount: number;
    latestMessageDTO: {
        content: string;
        localDateTime: string;
    };
};
