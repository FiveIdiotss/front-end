import HotIcon from '@/app/_icons/common/HotIcon';
import Image from 'next/image';
import React from 'react';
import { faker } from '@faker-js/faker';
import { SubBoardDTOType } from '@/app/Models/subBoardType';

const HOT_POSTS = [
    {
        title: '컴퓨터공학과 1학년 질문드립니다.',
        user: '김컴공',
        boardType: '질문',
    },
    {
        title: 'Next.js 사용법에 대해 알고 싶어요.',
        user: '김Next',
        boardType: '질문',
    },
    {
        title: '알고리즘 멘토링 모집',
        user: '김알고',
        boardType: '멘토링',
    },
    {
        title: '족구 배우고싶습니다.',
        user: '김족구',
        boardType: '멘토링 요청',
    },
];
interface Props {
    data?: SubBoardDTOType[];
    type: 'QUEST' | 'REQUEST';
    isPending: boolean;
}
function HotSubBoards({ data, type, isPending }: Props) {
    return (
        <div className=" flex  w-full flex-col gap-2  ">
            <div className="flex items-center gap-1 px-3">
                <span className="flex flex-grow">
                    <span className="flex-grow"></span>
                    <span className="text-xs  text-orange-800">
                        {type === 'QUEST' ? '<질문 게시판>' : '<멘토링 요청 게시판>'}
                    </span>
                </span>
            </div>

            <div className="flex flex-col ">
                {data?.length === 0 && (
                    <div className="flex flex-col gap-2 px-4 py-2">
                        <span className="text-sm font-extralight text-neutral-700">게시글이 없습니다.</span>
                    </div>
                )}
                {isPending &&
                    [...Array(5)].map((_, index) => (
                        <div key={index} className="h-12 px-2 py-1">
                            <div className="bg-gradient-1 h-full w-full rounded-md"></div>
                        </div>
                    ))}
                {data?.map((post, index) => (
                    <div
                        className="flex cursor-pointer flex-col gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-15"
                        key={index}
                    >
                        <span className=" rounded-md   text-sm font-light text-neutral-700">
                            {`[${post.boardCategory}] `}
                            {post.title}
                        </span>
                        <div className=" flex flex-row justify-between">
                            <div className="flex flex-row gap-1">
                                <Image src={post.imageUrl} alt="user" width={16} height={16} className="rounded-full" />
                                <span className="text-xs font-semibold text-neutral-800">{post.memberName}</span>
                            </div>
                            <span className="text-xs font-light text-green-600">
                                {post.schoolName}ㅣ{post.majorName}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotSubBoards;
