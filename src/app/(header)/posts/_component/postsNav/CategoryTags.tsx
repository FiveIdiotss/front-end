'use client';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';
import BookMarkIcon from '@/app/_icons/common/BookMarkIcon';
import Check2Icon from '@/app/_icons/common/Check2Icon';
import FilterIcon from '@/app/_icons/common/FilterIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function CategoryTags({ isLogin }: { isLogin: boolean }) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const starParam = searchParams.get('star') || 'false';
    const tagParm = searchParams.get('tag') || '전체'; //일단은 사용중이지 않음

    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    });

    const handleToggleTag = (tag: string) => {
        if (!isLogin) {
            navigateToLogin();
            return;
        }
        if (tag === 'star') {
            const params = new URLSearchParams(searchParams.toString());
            if (searchParams.has('star')) {
                params.delete('star');
            } else {
                params.set('star', 'true');
            }
            params.delete('page');
            router.replace(pathName + '?' + params.toString());
        }
    };

    const isStar = starParam === 'true'; // 북마크및 좋아요 여부

    return (
        <div className=" ml-2 flex flex-row items-center gap-2 mobile:ml-0">
            <FilterIcon className="h-4 w-4 text-neutral-500" />
            <button
                className={`flex h-8 flex-row items-center justify-end gap-1 rounded-lg border border-gray-200  px-3  text-sm   ${isStar ? 'bg-gray-800 text-white' : 'bg-white  text-gray-500  hover:bg-gray-50'}`}
                onClick={() => handleToggleTag('star')}
            >
                {pathName === '/posts/mentor' ? '북마크' : '좋아요'}
                <BookMarkIcon isCheck={false} className={`h-3 w-3 text-inherit`} />
            </button>
        </div>
    );
}

export default CategoryTags;
