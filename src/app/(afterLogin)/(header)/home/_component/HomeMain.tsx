import React, { Suspense } from 'react';
import HomeMentoBoard from './HomeMentoBoard';
import HomeQuestsBoard from './HomeQuestsBoard';
import HomeRequestsBoard from './HomeRequestsBoard';
import HomeCategoryBar from './HomeCategoryBar';
import RightSideBar from './RightSideBar';
import Loading from '@/app/_component/Loading';

function HomeMain() {
    return (
        <div className=" mx-auto flex w-full max-w-[1500px] flex-row gap-8  px-8 py-5  ">
            {/* 32px */}
            <div className=" flex w-full  flex-col mobile:w-[calc(100%-256px)]">
                {/* 192px-gap+sidebar_width */}
                <HomeMentoBoard />

                <HomeCategoryBar />

                <div className="mt-12 flex w-full flex-col gap-6 desktop:flex-row">
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
