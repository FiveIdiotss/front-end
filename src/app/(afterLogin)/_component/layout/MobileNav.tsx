'use client';
import HomeIcon from '@/app/_icons/Menu/HomeIcon';
import UserIcon from '@/app/_icons/Menu/UserIcon';
import BoardIcon from '@/app/_icons/common/BoardIcon';
import ChatIcon from '@/app/_icons/common/ChatIcon';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TabsProps = '홈' | '채팅' | '게시판' | '작성하기' | '';

function MobileNav() {
    const [isAtive, setIsActive] = useState<TabsProps>('홈');
    const pathName = usePathname();
    useEffect(() => {
        if (pathName === '/home') {
            setIsActive('홈');
        } else if (pathName.startsWith('/chat')) {
            setIsActive('채팅');
        } else if (pathName.startsWith('/posts')) {
            setIsActive('게시판');
        } else if (pathName.startsWith('/post/new')) {
            setIsActive('작성하기');
        } else {
            setIsActive('');
        }
    }, [pathName]);

    return (
        <nav
            className={`sticky bottom-0  z-20  flex h-16 w-full flex-shrink-0 flex-row items-center justify-between border-t  bg-white px-10  mobile:hidden  `}
        >
            <Link
                href="/"
                className={`flex flex-col items-center justify-center gap-1 text-xs  ${isAtive === '홈' ? 'font-semibold text-primary' : 'text-gray-500'}`}
            >
                <HomeIcon className=" h-6 w-6 " isActive={isAtive === '홈'} />
                <span>홈</span>
            </Link>
            <Link
                href="/chat"
                className={`flex flex-col items-center justify-center gap-1 text-xs  ${isAtive === '채팅' ? 'font-semibold text-primary' : 'text-gray-500'}`}
            >
                <ChatIcon className=" h-6 w-6" isActive={isAtive === '채팅'} />
                <span>채팅</span>
            </Link>
            <Link
                href="/posts/mentor"
                className={`flex flex-col items-center justify-center gap-1 text-xs  ${isAtive === '게시판' ? 'font-semibold text-primary' : 'text-gray-500'}`}
            >
                <BoardIcon className=" h-6 w-6" isActive={isAtive === '게시판'} />
                <span>게시판</span>
            </Link>

            <Link
                href="/post/new/mentor"
                className={`flex flex-col items-center justify-center gap-1 text-xs  ${isAtive === '작성하기' ? 'font-semibold text-primary' : 'text-gray-500'}`}
            >
                <PencilIcon className=" h-6 w-6" />
                <span>작성하기</span>
            </Link>
        </nav>
    );
}

export default MobileNav;
