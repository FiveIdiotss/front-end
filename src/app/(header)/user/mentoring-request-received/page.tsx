'use client';

import RequestReceivedCard from './_component/RequestReceivedCard';
import UserFilter from '../_component/UserFilter';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MentoringReq, mentoringReqReceiveFetch } from '../_lib/mentoringReqReceive';
import Loading from '@/app/_component/Loading';
import SimplePagination from '@/app/_component/common/SimplePagination';
import { useSearchParams } from 'next/navigation';

function MentoringReqRecPage() {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const {
        data: dataList,
        error,
        isLoading,
    } = useQuery<MentoringReq>({
        queryKey: ['mentoringRequests'],
        queryFn: () => mentoringReqReceiveFetch(1),
    }); //본인의 멘토링 신청내역

    const handleAccept = (applyId: number) => {};

    useEffect(() => {
        console.log(dataList);
    }, [dataList]);
    if (error) return <div className="text-red-500">에러가 발생했습니다.</div>;

    return (
        <>
            <div className="flex h-full w-full flex-col gap-7  px-3  py-9 mobile:px-14">
                {/* 상단 안내문구 */}
                <div className="flex items-center justify-center">
                    <span className=" flex  w-full items-center justify-center rounded-lg bg-indigo-50 p-3 text-sm text-primary">
                        신청 받은 멘토링 상담을 수락 또는 거절할 수 있고 멘토링 진행상태를 확인할 수 있습니다.
                    </span>
                </div>
                {/* 필터 컴포넌트 */}
                <UserFilter title="신청 받은 내역" />
                {/* 신청내역 */}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex flex-grow flex-col    ">
                        {dataList?.data.map((data, index) => <RequestReceivedCard key={index} data={data} />)}
                    </div>
                )}
                <SimplePagination totalPages={dataList?.pageInfo.totalPages || 1} />
            </div>
        </>
    );
}

export default MentoringReqRecPage;
