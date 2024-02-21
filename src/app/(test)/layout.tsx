import React from 'react';
import Sidebar_L from '../(afterLogin)/_component/layout/sideBar_L';
import RQProviders from '../(afterLogin)/_component/RQProvider';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper
        <>
            <div className=" h-dvh  w-dvw">
                {/* Home */}

                <div className="mx-auto  h-dvh   max-w-[1600px]  bg-slate-200">
                    <RQProviders>{children} </RQProviders>
                </div>
            </div>
        </>
    );
}
