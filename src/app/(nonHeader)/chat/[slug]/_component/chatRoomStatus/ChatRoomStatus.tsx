import React from 'react';
import StatusReceiverInfo from './StatusReceiverInfo';
import StatusActions from './StatusActions';
import StatusMoreDetails from './StatusMoreDetails';

function ChatRoomStatus() {
    return (
        <div className="scroll chatScroll hidden h-full w-80 flex-col  gap-3 overflow-y-auto  border-neutral-300 bg-gray-100    mobile:flex">
            <div className=" flex  flex-col border-y   bg-white px-4 py-4">
                <StatusReceiverInfo />
            </div>
            <div className="flex flex-row  border-y   bg-white  py-4 ">
                <StatusActions pageType="right" />
            </div>
            <StatusMoreDetails />
        </div>
    );
}

export default ChatRoomStatus;
