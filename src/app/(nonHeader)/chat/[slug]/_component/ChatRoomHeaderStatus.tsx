import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import React from 'react';

function ChatRoomHeaderStatus() {
    const { loginName, receiverName, isLoginMentor, consultTime, startTime, date } = useChatInfoStore();

    const mentorName = isLoginMentor ? loginName : receiverName;
    const menteeName = isLoginMentor ? receiverName : loginName;

    const { formattedStartTime, formattedEndTime, formattedDate } = useFormattedTime();
    return (
        <div className="flex w-full justify-center ">
            <div className="flex  w-2/5 flex-col text-sm text-gray-500 ">
                <span className="flex flex-row gap-1">
                    멘토: <span className="font-medium text-gray-700">{mentorName}</span>
                    <span className="text-green-600">{isLoginMentor ? '본인' : ''}</span>
                </span>
                <span className="flex  flex-row gap-1">
                    멘티: <span className="font-medium text-gray-700">{menteeName}</span>
                    <span className="text-green-600">{isLoginMentor ? '' : '본인'}</span>
                </span>
            </div>
            <div className="ml-4 flex w-3/5  flex-col  text-sm text-gray-500">
                <span>
                    상담시작:{' '}
                    <span className="font-medium text-gray-700">
                        {formattedDate} {formattedStartTime.replace('오전', '').replace('오후', '')}
                    </span>
                </span>
                <span>
                    상담종료:{' '}
                    <span className="font-medium text-gray-700">
                        {formattedDate} {formattedEndTime.replace('오전', '').replace('오후', '')}
                    </span>
                </span>
                <span>
                    상담시간: <span className="font-medium text-gray-700">30분</span>
                </span>
            </div>
        </div>
    );
}

export default ChatRoomHeaderStatus;
