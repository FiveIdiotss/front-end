'use client';
import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import React from 'react';

function StatusMoreDetails() {
    const { loginName, receiverName, isLoginMentor, consultTime, startTime, date } = useChatInfoStore();

    const mentorName = isLoginMentor ? loginName : receiverName;
    const menteeName = isLoginMentor ? receiverName : loginName;

    const { formattedStartTime, formattedEndTime, formattedStartDate, formattedEndDate } = useFormattedTime();

    return (
        <>
            <div className="flex  w-full flex-col gap-5 border-y bg-white p-4  text-sm text-gray-500">
                <span className="flex flex-row gap-1">
                    멘토: <span className="font-medium text-gray-700">{mentorName}</span>
                    <span className="text-green-600">{isLoginMentor ? '본인' : ''}</span>
                </span>
                <span className="flex  flex-row gap-1">
                    멘티: <span className="font-medium text-gray-700">{menteeName}</span>
                    <span className="text-green-600">{isLoginMentor ? '' : '본인'}</span>
                </span>
            </div>

            <div className="flex  w-full flex-col  gap-2  border-y bg-white p-4 text-sm text-gray-500">
                <span>
                    상담시작:&nbsp;&nbsp;
                    <span className="font-medium text-gray-700">
                        {formattedStartDate} {formattedStartTime.replace('오전', '').replace('오후', '')}
                    </span>
                </span>
                <span>
                    상담종료:&nbsp;&nbsp;
                    <span className="font-medium text-gray-700">
                        {formattedEndDate} {formattedEndTime.replace('오전', '').replace('오후', '')}
                    </span>
                </span>
                <span>
                    상담시간:&nbsp;&nbsp;<span className="font-medium text-gray-700">{consultTime}분</span>
                </span>
            </div>
            {/* <span>{`남은시간:${hours}:${minutes}:${seconds}`}</span> */}
        </>
    );
}

export default StatusMoreDetails;
