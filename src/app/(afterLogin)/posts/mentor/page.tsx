'use client';

import React, { useEffect, useState } from 'react';
import FaChevronRight from '../../_component/icon/chevronRight';
import FaChevronLeft from '../../_component/icon/chevronLeft';
import MentoPostCard from '../../_component/MentoPostCard';
import Link from 'next/link';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import Axios from '@/app/util/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { MentoContent, MentoPosts, fetchMentorPosts } from '../_lib/posts';
import Loading from '@/app/_component/Loading';

// const mentorPosts = Array.from({ length: 200 }, (_, i) => `title ${i + 1}`);

export default function MentorsDetail() {
    const [page, setPage] = useState<number>(1); //현제 페이지

    const { data, isLoading, isError } = useQuery<MentoPosts>({
        queryKey: ['mentorPosts', page],
        queryFn: () => fetchMentorPosts(page),
    }); //이후 캐시처리 필요!
    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);
    const [startPage, setStartPage] = useState<number>(2); //시작 페이지
    const handlePrevClick = () => {
        setStartPage(startPage - 6);
        setPage(startPage - 6);
    };

    // 다음 버튼을 클릭했을 때의 처리
    const handleNextClick = () => {
        setStartPage(startPage + 6);
        setPage(startPage + 6);
    };

    if (isLoading) return <Loading />; //로딩중 div 반환
    if (isError) return <span className="font-bold text-red-500">에러 발생</span>; //에러 발생 div 반환

    return (
        <div className="flex  flex-col items-center justify-center  pb-10 pt-6">
            <div className="grid w-full grid-cols-2 gap-4 px-3 md:grid-cols-3 lg:grid-cols-4">
                {data?.data.map((post: MentoContent) => (
                    <Link key={post.boardId} href={`/posts/mentor/mento_Id/${1}`} scroll={false}>
                        <MentoPostCard post={post} />
                    </Link>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-4 flex flex-row gap-2">
                {/* 이전페이지 */}
                <button
                    onClick={() => {
                        handlePageChange(page - 1);
                    }}
                    className="mr-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 text-sm hover:border-neutral-500 disabled:opacity-30"
                    disabled={page === 1}
                >
                    <span className="text-xs text-neutral-800">이전 페이지</span>
                </button>

                {/* 첫페이지 */}
                <button
                    onClick={() => {
                        handlePageChange(1);
                        setStartPage(2);
                    }}
                    className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === 1 ? ' bg-primary bg-opacity-80 text-white' : ''}`}
                >
                    1
                </button>

                {/* 가려진 이전페이지 */}
                <button
                    onClick={handlePrevClick}
                    className={`h-7 w-7 rounded-md border border-neutral-300 font-light hover:border-neutral-600 ${page === 1 ? ' bg-primary bg-opacity-80 text-white' : ''} ${page < 8 ? 'hidden' : ''}`}
                >
                    {`...`}
                </button>

                {Array.from(
                    { length: Math.min(6, data!.pageInfo.totalPages - startPage) },
                    (_, i) => startPage + i,
                ).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === pageNum ? ' bg-primary bg-opacity-80 text-white' : ''}`}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* 가려진 다음페이지 */}
                <button
                    onClick={handleNextClick}
                    className={`h-7 w-7 rounded-md border border-neutral-300 font-light hover:border-neutral-600  ${page === data?.pageInfo.totalPages ? ' bg-primary bg-opacity-80 text-white' : ''} ${data!.pageInfo.totalPages - startPage < 6 ? 'hidden' : ''}`}
                >{`...`}</button>

                {/* 마지막페이지  */}
                <button
                    onClick={() => {
                        handlePageChange(data!.pageInfo.totalPages);
                        setStartPage(data!.pageInfo.totalPages - ((data!.pageInfo.totalPages - 2) % 6));
                    }}
                    className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === data?.pageInfo.totalPages ? ' bg-primary bg-opacity-80 text-white' : ''} ${data?.pageInfo.totalPages === 1 ? 'hidden' : ''}`}
                >
                    {data?.pageInfo.totalPages || 2}
                </button>

                {/* 다음페이지 */}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    className="ml-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 text-sm hover:border-neutral-500 disabled:opacity-30"
                    disabled={data?.pageInfo.totalPages === page}
                >
                    <span className="text-xs text-neutral-800">다음 페이지</span>
                </button>
            </div>
        </div>
    );
}
