import Axios from '@/app/util/axiosInstance';

import { getSession } from 'next-auth/react';
export type MentoringReqData = {
    applyId: number;
    applyState: string;
    applyTime: string;
    boardId: number;
    boardTitle: string;
    content: string;
    date: string;
    otherMemberId: number;
    otherMemberName: string;
    startTime: string;
};

export type MentoringReq = {
    data: MentoringReqData[];
    pageInfo: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}; //멘토링 신청내역

export const mentoringReqFetch = async (pageParam: number, size?: number): Promise<MentoringReq> => {
    const session = await getSession();
    try {
        const params = {
            sendReceive: 'SEND', //SEND: 내가 보낸 요청, RECEIVE: 받은 요청
            page: pageParam, //현재 페이지
            size: size ? size : 3, //페이지당 표시할 아이템 수 고정
        };
        const response = await Axios.get(`/api/pageMyApply`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export type MentoringReqDetail = {
    appyId: number;
    boardId: number;
    boardTitle: string;
    content: string;
    applyState: string;
    date: string;
    startTime: string;
    memberId: number;
    memberName: string;
    memberImageUrl: string;
    schoolName: string;
    majorName: string;
}; //멘토링 신청내역 상세(영수증 비슷한거)
export const mentoringReqDetailFetch = async (applyId: number): Promise<MentoringReqDetail> => {
    try {
        const response = await Axios.get(`/api/apply/${applyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
