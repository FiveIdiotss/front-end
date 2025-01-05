import React from 'react';
import Header from './_component/Header';

type Props = {
    children: React.ReactNode;
};

export default async function PostsLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" relative flex w-full shrink-0   flex-col  bg-gray-50 ">
            {/* Home */}
            <Header />
            <div className=" mx-auto flex w-full  max-w-[1300px] flex-1  flex-col   px-2   mobile:px-10   ">
                {children}
            </div>
        </div>
    );
}
