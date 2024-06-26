'use client';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import React, { useEffect, useState } from 'react';
import SimplePagination from '../SimplePagination';
import { useQuery } from '@tanstack/react-query';
import { getProfilePosts } from '../_lib/profilePosts';
import { MentoContentType, MentoPostsType } from '@/app/(afterLogin)/Models/mentoPostsType';
import Loading from '@/app/_component/Loading';
import { useSearchParams } from 'next/navigation';

function ProfilePosts() {
    const searchParams = useSearchParams();

    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택

    const {
        data: myPosts,
        isLoading: myPostsIsLoading,
        isError: myPostsIsError,
    } = useQuery<MentoPostsType>({
        queryKey: ['posts', 'mento', 'user', 'self', String(pageParam)],
        queryFn: () => getProfilePosts(pageParam, 6),
    });

    if (myPostsIsLoading)
        return (
            <div className="flex h-96 items-center justify-center">
                <Loading />
            </div>
        );
    return (
        <>
            <div className=" my-5 grid w-full grid-cols-2 gap-4 px-3 md:grid-cols-2 xl:grid-cols-3">
                {myPosts?.data.map((post: MentoContentType) => (
                    <MentoPostCard
                        post={post}
                        key={post.boardId}
                        queryKeys={['posts', 'mento', 'user', 'self', String(pageParam)]}
                    />
                ))}
            </div>
            {/* {boardId && <ProfilePostsContent boardId={boardId} onClose={handleModalClose} />} */}
            <SimplePagination page={pageParam} totalPages={myPosts?.pageInfo.totalPages || 1} />
        </>
    );
}

export default ProfilePosts;
