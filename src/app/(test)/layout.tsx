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
            <div className="mx-auto flex h-dvh  max-w-screen-xl  flex-row">
                {/* col - sideBar - left */}
                <div className="flex w-fit flex-col  items-end ">
                    <div className=" h-dvh w-60 border-r border-slate-100  px-7 ">
                        <div className=" fixed  flex h-dvh  flex-col">
                            <Sidebar_L />
                        </div>
                    </div>
                </div>
                {/* Home */}

                <div className="h-full flex-grow  bg-slate-200">
                    <RQProviders>{children} </RQProviders>
                </div>
            </div>
        </>
    );
}
