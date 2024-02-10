import AddBtn from '../_component/homePage/addBtn';
import { useSession } from 'next-auth/react';
import IDollar from '../_component/icon/iDollar';
import SideBar_R from '../_component/layout/sideBar_R';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import Axios from '@/app/util/axiosInstance';
import MentoPosts from './_component/MentoPosts';
import MenteePosts from './_component/MenteePosts';
async function getPosts() {
    // try {
    //     let params = {
    //         boardType: 'MENTEE',
    //         page: 1,
    //         size: 10,
    //     };
    //     const res = await Axios.get('/api/boards', { params });
    //     return res.data;
    // } catch (err) {
    //     console.log(err);
    //     throw new Error('Error occured while fetching posts.');
    // }
}

export default async function Home() {
    // const { data: session, status } = useSession();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'mento'],
        queryFn: getPosts,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });
    const dehydratedState = dehydrate(queryClient);
    //queryClient.getQueryData(['posts', 'recommends']);

    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }
    // if (status === 'unauthenticated') {
    //     return <p>로그인이 필요합니다.</p>;
    // }

    const categories = ['상경대', '이공대', '보과대', '교대', 'category 5', 'category 6', 'category 7'];

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex w-full flex-row">
                <div className=" mt-5 flex flex-grow flex-col  items-start  ">
                    {/* Centered Container */}
                    <div className="flex w-full items-center justify-center">
                        {/* Search */}
                        <div className="flex h-14 w-full max-w-2xl items-center justify-center  rounded-lg border ">
                            <span className="">검색 창</span>
                            {/*  search bar  */}
                        </div>
                    </div>
                    <div className="mt-20 flex w-full flex-col px-6">
                        {/* Category Header */}
                        <div className="mb-2 flex w-full  items-start bg-white font-semibold">
                            <span className=" w-2/12 min-w-32 ">카테고리</span>
                        </div>

                        {/* Category Items */}
                        <div className="flex w-full items-center gap-5">
                            {/* map function for categories */}
                            {categories.map((category, index) => (
                                <div key={index} className="cursor-pointer border p-2 text-lg font-semibold shadow">
                                    {category}
                                </div>
                            ))}
                        </div>

                        <span className="mb-3 pl-6 pt-12 font-semibold">멘티 글</span>
                        <MentoPosts />

                        <span className="mb-3 pl-6 pt-12 font-semibold">멘티 글</span>
                        <MenteePosts />
                    </div>
                </div>
                <div className=" flex w-60 flex-col ">
                    <div className=" flex h-dvh w-full flex-col  border-l border-slate-100 px-5">
                        <SideBar_R /> {/* SideBar_R */}
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
}
// {/* 편집 & 추가 버튼 */}
// <AddBtn />
