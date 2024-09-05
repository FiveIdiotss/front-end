'use client';
import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatStore } from '@/app/_store/chatStore';
import React from 'react';

function StatusMoreDetails() {
    const { loginName, receiverName, isLoginMentor, consultTime, startTime, date } = useChatStore();

    const mentorName = isLoginMentor ? loginName : receiverName;
    const menteeName = isLoginMentor ? receiverName : loginName;

    const { formattedStartTime, formattedEndTime, formattedDate } = useFormattedTime();

    return (
        <div className="mt-2 flex w-full flex-col items-center gap-6 rounded-lg p-6 text-base text-neutral-600 ">
            <div className="flex  w-full flex-col gap-5 rounded-lg bg-neutral-100 p-4">
                <span>
                    <span className="font-bold">멘토: </span>
                    {mentorName} 님<span className="ml-3 text-sm text-green-500">{isLoginMentor ? '본인' : ''}</span>
                </span>

                <span>
                    <span className="font-bold">멘티: </span>
                    {menteeName} 님<span className="ml-3 text-sm text-green-500">{isLoginMentor ? '' : '본인'}</span>
                </span>
            </div>

            <div className="flex  w-full flex-col  gap-2 rounded-lg bg-blue-50 p-4">
                <span className="mb-3 font-bold ">{formattedDate}</span>
                <span className="font-bold text-blue-700">시작시간: {formattedStartTime}</span>

                <span className="font-bold text-red-700">종료시간: {formattedEndTime}</span>
            </div>
            {/* <span>{`남은시간:${hours}:${minutes}:${seconds}`}</span> */}
        </div>
    );
}

export default StatusMoreDetails;
