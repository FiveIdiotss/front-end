'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
type Props = {
    children: React.ReactNode;
};
const CATEGORY_LIST = [
    {
        url: '/posts/mentor',
        name: '멘토링',
    },
    {
        url: '/posts/mentor-requests',
        name: '멘토링 요청',
    },
    {
        url: '/posts/open-questions',
        name: '자유질문',
    },
];

export default function PostsLayout({ children }: Props) {
    const pathName = usePathname();

    return (
        // Wrapper

        <div className=" w-dvh flex   h-dvh flex-col  bg-gray-50 ">
            {/* Home */}
            <div className="w-dvh sticky top-[69px] z-[2]  flex justify-center border-b bg-white">
                <div className=" flex h-10 w-full max-w-[1300px]    ">
                    {CATEGORY_LIST.map((category) => (
                        <Link
                            href={category.url}
                            key={category.name}
                            className={` ${pathName === category.url ? ' text-primary' : 'text-neutral-600'} flex h-full items-center px-3   font-medium hover:text-primary `}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            {children}
        </div>
    );
}
