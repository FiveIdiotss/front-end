import React from 'react';
import Header from './_component/Header';
import FilterNav from './_component/postsNav/FilterNav';
import { auth } from '@/auth';
type Props = {
    children: React.ReactNode;
};

export default async function PostsLayout({ children }: Props) {
    const session = await auth();
    return (
        // Wrapper

        <div className=" flex w-full flex-col  bg-gray-50 ">
            {/* Home */}
            <Header />

            <div className=" mx-auto flex w-full  max-w-[1300px] flex-1  flex-col   px-2 pb-10 mobile:px-10   ">
                <FilterNav isLogin={Boolean(session)} />
                {children}
            </div>
        </div>
    );
}
