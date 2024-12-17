import React from 'react';
import HomeMain from './_component/HomeMain';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { HOME_MENTOR_QUERYKEY } from '@/app/queryKeys/mentorKey';
import BookIcon from '@/app/_icons/common/BookIcon';

import { getHomeMentorPosts, getHomeQuestsOrRequests } from './_lib/homeService';
import HomeSearch from './_component/HomeSearch/HomeSearch';
import { QUEST_SUBBOARD_QUERYKEY, REQUEST_SUBBOARD_QUERYKEY } from '../queryKeys/subBoardKey';
import { getHomeHotSubBoards } from './_lib/homeHotContentService';

async function HomePage() {
    // const queryClient = new QueryClient();
    // await queryClient.prefetchQuery({
    //     queryKey: HOME_MENTOR_QUERYKEY,
    //     queryFn: getHomeMentorPosts,
    //     staleTime: 1000 * 60,
    //     gcTime: 1000 * 60 * 5,
    // });
    // await queryClient.prefetchQuery({
    //     queryKey: QUEST_SUBBOARD_QUERYKEY,
    //     queryFn: () =>
    //         getHomeQuestsOrRequests({
    //             pageParam: 1,
    //             size: 7,
    //             subBoardType: 'QUEST',
    //         }),
    // });
    // await queryClient.prefetchQuery({
    //     queryKey: REQUEST_SUBBOARD_QUERYKEY,
    //     queryFn: () =>
    //         getHomeQuestsOrRequests({
    //             pageParam: 1,
    //             size: 7,
    //             subBoardType: 'REQUEST',
    //         }),
    // });
    // await queryClient.prefetchQuery({
    //     queryKey: ['homeHotSuboards', { subBoardType: 'QUEST' }],
    //     queryFn: () => getHomeHotSubBoards({ subBoardType: 'QUEST' }),
    // });
    // await queryClient.prefetchQuery({
    //     queryKey: ['homeHotSuboards', { subBoardType: 'REQUEST' }],
    //     queryFn: () => getHomeHotSubBoards({ subBoardType: 'REQUEST' }),
    // });

    // const dehydratedState = dehydrate(queryClient);

    return (
        // <HydrationBoundary state={dehydratedState}>
        <div className="flex  w-full flex-col ">
            <div
                className="w-dvh z-[2] flex w-full flex-col items-center justify-center gap-5   bg-gradient-1  py-7"
                // style={{
                //     background: 'linear-gradient(to right, rgba(225, 207, 235, 0.6), rgba(183, 217, 243, 0.6))',
                // }}
            >
                <div className=" flex flex-row items-center justify-center gap-7 ">
                    <BookIcon className="h-auto w-9 text-[#6fbf73] mobile:w-12 " />
                    <div className=" flex  flex-col items-start justify-center gap-1">
                        <span className="text-lg font-semibold text-gray-800 mobile:text-2xl">
                            <span className="text-xl font-bold text-[#6fbf73]">지식</span>을 나누는 새로운 세상
                        </span>
                        <span className=" font-medium text-gray-700 mobile:text-lg">
                            온라인 멘토링 매칭을 통해 지식을 나누세요!
                        </span>
                        <span className="text-sm text-gray-600 mobile:text-base">
                            우리대학 선배, 후배도 찾아보세요!
                        </span>
                    </div>
                </div>
                <div className="flex w-full flex-row justify-center ">
                    <HomeSearch />
                </div>
            </div>
            <HomeMain />
        </div>
        // </HydrationBoundary>
    );
}

export default HomePage;
