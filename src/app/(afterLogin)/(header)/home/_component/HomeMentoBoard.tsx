'use client';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import MultiCarousel from './MultiCarousel';
import { useHomeMentorPostsQeury } from '../_lib/homeService';
import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';

export default function HomeMentoBoard() {
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
        <section className="flex flex-col ">
            <Link className="mb-3 flex w-full flex-row items-end justify-between  pt-12  " href="/posts/mentor">
                <span className="text-xl font-medium text-neutral-700">멘토들의 지식 공유</span>
                {/* <ArrowRightIcon className="ml-2 h-8 w-8 text-neutral-700" /> */}
                <span className="text-sm font-extralight text-neutral-600">더보기 +</span>
            </Link>
            {isPending && <Loading className="h-[278px]" description="멘토링 데이터를 불러오는중입니다..." />}

            {mentorPosts && (
                <MultiCarousel>
                    {mentorPosts?.data.map((post, index) => (
                        <MentoPostCard post={post} key={post.boardId} queryKeys={['posts', 'mento', 'home']} />
                    ))}
                </MultiCarousel>
            )}
        </section>
    );
}
