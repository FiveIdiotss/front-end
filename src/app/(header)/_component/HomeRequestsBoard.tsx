'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import SubBoardCard from '../posts/_component/subBoard/SubBoardCard';
import { useHomeRequestsQuery } from '../_lib/homeService';
import Loading from '@/app/_component/Loading';
import { pushNotification } from '@/app/util/pushNotification';
import EmptyDataUI from '@/app/_component/EmptyDataUI';
import FocusIcon from '@/app/_icons/Menu/FocusIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';

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
            <Link
                className="mb-3 flex w-full flex-row items-end justify-between rounded-lg  border-y bg-opacity-70 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50"
                href="/posts/request"
            >
                <div className="flex h-14 w-full transform   flex-row items-center gap-4  ">
                    <div className="rounded-md border p-1 shadow-sm">
                        <FocusIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="  font-semibold mobile:text-lg">멘토링 주제 요청</span>
                        <span className="text-sm text-gray-500">멘티들이 원하는 멘토링</span>
                    </div>
                    <div className="flex flex-grow justify-end">
                        <ArrowRightIcon className=" h-6 w-6  text-gray-400" />
                    </div>
                </div>
            </Link>
            {isPending && <Loading className="h-full min-h-[378px]" description="질문 데이터를 불러오는중입니다..." />}
            {requestsData?.data.length === 0 && <EmptyDataUI text="게시글 없음" />}
            <div className="w-full flex-col">
                <div className=" flex w-full   flex-col ">
                    {requestsData?.data.map((request, index) => (
                        <SubBoardCard key={index} data={request} boardType="REQUEST" />
                    ))}
                </div>
            </div>
            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
