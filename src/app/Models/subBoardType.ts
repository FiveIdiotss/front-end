import { PageInfotype } from './pageInfoType';

export type SubBoardDTOType = {
    content: string;
    imageUrl: string;
    like: boolean; //
    likeCount: number;
    memberId: number;
    memberName: string;
    replyCount: number; //댓글수
    schoolName: string;
    majorName: string;
    subBoardId: number;
    title: string;
    writeTime: string;
    year: number;
    boardCategory: string;
};
export type SubBoardPostsType = {
    data: SubBoardDTOType[];
    pageInfo: PageInfotype;
};

export type SubBoardDetailType = {
    subBoardDTO: SubBoardDTOType;
    subBoardImageUrls: { subBoardImageUrl: string }[];
};
