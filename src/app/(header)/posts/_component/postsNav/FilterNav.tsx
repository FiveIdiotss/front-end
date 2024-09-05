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
            className={`  flex w-full max-w-[1300px]  flex-col  gap-7 border-b border-gray-400 border-opacity-80  bg-neutral-50 px-1   py-4 `}
            // sticky top-[114px] z-[2]
        >
            <div className="flex w-full flex-row justify-between">
                <CategorySelector />
                <CategorySchoolSelector />
            </div>

            <div className="flex w-full flex-col items-start gap-2  mobile:flex-row mobile:items-center  mobile:gap-5">
                <div className="w-full mobile:max-w-[370px] ">
                    <CategorySearch />
                </div>
                <CategoryTags />
            </div>
        </div>
    );
}

export default FilterNav;
