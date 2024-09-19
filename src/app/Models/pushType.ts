import { PageInfotype } from './pageInfoType';

export type PushItemType = {
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
export type PushItemsResponseType = {
    data: PushItemType[];
    pageInfo: PageInfotype;
};
