'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import QuestsRequestsCard from '../../posts/_component/questsRequests/QuestsRequestsCard';
import { useHomeRequestsQuery } from '../_lib/homeService';
import Loading from '@/app/_component/Loading';
import { pushNotification } from '@/app/util/pushNotification';
import EmptyDataUI from '@/app/_component/EmptyDataUI';

export default function HomeRequestsBoard() {
    const homeRequestsQuery = useHomeRequestsQuery();
    const { data: requestsData, error, isPending } = homeRequestsQuery;

    useEffect(() => {
        if (error) {
            console.log('homeRequestsError', error);
            pushNotification({
                msg: error?.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [error]);

    useEffect(() => {
        console.log('홈 주제요청 게시글 데이터', requestsData);
    }, [requestsData]);

    return (
        <section className="flex w-full flex-col">
            <Link className="mb-3 flex w-full flex-row items-end justify-between  " href="/posts/request">
                <span className="text-xl font-medium text-neutral-700">멘토링 주제 요청</span>
                <span className="text-sm font-extralight text-neutral-600">더보기 +</span>
            </Link>
            {isPending && <Loading className="h-full min-h-[378px]" description="질문 데이터를 불러오는중입니다..." />}{' '}
            {requestsData?.data.length === 0 && <EmptyDataUI text="게시글 없음" />}
            <div className="w-full flex-col">
                <div className=" flex w-full   flex-col ">
                    {requestsData?.data.map((request, index) => (
                        <QuestsRequestsCard key={index} data={request} boardType="request" />
                    ))}
                </div>
            </div>
            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
