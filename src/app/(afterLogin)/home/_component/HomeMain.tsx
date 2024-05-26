import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react';
import MentoBoard from './MentoBoard';
import SideBar_R from '../../_component/layout/sideBar_R';
import Axios from '@/app/util/axiosInstance';
import { auth } from '@/auth';
import { getSession } from 'next-auth/react';
import SectionDivider from '../../_component/SectionDivider';
import QuestionBoard from './QuestionBoard';
import MentoringTopicRequestBoard from './MentoringTopicRequestBoard';
import HomeCategoryBar from './HomeCategoryBar';
import HotIcon from '../../_component/icon/HotIcon';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import RightSideBar from './RightSideBar';
export async function getMentoPosts() {
    try {
        let params = {
            boardType: 'MENTEE',
            page: 1,
            size: 16,
        };
        const res = await Axios.get('/api/boards', { params });
        return res.data;
    } catch (err) {
        console.log(err);
        throw new Error('Error occured while fetching posts.');
    }
}

async function HomeMain() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mento', 'home'],
        queryFn: getMentoPosts,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });

    const dehydratedState = dehydrate(queryClient);
    // queryClient.getQueryData(['posts', 'recommends']);

    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }
    // if (status === 'unauthenticated') {
    //     return <p>로그인이 필요합니다.</p>;
    // }

    const categories = ['상경대', '이공대', '보과대', '교대', 'category 5', 'category 6', 'category 7'];

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className=" mx-auto flex w-full  max-w-[1600px] flex-row gap-8   px-8 py-5  ">
                <div className=" flex flex-grow flex-col">
                    <HomeCategoryBar />
                    <MentoBoard />
                    <div className="mt-12 flex w-full flex-row gap-6">
                        <QuestionBoard />
                        <MentoringTopicRequestBoard />
                    </div>
                </div>
                <RightSideBar />
            </div>
        </HydrationBoundary>
    );
}

export default HomeMain;
