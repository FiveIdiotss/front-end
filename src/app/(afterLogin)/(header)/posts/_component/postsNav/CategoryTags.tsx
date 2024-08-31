'use client';
import Check2Icon from '@/app/_icons/common/Check2Icon';
import FilterIcon from '@/app/_icons/common/FilterIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function CategoryTags() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const starParam = searchParams.get('star') || 'false';
    const tagParm = searchParams.get('tag') || '전체'; //일단은 사용중이지 않음

    const handleToggleTag = (tag: string) => {
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
        <div className="  flex flex-row items-center gap-2">
            <FilterIcon className="h-4 w-4 text-neutral-500" />
            <button
                className={`flex h-8 flex-row items-center justify-end gap-[2px] rounded-lg border border-neutral-200  px-3  text-sm   ${isStar ? 'bg-black text-white' : 'bg-white  text-neutral-500  hover:bg-neutral-100'}`}
                onClick={() => handleToggleTag('star')}
            >
                {pathName === '/posts/mentor' ? '북마크' : '좋아요'}
                <div className="flex h-5 w-5 items-center justify-center rounded-full">
                    <Check2Icon className="h-4 w-4 text-inherit" />
                </div>
            </button>
        </div>
    );
}

export default CategoryTags;
