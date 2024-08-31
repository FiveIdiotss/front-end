'use client';

import React, { use, useState } from 'react';
import SectionDivider from '@/app/(afterLogin)/_component/SectionDivider';
import ProfileMentoPosts from './ProfileMentoPosts';
import ProfileBookMark from './ProfileBookMark';
import BookMarkIcon from '@/app/_icons/common/BookMarkIcon';
import ProfileSubBoards from './ProfileSubBoards';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryParameter } from '@/app/(afterLogin)/_hooks/useQueryParameter';
type Tab = '멘토링' | '멘토링 요청' | '질문' | '북마크';
const tabs: Tab[] = ['멘토링', '멘토링 요청', '질문', '북마크'];

function ProfileDashBoard() {
    const { currentValue: tab, handleChange: handleChangeTab } = useQueryParameter('tab', '멘토링');

    return (
        <div className="mt-4 flex h-full  w-full flex-col">
            <div className="flex flex-row gap-2">
                {tabs.map((tabItem) => (
                    <div
                        key={tabItem}
                        className={`p-3 text-base hover:cursor-pointer  hover:border-b-2  mobile:text-base ${tab === tabItem ? 'border-b-2 border-black font-medium hover:border-black' : 'text-gray-600 hover:border-gray-300'}`}
                        onClick={() => handleChangeTab(tabItem)}
                    >
                        <span className={`flex items-center gap-2  ${tabItem === '북마크' ? 'text-red-500' : ''}`}>
                            {tabItem}
                            {tabItem === '북마크' && <BookMarkIcon className="h-4 w-4" isCheck={false} />}
                        </span>
                    </div>
                ))}
            </div>
            <SectionDivider color="border-neutral-200" className="" />
            <div className="flex w-full flex-grow  flex-col gap-3">
                {tab === '멘토링' && <ProfileMentoPosts />}
                {tab === '멘토링 요청' && <ProfileSubBoards subBoardType="REQUEST" />}
                {tab === '질문' && <ProfileSubBoards subBoardType="QUEST" />}
                {tab === '북마크' && <ProfileBookMark />}
                {/* {tab === 'like' && <ProfileLike />} */}
            </div>
        </div>
    );
}

export default ProfileDashBoard;
