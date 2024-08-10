import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getPushList } from '../../_lib/PushService';
import Image from 'next/image';
import CloseIcon from '../icon/CloseIcon';
import Loading from '@/app/_component/Loading';
import Link from 'next/link';

function NotificationList({ isHovered }: { isHovered: boolean }) {
    const queryClient = useQueryClient();
    const { data, error, isPending, isSuccess } = useQuery({
        queryKey: ['push', 'list'],
        queryFn: () =>
            getPushList({
                pageParam: 1,
                size: 10,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        enabled: isHovered,
    });
    useEffect(() => {
        if (isSuccess) {
            queryClient.setQueryData(['push', 'count'], 0);
        }
    }, [isSuccess]);

    if (isPending) return <Loading />;
    if (error) return <div>에러가 발생했습니다.</div>;

    return (
        <div className="flex w-full flex-col  overflow-y-auto ">
            {data?.data.map((item) => (
                <div key={item.notificationId} className="flex w-full flex-col  justify-start gap-2 border-b">
                    {item.notificationType === 'REPLY_QUEST' && (
                        <Link href={`/posts/quest/${item.otherPK}`} className="hover:bg-gray-100">
                            <span>[질문 게시판]{item.title}</span>
                            <div className="flex w-full flex-row  gap-2">
                                <Image
                                    src={item.senderImageUrl}
                                    alt="user"
                                    className="rounded-full"
                                    width={30}
                                    height={30}
                                />
                                <span>{item.senderName}</span>
                                <span>님이 댓글을 남겼습니다.</span>
                            </div>
                        </Link>
                    )}
                    {item.notificationType === 'REPLY_REQUEST' && (
                        <Link href={`/posts/request/${item.otherPK}`}>
                            <span>[요청 게시판]{item.title}</span>
                            <div className="flex w-full flex-row  gap-2">
                                <Image
                                    src={item.senderImageUrl}
                                    alt="user"
                                    className="rounded-full"
                                    width={30}
                                    height={30}
                                />
                                <span>{item.senderName}</span>
                                <span>님이 댓글을 남겼습니다.</span>
                            </div>
                        </Link>
                    )}
                    {item.notificationType === 'APPLY' && (
                        <>
                            <span>[멘토링]{item.title}</span>
                            <div className="flex w-full flex-row  gap-2">
                                <Image
                                    src={item.senderImageUrl}
                                    alt="user"
                                    className="rounded-full"
                                    width={30}
                                    height={30}
                                />
                                <span>{item.senderName}</span>
                                <span>님이 댓글을 남겼습니다.</span>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
export default NotificationList;
