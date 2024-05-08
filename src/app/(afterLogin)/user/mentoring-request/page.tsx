'use client';

import MentoringRequestCard from './_component/RequestCard';
import UserFilter from '../_component/UserFilter';
import { useQuery } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import { useEffect, useState } from 'react';
import { MentoringReq, mentoringReqFetch } from '../_lib/mentoringReq';
import Loading from '@/app/_component/Loading';
import userPageStore from '../../_store/userPageStore';
import SimplePagination from '../_component/SimplePagination';

function MentoringReqPage() {
    const { isImageModalOpen, setIsImageModalOpen } = userPageStore();
    const [page, setPage] = useState<number>(1); //현제 페이지
    const {
        data: dataList,
        error,
        isLoading,
    } = useQuery<MentoringReq>({
        queryKey: ['mentoringRequests', page],
        queryFn: () => mentoringReqFetch(page),
    }); //본인의 멘토링 신청내역

    useEffect(() => {
        console.log(dataList);
    }, [dataList]);
    if (error) return <div className="text-red-500">에러가 발생했습니다.</div>;

    return (
        <>
            <div className="flex h-full w-full flex-col gap-10   px-14 py-9">
                {/* 필터 컴포넌트 */}
                <UserFilter title="신청 내역" />
                {/* 상단 안내문구 */}
                <div className="flex items-center justify-center">
                    <span className=" flex h-14 w-full items-center justify-center rounded-lg bg-indigo-100 px-3 text-sm text-primary">
                        자신이 신청한 멘토링 상담 및 멘토링 진행상태를 확인할 수 있습니다.
                    </span>
                </div>
                {/* 신청내역 */}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex flex-grow flex-col    ">
                        {dataList?.data.map((data, index) => <MentoringRequestCard key={index} data={data} />)}
                    </div>
                )}
                <SimplePagination page={page} setPage={setPage} totalPages={dataList?.pageInfo.totalPages || 1} />
            </div>
        </>
    );
}

export default MentoringReqPage;
