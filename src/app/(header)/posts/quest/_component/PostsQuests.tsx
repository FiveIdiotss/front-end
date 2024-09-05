'use client';
import React, { useEffect } from 'react';
import Pagination from '@/app/_component/common/Pagination';
import Loading from '@/app/_component/Loading';
import SubBoardCard from '../../_component/subBoard/SubBoardCard';
import { useSubBoardPostsQuery } from '../../_lib/qeustOrRequestService';
import ErrorDataUI from '@/app/_component/ErrorDataUI';

function PostsQuests() {
    const subBoardPostsQuery = useSubBoardPostsQuery({
        subBoardType: 'QUEST',
    });
    const { data: questsData, isPending, error } = subBoardPostsQuery;

    useEffect(() => {
        console.log('자유질문 목록 데이터', questsData);
    }, [questsData]);

    if (isPending) return <Loading className="h-full" description="데이터를 불러오는 중입니다." />;
    if (error) return <ErrorDataUI text="오류가 발생했습니다." />;

    return (
        <div className="flex flex-1  flex-col items-center justify-between  ">
            <div className="w-full flex-col">
                <div className=" flex w-full   flex-col ">
                    {questsData.data.map((openQuestion, index) => (
                        <SubBoardCard key={index} data={openQuestion} boardType="QUEST" />
                    ))}
                </div>
            </div>
            <Pagination totalPages={questsData.pageInfo.totalPages} />
            {/*홈일 경우 */}
        </div>
    );
}

export default PostsQuests;
