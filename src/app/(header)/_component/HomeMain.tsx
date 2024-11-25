import React, { Suspense } from 'react';
import HomeMentoBoard from './HomeMentoBoard';
import HomeQuestsBoard from './HomeQuestsBoard';
import HomeRequestsBoard from './HomeRequestsBoard';
import { auth } from '@/auth';
import HotKeywords from './HotContent/HotKeywords';
import SubBoardCarousel from './HotContent/SubBoardCarousel';
import RightSideHotContent from './HotContent/RightSideHotContent';

async function HomeMain() {
    const session = await auth();

    return (
        <div className=" mx-auto flex  w-full max-w-[1500px] flex-row justify-between gap-4 px-2     py-5 mobile:px-8">
            {/* 32px */}
            {/* <div className=" mx-auto flex  w-full flex-col gap-10 mobile:gap-14 tablet:w-[calc(100%-208px)]"> */}
            <div className=" mx-auto flex  w-full flex-col gap-10 ">
                <div className="flex w-full flex-col gap-4">
                    <HomeMentoBoard session={session} />
                </div>
                <div className=" flex  flex-col gap-2  tablet:hidden">
                    <SubBoardCarousel />
                    <HotKeywords />
                </div>
                <div className=" flex w-full flex-col gap-10 mobile:gap-6 desktop:flex-row">
                    <HomeRequestsBoard />
                    <HomeQuestsBoard />
                </div>
            </div>

            <RightSideHotContent />
            {/* 192px */}
        </div>
    );
}

export default HomeMain;
