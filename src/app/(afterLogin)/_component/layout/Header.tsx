import Image from 'next/image';
import React, { use, useEffect } from 'react';
import mainLogo1 from '@/../public/mainLogo1.png';
import Link from 'next/link';
import search from '@/../public/search.svg';
import HeaderRegist from './HeaderRegist';
import HeaderUser from './HeaderUser';

async function Header() {
    return (
        <nav className="sticky top-0  z-[1001]  flex  h-[72px]  w-full  flex-row  items-center  justify-center bg-white px-7  shadow-md">
            <Link href="/home" scroll={true} className="   mt-1 h-[55px] w-[155px] shrink-0">
                <Image src={mainLogo1} alt="navLogo" className="h-full w-full" quality={100} />
            </Link>
            <button className="flex h-full w-24 shrink-0 items-center  justify-center">
                <span className="text-sm text-slate-700">카테고리</span>
            </button>
            <div className="mx-2 mr-10  flex h-12 flex-grow flex-row items-center rounded-3xl border border-black p-2">
                <div className="flex h-full w-11 items-center justify-center">
                    <Image src={search} alt="search" className="h-5 w-5" />
                </div>
                <input placeholder="무엇이든 검색하기" className=" ml-2 mr-4 h-5  w-full outline-none" />
            </div>
            <HeaderRegist />
            <div className="mx-5 h-6 w-0  border-l border-gray-300"></div>
            <HeaderUser />
        </nav>
    );
}

export default Header;
