import Axios from '@/app/util/axiosInstance';
import { MentoContentType, MentoPostsType } from '@/app/(afterLogin)/Models/mentoPostsType';

export type MentoDetail = {
    availableDays: string[];
    boardDTO: MentoContentType; //수정함
    consultTime: number;
    times: { startTime: string; endTime: string }[];
    unavailableTimes: { data: string; startTime: string }[];
};

type ParamsType = {
    page: number;
    size: number;
    boardCategory?: string;
    keyWord?: string;
    schoolFilter: boolean;
    favoriteFilter: boolean;
};

export const fetchMentorPosts = async ({
    pageParam,
    size,
    categoryParam,
    searchParam,
    isSchool,
    isStar,
}: {
    pageParam: number;
    size: number;
    categoryParam?: string;
    searchParam?: string;
    isSchool?: boolean;
    isStar?: boolean;
    //메인 게시판에서 사용하는 경우 pageParam,size,subBoardType은 필수
}) => {
    const params: ParamsType = {
        page: pageParam,
        size: size,
        boardCategory: categoryParam,
        keyWord: searchParam,
        schoolFilter: isSchool ? isSchool : false, //학교 필터가 없으면 false
        favoriteFilter: isStar || false, //카테고리 필터가 없으면 false(카테고리에 북마크가 포함 되어있기 때문)
    };
    if (categoryParam === '') delete params.boardCategory; //카테고리가 없을때
    if (searchParam === '') delete params.keyWord; //검색어가 없을때
    if (!categoryParam && !searchParam) {
        delete params.boardCategory;
        delete params.keyWord;
    }

    try {
        const res = await Axios.get('/api/boards/filter', { params: params });
        return res.data.data as Promise<MentoPostsType>; //나중에 타입 수정해야함
    } catch (error) {
        throw new Error('멘토작성글 데이터를 불러오는데 실패했습니다.');
    }
};
export const fetchMentoDetail = async (id: number) => {
    try {
        console.log(`멘토 상세데이터`, id);
        const res = await Axios.get(`/api/board/${id}`);
        return res.data.data as Promise<MentoDetail>;
    } catch {
        throw new Error('멘토링 데이터를 불러오는데 실패했습니다. 서버에서');
    }
};
