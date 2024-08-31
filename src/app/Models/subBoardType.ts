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
    representImage: string;
    platform: 'WEB' | 'APP';
};
export type SubBoardResponseType = {
    data: SubBoardDTOType[];
    pageInfo: PageInfotype;
};

export type SubBoardDetailType = {
    subBoardDTO: SubBoardDTOType;
    subBoardImageUrls: { subBoardImageUrl: string }[];
};

export type newSubBoardFormType = {
    request: {
        title: string;
        content: string;
        boardCategory: string;
        subBoardType: 'QUEST' | 'REQUEST';
        platform: 'WEB' | 'APP';
    };

    images: File[] | [];
};
