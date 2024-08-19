'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import QuestsRequestsCard from '../../posts/_component/questsRequests/QuestsRequestsCard';
import { useHomeQuestsQuery } from '../_lib/homeService';
import EmptyDataUI from '@/app/_component/EmptyDataUI';
import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';

export default function HomeQuestsBoard() {
    const homeQuestsQuery = useHomeQuestsQuery();
    const { data: questsData, error, isPending } = homeQuestsQuery;

    useEffect(() => {
        if (error) {
            console.log('homeQuestsError', error);
            pushNotification({
                msg: error?.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [error]);

    useEffect(() => {
        console.log('홈 질문게시글 데이터', questsData);
    }, [questsData]);

    return (
        <section className="flex w-full flex-col">
            <Link className=" mb-3  flex w-full flex-row items-end justify-between " href="/posts/quest">
                <span className="text-xl font-medium text-neutral-700">자유로운 질문</span>
                {/* <ArrowRightIcon className="ml-1 h-7 w-7 text-neutral-700" /> */}
                <span className="text-sm font-extralight text-neutral-600">더보기 +</span>
            </Link>
            {questsData?.data.length === 0 && <EmptyDataUI text="게시글 없음" />}
            {isPending && <Loading className="h-full min-h-[378px]" description="질문 데이터를 불러오는중입니다..." />}

            <div className="flex w-full flex-col">
                {questsData?.data.map((openQuestion, index) => (
                    <QuestsRequestsCard key={index} data={openQuestion} boardType="quest" />
                ))}
            </div>

            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
