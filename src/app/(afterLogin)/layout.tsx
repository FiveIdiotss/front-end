import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';
import RQProviders from './_component/RQProvider';
import Header from './_component/layout/Header';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper
        <>
            {/* Home */}
            <Header />

            <div className=" mx-auto h-fit  max-w-[1600px]   ">
                <RQProviders>{children} </RQProviders>
            </div>
        </>
    );
}
