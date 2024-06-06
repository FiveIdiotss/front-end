'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import Header from './_component/Header';
import FilterNav from './_component/postsNav/FilterNav';
type Props = {
    children: React.ReactNode;
};

export default function PostsLayout({ children }: Props) {
    const pathName = usePathname();

    return (
        // Wrapper

        <div className=" w-dvh flex   h-dvh flex-col  bg-gray-50 ">
            {/* Home */}
            <Header />

            <div className=" mx-auto flex w-full  max-w-[1300px] flex-1  flex-col   px-10 pb-10   ">
                <FilterNav />
                {children}
            </div>
        </div>
    );
}
