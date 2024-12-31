import { Metadata } from 'next';
import PostsQuests from './_component/PostsQuests';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import FilterNav from '../_component/postsNav/FilterNav';
import { auth } from '@/auth';
import { getSubBoardsPosts } from '../_lib/qeustOrRequestService';
import { createSubBoardPostsKey } from '@/app/queryKeys/subBoardKey';
import { QUEST_SUBBOARD_QUERYKEY } from '@/app/queryKeys/keys';

export const metadata: Metadata = {
    title: '자유 질문',
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
        queryKey: [...QUEST_SUBBOARD_QUERYKEY, Number(page), 15, '', '', false, false],
        queryFn: () =>
            getSubBoardsPosts({
                pageParam: Number(page),
                size: 15,
                categoryParam: '',
                searchParam: '',
                isSchool: false,
                subBoardType: 'QUEST',
                isStar: false,
            }),
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <FilterNav isLogin={Boolean(session)} />
            <PostsQuests />
        </HydrationBoundary>
    );
}
