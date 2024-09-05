'use client';
import HomeIcon from '@/app/_icons/Menu/HomeIcon';
import BoardIcon from '@/app/_icons/common/BoardIcon';
import ChatIcon from '@/app/_icons/common/ChatIcon';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { MouseEvent, TouchEvent, useEffect, useState } from 'react';
import MobileEdit from './MobileEdit';
import MobilePosts from './MobilePosts';

type TabsProps = '홈' | '채팅' | '게시글' | '작성하기' | '';
type ModalTap = '게시글' | '작성하기' | null;

function MobileNav() {
    const [isActive, setIsActive] = useState<TabsProps>('홈');
    const [modalClicked, setModalClicked] = useState<ModalTap>();
    const pathName = usePathname();

    const determineActiveTab = () => {
        if (pathName === '/home') return '홈';
        if (pathName.startsWith('/chat')) return '채팅';
        if (pathName.startsWith('/posts')) return '게시글';
        if (pathName.startsWith('/post/new')) return '작성하기';
        return '';
    };

    useEffect(() => {
        if (modalClicked) {
            setModalClicked(null);
        }
        setIsActive(determineActiveTab());
    }, [pathName]);

    useEffect(() => {
        if (modalClicked) {
            setIsActive(modalClicked);
        } else {
            setIsActive(determineActiveTab());
        }
    }, [modalClicked]);

    return (
        <div className="fixed bottom-0 z-[1002] flex w-full flex-col mobile:hidden">
            {modalClicked && (
                <div
                    onClick={() => setModalClicked(null)}
                    className="flex h-[calc(100dvh-16px)] w-dvw items-end bg-black bg-opacity-30"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-slide-up w-full overflow-hidden rounded-t-md bg-white shadow-sm-top"
                    >
                        {modalClicked === '작성하기' && <MobileEdit />}
                        {modalClicked === '게시글' && <MobilePosts />}
                    </div>
                </div>
            )}
            <nav
                className={`z-20 flex  h-16 w-full flex-shrink-0 flex-row items-center justify-between border-t bg-white  px-10 shadow-sm-top  mobile:hidden  `}
            >
                <Link
                    href="/home"
                    className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '홈' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                >
                    <HomeIcon className=" h-6 w-6 " isActive={isActive === '홈'} />
                    <span>홈</span>
                </Link>
                <Link
                    href="/chat"
                    className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '채팅' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                >
                    <ChatIcon className=" h-6 w-6" isActive={isActive === '채팅'} />
                    <span>채팅</span>
                </Link>
                <button
                    onClick={() => setModalClicked(modalClicked === '게시글' ? null : '게시글')}
                    className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '게시글' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                >
                    <BoardIcon className=" h-6 w-6" isActive={isActive === '게시글'} />
                    <span>게시글</span>
                </button>

                <button
                    onClick={() => setModalClicked(modalClicked === '작성하기' ? null : '작성하기')}
                    className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '작성하기' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                >
                    <PencilIcon className=" h-6 w-6" />
                    <span>작성하기</span>
                </button>
            </nav>
        </div>
    );
}

export default MobileNav;
