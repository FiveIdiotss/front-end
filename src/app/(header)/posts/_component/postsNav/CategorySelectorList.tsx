'use client';
import React from 'react';
import { CATEGORY_LIST as list } from '@/app/util/categoryConstants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Check2Icon from '@/app/_icons/common/Check2Icon';

function CategorySelectorList() {
    const CATEGORY_LIST = list.filter((category) => category.name !== '북마크');
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryParam = searchParams.get('category') || '전체';

    const handleSelectChange = (param: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (param === '전체') {
            params.delete('category');
        } else {
            params.set('category', param);
        }
        params.delete('page');
        router.replace(pathName + '?' + params.toString());
    };

    return (
        <div className="flex h-full w-full flex-col gap-2   overflow-y-auto p-2">
            {CATEGORY_LIST.map((category) => (
                <button
                    key={category.name}
                    className={` flex justify-between rounded-lg  px-5 py-[10px] font-medium text-neutral-700 hover:bg-gray-50 ${category.name === categoryParam ? 'bg-gray-100' : ''} `}
                    onClick={() => handleSelectChange(category.name)}
                >
                    <span>{category.name}</span>
                    <Check2Icon
                        className={`h-5 w-5 text-inherit text-primary ${category.name === categoryParam ? '' : 'hidden'}`}
                    />
                </button>
            ))}
        </div>
    );
}

export default CategorySelectorList;
