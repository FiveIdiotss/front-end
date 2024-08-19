import React from 'react';
import HomeMain from './_component/HomeMain';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getHomeMentorPosts, getHomeQuestsOrRequests } from './_lib/homeService';

async function HomePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mento', 'home'],
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
            <HomeMain />
        </HydrationBoundary>
    );
}

export default HomePage;
