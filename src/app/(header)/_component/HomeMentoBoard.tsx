'use client';
import MentoPostCard from '@/app/_component/postsCard/MentoPostCard';
import Link from 'next/link';
import React, { useEffect } from 'react';
import MultiCarousel from './MultiCarousel';

import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';
import ShackHandsIcon from '@/app/_icons/Menu/ShackHandsIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
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
                    <MultiCarousel>
                        {mentorPosts?.data.map((post, index) => (
                            <MentoPostCard
                                isLogin={Boolean(session)}
                                post={post}
                                key={post.boardId}
                                queryKeys={['posts', 'mento', 'home']}
                            />
                        ))}
                    </MultiCarousel>
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
