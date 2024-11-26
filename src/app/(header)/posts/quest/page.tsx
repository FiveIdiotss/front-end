import { Metadata } from 'next';
import PostsQuests from './_component/PostsQuests';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import FilterNav from '../_component/postsNav/FilterNav';
import { auth } from '@/auth';
import { getSubBoardsPosts } from '../_lib/qeustOrRequestService';
import { createSubBoardPostsKey } from '@/app/queryKeys/subBoardKey';
export const metadata: Metadata = {
    title: '자유 질문',
};
export default async function RequestsPage() {
    const session = await auth();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: createSubBoardPostsKey('QUEST', 1, 15, '', '', false, false),
        queryFn: () =>
            getSubBoardsPosts({
                pageParam: 1,
                size: 15,
                categoryParam: '',
                searchParam: '',
                isSchool: false,
                subBoardType: 'QUEST',
                isStar: false,
            }),

        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <FilterNav isLogin={Boolean(session)} />
            <PostsQuests />
        </HydrationBoundary>
    );
}
