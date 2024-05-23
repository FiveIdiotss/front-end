'use client';

import React, { use, useEffect, useState } from 'react';
import MentoPostCard from '../../_component/MentoPostCard';
import Link from 'next/link';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMentorPosts } from '../_lib/posts';
import Loading from '@/app/_component/Loading';
import Pagination from '../_component/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MentoContentType, MentoPostsType } from '../../Models/mentoPostsType';

export default function PostsMentoMain() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || ''; //카테고리 선택
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const searchParam = searchParams.get('search') || ''; //검색어
    const schoolFilter = Boolean(searchParams.get('schoolFilter')) || false; //학교필터
    const id = searchParams.get('id'); //id가 있을때 해당 id 상페모달로 이동
    useEffect(() => {
        console.log('categoryParam', categoryParam);
    }, [categoryParam]);

    const {
        data: mentoPostsData,
        isLoading: mentoPostsIsLoading,
        isError: mentoPostsIsError,
    } = useQuery<MentoPostsType>({
        queryKey: ['posts', 'mento', 'main', categoryParam, String(pageParam), searchParam, String(schoolFilter)],
        queryFn: () => fetchMentorPosts(pageParam, 24, categoryParam, searchParam, schoolFilter),
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

    const [startPage, setStartPage] = useState<number>(2); //시작 페이지

    if (mentoPostsIsLoading) return <Loading />; //로딩중 div 반환
    if (mentoPostsIsError) return <span className="font-bold text-red-500">에러 발생</span>; //에러 발생 div 반환

    return (
        <div className="flex  flex-1  flex-col items-center justify-between   ">
            {/* 페이지 네이션 컴포넌트를 between을 사용해 위 아래로 벌림 */}
            <div className="grid w-full grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
                {mentoPostsData?.data.map((post: MentoContentType) => (
                    <MentoPostCard
                        post={post}
                        key={post.boardId}
                        queryKeys={[
                            'posts',
                            'mento',
                            'main',
                            categoryParam,
                            String(pageParam),
                            searchParam,
                            String(schoolFilter),
                        ]}
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination
                page={pageParam}
                startPage={startPage}
                setStartPage={setStartPage}
                totalPages={mentoPostsData!.pageInfo.totalPages}
            />
        </div>
    );
}
