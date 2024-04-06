import Axios from '@/app/util/axiosInstance';

export type MentoContent = {
    boardId: number;
    boardType: string;
    content: string;
    introduce: string;
    majorName: string;
    memberId: number;
    memberName: string;
    schoolName: string;
    target: string;
    title: string;
    year: number;
};
export type MentoPosts = {
    data: MentoContent[];
    pageInfo: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
};
export const fetchMentorPosts = async (pageParam: number) => {
    const param = {
        boardType: 'MENTOR',
        page: pageParam,
        size: 24, //페이지당 표시할 아이템 수 고정
    };
    try {
        const res = await Axios.get('/api/pageBoards', { params: param });
        return res.data as Promise<MentoPosts>; //나중에 타입 수정해야함
    } catch (error) {
        throw new Error('멘토작성글 데이터를 불러오는데 실패했습니다.');
    }
};
