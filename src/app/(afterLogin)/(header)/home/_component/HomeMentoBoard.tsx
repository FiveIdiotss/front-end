'use client';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import Link from 'next/link';
import React, { useEffect } from 'react';
import MultiCarousel from './MultiCarousel';
import { useHomeMentorPostsQeury } from '../_lib/homeService';
import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';
import FocusIcon from '@/app/_icons/Menu/FocusIcon';
import ShackHandsIcon from '@/app/_icons/Menu/ShackHandsIcon';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';

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
        <section className="flex flex-col">
            <Link className="mb-3 flex w-full  flex-row items-end justify-between   " href="/posts/mentor">
                <div className="flex h-14 w-full  flex-row items-center gap-4 ">
                    <div className="rounded-md border p-1 shadow-sm">
                        <ShackHandsIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col ">
                        <span className=" font-semibold  mobile:text-lg">멘토링</span>
                        <span className="text-sm text-gray-500">많은 사람들이 지식을 나누고 있어요</span>
                    </div>
                    <div className="flex flex-grow justify-end">
                        <ArrowRightIcon className="ml-10 h-6 w-6  text-gray-400" />
                    </div>
                </div>
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
