import React from 'react';
import { Message } from '../../../_lib/chatContentList';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import { useFormattedTime } from '@/app/(afterLogin)/(nonHeader)/_hooks/useFormattedConsultTimes';
import MessageExtendConfirm from './MessageExtendConfirm';
import SystemMessageContainer from './SystemMessageContainer';
import Check2Icon from '@/app/(afterLogin)/_component/icon/Check2Icon';
import CloseIcon from '@/app/(afterLogin)/_component/icon/CloseIcon';

type Props = {
    chat: Message;
    isUserSentMessage: boolean;
    messageType: {
        type: string;
        value: string;
    };
};

function SystemMessageItem({ chat, isUserSentMessage, messageType }: Props) {
    const { isLoginMentor, receiverName, consultTime, startTime } = useChatStore();
    const { formattedStartTime, formattedEndTime } = useFormattedTime(); // 상담 연장 시간 계산

    if (messageType.value === 'consultExtend') {
        return (
            <SystemMessageContainer>
                <MessageExtendConfirm />
            </SystemMessageContainer>
        );
    } else if (messageType.value === 'consultExtendDecline') {
        return (
            <SystemMessageContainer>
                <div className="flex w-full flex-col items-center gap-2 ">
                    <span className="text-neutral-700">
                        {isLoginMentor ? '상담 연장 요청을 거절하였습니다.' : '멘토가 상담 연장 요청을 거절하였습니다.'}
                    </span>
                    {/* <span className="font-semibold text-red-600">[취소]</span> */}
                </div>
            </SystemMessageContainer>
        );
    } else if (messageType.value === 'consultExtendAccept') {
        return (
            <SystemMessageContainer>
                <div className="flex w-full flex-col items-center gap-2">
                    <Check2Icon className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-neutral-700">연장 되었습니다.</span>
                    {/* <span className=" text-blue-600">{`${formattedStartTime} → ${formattedEndTime}`}</span> */}
                    {/* <span className="font-semibold text-red-600">[취소]</span> */}
                </div>
            </SystemMessageContainer>
        );
    }
}

export default SystemMessageItem;
