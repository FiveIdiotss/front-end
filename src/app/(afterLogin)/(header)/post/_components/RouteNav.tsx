'use client';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import ListIcon from '@/app/_icons/common/ListIcon';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const LINKS = [
    { name: '요청글', link: '/posts/request' },
    { name: '멘토링', link: '/posts/mentor' },
    { name: '퀘스트', link: '/posts/quest' },
];

function RouteNav() {
    const router = useRouter();

    const pathName = usePathname();
    let routeUrl;
    if (pathName === '/post/new/request') {
        routeUrl = LINKS[0].link;
    } else if (pathName === '/post/new/mentor') {
        routeUrl = LINKS[1].link;
    } else {
        routeUrl = LINKS[2].link;
    }

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="   flex w-36 flex-col items-center ">
            <div className="sticky top-[170px] flex flex-col gap-9">
                <span
                    className=" flex h-11 w-11 rotate-45 cursor-pointer  items-center justify-center  rounded-md border  border-neutral-300  bg-white font-medium text-neutral-400 shadow-sm hover:bg-neutral-100 hover:text-neutral-500 "
                    onClick={handleBack}
                >
                    <ArrowLeftBackIcon className="h-5 w-5 -rotate-45 text-inherit" />
                </span>

                <Link
                    className=" flex h-11 w-11 rotate-45 cursor-pointer items-center justify-center  rounded-md border  border-neutral-300 bg-white font-medium  text-neutral-400  shadow-sm hover:bg-neutral-100 hover:text-neutral-500  "
                    href={routeUrl}
                >
                    <ListIcon className="h-5 w-5 -rotate-45 text-inherit" />
                </Link>
            </div>
        </div>
    );
}

export default RouteNav;
