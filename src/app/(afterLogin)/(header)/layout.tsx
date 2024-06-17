import React from 'react';

import Header from './../_component/layout/Header';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" w-dvh flex   h-dvh flex-col overflow-y-auto bg-gray-50">
            {/* Home */}

            <Header />

            {children}
        </div>
    );
}
