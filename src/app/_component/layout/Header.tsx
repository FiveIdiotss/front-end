import React, { use, useEffect } from 'react';
import Link from 'next/link';
import HeaderUser from './HeaderUser';
import { auth } from '@/auth';

async function Header() {
    const session = await auth();

    return (
        <nav className="sticky top-0 z-[1001]   flex  h-[69px]  w-full  flex-shrink-0  flex-row  items-center   justify-center border-b border-neutral-200  bg-white  px-4 mobile:px-6  ">
            <div className="flex h-full w-full flex-row items-center justify-between mobile:justify-center ">
                <Link href="/" scroll={true} className=" flex  h-auto shrink-0  flex-row items-center  gap-1  ">
                    {/* <Image
                        src={logo22}
                        alt="navLogo"
                        width={50}
                        height={50}
                        quality={75} // 이미지 품질 (기본값은 75)
                    /> */}
                    <span className="   py-2   text-3xl font-semibold tracking-tighter  text-primary ">Menteeto</span>
                </Link>

                {/* <HeaderSearch /> */}
                <div className=" ml-8  hidden h-full flex-grow  flex-row items-center justify-start gap-5 pt-1 mobile:flex ">
                    <button className="flex flex-row items-center gap-1">멘토링</button>
                    <button className="flex flex-row items-center gap-1">멘토링 요청</button>
                    <button className="flex flex-row items-center gap-1">자유 질문</button>
                </div>

                <HeaderUser memberDto={session?.user?.memberDTO} />
            </div>
        </nav>
    );
}

export default Header;
