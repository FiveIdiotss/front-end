import { PageInfotype } from './pageInfoType';

export type MentorBoardDTOType = {
    boardId: number;
    content: string;
    introduce: string;
    majorName: string;
    memberId: number;
    memberName: string;
    schoolName: string;
    target: string;
    title: string;
    year: number;
    writeTime: string;
    boardCategory: string;
    favorite: boolean; //수정중
    memberImageUrl: string;
    representImage: string;
    platform: 'WEB' | 'APP';
}; //멘토 게시판 각 카드에 들어갈 정보

export type MentorResponseType = {
    data: MentorBoardDTOType[]; //멘토 게시판 각 카드에 들어갈 정보
    pageInfo: PageInfotype; //페이지 정보
}; //멘토 게시판 전체 정보

export type MentorDetailType = {
    availableDays: string[];
    boardDTO: MentorBoardDTOType;
    boardImageUrls: {
        boardImageUrl: string;
    }[];

    consultTime: number; // 상담 시간(30,60 단위)
    times: { startTime: string; endTime: string }[]; // 가능한 시간대
    unavailableTimes: { data: string; startTime: string }[]; // 비어있는 시간
}; //멘토 상세 정보

export type newMentorFormType = {
    title: string;
    introduce: string;
    target: string;
    content: string;
    consultTime: number;
    times: { startTime: string; endTime: string }[];
    availableDays: string[];
    boardCategory: string;
    platform: 'WEB' | 'APP';
    images: File[];
}; //멘토 등록시 필요한 정보
