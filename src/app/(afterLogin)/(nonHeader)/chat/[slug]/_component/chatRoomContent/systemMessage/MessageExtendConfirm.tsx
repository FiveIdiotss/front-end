import { useFormattedTime } from '@/app/(afterLogin)/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import React from 'react';

function MessageExtendConfirm() {
    const { receiverName, isLoginMentor, loginName } = useChatStore();
    const { formattedExtendedTime, formattedEndTime } = useFormattedTime(); // 상담 연장 시간 계산
    const extendedTime = formattedExtendedTime(30); // 상담 연장 시간

    if (!isLoginMentor) {
        return (
            <div className="flex w-full flex-col items-center gap-3 pb-2 ">
                <span className="text-neutral-700">
                    {' '}
                    <span className="font-semibold text-red-600">[대기중] </span>멘토에게 상담 연장을 요청하였습니다.
                </span>
                <span className="font-semibold text-blue-600">{`${formattedEndTime} → ${extendedTime}`}</span>
            </div>
        );
    }
    return (
        <div className="flex  w-full flex-col items-center justify-center gap-3    ">
            <span className="  text-neutral-700">
                <span className="  font-semibold text-red-500">{receiverName}</span> 님이 상담 연장을 요청하였습니다.
            </span>
            <div className="flex flex-col items-center">
                <span className="font-semibold text-blue-600">종료시간:</span>
                <span className="font-semibold text-blue-600">{`${formattedEndTime} → ${extendedTime}`}</span>
            </div>
            <span className="mt-5 text-xs text-red-400">*즉시 처리됩니다.</span>

            <div className=" flex w-full flex-col justify-center gap-2   ">
                <button className="h-10  w-full rounded-md bg-green-600 text-white hover:bg-green-500">
                    요청 수락
                </button>
                <button className=" h-10 w-full  rounded-md bg-red-400 text-white hover:bg-red-300">거절</button>
            </div>
        </div>
    );
}

export default MessageExtendConfirm;
