'use client';
import { ChatRoomType } from '@/app/Models/chatType';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import MoreIcon from '@/app/_icons/common/MoreIcon';
import { useRouter } from 'next/navigation';
import React from 'react';
import StatusActions from './chatRoomStatus/StatusActions';
import ChatRoomHeaderStatus from './ChatRoomHeaderStatus';

function ChatRoomHeader({ chatRoomData }: { chatRoomData: ChatRoomType }) {
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const handleMoreToggle = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    return (
        <div className=" absolute   left-0 right-0 top-0 flex  w-full flex-col items-center justify-center bg-white px-4 shadow-sm-bottom   ">
            <div className="flex h-16 w-full flex-row items-center  gap-4   ">
                <button onClick={handleBack}>
                    <ArrowRightIcon className="h-7 w-7 rotate-180" />
                </button>
                <div className="flex flex-grow flex-row items-center ">
                    <span className="  text-base font-medium text-gray-700">{chatRoomData.boardTitle}</span>
                </div>
                {/* <span className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white">매칭 대기</span> */}
                {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}
                <button
                    onClick={handleMoreToggle}
                    className="h-fit w-fit rounded-full  p-1 hover:bg-gray-100 mobile:hidden "
                >
                    <MoreIcon className="h-6 w-6 text-neutral-700" />
                </button>
            </div>
            <div
                className={`z-10 flex w-full bg-white mobile:hidden ${isMoreOpen ? 'max-h-[999px] gap-4 border-t    py-4  opacity-100 ' : 'max-h-0 opacity-0'} flex-col px-2  transition-all`}
            >
                <ChatRoomHeaderStatus />
                <StatusActions pageType="top" />
            </div>
        </div>
    );
}

export default ChatRoomHeader;
