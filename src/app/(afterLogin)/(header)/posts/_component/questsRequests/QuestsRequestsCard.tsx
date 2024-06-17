import LikeIcon from '@/app/(afterLogin)/_component/icon/LikeIcon';
import React from 'react';
import { OpenQuestionType } from '../../_lib/qeustsRequest';
import Image from 'next/image';
import Link from 'next/link';

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    // 오늘의 날짜와 입력된 날짜가 같은지 확인
    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        // 오늘이면 시간과 분만 표시
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
        // 오늘이 아니면 년, 월, 일을 표시
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
    }
}

function QuestsRequestsCard({ data, boardType }: { data: OpenQuestionType; boardType: 'request' | 'quest' }) {
    const isQuestion = data.replyCount === 0;
    const url = boardType === 'quest' ? `/posts/quest/${data.subBoardId}` : `/posts/request/${data.subBoardId}`;
    return (
        <Link
            href={url}
            className="flex w-full cursor-pointer flex-row items-center gap-4 border-b px-2 py-4 hover:bg-neutral-200 "
        >
            <div className="flex flex-grow flex-row items-center gap-4 ">
                <div className="flex items-center gap-1  font-medium">
                    {isQuestion && boardType === 'quest' && (
                        <span className="mr-1 text-xs text-green-600">{`[질문]`}</span>
                    )}
                    {!isQuestion && boardType === 'quest' && (
                        <span className="mr-1 text-xs text-blue-600">{`[답변완료]`}</span>
                    )}
                    <span className="mr-1 text-xs text-gray-400">[{data.boardCategory}]</span>
                    <span className="text-sm text-neutral-600">{data.title}</span>
                    <span className="text-xs text-neutral-400">{`(${data.replyCount})`}</span>
                </div>
            </div>

            <div className="flex flex-row items-center  gap-6">
                <div className="flex flex-row items-center gap-1 text-xs font-light  ">
                    <Image src={data.imageUrl} width={20} height={20} alt="프로필 이미지" className="rounded-full" />
                    <span className="text-neutral-700">{data.memberName}</span>
                </div>
                <div className="flex w-fit flex-row items-center gap-1">
                    <LikeIcon className="h-4 w-4 text-primary" isLike={false} />
                    <span className="text-xs text-primary">{data.likeCount}</span>
                </div>
                <span className="w-20  text-center text-xs text-neutral-700">{formatDate(data.writeTime)}</span>
            </div>
            {/* <span className="text-xs font-light text-neutral-700">333</span>
                            <span className="text-xs font-light text-neutral-700">11</span> */}
        </Link>
    );
}

export default QuestsRequestsCard;
