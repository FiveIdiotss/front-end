import React from 'react';
import PostsMentor from './_component/PostsMentor';
import { auth } from '@/auth';
import { de } from '@faker-js/faker';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getMentorPosts } from '../_lib/mentorService';
import { createMentorPostsKey } from '@/app/queryKeys/mentorKey';
import FilterNav from '../_component/postsNav/FilterNav';
import Header from '../_component/Header';

export const metadata = {
    title: '멘토링',
    description:
        '전공, 취업, 대학생활 등 다양한 주제의 멘토링 게시글을 확인할 수 있습니다. 우리 대학의 멘토들이 제공하는 귀중한 조언과 경험을 통해 학업과 커리어를 더욱 발전시켜보세요. 선후배 간의 지식과 경험을 공유하며, 성공적인 대학생활과 취업 준비를 위한 유익한 정보를 얻어가세요. 지금 바로 멘토링 게시글을 확인하고, 여러분의 목표를 달성하는 데 필요한 인사이트를 얻어보세요.',
};

async function PostsMentoPage() {
    const session = await auth();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: createMentorPostsKey(1, 24, '', '', false, false),
        queryFn: () =>
            getMentorPosts({
                pageParam: 1,
                size: 24,
                isSchool: false,
                isStar: false,
            }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <FilterNav isLogin={Boolean(session)} />
            <PostsMentor session={session} />
        </HydrationBoundary>
    );
}

export default PostsMentoPage;
