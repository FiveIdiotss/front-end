'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQuests } from '../../_lib/qeustsRequest';
import Pagination from '../../_component/Pagination';
import Loading from '@/app/_component/Loading';
import { useSearchParams } from 'next/navigation';
import QuestRequestsCard from '../../_component/questsRequests/QuestsRequestsCard';

function PostsQuests() {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1;
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';
    const schoolParam = Boolean(searchParams.get('schoolFilter')) || false;
    const starParam = Boolean(searchParams.get('star')) || false;
    const sizeParam = 15; //홈페이지에서는 7개, 포스트페이지에서는 15개

    const {
        data: openQuestions,
        error,
        isPending,
    } = useQuery({
        queryKey: ['posts', 'quests', pageParam, sizeParam, categoryParam, searchParam, schoolParam, starParam], //쿼리키
        queryFn: () =>
            getQuests({
                pageParam,
                size: sizeParam,
                categoryParam,
                searchParam,
                isSchool: schoolParam,
                subBoardType: 'QUEST',
                isStar: starParam,
            }),
    });
    useEffect(() => {
        console.log('openQuestions', openQuestions);
    }, [openQuestions]);

    if (isPending) return <Loading />;
    if (error) return <div>에러가 발생했습니다.</div>;

    return (
        <div className="flex flex-1  flex-col items-center justify-between  ">
            <div className="w-full flex-col">
                <div className=" flex w-full   flex-col ">
                    {openQuestions.data.map((openQuestion, index) => (
                        <QuestRequestsCard key={index} data={openQuestion} boardType="quest" />
                    ))}
                </div>
            </div>
            <Pagination page={pageParam} totalPages={openQuestions.pageInfo.totalPages} />
            {/*홈일 경우 */}
        </div>
    );
}

export default PostsQuests;
