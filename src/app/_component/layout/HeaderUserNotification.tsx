'use client';
import React, { useEffect, useState } from 'react';
import Notification from '@/app/_icons/common/Notification';
import { useQuery } from '@tanstack/react-query';
import { getPushCount, usePushCountQuery } from '@/app/_lib/PushService';
import CloseIcon from '@/app/_icons/common/CloseIcon';
import NotificationBar from './NotificationBar/NotificationBar';

function HeaderUserNotification() {
    const [isHovered, setIsHovered] = useState(false);
    const pushCountQuery = usePushCountQuery();
    const { data: pushUnreadCount = 0, error, isPending } = pushCountQuery;

    useEffect(() => {
        console.log('pushUnreadCount', pushUnreadCount);
    }, [pushUnreadCount]);

    return (
        <>
            <div className="flex h-full flex-shrink-0 items-center justify-center  p-1">
                <div className="relative h-8 w-8 shrink-0 " onClick={() => setIsHovered((prev) => !prev)}>
                    <Notification className="cursor-pointer p-1 text-gray-700  text-opacity-80   hover:text-primary" />

                    <div
                        className={`absolute -right-[1px] top-0  flex h-4 w-4 items-center justify-center rounded-full bg-red-600 bg-opacity-95 text-xs font-light text-white ${pushUnreadCount === 0 ? 'hidden' : ''}`}
                    >
                        {pushUnreadCount}
                    </div>
                </div>
            </div>
            {isHovered && <NotificationBar onClose={() => setIsHovered(false)} />}
        </>
    );
}

export default HeaderUserNotification;
