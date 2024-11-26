import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsRequests from './_component/PostsRequests';
import FilterNav from '../_component/postsNav/FilterNav';
import { auth } from '@/auth';
import { createSubBoardPostsKey } from '@/app/queryKeys/subBoardKey';
import { getSubBoardsPosts } from '../_lib/qeustOrRequestService';
export const metadata = {
    title: '멘토 찾기',
};
export default async function RequestsPage() {
    const session = await auth();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: createSubBoardPostsKey('REQUEST', 1, 15, '', '', false, false),
        queryFn: () =>
            getSubBoardsPosts({
                pageParam: 1,
                size: 15,
                categoryParam: '',
                searchParam: '',
                isSchool: false,
                subBoardType: 'REQUEST',
                isStar: false,
            }),

        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });

    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
            <FilterNav isLogin={Boolean(session)} />
            <PostsRequests />
        </HydrationBoundary>
    );
}
