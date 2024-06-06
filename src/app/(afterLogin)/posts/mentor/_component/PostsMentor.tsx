'use client';

import React, { use, useEffect, useState } from 'react';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMentorPosts } from '../_lib/posts';
import Loading from '@/app/_component/Loading';
import Pagination from '../../_component/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MentoContentType, MentoPostsType } from '@/app/(afterLogin)/Models/mentoPostsType';

export default function PostsMentor() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || ''; //카테고리 선택
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const searchParam = searchParams.get('search') || ''; //검색어
    const schoolFilter = Boolean(searchParams.get('schoolFilter')) || false; //학교필터
    const starParam = Boolean(searchParams.get('star')) || false; //북마크 필터
    const id = searchParams.get('id'); //id가 있을때 해당 id 상페모달로 이동
    useEffect(() => {
        console.log('categoryParam', categoryParam);
    }, [categoryParam]);

    const {
        data: mentoPostsData,
        isLoading: mentoPostsIsLoading,
        isError: mentoPostsIsError,
    } = useQuery<MentoPostsType>({
        queryKey: [
            'posts',
            'mento',
            'main',
            String(pageParam),
            categoryParam,
            searchParam,
            String(schoolFilter),
            String(starParam),
        ],
        queryFn: () =>
            fetchMentorPosts({
                pageParam,
                size: 24,
                categoryParam,
                searchParam,
                isSchool: schoolFilter,
                isStar: starParam,
            }),
    }); //이후 캐시처리 필요!
    // const {
    //     data: bookmarksData,
    //     isLoading: bookmarksIsLoading,
    //     isError: bookmarksIsError,
    //     error: bookmarksError,
    // } = useQuery<Bookmarks>({
    //     queryKey: ['bookmarks'],
    //     queryFn: () => getBookmark(1),
    // }); //북마크 데이터

    useEffect(() => {
        if (mentoPostsData) {
            console.log(mentoPostsData);
        }
    }, [mentoPostsData]);
    // useEffect(() => {
    //     if (bookmarksData) {
    //         console.log(' 북마크 boardIds ', bookmarksData);
    //     }
    // }, [bookmarksData]);

    // useEffect(() => {
    //     console.log('북마크 에러', bookmarksError);
    // }, [bookmarksError]);
    useEffect(() => {
        if (id) {
            router.push(`/posts/mentor/mento_Id/${id}`);
        }
    }, []);

    if (mentoPostsIsLoading) return <Loading />; //로딩중 div 반환
    if (mentoPostsIsError) return <span className="font-bold text-red-500">에러 발생</span>; //에러 발생 div 반환

    return (
        <div className="flex  flex-1  flex-col items-center justify-between  pt-1">
            <div className="grid w-full grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
                {mentoPostsData?.data.map((post: MentoContentType) => (
                    <MentoPostCard
                        post={post}
                        key={post.boardId}
                        queryKeys={[
                            'posts',
                            'mento',
                            'main',
                            String(pageParam),
                            categoryParam,
                            searchParam,
                            String(schoolFilter),
                            String(starParam),
                        ]} //쿼리키, 북마크 옵티미스틱 업데이트를 위해
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination page={pageParam} totalPages={mentoPostsData!.pageInfo.totalPages} />
        </div>
    );
}
