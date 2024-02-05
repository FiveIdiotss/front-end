import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        // Wrapper
        <div className=" flex items-stretch bg-white ">
            {/* col - sideBar - left */}
            <div className="flex flex-grow flex-col items-end ">
                <div className=" h-dvh w-60 ">
                    <div className=" fixed flex h-dvh  flex-col  border-r-2 border-slate-100 px-7">
                        <Sidebar_L />
                    </div>
                </div>
            </div>
            {/* Home */}
            <div className="flex flex-grow flex-col">
                <div className="flex  h-dvh w-[1000px]  flex-grow flex-col">{children}</div>
            </div>
        </div>
    );
}
