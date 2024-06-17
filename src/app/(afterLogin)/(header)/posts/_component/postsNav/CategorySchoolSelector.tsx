'use client';
import { pushNotification } from '@/app/util/pushNotification';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function CategorySchoolSelector() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleToggle = (isToggled: boolean) => {
        if ((searchParams.has('schoolFilter') && isToggled) || (!searchParams.has('schoolFilter') && !isToggled)) {
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        if (isToggled) {
            params.set('schoolFilter', 'true');
        } else {
            params.delete('schoolFilter');
        }
        router.replace(pathname + '?' + params, { scroll: false });
        pushNotification('학교 필터링이 ' + (isToggled ? '적용' : '해제') + '되었습니다.', 'success', 'dark');
    };

    return (
        <div className="flex flex-row gap-1 rounded-md  bg-gray-200 p-[3px] shadow-sm ">
            <button
                className={`flex items-center justify-center rounded-md border px-5 py-[6px] text-sm font-semibold   ${searchParams.has('schoolFilter') ? ' text-neutral-500 hover:bg-primary hover:bg-opacity-20' : ' bg-primary text-white'} transition-all duration-200 ease-out`}
                onClick={() => handleToggle(false)}
            >
                전체 대학
            </button>
            <button
                className={`flex items-center justify-center rounded-md border px-5 py-[6px] text-sm font-semibold   ${searchParams.has('schoolFilter') ? ' bg-primary text-white' : 'text-neutral-500 hover:bg-primary hover:bg-opacity-20'} transition-all duration-200 ease-out  `}
                onClick={() => handleToggle(true)}
            >
                나의 대학
            </button>
        </div>
    );
}

export default CategorySchoolSelector;
