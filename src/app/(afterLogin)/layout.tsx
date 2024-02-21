import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';
import RQProviders from './_component/RQProvider';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper
        <>
            <div className=" w-dvw">
                {/* Home */}

                <div className="mx-auto  h-dvh   max-w-[1600px]  ">
                    <RQProviders>{children} </RQProviders>
                </div>
            </div>
        </>
    );
}
