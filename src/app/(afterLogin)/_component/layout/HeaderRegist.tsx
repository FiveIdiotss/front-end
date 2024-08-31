'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import arrowIcon from '@/../public/arrow-right-double.svg';
import Image from 'next/image';
import PlusIcon from '../../../_icons/common/PlusIcon';
import EditIcon from '../../../_icons/Menu/EditIcon';
import FocusIcon from '@/app/_icons/Menu/FocusIcon';
import MegaPhoneIcon from '@/app/_icons/Menu/MegaPhoneIcon';
import ShackHandsIcon from '@/app/_icons/Menu/ShackHandsIcon';
import ArrowDropIcon from '@/app/_icons/common/ArrowDropIcon';

function HeaderRegist() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div onMouseLeave={() => setIsHovered(false)} className=" hidden h-full items-center mobile:flex">
            <div className="relative">
                <button
                    className={` hidden h-10 shrink-0  cursor-pointer items-center justify-center gap-2 rounded-lg border      px-4 shadow-sm transition-transform duration-200  mobile:flex  `}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <span className="   text-sm font-medium text-neutral-700   ">게시글 등록</span>
                    <ArrowDropIcon className="h-5 w-5 text-primary" isOpen={false} />
                </button>
                <button className="ml-4 flex  h-full shrink-0 flex-row items-center gap-1 rounded-md border border-neutral-300   px-6   py-2  shadow-md mobile:hidden">
                    <EditIcon className="h-5 w-5 text-primary" />
                </button>
                <div
                    className={`absolute     flex w-72 cursor-pointer flex-col   pt-2 ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${isHovered ? ' max-h-[999px]   opacity-100' : 'max-h-0  overflow-hidden opacity-0'}  `}
                >
                    <div className="flex  w-full flex-col items-center justify-between rounded-xl border bg-white px-1    py-3 shadow-lg  ">
                        <Link
                            href="/post/new/mentor"
                            className="flex h-14 w-full transform flex-row items-center gap-2  px-3 transition   duration-300 ease-in-out hover:scale-95  hover:opacity-100 "
                        >
                            <div className="rounded-md border p-1 shadow-sm">
                                <ShackHandsIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex flex-col ">
                                <span className=" text-sm font-semibold ">멘토링 모집</span>
                                <span className="text-sm text-gray-500">가지고 있는 지식 공유하기</span>
                            </div>
                        </Link>
                        <Link
                            href="/post/new/request"
                            className="flex h-14 w-full transform   flex-row items-center 
                                gap-2  px-3 transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
                        >
                            <div className="rounded-md border p-1 shadow-sm">
                                <FocusIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">멘토링 주제 요청</span>
                                <span className="text-sm text-gray-500">멘토글에 관련 멘토링이 없어요</span>
                            </div>
                        </Link>
                        <Link
                            href="/post/new/quest"
                            className="flex h-14 w-full transform flex-row items-center gap-2   px-3 transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
                        >
                            <div className="rounded-md border p-1 shadow-sm">
                                <MegaPhoneIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">질문 하기</span>
                                <span className="text-sm text-gray-500">여러 주제로 대화를 나눠요</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderRegist;
