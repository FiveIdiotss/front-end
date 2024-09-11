import React from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';
import StatusActions from './StatusActions';
import StatusMoreDetails from './StatusMoreDetails';

function ChatRoomStatus() {
    return (
        <div className="scroll chatScroll hidden w-1/4 min-w-[260px] flex-col gap-6 overflow-y-auto border-l border-neutral-300 bg-gray-100 py-4   mobile:flex">
            <div className=" flex  flex-col   bg-white px-4 py-4">
                <StatusReceiverInfo />
            </div>
            <StatusActions />
            <StatusMoreDetails />
        </div>
    );
}

export default ChatRoomStatus;
