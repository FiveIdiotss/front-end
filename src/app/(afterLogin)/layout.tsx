import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        // Wrapper
        <div className=" flex h-screen w-full justify-between">
            {/* col - sideBar - left */}
            <div className=" flex-grow-1 flex">
                <Sidebar_L />
            </div>
            {/* Home */}
            <div className=" ">{children}</div>
            {/* col - sideBar - right */}
            <div className=" flex-grow-1 flex">
                <SideBar_R />
            </div>
        </div>
    );
}
