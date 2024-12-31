import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsRequests from './_component/PostsRequests';
import FilterNav from '../_component/postsNav/FilterNav';
import { auth } from '@/auth';
import { getSubBoardsPosts } from '../_lib/qeustOrRequestService';
import { REQUEST_SUBBOARD_QUERYKEY } from '@/app/queryKeys/keys';

export const metadata = {
    title: '멘토 찾기',
};
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};
export default async function RequestsPage({ searchParams }: Props) {
    const session = await auth();
    const { page: pageParam } = searchParams;
    const page = pageParam || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [...REQUEST_SUBBOARD_QUERYKEY, Number(page), 15, '', '', false, false],
        queryFn: () =>
            getSubBoardsPosts({
                pageParam: Number(page),
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
