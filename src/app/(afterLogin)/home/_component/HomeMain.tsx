import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react';
import HomeMentoBoard from './HomeMentoBoard';
import HomeQuestsBoard from './HomeQuestsBoard';
import HomeRequestsBoard from './HomeRequestsBoard';
import HomeCategoryBar from './HomeCategoryBar';
import RightSideBar from './RightSideBar';

import { fetchMentorPosts } from '../../posts/mentor/_lib/posts';
import { getQuests } from '../../posts/_lib/qeustsRequest';

async function HomeMain() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mento', 'home'],
        queryFn: () =>
            fetchMentorPosts({
                pageParam: 1,
                size: 16,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'quests', '1', '7', '', false, false],
        queryFn: () =>
            getQuests({
                pageParam: 1,
                size: 7,
                categoryParam: '',
                searchParam: '',
                isSchool: false,
                subBoardType: 'QUEST',
                isStar: false,
            }),
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'requests', '1', '7', '', '', false, false],
        queryFn: () =>
            getQuests({
                pageParam: 1,
                size: 7,
                categoryParam: '',
                searchParam: '',
                isSchool: false,
                subBoardType: 'REQUEST',
                isStar: false,
            }),
    });

    const dehydratedState = dehydrate(queryClient);

    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }
    // if (status === 'unauthenticated') {
    //     return <p>로그인이 필요합니다.</p>;
    // }

    const categories = ['상경대', '이공대', '보과대', '교대', 'category 5', 'category 6', 'category 7'];

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className=" mx-auto flex w-full max-w-[1500px] flex-row gap-8  px-8 py-5  ">
                {/* 32px */}
                <div className=" flex  w-[calc(100%-256px)] flex-col">
                    {/* 192px-gap+sidebar_width */}
                    <HomeMentoBoard />
                    <HomeCategoryBar />

                    <div className="mt-12 flex w-full flex-row gap-6">
                        <HomeQuestsBoard />
                        <HomeRequestsBoard />
                    </div>
                </div>
                <RightSideBar />
                {/* 192px */}
            </div>
        </HydrationBoundary>
    );
}

export default HomeMain;
