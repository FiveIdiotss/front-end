'use client';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';
import { pushNotification } from '@/app/util/pushNotification';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function CategorySchoolSelector({ isLogin }: { isLogin: boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    });

    const handleToggle = (isToggled: boolean) => {
        if (!isLogin) {
            navigateToLogin();
            return;
        }
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
        // pushNotification({
        //     msg: '학교 필터링이 ' + (isToggled ? '적용' : '해제') + '되었습니다.',
        //     type: 'success',
        //     theme: 'dark',
        // });
    };

    return (
        <div className="flex flex-row gap-1 rounded-md  bg-gray-200 p-[2px] shadow-sm ">
            <button
                className={`flex items-center justify-center rounded-md border px-3 py-2 text-xs   mobile:text-sm   ${searchParams.has('schoolFilter') ? ' text-gray-700 hover:bg-primary hover:bg-opacity-20' : ' bg-primary text-white'} transition-all duration-200 ease-out`}
                onClick={() => handleToggle(false)}
            >
                전체 대학
            </button>
            <button
                className={`flex items-center justify-center rounded-md border px-3 py-2 text-xs  mobile:text-sm   ${searchParams.has('schoolFilter') ? ' bg-primary text-white' : 'text-gray-700 hover:bg-primary hover:bg-opacity-20'} transition-all duration-200 ease-out  `}
                onClick={() => handleToggle(true)}
            >
                나의 대학
            </button>
        </div>
    );
}

export default CategorySchoolSelector;
