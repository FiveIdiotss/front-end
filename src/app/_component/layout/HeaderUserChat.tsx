'use client';
import React from 'react';
import ChatIcon from '@/app/_icons/common/ChatIcon';
import Link from 'next/link';
import { useChatCountQuery } from '@/app/_lib/PushService';

function HeaderUserChat() {
    const chatCountQuery = useChatCountQuery();
    const { data: chatCount, error, isPending } = chatCountQuery;

    return (
        <div className="flex  h-full flex-shrink-0 items-center justify-center  p-1">
            <div className="relative h-8  w-8 shrink-0 ">
                <Link href="/chat">
                    <ChatIcon className="cursor-pointer p-1 text-gray-700 text-opacity-80  hover:text-primary" />
                    {chatCount !== 0 && !isPending && (
                        <span className="absolute -right-[1px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 bg-opacity-95 text-xs font-light text-white ">
                            {chatCount}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
}

export default HeaderUserChat;
