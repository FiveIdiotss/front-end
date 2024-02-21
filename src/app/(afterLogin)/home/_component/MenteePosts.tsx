'use client';
import MenteePostCard from '@/app/(afterLogin)/_component/MenteePostCard';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import nextImage from '@/../public/next.svg';
import MultiCarousel from './MultiCarousel';

const mentorPosts = [
    'title 1',
    'title 2',
    'title 3',
    'title 4',
    'title 5',
    'title 6',
    'title 7',
    'title 8',
    'title 9',
    'title 10',
    'title 11',
    'title 12',
    'title 13',
    'title 14',
    'title 15',
    'title 16',
]; //하드코딩 된 멘토 글

function MenteePosts() {
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });

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

    return (
        <section className="flex  w-full flex-col ">
            <Link className="mb-3 flex w-fit flex-row  pt-12 " href="/home">
                <span className="text-2xl font-semibold">멘티들이 이런지식들을 원해요</span>
                <Image src={nextImage} alt="mentee" />
            </Link>

            <MultiCarousel>
                {mentorPosts.map((post, index) => (
                    <Link
                        key={index}
                        onMouseDown={handleMouseDown}
                        onClick={handleClick}
                        href={`/home/mento_Id/${1}`}
                        draggable={false}
                        scroll={false}
                    >
                        <MenteePostCard key={index} post={post} />
                    </Link>
                ))}
            </MultiCarousel>
        </section>
    );
}

export default MenteePosts;
