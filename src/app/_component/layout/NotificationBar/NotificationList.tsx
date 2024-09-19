import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getPushList, useDeletePushMutation, usePushListQuery } from '@/app/_lib/PushService';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '../../ErrorDataUI';
import { useRouter } from 'next/navigation';
import PushMentorBoardCard from './PushMentorBoardCard';
import PushSubBoardCard from './PushSubBoardCard';
import EmptyDataUI from '../../EmptyDataUI';

const convertDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
};

function NotificationList({ onClose }: { onClose: () => void }) {
    const queryClient = useQueryClient();
    const pushListQuery = usePushListQuery();
    const router = useRouter();
    const { data: pushLists, error, isPending, isSuccess } = pushListQuery;
    const deletePushMutation = useDeletePushMutation();
    const handleDeletePush = (notificationId: number) => {
        deletePushMutation.mutate(notificationId);
    };

    const handleRoute = (url: string, notificationId: number) => {
        deletePushMutation.mutate(notificationId);

        onClose();
        router.push(url);
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('pushLists', pushLists);
            queryClient.setQueryData(['push', 'count'], 0);
        }
    }, [isSuccess]);

    if (isPending) return <Loading description="불러오는 중입니다." />;
    if (error) return <ErrorDataUI text="오류가 발생했습니다." onReset={pushListQuery.refetch} />;

    return (
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto border-t  ">
            {pushLists?.data.length === 0 && <EmptyDataUI text="알림이 없습니다." />}
            {pushLists?.data.map((item) => (
                <div key={item.notificationId} className="flex w-full flex-col justify-start  gap-2 border-b p-2">
                    {/* 질문 게시판 댓글 */}
                    <PushMentorBoardCard handleDeletePush={handleDeletePush} item={item} handleRoute={handleRoute} />
                    <PushSubBoardCard handleDeletePush={handleDeletePush} item={item} handleRoute={handleRoute} />
                </div>
            ))}
        </div>
    );
}
export default NotificationList;
