'use client';

import React, { useEffect, useState } from 'react';
import MentoPostCard from '../../_component/MentoPostCard';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { MentoContent, MentoPosts, fetchMentorPosts } from '../_lib/posts';
import Loading from '@/app/_component/Loading';
import Pagination from '../_component/Pagination';

// const mentorPosts = Array.from({ length: 200 }, (_, i) => `title ${i + 1}`);

export default function MentorsDetail() {
    const [page, setPage] = useState<number>(1); //현제 페이지

    const { data, isLoading, isError } = useQuery<MentoPosts>({
        queryKey: ['mentorPosts', page],
        queryFn: () => fetchMentorPosts(page),
    }); //이후 캐시처리 필요!

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);
    const [startPage, setStartPage] = useState<number>(2); //시작 페이지

    if (isLoading) return <Loading />; //로딩중 div 반환
    if (isError) return <span className="font-bold text-red-500">에러 발생</span>; //에러 발생 div 반환

    return (
        <div className="flex  flex-col items-center justify-center  pb-10 pt-6">
            <div className="grid w-full grid-cols-2 gap-4 px-3 md:grid-cols-3 lg:grid-cols-4">
                {data?.data.map((post: MentoContent) => (
                    <Link key={post.boardId} href={`/posts/mentor/mento_Id/${post.boardId}`} scroll={false}>
                        <MentoPostCard post={post} />
                    </Link>
                ))}
            </div>

            {/* 페이지네이션 */}
            <Pagination
                page={page}
                setPage={setPage}
                startPage={startPage}
                setStartPage={setStartPage}
                totalPages={data!.pageInfo.totalPages}
            />
        </div>
    );
}
