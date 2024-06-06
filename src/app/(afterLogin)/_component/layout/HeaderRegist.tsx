'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import arrowIcon from '@/../public/arrow-right-double.svg';
import Image from 'next/image';
import PlusIcon from '../icon/PlusIcon';

function HeaderRegist() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div onMouseLeave={() => setIsHovered(false)} className="flex h-full items-center">
            <div className="relative">
                <button
                    className={`flex h-10  w-36 shrink-0  cursor-pointer items-center justify-center gap-2     rounded-sm border border-neutral-300 px-4  transition-transform duration-200`}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <span className="  text-sm font-normal text-neutral-700  ">게시글 등록</span>
                    <PlusIcon className="h-6 w-6" />
                </button>
                <div
                    className={`absolute     flex w-32 cursor-pointer flex-col   pt-2 ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${isHovered ? ' max-h-44   opacity-100' : 'max-h-0  overflow-hidden opacity-0'}  `}
                >
                    <div className="flex h-full w-full flex-col items-center  justify-between rounded-t-xl    px-1 pb-1  ">
                        <div className="flex w-full flex-col">
                            <Link
                                href="/post/new/mentor"
                                className="flex h-14 w-full transform flex-row items-center justify-between border border-neutral-200 bg-white px-3 transition   duration-300 ease-in-out hover:scale-95  hover:opacity-100 "
                            >
                                <span className="text-sm font-light ">멘토링 모집</span>
                                <Image alt="arrow right" src={arrowIcon} />
                            </Link>
                            <Link
                                href="/post/new/request"
                                className="flex h-14 w-full transform   flex-row items-center justify-between border border-neutral-200 bg-white px-3 transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
                            >
                                <span className="text-sm font-light">멘토링 요청</span>
                                <Image alt="arrow right" src={arrowIcon} />
                            </Link>
                            <Link
                                href="/post/new/quest"
                                className="flex h-14 w-full transform flex-row items-center justify-between  border border-neutral-200 bg-white px-3 transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
                            >
                                <span className="text-sm font-light">질문하기</span>
                                <Image alt="arrow right" src={arrowIcon} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderRegist;
