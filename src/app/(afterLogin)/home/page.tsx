import AddBtn from '../_component/homePage/addBtn';
import { useSession } from 'next-auth/react';
import IDollar from '../_component/icon/iDollar';
import SideBar_R from '../_component/layout/sideBar_R';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
async function getPostRcommends() {}

export default async function Home() {
    // const { data: session, status } = useSession();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['posts', 'recommends'], queryFn: getPostRcommends });
    const dehydratedState = dehydrate(queryClient);
    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }
    // if (status === 'unauthenticated') {
    //     return <p>로그인이 필요합니다.</p>;
    // }

    const categories = ['상경대', '이공대', '보과대', '교대', 'category 5', 'category 6', 'category 7'];
    const mentorPosts = ['title 1', 'title 2', 'title 3', 'title 4', 'title 5'];
    const menteePosts = ['title 1', 'title 2', 'title 3', 'title 4', 'title 5'];

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex w-full flex-row">
                <div className=" mt-5 flex w-full  flex-col items-start justify-center space-y-10 ">
                    {/* Centered Container */}
                    <div className="flex w-full items-center justify-center">
                        {/* Search */}
                        <div className="flex h-14 w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg border shadow-md">
                            <span className="">검색 창</span>
                            {/*  search bar  */}
                        </div>
                    </div>

                    {/* Category Header */}
                    <div className="mb-2 flex w-full max-w-2xl items-start bg-white font-semibold">
                        <span className="h-full w-2/12 min-w-32 flex-shrink-0">카테고리</span>
                    </div>

                    {/* Category Items */}
                    <div className="flex items-center gap-5">
                        {/* map function for categories */}
                        {categories.map((category, index) => (
                            <div key={index} className="cursor-pointer border border-black p-2 text-lg font-semibold">
                                {category}
                            </div>
                        ))}
                    </div>

                    {/* Mentor Posts */}
                    <div className="pt-5 text-xl font-semibold">멘토 글</div>
                    <div className="flex gap-5">
                        {/* map function for mentor*/}
                        {mentorPosts.map((post, index) => (
                            <div key={index} className="h-24 w-2/12 min-w-32 flex-shrink-0 border border-black">
                                {post}
                            </div>
                        ))}
                    </div>

                    {/* Mentee Posts */}
                    <div className="pt-5 text-xl font-semibold">멘티 글</div>
                    <div className="flex gap-5">
                        {/* map function for mentee */}
                        {menteePosts.map((post, index) => (
                            <div key={index} className="h-24 w-2/12 min-w-32 flex-shrink-0 border border-black">
                                {post}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex h-full">
                    <div className=" flex h-dvh w-60 flex-col  border-l-2 border-slate-100 px-5">
                        <SideBar_R />
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
}
// {/* 편집 & 추가 버튼 */}
// <AddBtn />
