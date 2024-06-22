'use client';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import { useCountdown } from '@/app/util/CountDownHook';
import React from 'react';

function StatusMoreDetails() {
    const { loginName, receiverName, isLoginMentor, consultTime, startTime, date } = useChatStore();

    const mentorName = isLoginMentor ? loginName : receiverName;
    const menteeName = isLoginMentor ? receiverName : loginName;

    // startTime을 기준으로 endTime 계산
    const dateTimeString = `${date}T${startTime}`; //시작시간

    const startTimeDate = new Date(dateTimeString);

    const endTimeDate = new Date(dateTimeString);
    endTimeDate.setMinutes(startTimeDate.getMinutes() + consultTime); // 상담 시간 + 분 추가

    const { hours = 0, minutes = 0, seconds = 0 } = useCountdown(startTimeDate);

    const formattedStartTime = `${String(startTimeDate.getHours()).padStart(2, '0')} : ${String(startTimeDate.getMinutes()).padStart(2, '0')}`;
    const formattedEndTime = `${String(endTimeDate.getHours()).padStart(2, '0')} : ${String(endTimeDate.getMinutes()).padStart(2, '0')}`;

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

            <div className="flex  w-full flex-col items-center rounded-lg bg-blue-50 p-4">
                <span className="font-bold text-blue-700">시작시간: {formattedStartTime}</span>
                <span className="text-neutral-500">-</span>
                <span className="font-bold text-red-700">종료시간: {formattedEndTime}</span>
            </div>
            {/* <span>{`남은시간:${hours}:${minutes}:${seconds}`}</span> */}
        </div>
    );
}

export default StatusMoreDetails;
