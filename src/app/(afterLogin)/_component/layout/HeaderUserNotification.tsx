'use client';
import React, { useEffect, useState } from 'react';
import Notification from '../icon/Notification';
import { useQuery } from '@tanstack/react-query';
import { getPushCount } from '../../_lib/PushService';
import NotificationList from './NotificationList';
import CloseIcon from '../icon/CloseIcon';

function HeaderUserNotification() {
    const [isHovered, setIsHovered] = useState(false);
    const {
        data: pushUnreadCount = 0,
        error,
        isPending,
    } = useQuery({
        queryKey: ['push', 'count'],
        queryFn: getPushCount,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        console.log('pushUnreadCount', pushUnreadCount);
    }, [pushUnreadCount]);

    return (
        <div className="flex h-full flex-shrink-0 items-center justify-center  p-1">
            <div className="relative">
                <div className="relative h-8 w-8 shrink-0 " onClick={() => setIsHovered((prev) => !prev)}>
                    <Notification className="cursor-pointer p-1 text-neutral-800  text-opacity-80   hover:text-primary" />

                    <div
                        className={`absolute -right-[1px] top-0  flex h-4 w-4 items-center justify-center rounded-full bg-red-600 bg-opacity-95 text-xs font-light text-white ${pushUnreadCount === 0 ? 'hidden' : ''}`}
                    >
                        {pushUnreadCount}
                    </div>
                </div>

                <div
                    className={`absolute  -right-2 top-12 flex w-fit  flex-col  hover:cursor-default ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${
                        isHovered ? ' max-h-[1500px]   opacity-100' : 'max-h-0 w-0  overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-[6px] flex min-h-[400px]  w-72 flex-col border bg-white px-4 py-4 shadow-sm   shadow-neutral-300">
                        <div
                            className={`flex w-full flex-grow flex-col items-center gap-3 ${isHovered ? '' : 'hidden'}  `}
                        >
                            <div className="flex w-full flex-row justify-between  ">
                                <span className="font-bold">알림</span>
                                <button onClick={() => setIsHovered(false)}>
                                    <CloseIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <NotificationList isHovered={isHovered} />
                        </div>
                        <div className=" flex px-5">
                            <button className="w-full rounded-md bg-primary p-2  text-sm text-white ">전체보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderUserNotification;
