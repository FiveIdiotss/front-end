import React from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';
import StatusActions from './StatusActions';
import StatusMoreDetails from './StatusMoreDetails';

function ChatRoomStatus() {
    return (
        <div className="scroll chatScroll hidden w-1/4 min-w-[260px] flex-col overflow-y-auto border-l border-neutral-300   px-3 mobile:flex">
            <div className="bg-yellow flex  flex-col border-b border-neutral-300 px-4 py-4">
                <StatusReceiverInfo />
            </div>
            <StatusActions />
            <StatusMoreDetails />
        </div>
    );
}

export default ChatRoomStatus;
