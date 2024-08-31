import React from 'react';
import { Message } from '../../../_lib/chatContentList';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import { useFormattedTime } from '@/app/(afterLogin)/(nonHeader)/_hooks/useFormattedConsultTimes';
import MessageExtendConfirm from './MessageExtendConfirm';
import SystemMessageContainer from './SystemMessageContainer';
import Check2Icon from '@/app/_icons/common/Check2Icon';
import { ServerValueType } from '../ChatItem';

type Props = {
    chat: Message;
    isUserSentMessage: boolean;
    messageType: {
        type: string;
        value: ServerValueType;
    };
};

function SystemMessageItem({ chat, isUserSentMessage, messageType }: Props) {
    const { isLoginMentor, completeExtendMessagesId } = useChatStore();

    if (messageType.value === 'consultExtend' || messageType.value === 'consultExtendComplete') {
        return (
            <SystemMessageContainer>
                <MessageExtendConfirm chatId={chat.chatId} messageType={messageType} />
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
