import React from 'react';
import HotKeywords from './HotKeywords';
import SubBoardCarousel from './SubBoardCarousel';

function RightSideHotContent() {
    return (
        <div className="h-full">
            <div className=" sticky top-[80px]  hidden w-64   flex-col   gap-2 tablet:flex">
                <SubBoardCarousel />
                <HotKeywords />
            </div>
        </div>
    );
}

export default RightSideHotContent;
