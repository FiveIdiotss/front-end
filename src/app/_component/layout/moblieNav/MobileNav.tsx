'use client';
import HomeIcon from '@/app/_icons/Menu/HomeIcon';
import BoardIcon from '@/app/_icons/common/BoardIcon';
import ChatIcon from '@/app/_icons/common/ChatIcon';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { MouseEvent, TouchEvent, useEffect, useState } from 'react';
import MobileEdit from './MobileEdit';
import MobilePosts from './MobilePosts';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';
import { useScrollObserver } from '@/app/_hooks/useScrollObserver';

type TabsProps = '홈' | '채팅' | '게시글' | '작성하기' | '';
type ModalTap = '게시글' | '작성하기' | null;

function MobileNav({ isSigin }: { isSigin: boolean }) {
    const [isActive, setIsActive] = useState<TabsProps>('홈');
    const [modalClicked, setModalClicked] = useState<ModalTap>();
    const pathName = usePathname();
    const router = useRouter();
    const disabledMoblieNave = pathName.startsWith('/post/new') || pathName.startsWith('/post/edit');
    const isScrollVisible = useScrollObserver(70, 60); //스크롤에따라 투명도 조절

    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    }); //로그인이 필요한 페이지로 이동

    const determineActiveTab = () => {
        if (pathName === '/') return '홈';
        if (pathName.startsWith('/chat')) return '채팅';
        if (pathName.startsWith('/posts')) return '게시글';
        if (pathName.startsWith('/post/new')) return '작성하기';
        return '';
    }; //현재 경로에 따라 활성화된 탭을 반환

    const navigateToChat = (path: string) => {
        if (isSigin) {
            router.push(path);
        } else {
            navigateToLogin();
        }
    }; //로그인이 되어있으면 해당 경로로 이동, 로그인이 안되어있으면 로그인 페이지로 이동
    const navigateToPosts = () => {
        if (isSigin) {
            setModalClicked(modalClicked === '작성하기' ? null : '작성하기');
        } else {
            navigateToLogin();
        }
    }; //로그인이 되어있으면 해당 경로로 이동, 로그인이 안되어있으면 로그인 페이지로 이동

    useEffect(() => {
        if (modalClicked) {
            setModalClicked(null);
        }
        setIsActive(determineActiveTab());
    }, [pathName]); //경로가 변경될때마다 활성화된 탭을 변경

    useEffect(() => {
        if (modalClicked) {
            setIsActive(modalClicked);
        } else {
            setIsActive(determineActiveTab());
        }
    }, [modalClicked]); //모달이 열렸을때 활성화된 탭을 변경

    if (disabledMoblieNave) return null;

    return (
        <nav
            className={`  fixed bottom-0 z-[1002] flex  w-screen flex-col transition-opacity duration-500 ${isScrollVisible ? 'opacity-30' : 'opacity-100'}    mobile:hidden`}
        >
            {modalClicked && (
                <div
                    onClick={() => setModalClicked(null)}
                    className="flex h-[calc(100dvh-16px)] w-dvw items-end bg-black bg-opacity-30 "
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
                className={`space-x-   z-20 flex h-16 w-full flex-shrink-0  flex-row items-center   border-t  bg-white  shadow-sm-top  mobile:hidden  `}
            >
                <div className="flex flex-1 justify-center">
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '홈' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                    >
                        <HomeIcon className=" h-6 w-6 " isActive={isActive === '홈'} />
                        <span>홈</span>
                    </Link>
                </div>

                <div className="flex flex-1 justify-center">
                    <button
                        onClick={() => setModalClicked(modalClicked === '게시글' ? null : '게시글')}
                        className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '게시글' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                    >
                        <BoardIcon className=" h-6 w-6" isActive={isActive === '게시글'} />
                        <span>게시글</span>
                    </button>
                </div>
                <div className="flex flex-1 justify-center">
                    <button
                        onClick={navigateToPosts}
                        className={`flex flex-col items-center justify-center gap-1 text-xs  ${isActive === '작성하기' ? 'font-semibold text-primary' : 'text-gray-500'}`}
                    >
                        <PencilIcon className=" h-6 w-6" />
                        <span>작성하기</span>
                    </button>
                </div>
            </nav>
        </nav>
    );
}

export default MobileNav;
