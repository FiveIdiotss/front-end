import LikeIcon from '@/app/_icons/common/LikeIcon';
import React from 'react';
import { SubBoardDTOType } from '@/app/Models/subBoardType';
import Image from 'next/image';
import Link from 'next/link';
import MobileIcon from '@/app/_icons/common/MobileIcon';
import ImageIcon from '@/app/_icons/common/ImageIcon';

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

function SubBoardCard({ data, boardType }: { data: SubBoardDTOType; boardType: 'REQUEST' | 'QUEST' }) {
    const isQuestion = data.replyCount === 0;
    const url = boardType === 'QUEST' ? `/posts/quest/${data.subBoardId}` : `/posts/request/${data.subBoardId}`;
    return (
        <Link
            href={url}
            className="flex w-full cursor-pointer flex-col items-center gap-3 border-b px-2 py-2 hover:bg-gray-100 mobile:flex-row  mobile:gap-4 mobile:py-4 "
        >
            <div className="mr-auto  flex flex-grow flex-row items-center gap-3  mobile:mr-0 ">
                <div className="flex  items-center gap-1  font-medium">
                    {data.platform === 'APP' && <MobileIcon className="h-4  w-4 shrink-0 text-gray-400" />}
                    {isQuestion && boardType === 'QUEST' && (
                        <span className="mr-1 shrink-0  text-xs text-green-600">{`[질문]`}</span>
                    )}
                    {!isQuestion && boardType === 'QUEST' && (
                        <span className="mr-1 shrink-0 text-xs text-blue-600">{`[답변완료]`}</span>
                    )}
                    <span className="mr-1 shrink-0  text-xs text-gray-400">[{data.boardCategory}]</span>
                    <span className="line-clamp-1 flex-grow  text-sm text-neutral-600">{data.title}</span>
                    <span className="shrink-0 text-xs text-neutral-400">{`(${data.replyCount})`}</span>
                    {(data.representImage !== '' || data.representImage) && (
                        <ImageIcon className="h-4 w-4 shrink-0 text-neutral-400 " />
                    )}
                </div>
            </div>

            <div className="ml-auto flex shrink-0 flex-row items-center gap-3  mobile:ml-0 mobile:gap-6">
                <div className="flex flex-row items-center gap-1 text-xs font-light  ">
                    <div className="relative h-5 w-5 ">
                        <Image
                            src={data.imageUrl}
                            sizes="20px"
                            fill={true}
                            className="rounded-full object-cover"
                            alt="프로필 이미지"
                        />
                    </div>
                    <span className="text-neutral-700">{data.memberName}</span>
                </div>
                <div className="flex w-fit flex-row items-center gap-1">
                    <LikeIcon className="h-4 w-4 text-primary" isLike={false} />
                    <span className="text-xs text-primary">{data.likeCount}</span>
                </div>
                <span className="w-16  text-center text-xs text-neutral-700">{formatDate(data.writeTime)}</span>
            </div>
            {/* <span className="text-xs font-light text-neutral-700">333</span>
                            <span className="text-xs font-light text-neutral-700">11</span> */}
        </Link>
    );
}

export default SubBoardCard;
