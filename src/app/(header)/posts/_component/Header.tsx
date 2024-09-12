'use client';
import { useScrollObserver } from '@/app/_hooks/useScrollObserver';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const CATEGORY_LIST = [
    {
        url: '/posts/mentor',
        name: '멘토링',
        intro: '멘토링에 신청하고 멘토와 함께 성장 해봐요!',
        icon: '👏',
    },
    {
        url: '/posts/request',
        name: '멘토 찾기',
        intro: '원하는 멘토링이 없다면 직접 찾아봐요!',
        icon: '🔍',
    },
    {
        url: '/posts/quest',
        name: '자유 질문',
        intro: '자유롭게 질문을 올리고 소통해보세요!',
        icon: '🙋‍♂️',
    },
];
function Header() {
    const pathName = usePathname();
    const [isPage, setIsPage] = useState(false); //페이지 여부
    const [category, setCategory] = useState<{
        url: string;
        name: string;
        intro: string;
        icon: string;
    }>(); //카테고리 정보
    const scrollVisible = useScrollObserver(130);
    useEffect(() => {
        if (pathName.startsWith('/account')) {
            return;
        } //account 페이지는 제외
        const isPage = CATEGORY_LIST.some((category) => category.url === pathName);
        setIsPage(isPage); //페이지 여부
        const category = CATEGORY_LIST.find((category) => category.url === pathName);
        setCategory(category); //글목록 페이지이에서만 필터링 네이게이션바 노출
    }, [pathName]);

    return (
        <>
            <div
                className={`${scrollVisible ? 'pointer-events-none opacity-0' : 'opacity-100'} sticky top-[62px] z-30 flex w-full justify-center  border-b bg-white  transition-opacity duration-300 ease-in-out`}
            >
                <div className=" flex h-12  max-w-[1300px] items-center   gap-1    ">
                    {CATEGORY_LIST.map((category) => (
                        <Link
                            href={category.url}
                            key={category.name}
                            className={`h-full   ${pathName.startsWith(category.url) ? '  border-primary text-primary' : ' border-transparent text-neutral-600  hover:border-gray-300  '} flex items-center border-b-[3px] bg-opacity-70 px-4 pt-2  font-medium transition-all duration-300 ease-in-out `}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
            {isPage && (
                <div className=" z-[3]  flex w-full flex-col items-center justify-center bg-opacity-60 bg-gradient-to-r  from-gray-400 via-gray-500 to-gray-400  py-5  ">
                    <div className="flex flex-row items-center justify-center gap-7 ">
                        {/* <BookIcon className="h-12 w-12 text-white" /> */}
                        <span className="text-3xl mobile:text-4xl">{category?.icon}</span>
                        <div className=" flex  flex-col items-start justify-center gap-1">
                            <span className="text-2xl font-bold text-white mobile:text-3xl">{category?.name}</span>
                            <span className=" text-base font-semibold text-white mobile:text-lg">
                                {category?.intro}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
