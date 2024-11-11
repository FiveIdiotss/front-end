// 채팅방을 제외한 헤더가 필요한 페이지들의 감싸고 있는 레이아웃 입니다.

import React, { ReactNode } from 'react';

import Header from '../_component/layout/Header';
import MobileNav from '../_component/layout/moblieNav/MobileNav';
import { auth } from '@/auth';
import { Metadata } from 'next';
import PWAPopup from './_component/PWA/PWAPopup';
type Props = {
    children: ReactNode;
    modal: ReactNode;
};
export const metadata: Metadata = {
    description:
        '멘티토는 멘토링, 멘토링 요청, 자유 질문 커뮤니티를 통해 다양한 주제의 정보를 확인하고 공유할 수 있는 플랫폼입니다. 우리 대학의 멘토들이 제공하는 귀중한 조언과 경험을 통해 학업과 커리어를 더욱 발전시켜보세요. 멘토링 요청 게시판을 통해 필요한 도움을 요청하고, 선후배 간의 지식과 경험을 공유하며 성공적인 대학생활과 취업 준비를 위한 유익한 정보를 얻어가세요. 자유 질문 게시판에서는 다양한 주제에 대해 자유롭게 질문하고 답변을 받을 수 있습니다. 지금 바로 다양한 게시판을 확인하고, 여러분의 목표를 달성하는 데 필요한 인사이트를 얻어보세요.',
};

export default async function HomeLayout({ children, modal }: Props) {
    const session = await auth();

    return (
        // Wrapper
        <>
            <div className=" flex min-h-dvh flex-col bg-gray-50  pb-16     pt-[62px]   mobile:pb-0  ">
                {/* Home */}
                <Header className="top-0" />

                <main className="flex  flex-1 ">{children}</main>
                <MobileNav isSigin={Boolean(session)} />
                <PWAPopup />
            </div>
            {modal}
        </>
    );
}
