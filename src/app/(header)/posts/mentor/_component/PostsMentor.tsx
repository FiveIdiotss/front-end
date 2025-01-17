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
import { Session } from 'next-auth';
import { MENTOR_QUERYKEY } from '@/app/queryKeys/keys';
import { usePostsParam } from '../../utils/usePostsParam';

export default function PostsMentor({ session }: { session?: Session | null }) {
    const { keys: paramKeys } = usePostsParam(); //params 쿼리키 가져오기
    const mentorPostsQuery = useMentorPostsQuery();
    const { data: mentorPostsData, isPending: isMentorPostsPending, error: mentorPostsError } = mentorPostsQuery;

    useEffect(() => {
        if (mentorPostsError) {
            console.log('멘토링 데이터를 불러오는데 실패했습니다.');
            pushNotification({
                msg: mentorPostsError.data?.message || '멘토링 데이터를 불러오는데 실패했습니다.',
                type: 'error',
                theme: 'light',
            });
        }
    }, [mentorPostsError]); //에러 발생시 에러메세지 출력

    if (isMentorPostsPending)
        return <Loading className="h-[278px]" description="멘토링 데이터를 불러오는중입니다..." />; //로딩중 div 반환

    return (
        <div className="flex  flex-1  flex-col items-center justify-between  pt-1">
            <div className="grid w-full grid-cols-2 gap-2 mobile:gap-4  md:grid-cols-3 lg:grid-cols-4">
                {mentorPostsData?.data.map((post: MentorBoardDTOType) => (
                    <MentoPostCard
                        isLogin={Boolean(session)}
                        post={post}
                        key={post.boardId}
                        queryKeys={[...MENTOR_QUERYKEY, ...paramKeys]} //쿼리키, 북마크 옵티미스틱 업데이트를 위해
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination totalPages={mentorPostsData!.pageInfo.totalPages} />
        </div>
    );
}
