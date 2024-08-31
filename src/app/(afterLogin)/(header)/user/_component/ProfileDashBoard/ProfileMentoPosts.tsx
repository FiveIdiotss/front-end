'use client';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import React, { useEffect, useState } from 'react';
import SimplePagination from '@/app/(afterLogin)/_component/common/SimplePagination';
import { useQuery } from '@tanstack/react-query';
import { useMemberPostsQuery } from '../../_lib/profileService/profileMentoPostsService';
import { MentorBoardDTOType, MentorResponseType } from '@/app/Models/mentorType';

import Loading from '@/app/_component/Loading';
import { useSearchParams } from 'next/navigation';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import EmptyDataUI from '@/app/_component/EmptyDataUI';

function ProfileMentoPosts() {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1;

    const profilePostsQuery = useMemberPostsQuery();
    const { data: mentorPostsData, isPending, error, refetch } = profilePostsQuery;

    if (isPending) return <Loading description="작성된 글을 불러오는 중입니다." className="min-h-72" />;
    if (error)
        return (
            <ErrorDataUI
                text={error.response?.data.message || '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.'}
                onReset={refetch}
            />
        );

    return (
        <>
            {mentorPostsData?.pageInfo.totalElements === 0 && <EmptyDataUI text="작성한 게시글이 없습니다." />}
            <div className=" my-5 grid w-full grid-cols-2 gap-2 mobile:grid-cols-3  ">
                {mentorPostsData?.data.map((post: MentorBoardDTOType) => (
                    <MentoPostCard
                        post={post}
                        key={post.boardId}
                        queryKeys={['posts', 'mento', 'user', 'self', String(pageParam)]}
                    />
                ))}
            </div>
            {/* {boardId && <ProfilePostsContent boardId={boardId} onClose={handleModalClose} />} */}
            <SimplePagination totalPages={mentorPostsData?.pageInfo.totalPages || 1} />
        </>
    );
}

export default ProfileMentoPosts;
