import ArrowRightIcon from '@/app/(afterLogin)/_component/icon/ArrowRightIcon';
import MatchCancelIcon from '@/app/(afterLogin)/_component/icon/Chat/MatchCancelIcon';
import MatchCheckIcon from '@/app/(afterLogin)/_component/icon/Chat/MatchCheckIcon';
import Check2Icon from '@/app/(afterLogin)/_component/icon/Check2Icon';
import CheckIcon from '@/app/(afterLogin)/_component/icon/CheckIcon';
import CloseIcon from '@/app/(afterLogin)/_component/icon/CloseIcon';
import React from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';

function ChatRoomStatus() {
    return (
        <div className="flex w-1/4 min-w-[260px] flex-col border-l border-neutral-300   px-3">
            <div className="bg-yellow flex  flex-col border-b border-neutral-300 px-4 py-4">
                <span className="font-semibold">멘토 정보</span>
                <StatusReceiverInfo />
            </div>
            <div className="flex flex-row   border-b py-8 ">
                <button className=" mx-auto flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-neutral-300 bg-red-50 ">
                    <CloseIcon className="h-6 w-6 text-red-400" />
                    <span className="text-sm text-red-400">매칭취소</span>
                </button>
                <button className="mx-auto flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-neutral-300 bg-blue-50 ">
                    <Check2Icon className="h-6 w-6 text-blue-500" />
                    <span className="text-sm text-blue-500">매칭하기</span>
                </button>
            </div>
            <div className="flex  w-full flex-col items-center justify-center gap-1 px-4 py-10">
                <span className="flex h-10 w-full items-center justify-center rounded-md border border-neutral-300 font-medium text-neutral-600">
                    매칭대기
                </span>
                <ArrowRightIcon className="h-5 w-5 rotate-90 text-neutral-500" />
                <span className="flex h-10 w-full items-center justify-center  rounded-md border border-neutral-300 bg-blue-500 font-medium text-white">
                    매칭진행
                </span>
                <div className="flex flex-row gap-24">
                    <ArrowRightIcon className="h-5 w-5 rotate-90 text-neutral-500 " />
                    <ArrowRightIcon className="h-5 w-5 rotate-90 text-neutral-500" />
                </div>
                <div className="flex w-full flex-row justify-center gap-4">
                    <span className="flex h-10 flex-1 items-center justify-center rounded-md border border-neutral-300 font-medium text-neutral-600">
                        매칭취소
                    </span>
                    <span className="flex h-10 flex-1 items-center justify-center rounded-md border border-neutral-300 font-medium text-neutral-600">
                        매칭성사
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChatRoomStatus;
