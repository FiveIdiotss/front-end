'use client';
import React from 'react';

function SystemMessageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={` inline-block w-full max-w-48 flex-shrink flex-col items-center break-words  rounded-md border bg-white  text-sm`}
        >
            <div className="flex w-full justify-center rounded-t-md   bg-yellow-300  px-2 py-2 text-sm font-semibold">
                시스템
            </div>
            <div className="flex  w-full px-3 py-5">{children}</div>
        </div>
    );
}

export default SystemMessageContainer;
