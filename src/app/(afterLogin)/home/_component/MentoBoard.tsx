'use client';

import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MultiCarousel from './MultiCarousel';
import { useQuery } from '@tanstack/react-query';
import { fetchMentorPosts } from '../../posts/_lib/posts';
import { MentoPostsType } from '../../Models/mentoPostsType';
import ArrowRightIcon from '../../_component/icon/ArrowRightIcon';
import DotLoadingIcon from '../../_component/icon/DotLoadingIcon';

function MentoBoard() {
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const {
        data: mentorPosts,
        error,
        isLoading,
    } = useQuery<MentoPostsType>({
        queryKey: ['posts', 'mento', 'home'],
        queryFn: () => fetchMentorPosts(1, 15),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
    });

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDownPosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handleClick = (event: any) => {
        const moveX = Math.abs(mouseDownPosition.x - event.clientX);
        const moveY = Math.abs(mouseDownPosition.y - event.clientY);

        // 마우스가 조금이라도 움직였다면 클릭을 실행하지 않습니다.
        if (moveX > 0 || moveY > 0) {
            event.preventDefault();
        }
    };
    useEffect(() => {
        console.log(mentorPosts);
    }, [mentorPosts]);

    if (error) return <div className="text-red-500">{error.message}</div>;

    return (
        <section className="  flex w-full flex-col ">
            <Link className="mb-3 flex w-fit flex-row items-center  pt-12  " href="/posts/mentor">
                <span className="text-xl font-medium text-neutral-700">멘토들의 지식 공유</span>
                <ArrowRightIcon className="ml-2 h-8 w-8 text-neutral-700" />
            </Link>

            {isLoading && <DotLoadingIcon />}
            {mentorPosts && (
                <MultiCarousel>
                    {mentorPosts?.data.map((post, index) => (
                        <MentoPostCard post={post} key={post.boardId} queryKeys={['posts', 'mento', 'home']} />
                    ))}
                </MultiCarousel>
            )}
        </section>
    );
}

export default MentoBoard;
