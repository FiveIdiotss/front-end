import Axios from '@/app/util/axiosInstance';
import { PageInfotype } from '../Models/pageInfoType';

export const getPushCount = async (): Promise<number> => {
    const response = await Axios.get('/api/count');
    return response.data.data;
};

export type PushListType = {
    notificationId: number;
    senderId: number;
    senderName: string;
    senderImageUrl: string;
    otherPK: number;
    title: string;
    content: string;
    notificationType: 'CHAT' | 'REPLY_QUEST' | 'REPLY_REQUEST' | 'APPLY' | 'MATCHING_COMPLETE' | 'MATCHING_DECLINE';
    arriveTime: string;
};
export type PushListResponseType = {
    data: PushListType[];
    pageInfo: PageInfotype;
};

export const getPushList = async ({
    pageParam,
    size,
}: {
    pageParam: number;
    size: number;
}): Promise<PushListResponseType> => {
    const params = {
        page: pageParam,
        size: size,
    };
    const response = await Axios.get('/api/push', { params });
    return response.data.data;
};
