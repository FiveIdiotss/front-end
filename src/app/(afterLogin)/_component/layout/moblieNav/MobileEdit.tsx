import FocusIcon from '@/app/_icons/Menu/FocusIcon';
import MegaPhoneIcon from '@/app/_icons/Menu/MegaPhoneIcon';
import ShackHandsIcon from '@/app/_icons/Menu/ShackHandsIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import Link from 'next/link';
import React from 'react';

function MobileEdit() {
    return (
        <div className="flex  w-full flex-col items-center justify-between   px-1    py-3 shadow-lg  ">
            <Link
                href="/post/new/mentor"
                className="flex h-14 w-full transform flex-row items-center gap-2  px-3 transition   duration-300 ease-in-out hover:scale-95  hover:opacity-100 "
            >
                <div className="rounded-md border p-1 shadow-sm">
                    <ShackHandsIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col ">
                    <span className=" text-sm font-semibold ">멘토링 모집</span>
                    <span className="text-sm text-gray-500">지식을 나누고 멘티를 돕기</span>
                </div>
                <ArrowRightIcon className="ml-auto h-6 w-6 text-primary" />
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
                    <span className="text-sm text-gray-500">필요한 멘토링 주제를 요청하세요</span>
                </div>
                <ArrowRightIcon className="ml-auto h-6 w-6 text-primary" />
            </Link>
            <Link
                href="/post/new/quest"
                className="flex h-14 w-full transform flex-row items-center gap-2   px-3 transition duration-300  ease-in-out hover:scale-95    hover:opacity-100"
            >
                <div className="rounded-md border p-1 shadow-sm">
                    <MegaPhoneIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">질문하기</span>
                    <span className="text-sm text-gray-500">궁금한 점을 자유롭게 질문하세요</span>
                </div>
                <ArrowRightIcon className="ml-auto h-6 w-6 text-primary" />
            </Link>
        </div>
    );
}

export default MobileEdit;
