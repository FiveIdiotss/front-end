'use client';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import { useChatStore } from '@/app/_store/chatStore';
import { useRouter } from 'next/navigation';
import React from 'react';

function ChatRoomHeader() {
    const { boardTitle } = useChatStore();
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <div className=" flex flex-col  px-5   ">
            <div className="flex w-full flex-row items-center gap-6 border-b-2 border-neutral-400 py-4 ">
                <button onClick={handleBack}>
                    <ArrowLeftBackIcon className="h-8 w-8 " />
                </button>
                <div className="flex flex-grow flex-row items-center ">
                    <span className="ml-2  font-semibold text-neutral-700">{boardTitle}</span>
                </div>
                {/* <span className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white">매칭 대기</span> */}
                {/* <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">매칭 완료</span> */}
            </div>
            <div className="text-md py-5 text-center text-green-600">
                <span>* 채팅방에서의 폭력적인 언어는 제제될 수 있습니다.</span>
            </div>
        </div>
    );
}

export default ChatRoomHeader;
