import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const CATEGORY_LIST = [
    {
        url: '/posts/mentor',
        name: '멘토링',
        intro: '멘토링에 신청하고 멘토와 함께 성장 해봐요!',
        icon: '👏',
    },
    {
        url: '/posts/request',
        name: '멘토찾기',
        intro: '원하는 멘토링이 없다면 직접 찾아봐요!',
        icon: '🔍',
    },
    {
        url: '/posts/quest',
        name: '자유질문',
        intro: '자유롭게 질문을 올리고 소통해보세요!',
        icon: '🙋‍♂️',
    },
];
function Header() {
    const pathName = usePathname();
    const isPage = CATEGORY_LIST.some((category) => category.url === pathName);

    const category = CATEGORY_LIST.find((category) => category.url === pathName);

    return (
        <>
            <div className="sticky top-[69px] z-[4] flex  w-full justify-center border-b bg-white shadow-sm-bottom">
                <div className=" flex h-11  max-w-[1300px]    ">
                    {CATEGORY_LIST.map((category) => (
                        <Link
                            href={category.url}
                            key={category.name}
                            className={`border-b-[3px]  ${pathName === category.url ? ' border-primary  font-semibold text-primary' : 'border-white text-neutral-600  hover:border-gray-300  hover:text-primary'} flex h-full items-center px-3   font-medium transition-all duration-300 ease-in-out `}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
            {isPage && (
                <div className=" z-[3] flex w-full flex-col items-center justify-center bg-opacity-60  bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 py-7  ">
                    <div className="flex flex-row items-center justify-center gap-7 ">
                        {/* <BookIcon className="h-12 w-12 text-white" /> */}
                        <span className="text-4xl">{category?.icon}</span>
                        <div className=" flex  flex-col items-start justify-center gap-1">
                            <span className="text-3xl font-bold text-white">{category?.name}</span>
                            <span className="text-lg font-semibold text-white">{category?.intro}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
