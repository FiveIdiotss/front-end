'use client';
import { ChatRoomType } from '@/app/Models/chatType';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import MoreIcon from '@/app/_icons/common/MoreIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

function ChatRoomHeader({ chatRoomData }: { chatRoomData: ChatRoomType }) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <div className=" flex w-full  flex-row items-center px-4 shadow-sm-bottom   ">
            <div className="flex w-full flex-row items-center  gap-4 py-4  ">
                <button onClick={handleBack}>
                    <ArrowRightIcon className="h-7 w-7 rotate-180" />
                </button>
                <div className="flex flex-grow flex-row items-center ">
                    <span className="  font-semibold text-neutral-700">{chatRoomData.boardTitle}</span>
                </div>
                {/* <span className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white">매칭 대기</span> */}
                {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}
            </div>

            <button className="h-fit w-fit  rounded-full p-1 hover:bg-gray-100 ">
                <MoreIcon className="h-6 w-6 text-neutral-700" />
            </button>
        </div>
    );
}

export default ChatRoomHeader;
