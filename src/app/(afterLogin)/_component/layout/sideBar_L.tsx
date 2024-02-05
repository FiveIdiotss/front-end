'use client';
import { signOut, useSession } from 'next-auth/react';
import IDollar from '../icon/iDollar';
import IFace from '../icon/iFace';

import IHealth from '../icon/iHealth';
import ILogo from '../icon/iLogo';
import IMessage from '../icon/iMessage';
import IScienceTech from '../icon/iScienceTech';
import { useRouter } from 'next/navigation';
import ILogOut from '../icon/iLogOut';

export default function Sidebar_L() {
    const router = useRouter();
    return (
        // wrapper
        <>
            {/* 로고 */}
            <div className=" mt-10 h-6 ">
                <ILogo />
            </div>
            {/* username */}
            <div className="mt-14">
                <span className="font-semibold">
                    Welcome, <span className="text-primary">username</span>
                </span>
            </div>
            {/* My Place - wrapper */}
            <div className=" mt-10">
                {/* title */}
                <span className="text-sm">My Place</span>
                {/* Profile */}
                <div className=" mt-7 flex justify-start">
                    <div className=" flex w-[18px]">
                        <IFace />
                    </div>
                    <span className="ml-3 font-semibold ">Profile</span>
                </div>
                <div className=" mt-5 flex justify-start">
                    <div className="flex w-[18px]">
                        <IMessage />
                    </div>
                    <span className="ml-3 font-semibold">Message</span>
                </div>
            </div>

            {/* message place - wrapper */}
            <div className=" mt-10">
                {/* title */}
                <div className="flex justify-start text-sm">
                    Category Place <span className="ml-5 mt-5 flex justify-end text-xs text-gray-500">+더보기</span>
                </div>
                {/* my message */}

                <div className=" mt-7 flex justify-start">
                    <div className="flex  w-[18px]">
                        <IDollar />
                    </div>
                    <span className="ml-3 font-semibold">상경대</span>
                </div>
                {/* share */}
                <div className=" mt-7 flex justify-start">
                    <div className="flex  w-[18px]">
                        <IScienceTech />
                    </div>
                    <span className="ml-3 font-semibold">이공대</span>
                </div>
                {/* Feed */}
                <div className=" mt-7 flex justify-start">
                    <div className="flex  w-[18px]">
                        <IHealth />
                    </div>
                    <span className="ml-3 font-semibold">보과대</span>
                </div>
            </div>
            {/* LogOutBtn */}
            <div
                className=" mt-7 flex cursor-pointer justify-start"
                onClick={() => {
                    signOut({
                        redirect: false,
                    })
                        .then(() => {
                            router.push('/');
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }}
            >
                <div className="flex w-[18px]">
                    <ILogOut />
                </div>
                <span className=" text-sideBar ml-3 font-semibold">로그아웃</span>
            </div>
        </>
    );
}
