'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import arrowIcon from '@/../public/arrow-right-double.svg';
import Image from 'next/image';

function HeaderRegist() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div onMouseLeave={() => setIsHovered(false)} className="flex h-full items-center">
            <button
                className=" flex h-12  shrink-0 items-center  rounded-xl bg-gradient-to-r from-primary via-primary to-blue-400 px-4 transition-transform duration-200 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
            >
                <span className=" text-sm font-light text-white">게시글 등록하기</span>
            </button>

            {isHovered && (
                <div className="absolute right-[226px] top-[72px]  flex h-40 w-36  flex-col pt-2  ">
                    <div className="flex h-full w-full flex-col  items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-primary via-primary to-blue-400 p-2 ">
                        <Link
                            href="post/new/mentor"
                            className="flex h-14 w-full flex-row items-center justify-center rounded-lg border border-neutral-200 bg-white opacity-80 drop-shadow-lg hover:opacity-100 "
                        >
                            <span className="text-base ">멘토 구하기</span>
                            <Image alt="arrow right" src={arrowIcon} />
                        </Link>
                        <Link
                            href="post/new/mentee"
                            className="flex h-14 w-full flex-row items-center justify-center rounded-lg border  border-neutral-200 bg-white opacity-80  shadow-lg  hover:opacity-100"
                        >
                            멘티 구하기
                            <Image alt="arrow right" src={arrowIcon} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeaderRegist;
