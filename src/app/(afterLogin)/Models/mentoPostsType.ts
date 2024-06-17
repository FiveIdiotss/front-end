import { PageInfotype } from './pageInfoType';

export type MentoContentType = {
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
};
export type MentoPostsType = {
    data: MentoContentType[]; //멘토 게시판 각 카드에 들어갈 정보
    pageInfo: PageInfotype; //페이지 정보
};
