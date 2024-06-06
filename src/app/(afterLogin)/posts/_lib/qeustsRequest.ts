import Axios from '@/app/util/axiosInstance';
import { PageInfotype } from '../../Models/pageInfoType';

export type OpenQuestionType = {
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
type OpenQuestionResponseType = {
    data: OpenQuestionType[];
    pageInfo: PageInfotype;
};

type ParamsType = {
    page: number;
    size: number;
    boardCategory?: string;
    keyWord?: string;
    schoolFilter: boolean;
    subBoardType: string;
    favoriteFilter: boolean;
};

export const getQuests = async ({
    pageParam,
    size,
    categoryParam,
    searchParam,
    isSchool,
    subBoardType,
    isStar,
}: {
    pageParam: number;
    size: number;
    categoryParam?: string;
    searchParam?: string;
    isSchool?: boolean;
    subBoardType: 'QUEST' | 'REQUEST';
    isStar?: boolean;
    //메인 게시판에서 사용하는 경우 pageParam,size,subBoardType은 필수
}) => {
    const params: ParamsType = {
        page: pageParam,
        size: size,
        boardCategory: categoryParam,
        keyWord: searchParam,
        schoolFilter: isSchool ? isSchool : false, //학교 필터가 없으면 false
        subBoardType: subBoardType,
        favoriteFilter: isStar || false, //카테고리 필터가 없으면 false(카테고리에 북마크가 포함 되어있기 때문)
    };
    if (categoryParam === '') delete params.boardCategory; //카테고리가 없을때
    if (searchParam === '') delete params.keyWord; //검색어가 없을때
    if (!categoryParam && !searchParam) {
        delete params.boardCategory;
        delete params.keyWord;
    }
    console.log('params', params);

    const response = await Axios.get(`/api/subBoards`, { params: params });
    return response.data.data as Promise<OpenQuestionResponseType>;
};

export type OpenQuestionDetailType = {
    subBoardDTO: OpenQuestionType;
    subBoardImageUrls: { subBoardImageUrl: string }[];
};

export const getQuestDetail = async (subBoardId: number) => {
    const response = await Axios.get(`/api/subBoard/${subBoardId}`);
    return response.data.data as Promise<OpenQuestionDetailType>;
};
