'use client';

import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import nextImage from '@/../public/next.svg';
import MultiCarousel from './MultiCarousel';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMentoPosts } from './HomeMain';
import { MentoPosts, fetchMentorPosts } from '../../posts/_lib/posts';
import Loading from '@/app/_component/Loading';

function MenteePosts() {
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const {
        data: mentorPosts,
        error,
        isLoading,
    } = useQuery<MentoPosts>({
        queryKey: ['posts', 'mento'],
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
    if (isLoading) return <Loading />;

    return (
        <section className="flex  w-full flex-col ">
            <Link className="mb-3 flex w-fit flex-row  pt-12 " href="/posts/mentor">
                <span className="text-2xl font-semibold">멘토들의 지식 공유</span>
                <Image src={nextImage} alt="mentee" />
            </Link>
            <MultiCarousel>
                {mentorPosts?.data.map((post, index) => (
                    <Link
                        key={index}
                        onMouseDown={handleMouseDown}
                        onClick={handleClick}
                        href={`/home/mento_Id/${post.boardId}`}
                        draggable={false}
                        scroll={false}
                    >
                        <MentoPostCard post={post} />
                    </Link>
                ))}
            </MultiCarousel>
        </section>
    );
}

export default MenteePosts;
