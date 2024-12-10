'use client';
import HotIcon from '@/app/_icons/common/HotIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

const HOT_TAGS = ['컴퓨터', 'Next.js', '애견', '호텔', '생물', '개발자', '면접', '취업', '편입'];

function HotKeywords() {
    const router = useRouter();

    const handleRoute = (tag: string) => {
        router.push(`/posts/mentor?search=${tag}`);
    };

    return (
        <div className="flex w-full flex-shrink-0 flex-col gap-4 rounded-md border border-neutral-300 p-3 ">
            <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">인기 태그</span>
                <HotIcon className="h-4 w-4 text-red-500" />
            </div>

            <div className="flex flex-row flex-wrap">
                {HOT_TAGS.map((tag) => (
                    <button
                        onClick={() => handleRoute(tag)}
                        type="button"
                        key={tag}
                        className=" m-1 cursor-pointer rounded-md bg-primary bg-opacity-15 px-2 py-1 text-sm text-neutral-700 hover:bg-opacity-10"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default HotKeywords;
