'use client';
import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatStore } from '@/app/_store/chatRoomContentStore';
import React from 'react';

function StatusMoreDetails() {
    const { loginName, receiverName, isLoginMentor, consultTime, startTime, date } = useChatStore();

    const mentorName = isLoginMentor ? loginName : receiverName;
    const menteeName = isLoginMentor ? receiverName : loginName;

    const { formattedStartTime, formattedEndTime, formattedDate } = useFormattedTime();

    return (
        <>
            <div className="flex  w-full flex-col gap-5  bg-white p-4">
                <span>
                    <span className="font-bold">멘토: </span>
                    {mentorName} 님<span className="ml-3 text-sm text-green-500">{isLoginMentor ? '본인' : ''}</span>
                </span>

                <span>
                    <span className="font-bold">멘티: </span>
                    {menteeName} 님<span className="ml-3 text-sm text-green-500">{isLoginMentor ? '' : '본인'}</span>
                </span>
            </div>

            <div className="flex  w-full flex-col  gap-2  bg-white p-4">
                <span className="mb-3 font-medium ">{formattedDate}</span>
                <span className=" text-blue-600">시작시간: {formattedStartTime}</span>

                <span className=" text-red-600">종료시간: {formattedEndTime}</span>
            </div>
            {/* <span>{`남은시간:${hours}:${minutes}:${seconds}`}</span> */}
        </>
    );
}

export default StatusMoreDetails;
