import React from 'react';
import HomeMain from './_component/HomeMain';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { HOME_MENTOR_QUERYKEY } from '@/app/queryKeys/mentorKey';
import BookIcon from '@/app/_icons/common/BookIcon';
import HeaderSearch from './_component/HeaderSearch';
import { getHomeMentorPosts, getHomeQuestsOrRequests } from './_lib/homeService';
import { auth } from '@/auth';

async function HomePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: HOME_MENTOR_QUERYKEY,
        queryFn: getHomeMentorPosts,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'quests', 'home'],
        queryFn: () =>
            getHomeQuestsOrRequests({
                pageParam: 1,
                size: 7,
                subBoardType: 'QUEST',
            }),
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'requests', 'home'],
        queryFn: () =>
            getHomeQuestsOrRequests({
                pageParam: 1,
                size: 7,
                subBoardType: 'REQUEST',
            }),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex  w-full flex-col ">
                <div className="w-dvh z-[2] flex w-full flex-col items-center justify-center gap-5 bg-opacity-70 bg-gradient-to-r from-white via-secondary to-white py-7 ">
                    <div className=" flex flex-row items-center justify-center gap-7 ">
                        <BookIcon className="h-auto w-9 text-green-600 mobile:w-12 " />
                        <div className=" flex  flex-col items-start justify-center gap-1">
                            <span className="text-xl font-bold text-black mobile:text-2xl">
                                <span className="text-green-600">지식</span>을 나누는 새로운 세상
                            </span>
                            <span className=" font-medium text-black mobile:text-lg">
                                멘토링으로 성장하는 여정에 참여하세요!
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-center ">
                        <HeaderSearch />
                    </div>
                </div>
                <HomeMain />
            </div>
        </HydrationBoundary>
    );
}

export default HomePage;
