import { MentorBoardDTOType, MentorResponseType } from '@/app/Models/mentorType';
import React, { useState } from 'react';
import MentoPostCard from '@/app/_component/postsCard/MentoPostCard';
import SimplePagination from '@/app/_component/common/SimplePagination';
import { useSearchParams } from 'next/navigation';
import { useMemberBookmarksQuery } from '../../_lib/profileService/profileBookmarksService';
import EmptyDataUI from '@/app/_component/EmptyDataUI';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';

function ProfileBookMark({ isLogin }: { isLogin: boolean }) {
    const [boardId, setBoardId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택

    const memberBookmarksQuery = useMemberBookmarksQuery();
    const { data: bookmarksData, isPending, error, refetch } = memberBookmarksQuery;

    if (isPending) return <Loading description="북마크 목록을 불러오는 중입니다." className="min-h-72" />;
    if (error)
        return (
            <ErrorDataUI
                text={error.response?.data.message || '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.'}
                onReset={refetch}
            />
        );

    return (
        <>
            {bookmarksData?.pageInfo.totalElements === 0 && <EmptyDataUI text="작성한 게시글이 없습니다." />}

            <div className=" my-5 grid   w-full grid-cols-2 gap-2 mobile:grid-cols-3  ">
                {bookmarksData?.data.map((post: MentorBoardDTOType) => (
                    <div key={post.boardId}>
                        <MentoPostCard
                            post={post}
                            queryKeys={['posts', 'mento', 'user', 'bookMark', String(pageParam)]}
                            isLogin={isLogin}
                        />
                    </div>
                ))}
            </div>
            <SimplePagination totalPages={bookmarksData?.pageInfo.totalPages || 1} />
        </>
    );
}

export default ProfileBookMark;
