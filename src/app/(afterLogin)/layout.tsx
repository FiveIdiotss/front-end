import React from 'react';
import Sidebar_L from './_component/layout/sideBar_L';
import SideBar_R from './_component/layout/sideBar_R';
import RQProviders from './_component/RQProvider';
import Header from './_component/layout/Header';
import { Toaster } from 'react-hot-toast';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" w-dvh flex   h-dvh flex-col overflow-y-auto bg-gray-50">
            {/* Home */}
            <Header />

            <RQProviders>
                <Toaster />

                {children}
            </RQProviders>
        </div>
    );
}
