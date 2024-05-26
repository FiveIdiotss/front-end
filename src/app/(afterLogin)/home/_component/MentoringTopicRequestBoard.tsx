import Link from 'next/link';
import React from 'react';
import ArrowRightIcon from '../../_component/icon/ArrowRightIcon';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import LikeIcon from '../../_component/icon/LikeIcon';

function MentoringTopicRequestBoard() {
    return (
        <section className="flex w-full flex-col">
            <Link className="mb-3 flex w-fit flex-row items-center  " href="/posts/mentor">
                <span className="text-xl font-medium text-neutral-700">멘토링 주제 요청</span>
                <ArrowRightIcon className="ml-1 h-7 w-7 text-neutral-700" />
            </Link>
            <div className="flex w-full flex-col gap-3  border-neutral-400 py-2">
                {[1, 2, 3, 4, 5].map((index) => (
                    <>
                        <div key={index} className="flex w-full flex-row items-center gap-4 border-t  pt-1 ">
                            <div className="flex flex-grow flex-row items-center gap-4 ">
                                <Image
                                    src={faker.image.urlPicsumPhotos()}
                                    alt="멘토링 요청게시판 이미지"
                                    width={96}
                                    height={48}
                                    objectFit=""
                                    className="object-contatin h-12 w-24"
                                />
                                <div className="flex items-center gap-1  font-medium">
                                    <span className="text-sm">vue.js 멘토링 요청합니다.{index}</span>
                                    <span className="text-xs text-red-500">[333]</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-center  gap-4">
                                <div className="text-xs font-light ">
                                    <span className="text-neutral-700">정진혁</span>
                                    <span className=" text-neutral-500 "> · 10:50</span>
                                </div>
                                <div className="flex w-fit flex-row items-center gap-1">
                                    <LikeIcon className="h-4 w-4 text-primary" isLike={false} />
                                    <span className="text-xs text-primary">2</span>
                                </div>
                            </div>
                            {/* <span className="text-xs font-light text-neutral-700">333</span>
                            <span className="text-xs font-light text-neutral-700">11</span> */}
                        </div>
                    </>
                ))}
            </div>
        </section>
    );
}

export default MentoringTopicRequestBoard;
