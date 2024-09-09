// 채팅방을 제외한 헤더가 필요한 페이지들의 감싸고 있는 레이아웃 입니다.

import React, { ReactNode } from 'react';

import Header from '../_component/layout/Header';
import MobileNav from '../_component/layout/moblieNav/MobileNav';
import { auth } from '@/auth';

type Props = {
    children: ReactNode;
    modal: ReactNode;
};

export default async function HomeLayout({ children, modal }: Props) {
    const session = await auth();

    return (
        // Wrapper
        <>
            <div className=" flex min-h-dvh   flex-col  bg-gray-50     pb-16   mobile:pb-0  ">
                {/* Home */}
                <Header />

                <main className="flex  flex-1 ">{children}</main>
                <MobileNav isSigin={Boolean(session)} />
            </div>
            {modal}
        </>
    );
}
