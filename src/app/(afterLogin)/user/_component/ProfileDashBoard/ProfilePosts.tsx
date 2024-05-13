'use client';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import { MentoContent } from '@/app/(afterLogin)/posts/_lib/posts';
import Link from 'next/link';
import React, { useState } from 'react';
import SimplePagination from '../SimplePagination';
import { useQuery } from '@tanstack/react-query';
import { get } from 'http';
import { getProfilePosts } from '../_lib/profilePosts';
import ProfilePostsContent from './ProfilePostsContent';

function ProfilePosts() {
    const [page, setPage] = React.useState(1);
    const [boardId, setBoardId] = useState<number | null>(null);
    const handleModalOpen = (boardId: number) => {
        setBoardId(boardId);
    };

    const handleModalClose = () => {
        setBoardId(null);
    };
    const { data } = useQuery<MentoContent[]>({
        queryKey: ['mentoPosts', page],
        queryFn: () => getProfilePosts(page, 6),
    });
    return (
        <>
            <div className=" my-5 grid w-full grid-cols-2 gap-4 px-3 md:grid-cols-2 xl:grid-cols-3">
                {data?.map((post: MentoContent) => (
                    <div key={post.boardId} onClick={() => handleModalOpen(post.boardId)}>
                        <MentoPostCard post={post} />
                    </div>
                ))}
            </div>
            {boardId && <ProfilePostsContent boardId={boardId} onClose={handleModalClose} />}
            {/* <SimplePagination page={page} setPage={setPage} totalPages={data?.pageInfo.totalPages || 1} /> */}
        </>
    );
}

export default ProfilePosts;
