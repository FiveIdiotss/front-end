import React from 'react';
import HotIcon from '../../../_component/icon/HotIcon';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
const HOT_TAGS = ['컴퓨터', 'Next.js', '애견', '호텔', '생물', '개발자', '면접', '취업', '편입'];
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

function RightSideBar() {
    return (
        <div className=" w-48 flex-shrink-0">
            <div className="sticky top-[200px] flex flex-col gap-2   ">
                <div className="flex flex-col gap-4 rounded-md border border-neutral-300 p-3">
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">인기 태그</span>
                        <HotIcon className="h-4 w-4 text-red-500" />
                    </div>

                    <div className="flex flex-row flex-wrap">
                        {HOT_TAGS.map((tag) => (
                            <span
                                key={tag}
                                className=" m-1 cursor-pointer rounded-md bg-primary bg-opacity-15 px-2 py-1 text-sm text-neutral-700 hover:bg-opacity-10"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-md border border-neutral-300 py-3">
                    <div className="flex items-center gap-1 px-3">
                        <span className="text-sm font-semibold">실시간 인기글</span>
                        <HotIcon className="h-4 w-4 text-red-500" />
                    </div>

                    <div className="flex flex-col ">
                        {HOT_POSTS.map((post, index) => (
                            <div
                                className="flex cursor-pointer flex-col gap-2 px-4 py-3 hover:bg-primary hover:bg-opacity-15"
                                key={index}
                            >
                                <span className=" rounded-md   text-sm font-extralight text-neutral-700">
                                    {post.title}
                                </span>
                                <div className=" flex flex-row justify-between">
                                    <div className="flex flex-row gap-1">
                                        <Image
                                            src={faker.image.avatar()}
                                            alt="user"
                                            width={16}
                                            height={16}
                                            className="rounded-full"
                                        />
                                        <span className="text-xs font-semibold text-neutral-800">{post.user}</span>
                                    </div>
                                    <span className="text-xs font-light text-green-500">{post.boardType}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightSideBar;
