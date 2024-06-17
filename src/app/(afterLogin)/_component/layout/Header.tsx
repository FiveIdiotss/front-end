import Image from 'next/image';
import React, { use, useEffect } from 'react';
import mainLogo1 from '@/../public/mainLogo1.png';
import Link from 'next/link';
import search from '@/../public/search.svg';
import HeaderRegist from './HeaderRegist';
import HeaderUser from './HeaderUser';
import SectionDivider from '../SectionDivider';
import { auth } from '@/auth';

async function Header() {
    const session = await auth();

    return (
        <nav className="sticky top-0  z-[1001]  flex  h-[69px]  w-full  flex-shrink-0  flex-row  items-center justify-center border-b  border-neutral-200  bg-white px-7  ">
            <div className="flex h-full w-full flex-row items-center justify-center">
                <Link href="/home" scroll={true} className="   mt-1 h-[55px] w-[155px] shrink-0">
                    <Image src={mainLogo1} alt="navLogo" className="h-full w-full" quality={100} />
                </Link>
                {/* <button className=" hidden h-full w-24 shrink-0  items-center justify-center md:flex ">
                    <span className=" text-sm text-slate-700 ">카테고리</span>
                </button> */}
                <div className="flex flex-grow justify-center">
                    <div className="mx-2   flex h-12 w-full max-w-[550px] flex-row items-center rounded-3xl border bg-neutral-200  p-2">
                        <input
                            placeholder="무엇이든 검색하기"
                            className=" ml-2 mr-4 h-5  w-full bg-inherit text-sm text-neutral-700 outline-none "
                        />

                        <SectionDivider position="y" className="mx-1 py-[2px]" color="border-neutral-400" />
                        <div className="flex h-full w-11 items-center justify-center">
                            <Image src={search} alt="search" className="h-5 w-5" />
                        </div>
                    </div>
                </div>
                <HeaderRegist />
                <SectionDivider position="y" className="ml-9 mr-5 py-6" color="border-neutral-300" />
                <HeaderUser memberDto={session?.user?.memberDTO} />
            </div>
        </nav>
    );
}

export default Header;
