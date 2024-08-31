'use client';

import MentoringRequestCard from './_component/RequestCard';
import UserFilter from '../_component/UserFilter';
import { useQuery } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import { useEffect, useState } from 'react';
import { MentoringReq, mentoringReqFetch } from '../_lib/mentoringReqService';
import Loading from '@/app/_component/Loading';

import SimplePagination from '@/app/(afterLogin)/_component/common/SimplePagination';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function MentoringReqPage() {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 받아오기
    const {
        data: dataList,
        error,
        isLoading,
    } = useQuery<MentoringReq>({
        queryKey: ['mentoringRequests', pageParam],
        queryFn: () => mentoringReqFetch(pageParam),
    }); //본인의 멘토링 신청내역

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
                        자신이 신청한 멘토링 상담 및 멘토링 진행상태를 확인할 수 있습니다.
                    </span>
                </div>
                {/* 필터 컴포넌트 */}
                <UserFilter title="신청 내역" />

                {/* 신청내역 */}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex flex-grow flex-col    ">
                        {dataList?.data.map((data, index) => <MentoringRequestCard key={index} data={data} />)}
                    </div>
                )}
                <SimplePagination totalPages={dataList?.pageInfo.totalPages || 1} />
            </div>
        </>
    );
}

export default MentoringReqPage;
