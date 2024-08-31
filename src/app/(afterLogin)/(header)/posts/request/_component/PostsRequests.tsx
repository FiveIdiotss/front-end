'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/app/(afterLogin)/_component/common/Pagination';
import Loading from '@/app/_component/Loading';
import SubBoardCard from '../../_component/subBoard/SubBoardCard';
import { useSubBoardPostsQuery } from '../../_lib/qeustOrRequestService';
import ErrorDataUI from '@/app/_component/ErrorDataUI';

function PostsRequests() {
    const subBoardPostsQuery = useSubBoardPostsQuery({
        subBoardType: 'REQUEST',
    });
    const { data: requestsData, isPending, error } = subBoardPostsQuery;

    useEffect(() => {
        console.log('openQuestions', requestsData);
    }, [requestsData]);

    if (isPending) return <Loading className="h-full" />;
    if (error) return <ErrorDataUI text="오류가 발생했습니다." />;

    return (
        <div className="flex flex-1  flex-col items-center justify-between  ">
            <div className="w-full flex-col">
                <div className=" flex w-full   flex-col ">
                    {requestsData.data.map((request, index) => (
                        <SubBoardCard key={index} data={request} boardType="REQUEST" />
                    ))}
                </div>
            </div>
            <Pagination totalPages={requestsData.pageInfo.totalPages} />
        </div>
    );
}

export default PostsRequests;
