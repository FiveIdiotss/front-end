'use client';
import React, { useEffect, useState } from 'react';
import CategorySearch from './CategorySearch';

import Check2Icon from '@/app/_icons/common/Check2Icon';
import CategorySelector from './CategorySelector';
import CategorySchoolSelector from './CategorySchoolSelector';
import { usePathname } from 'next/navigation';
import CategoryTags from './CategoryTags';

const ACCESS_URL_LIST: string[] = ['/posts/mentor', '/posts/request', '/posts/quest'];

function FilterNav() {
    const pathName = usePathname();
    const isPage = ACCESS_URL_LIST.some((url) => url === pathName);

    if (!isPage) return null;
    return (
        <div
            className={` sticky top-[114px] z-[2] flex w-full  max-w-[1300px]  flex-col gap-10 border-b border-gray-400  border-opacity-80 bg-neutral-50   pb-4  pt-7 `}
        >
            <div className="flex w-full flex-row justify-between">
                <CategorySelector />
                <CategorySchoolSelector />
            </div>

            <div className="flex w-full flex-row items-center justify-between gap-5">
                <CategoryTags />
                <div className="w-full max-w-[370px] ">
                    <CategorySearch />
                </div>
            </div>
        </div>
    );
}

export default FilterNav;
