'use client';

import React, { useState } from 'react';
import SectionDivider from '@/app/(afterLogin)/_component/SectionDivider';
import ProfilePosts from './ProfilePosts';
import ProfileBookMark from './ProfileBookMark';
import ProfileLike from './ProfileLike';
type Tab = 'posts' | 'bookmark' | 'like';
const tabs = ['posts', 'bookmark', 'like'];
const tabNames = ['게시물', '즐겨찾기', '좋아요'];

function ProfileDashBoard() {
    const [tab, setTab] = useState<Tab>('posts');
    return (
        <div className="mt-4 flex  w-full flex-col">
            <div className="flex flex-row gap-2">
                {tabs.map((tabItem, index) => (
                    <div
                        key={tabItem}
                        className={`border-black p-3 text-lg hover:cursor-pointer hover:border-b-2 ${tab === tabItem ? 'border-b-2 border-black' : ''}`}
                        onClick={() => setTab(tabItem as Tab)}
                    >
                        {tabNames[index]}
                    </div>
                ))}
            </div>
            <SectionDivider color="border-neutral-200" className="" />
            <div className="flex  w-full flex-col gap-3">
                {tab === 'posts' && <ProfilePosts />}
                {tab === 'bookmark' && <ProfileBookMark />}
                {tab === 'like' && <ProfileLike />}
            </div>
        </div>
    );
}

export default ProfileDashBoard;
