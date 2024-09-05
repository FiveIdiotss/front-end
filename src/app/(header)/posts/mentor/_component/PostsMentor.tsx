'use client';

import React, { useEffect } from 'react';
import MentoPostCard from '@/app/_component/postsCard/MentoPostCard';
import Loading from '@/app/_component/Loading';
import Pagination from '@/app/_component/common/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMentorPostsQuery } from '../../_lib/mentorService';
import { MentorBoardDTOType } from '@/app/Models/mentorType';
import { pushNotification } from '@/app/util/pushNotification';
import { createMentorPostsKey } from '@/app/queryKeys/mentorKey';

export default function PostsMentor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || ''; //카테고리 선택
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const sizeParam = Number(searchParams.get('size')) || 24; //페이지 사이즈
    const searchParam = searchParams.get('search') || ''; //검색어
    const schoolFilter = Boolean(searchParams.get('schoolFilter')) || false; //학교필터
    const starParam = Boolean(searchParams.get('star')) || false; //북마크 필터

    const id = searchParams.get('id'); //id가 있을때 해당 id 상페모달로 이동

    const mentorPostsQuery = useMentorPostsQuery();
    const { data: mentorPostsData, isPending: isMentorPostsPending, error: mentorPostsError } = mentorPostsQuery;
    useEffect(() => {
        console.log('categoryParam', categoryParam);
    }, [categoryParam]);

    useEffect(() => {
        if (mentorPostsData) {
            console.log('멘토링 게시글 목록 데이터', mentorPostsData);
        }
    }, [mentorPostsData]);

    useEffect(() => {
        if (mentorPostsError) {
            console.log('멘토링 데이터를 불러오는데 실패했습니다.');
            pushNotification({
                msg: mentorPostsError.response?.data.message || '멘토링 데이터를 불러오는데 실패했습니다.',
                type: 'error',
                theme: 'light',
            });
        }
    }, [mentorPostsError]); //에러 발생시 에러메세지 출력

    useEffect(() => {
        if (id) {
            router.push(`/posts/mentor/mento_Id/${id}`);
        }
    }, []); //id가 있을때 해당 id 상세모달로 이동

    if (isMentorPostsPending)
        return <Loading className="h-[278px]" description="멘토링 데이터를 불러오는중입니다..." />; //로딩중 div 반환

    return (
        <div className="flex  flex-1  flex-col items-center justify-between  pt-1">
            <div className="grid w-full grid-cols-2 gap-2 mobile:gap-4  md:grid-cols-3 lg:grid-cols-4">
                {mentorPostsData?.data.map((post: MentorBoardDTOType) => (
                    <MentoPostCard
                        post={post}
                        key={post.boardId}
                        queryKeys={createMentorPostsKey(
                            pageParam,
                            sizeParam,
                            categoryParam,
                            searchParam,
                            schoolFilter,
                            starParam,
                        )} //쿼리키, 북마크 옵티미스틱 업데이트를 위해
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination totalPages={mentorPostsData!.pageInfo.totalPages} />
        </div>
    );
}
