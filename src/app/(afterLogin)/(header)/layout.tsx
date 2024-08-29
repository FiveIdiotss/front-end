// 채팅방을 제외한 헤더가 필요한 페이지들의 감싸고 있는 레이아웃 입니다.

import React from 'react';

import Header from './../_component/layout/Header';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" w-dvh flex h-dvh  flex-col  overflow-x-hidden bg-gray-50">
            {/* Home */}

            <Header />

            {children}
        </div>
    );
}
