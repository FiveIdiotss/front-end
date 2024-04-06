'use client';
import MenteePostCard from '@/app/(afterLogin)/_component/MenteePostCard';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const array = Array.from({ length: 10 }, (_, i) => i + 1);

function page() {
    return (
        <div className="  flex h-full flex-col items-center justify-center ">
            {array.slice(0, 30).map((i, index) => (
                <div key={index}>{'*'.repeat(i)}</div>
            ))}
        </div>
    );
}

export default page;
