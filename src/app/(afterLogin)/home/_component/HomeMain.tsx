import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react';
import MentoPosts from './MentoPosts';
import MenteePosts from './MenteePosts';
import SideBar_R from '../../_component/layout/sideBar_R';
import Axios from '@/app/util/axiosInstance';
import { auth } from '@/auth';
import { getSession } from 'next-auth/react';
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
export async function getMenteePosts() {
    // try {
    //     let params = {
    //         boardType: 'MENTEE',
    //         page: 1,
    //         size: 16,
    //     };
    //     const res = await Axios.get('/api/boards', { params });
    //     return res.data;
    // } catch (err) {
    //     console.log(err);
    //     throw new Error('Error occured while fetching posts.');
    // }
}
async function HomeMain() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mento'],
        queryFn: getMentoPosts,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mentee'],
        queryFn: getMenteePosts,
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
            <div className=" mx-auto   max-w-[1600px]   ">
                <div className="flex  flex-row">
                    <div className=" w-full px-3 sm:px-6 lg:w-[calc(100%-240px)]">
                        {/* Centered Container */}

                        <div className=" mt-3 flex w-full flex-col px-6">
                            {/* Category Header */}
                            <div className="mb-4 flex w-full items-start    font-semibold">
                                <span className=" w-2/12 min-w-32 text-xl font-semibold ">카테고리</span>
                            </div>

                            {/* Category Items */}
                            <div className="flex w-full flex-wrap items-center gap-5 pl-6">
                                {/* map function for categories */}
                                {categories.map((category, index) => (
                                    <div key={index} className="cursor-pointer border p-2 text-lg font-semibold shadow">
                                        {category}
                                    </div>
                                ))}
                            </div>

                            <MentoPosts />

                            <MenteePosts />
                        </div>
                    </div>
                    <div className="   hidden     w-60 md:flex">
                        <div className=" sticky top-[90px]  mt-[calc(50vh-296px)] box-border flex  h-fit  flex-col items-center gap-6    ">
                            <div className="  h-60 w-56 rounded-lg bg-slate-200  text-center">멘토순위</div>
                            <div className="  h-60 w-56 rounded-lg bg-slate-200 text-center">멘티순위</div>
                        </div>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
}

export default HomeMain;
