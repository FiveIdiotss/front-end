import React from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';
import StatusActions from './StatusActions';
import StatusMoreDetails from './StatusMoreDetails';

function ChatRoomStatus() {
    return (
        <div className="scroll chatScroll hidden h-full w-80 flex-col  gap-3 overflow-y-auto border-l border-neutral-300 bg-gray-100 py-4   mobile:flex">
            <div className=" flex  flex-col border-y-2 border-gray-50   bg-white px-4 py-4">
                <StatusReceiverInfo />
            </div>
            <div className="flex flex-row  border-y-2 border-gray-50   bg-white  py-4 ">
                <StatusActions pageType="right" />
            </div>
            <StatusMoreDetails />
        </div>
    );
}

export default ChatRoomStatus;
