import Axios from '@/app/util/axiosInstance';

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

export const mentoringReqReceiveFetch = async (pageParam: number, size?: number): Promise<MentoringReq> => {
    try {
        const params = {
            sendReceive: 'RECEIVE', //SEND: 내가 보낸 요청, RECEIVE: 받은 요청
            page: pageParam, //현재 페이지
            size: size ? size : 3, //페이지당 표시할 아이템 수 고정
        };
        const response = await Axios.get(`/api/pageMyApply`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const mentoringReqReceiveAccept = async (applyId: number): Promise<void> => {
    //수락
    try {
        await Axios.post(`/api/apply/${applyId}`);
    } catch (error) {
        throw error;
    }
};
export const mentoringReqReceiveReject = async (applyId: number): Promise<void> => {
    //거절
    try {
        await Axios.delete(`/api/reject/${applyId}`);
    } catch (error) {
        throw error;
    }
};
