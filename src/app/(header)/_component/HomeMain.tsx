import React, { Suspense } from 'react';
import HomeMentoBoard from './HomeMentoBoard';
import HomeQuestsBoard from './HomeQuestsBoard';
import HomeRequestsBoard from './HomeRequestsBoard';
import HomeCategoryBar from './HomeCategoryBar';
import RightSideBar from './RightSideBar';
import { auth } from '@/auth';

async function HomeMain() {
    const session = await auth();

    return (
        <div className=" mx-auto flex  w-full max-w-[1500px] flex-row justify-between gap-4 px-2     py-5 mobile:px-8">
            {/* 32px */}
            {/* <div className=" mx-auto flex  w-full flex-col gap-10 mobile:gap-14 tablet:w-[calc(100%-208px)]"> */}
            <div className=" mx-auto flex  w-full flex-col gap-10">
                <RightSideBar />

                <HomeMentoBoard session={session} />

                <div className=" flex w-full flex-col gap-10 mobile:gap-6 desktop:flex-row">
                    <HomeRequestsBoard />

                    <HomeQuestsBoard />
                </div>
            </div>

            {/* <RightSideBar /> */}
            {/* 192px */}
        </div>
    );
}

export default HomeMain;
