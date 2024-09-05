'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import SubBoardCard from '../posts/_component/subBoard/SubBoardCard';

import EmptyDataUI from '@/app/_component/EmptyDataUI';
import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';
import MegaPhoneIcon from '@/app/_icons/Menu/MegaPhoneIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useHomeQuestsQuery } from '../_lib/homeService';

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
            <Link
                className="mb-3 flex w-full flex-row items-end justify-between rounded-lg border-y bg-opacity-70 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50"
                href="/posts/quest"
            >
                <div className="flex h-14 w-full flex-row items-center gap-4 ">
                    <div className="rounded-md border p-1 shadow-sm">
                        <MegaPhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className=" font-semibold mobile:text-lg">질문 하기</span>
                        <span className="text-sm text-gray-500">여러 주제로 대화를 나눠요</span>
                    </div>
                    <div className="flex flex-grow justify-end">
                        <ArrowRightIcon className=" h-6 w-6  text-gray-400" />
                    </div>
                </div>
            </Link>
            {questsData?.data.length === 0 && <EmptyDataUI text="게시글 없음" />}
            {isPending && <Loading className="h-full min-h-[378px]" description="질문 데이터를 불러오는중입니다..." />}

            <div className="flex w-full flex-col">
                {questsData?.data.map((openQuestion, index) => (
                    <SubBoardCard key={index} data={openQuestion} boardType="QUEST" />
                ))}
            </div>

            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
