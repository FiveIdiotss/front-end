import { PageInfotype } from './pageInfoType';

export type ReplyType = {
    replyId: number;
    memberId: number;
    imageUrl: string;
    memberName: string;
    majorName: string;
    localDateTime: string;
    content: string;
};
export type ReplyResponseType = {
    data: ReplyType[];

    pageInfo: PageInfotype;
};
