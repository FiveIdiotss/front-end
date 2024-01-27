import { signOut } from 'next-auth/react';
import IDollar from '../icon/iDollar';
import IFace from '../icon/iFace';

import IHealth from '../icon/iHealth';
import ILogo from '../icon/iLogo';
import IMessage from '../icon/iMessage';
import IScienceTech from '../icon/iScienceTech';

export default function Sidebar_L() {
    return (
        // wrapper
        <div
            className="relative flex h-full flex-col border-r-4 border-primary pl-8 pr-6 pt-6
        "
        >
            {/* 로고 */}
            <div className=" mt-10 h-6 w-[177px]">
                <ILogo />
            </div>
            {/* username */}
            <div className="mt-14">
                <span className="font-semibold">
                    Welcome, <span className="text-primary">UserName</span>
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
                {/* <LogOutBtn /> 만들어야 함*/}
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
            <button onClick={() => signOut({ callbackUrl: '/login' })}>로그아웃</button>
        </div>
    );
}
