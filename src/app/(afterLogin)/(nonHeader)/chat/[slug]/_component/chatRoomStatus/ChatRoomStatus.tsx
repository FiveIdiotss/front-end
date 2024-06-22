import Check2Icon from '@/app/(afterLogin)/_component/icon/Check2Icon';
import CloseIcon from '@/app/(afterLogin)/_component/icon/CloseIcon';
import React, { useState } from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';
import TimeExtendIcon from '@/app/(afterLogin)/_component/icon/TimeExtendIcon';
import StatusActions from './StatusActions';

function ChatRoomStatus() {
    return (
        <div className="flex w-1/4 min-w-[260px] flex-col border-l border-neutral-300   px-3">
            <div className="bg-yellow flex  flex-col border-b border-neutral-300 px-4 py-4">
                <span className="font-semibold">멘토 정보</span>
                <StatusReceiverInfo />
            </div>
            <StatusActions />
        </div>
    );
}

export default ChatRoomStatus;
