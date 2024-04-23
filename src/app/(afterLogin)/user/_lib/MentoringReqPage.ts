import Axios from '@/app/util/axiosInstance';

import { getSession } from 'next-auth/react';
export type MentoringReq = {
    appyId: number;
    applyState: string;
    boardId: number;
    boardTitle: string;
    content: string;
    date: string;
    otherMemberId: number;
    otherMemberName: string;
    startTime: string;
};

export const mentoringReqFetch = async (): Promise<MentoringReq[]> => {
    const session = await getSession();
    try {
        const params = {
            sendReceive: 'SEND',
        };
        const response = await Axios.get(`/api/myApply/${session?.user?.memberDTO.id}`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};
