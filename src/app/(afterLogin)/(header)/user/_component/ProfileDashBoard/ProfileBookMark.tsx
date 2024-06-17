import { MentoContentType, MentoPostsType } from '@/app/(afterLogin)/Models/mentoPostsType';
import { getBookmark } from '@/app/(afterLogin)/_lib/BookmarkService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ProfilePostsContent from './ProfilePostsContent';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import SimplePagination from '../SimplePagination';
import { useSearchParams } from 'next/navigation';

function ProfileBookMark() {
    const [boardId, setBoardId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const {
        data: bookmarksData,
        isLoading: bookmarksIsLoading,
        isError: bookmarksIsError,
        error: bookmarksError,
    } = useQuery<MentoPostsType>({
        queryKey: ['posts', 'mento', 'user', 'bookMark', String(pageParam)],
        queryFn: () => getBookmark(pageParam, 6),
    }); //북마크 데이터

    const handleModalOpen = (boardId: number) => {
        setBoardId(boardId);
    };

    const handleModalClose = () => {
        setBoardId(null);
    };
    return (
        <>
            <div className=" my-5 grid w-full grid-cols-2 gap-4 px-3 md:grid-cols-2 xl:grid-cols-3">
                {bookmarksData?.data.map((post: MentoContentType) => (
                    <div key={post.boardId} onClick={() => handleModalOpen(post.boardId)}>
                        <MentoPostCard
                            post={post}
                            queryKeys={['posts', 'mento', 'user', 'bookMark', String(pageParam)]}
                        />
                    </div>
                ))}
            </div>
            {boardId && <ProfilePostsContent boardId={boardId} onClose={handleModalClose} />}
            <SimplePagination page={pageParam} totalPages={bookmarksData?.pageInfo.totalPages || 1} />
        </>
    );
}

export default ProfileBookMark;
