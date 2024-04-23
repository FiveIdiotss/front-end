'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import arrowIcon from '@/../public/arrow-right-double.svg';
import Image from 'next/image';

function HeaderRegist() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div onMouseLeave={() => setIsHovered(false)} className="flex h-full items-center">
            <div className="relative">
                <button
                    className={`flex h-12  w-32 shrink-0  cursor-pointer items-center justify-center rounded-xl  bg-gradient-to-r from-primary via-primary to-blue-400 px-4 transition-transform duration-200 `}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <span className=" text-sm  font-normal text-white">게시글 등록하기</span>
                </button>
                <div
                    className={`absolute  -top-2   flex w-32 cursor-pointer flex-col   pt-2 ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${isHovered ? ' max-h-44   opacity-100' : 'max-h-0  overflow-hidden opacity-0'}  `}
                >
                    <div className="flex h-full w-full flex-col items-center  justify-between rounded-t-xl   bg-gradient-to-r from-primary via-primary to-blue-400  px-1 pb-1  ">
                        <span className=" flex h-12 flex-shrink-0 items-center justify-center text-sm font-medium text-white">
                            게시글 등록하기
                        </span>
                        <div className="flex w-full flex-col">
                            <Link
                                href="/post/new/mentor"
                                className="flex h-14 w-full transform flex-row items-center justify-center border border-neutral-200 bg-white transition   duration-300 ease-in-out hover:scale-95  hover:opacity-100 "
                            >
                                <span className="text-sm font-light ">멘토 구하기</span>
                                <Image alt="arrow right" src={arrowIcon} />
                            </Link>
                            <Link
                                href="/post/new/mentee"
                                className="flex h-14   w-full transform flex-row items-center justify-center border border-neutral-200 bg-white transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
                            >
                                <span className="text-sm font-light">멘티 구하기</span>
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
