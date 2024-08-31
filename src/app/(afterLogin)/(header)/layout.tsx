// 채팅방을 제외한 헤더가 필요한 페이지들의 감싸고 있는 레이아웃 입니다.

import React from 'react';

import Header from './../_component/layout/Header';
import MobileNav from '../_component/layout/moblieNav/MobileNav';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" flex h-full min-h-dvh    flex-col overflow-x-hidden  bg-gray-50  pb-16 mobile:pb-0">
            {/* Home */}

            <Header />
            <main className="flex flex-1">{children}</main>
            <MobileNav />
        </div>
    );
}
