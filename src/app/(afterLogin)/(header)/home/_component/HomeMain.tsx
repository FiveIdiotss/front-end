import React, { Suspense } from 'react';
import HomeMentoBoard from './HomeMentoBoard';
import HomeQuestsBoard from './HomeQuestsBoard';
import HomeRequestsBoard from './HomeRequestsBoard';
import HomeCategoryBar from './HomeCategoryBar';
import RightSideBar from './RightSideBar';
import Loading from '@/app/_component/Loading';

function HomeMain() {
    return (
        <div className=" mx-auto flex w-full max-w-[1500px] flex-row justify-between gap-4 px-4     py-5 mobile:px-8  ">
            {/* 32px */}
            <div className=" mx-auto flex  w-full flex-col  gap-10 tablet:w-[calc(100%-208px)]">
                <HomeCategoryBar />
                <HomeMentoBoard />

                <div className=" mt-6 flex w-full flex-col gap-6 desktop:flex-row">
                    <HomeQuestsBoard />
                    <HomeRequestsBoard />
                </div>
            </div>

            <RightSideBar />
            {/* 192px */}
        </div>
    );
}

export default HomeMain;
