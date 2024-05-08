'use client';

import RequestReceivedCard from './_component/RequestReceivedCard';
import UserFilter from '../_component/UserFilter';
import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import { useEffect, useState } from 'react';
import { MentoringReq, mentoringReqReceiveFetch } from '../_lib/mentoringReqReceive';
import Loading from '@/app/_component/Loading';
import userPageStore from '../../_store/userPageStore';
import ProfileImageChange from '../_component/ProfileImageChange';
import SimplePagination from '../_component/SimplePagination';
import { toast } from 'react-toastify';

function MentoringReqRecPage() {
    const [page, setPage] = useState<number>(1); //현제 페이지
    const {
        data: dataList,
        error,
        isLoading,
    } = useQuery<MentoringReq>({
        queryKey: ['mentoringRequests'],
        queryFn: () => mentoringReqReceiveFetch(1),
    }); //본인의 멘토링 신청내역
    const mutationAccept = useMutation({
        mutationFn: (applyId: number) => Axios.post(`/api/apply/${applyId}`),
        onSuccess: () => {
            console.log('수락');
        },
        onError: () => {
            console.log('수락 실패');
        },
    });
    const mutationReject = useMutation({
        mutationFn: (applyId: number) => Axios.delete(`/api/reject/${applyId}`),
        onSuccess: () => {
            console.log('거절');
        },
        onError: () => {
            console.log('거절 실패');
        },
    });

    const handleReject = (applyId: number) => {
        toast.info('거절되었습니다.');
    };
    const handleAccept = (applyId: number) => {};

    useEffect(() => {
        console.log(dataList);
    }, [dataList]);
    if (error) return <div className="text-red-500">에러가 발생했습니다.</div>;

    return (
        <>
            <div className="flex h-full w-full flex-col gap-10   px-14 py-9">
                {/* 필터 컴포넌트 */}
                <UserFilter title="신청 받은 내역" />
                {/* 상단 안내문구 */}
                <div className="flex items-center justify-center">
                    <span className=" flex h-14 w-full items-center justify-center rounded-lg bg-indigo-100 px-3 text-sm text-primary">
                        신청 받은 멘토링 상담을 수락 또는 거절할 수 있고 멘토링 진행상태를 확인할 수 있습니다.
                    </span>
                </div>
                {/* 신청내역 */}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex flex-grow flex-col    ">
                        {dataList?.data.map((data, index) => <RequestReceivedCard key={index} data={data} />)}
                    </div>
                )}
                <SimplePagination page={page} setPage={setPage} totalPages={dataList?.pageInfo.totalPages || 1} />
            </div>
        </>
    );
}

export default MentoringReqRecPage;
