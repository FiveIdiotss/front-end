import Image from 'next/image';
import React, { use, useEffect } from 'react';
import mainLogo1 from '@/../public/mainLogo1.png';
import Link from 'next/link';
import HeaderRegist from './HeaderRegist';
import HeaderUser from './HeaderUser';
import SectionDivider from '../SectionDivider';
import { auth } from '@/auth';
import HeaderSearch from './HeaderSearch';

async function Header() {
    const session = await auth();

    return (
        <nav className="sticky top-0  z-[1001]  flex  h-[69px]  w-full  flex-shrink-0  flex-row  items-center justify-center border-b  border-neutral-200  bg-white px-7  ">
            <div className="flex h-full w-full flex-row items-center justify-center ">
                <Link href="/home" scroll={true} className="   mt-1 h-auto w-[130px]   shrink-0  mobile:w-[155px]">
                    <Image src={mainLogo1} alt="navLogo" className="h-full w-full" quality={100} />
                </Link>
                {/* <button className=" hidden h-full w-24 shrink-0  items-center justify-center md:flex ">
                    <span className=" text-sm text-slate-700 ">카테고리</span>
                </button> */}
                <HeaderSearch />
                <HeaderRegist />
                <SectionDivider position="y" className="mx-5 py-6" color="border-neutral-300" />
                <HeaderUser memberDto={session?.user?.memberDTO} />
            </div>
        </nav>
    );
}

export default Header;
