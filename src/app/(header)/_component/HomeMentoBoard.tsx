'use client';
import MentoPostCard from '@/app/_component/postsCard/MentoPostCard';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';
import { useHomeMentorPostsQeury } from '../_lib/homeService';
import { Session } from 'next-auth';
import HomeCategoryBar from './HomeCategoryBar';

export default function HomeMentoBoard({ session }: { session: Session | null }) {
    const mentorPostsQeury = useHomeMentorPostsQeury();
    const { data: mentorPosts, error, isPending } = mentorPostsQeury;

    useEffect(() => {
        if (error) {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [error]);

    useEffect(() => {
        console.log('홈 멘토게시글 데이터', mentorPosts);
    }, [mentorPosts]);

    return (
        <section className="flex flex-col gap-2 ">
            {/* <Link
                className="mb-3 flex w-full flex-row items-end justify-between rounded-lg  border-y bg-opacity-70 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50"
                href="/posts/mentor"
            >
                <div className="flex h-14 w-full  flex-row items-center gap-4 ">
                    <div className="rounded-md border p-1 shadow-sm">
                        <ShackHandsIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col ">
                        <span className=" font-semibold  mobile:text-lg">멘토링</span>
                        <span className="text-sm text-gray-500">많은 사람들이 지식을 나누고 있어요</span>
                    </div>
                    <div className="flex flex-grow justify-end">
                        <ArrowRightIcon className="ml-10 h-6 w-6  text-gray-400" />
                    </div>
                </div>
            </Link> */}
            <HomeCategoryBar />

            {isPending && <Loading className="h-[278px]" description="멘토링 데이터를 불러오는중입니다..." />}
            <div className="w-full mobile:hidden">
                {mentorPosts && (
                    <Swiper
                        spaceBetween={10} // 슬라이드 간의 간격
                        slidesPerView={1.2} // 한 화면에 보이는 슬라이드 수
                        breakpoints={{
                            // 작은 화면에서는 한 개만 보여줌
                            579: {
                                slidesPerView: 2.2, // 화면 크기가 320px 이상이면 한 개 슬라이드
                                spaceBetween: 10,
                            },
                            // 중간 화면에서는 한 개와 반 개 슬라이드 표시
                            // 768: {
                            //     slidesPerView: 1.5, // 화면 크기가 768px 이상이면 1.5개의 슬라이드
                            //     spaceBetween: 15,
                            // },
                            // // 큰 화면에서는 2개와 반 개 슬라이드 표시
                            // 1024: {
                            //     slidesPerView: 1.5, // 화면 크기가 1024px 이상이면 1.5개의 슬라이드
                            //     spaceBetween: 20,
                            // },
                        }}
                    >
                        {isPending &&
                            [...Array(5)].map((_, index) => (
                                <div className="bg-gradient-1 h-[300px] rounded-md "></div>
                            ))}
                        {mentorPosts?.data.map((post, index) => (
                            <SwiperSlide style={{ width: '100%' }}>
                                <MentoPostCard
                                    isLogin={Boolean(session)}
                                    post={post}
                                    key={post.boardId}
                                    queryKeys={['posts', 'mento', 'home']}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            <div className="hidden  w-full mobile:block ">
                <div className="grid w-full grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
                    {mentorPosts?.data.map((post, index) => (
                        <MentoPostCard
                            isLogin={Boolean(session)}
                            post={post}
                            key={post.boardId}
                            queryKeys={['posts', 'mento', 'home']}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
