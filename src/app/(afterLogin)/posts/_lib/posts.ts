import Axios from '@/app/util/axiosInstance';
import { MentoContentType, MentoPostsType } from '../../Models/mentoPostsType';

// export type MentoContent = {
//     boardId: number;
//     content: string;
//     introduce: string;
//     majorName: string;
//     memberId: number;
//     memberName: string;
//     schoolName: string;
//     target: string;
//     title: string;
//     year: number;
//     writeTime: string;
//     boardCategory: string;
// };
// export type MentoPosts = {
//     data: MentoContent[];
//     pageInfo: {
//         page: number;
//         size: number;
//         totalElements: number;
//         totalPages: number;
//     };
// };
export type MentoDetail = {
    availableDays: string[];
    boardDTO: MentoContentType; //수정함
    consultTime: number;
    times: { startTime: string; endTime: string }[];
    unavailableTimes: { data: string; startTime: string }[];
};
type Params = {
    page: number;
    size: number;
    boardCategory?: string;
    keyWord?: string;
    schoolFilter: boolean;
    favoriteFilter?: boolean;
};
export const fetchMentorPosts = async (
    pageParam: number,
    size?: number,
    category?: string,
    searchParam?: string,
    schoolFilter?: boolean,
) => {
    const params: Params = {
        page: pageParam,
        size: size ? size : 24, //페이지당 표시할 아이템 수 고정
        boardCategory: category, //북마크인지 아닌지 확인
        keyWord: searchParam,
        schoolFilter: schoolFilter ? schoolFilter : false, //학교 필터
        favoriteFilter: category === '북마크',
    };
    if (category === '북마크' || category === '') delete params.boardCategory; //북마크인지 아닌지 확인
    if (searchParam === '') delete params.keyWord; //검색어가 없을때
    if (!category && !searchParam) {
        delete params.boardCategory;
        delete params.keyWord;
        delete params.favoriteFilter;
    } // 메인 게시판에서 사용하는 함수일때
    console.log('params', params);

    try {
        const res = await Axios.get('/api/boards/filter', { params: params });
        return res.data as Promise<MentoPostsType>; //나중에 타입 수정해야함
    } catch (error) {
        throw new Error('멘토작성글 데이터를 불러오는데 실패했습니다.');
    }
};
export const fetchMentoDetail = async (id: number) => {
    try {
        console.log(`멘토 상세데이터`, id);
        const res = await Axios.get(`/api/board/${id}`);
        return res.data as Promise<MentoDetail>;
    } catch {
        throw new Error('멘토링 데이터를 불러오는데 실패했습니다. 서버에서');
    }
};
