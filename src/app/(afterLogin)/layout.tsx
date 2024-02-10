import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';
import RQProviders from './_component/RQProvider';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        // Wrapper
        <div className="m-auto flex h-dvh  max-w-screen-2xl flex-row">
            {/* col - sideBar - left */}
            <div className="flex w-fit flex-col  items-end ">
                <div className=" h-dvh w-60 border-r border-slate-100  px-7 ">
                    <div className=" fixed  flex h-dvh  flex-col">
                        <Sidebar_L />
                    </div>
                </div>
            </div>
            {/* Home */}

            <div className="flex-grow">
                <RQProviders>{children} </RQProviders>
            </div>
        </div>
    );
}
