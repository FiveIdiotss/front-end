import { MentorBoardDTOType, MentorResponseType } from '@/app/Models/mentorType';
import { getBookmark } from '@/app/(afterLogin)/_lib/BookmarkService';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProfilePostsContent from './ProfilePostsContent';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import SimplePagination from '@/app/(afterLogin)/_component/common/SimplePagination';
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
    } = useQuery<MentorResponseType>({
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
                {bookmarksData?.data.map((post: MentorBoardDTOType) => (
                    <div key={post.boardId} onClick={() => handleModalOpen(post.boardId)}>
                        <MentoPostCard
                            post={post}
                            queryKeys={['posts', 'mento', 'user', 'bookMark', String(pageParam)]}
                        />
                    </div>
                ))}
            </div>
            {boardId && <ProfilePostsContent boardId={boardId} onClose={handleModalClose} />}
            <SimplePagination totalPages={bookmarksData?.pageInfo.totalPages || 1} />
        </>
    );
}

export default ProfileBookMark;
