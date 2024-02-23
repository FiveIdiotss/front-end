import Image from 'next/image';
import React from 'react';
import mainLogo1 from '@/../public/mainLogo1.png';
import Link from 'next/link';
import search from '@/../public/search.svg';
function Header() {
    return (
        <nav className="sticky top-0  z-[1001]  flex  h-[72px]  w-full  flex-row  items-center  bg-white px-7   shadow-md">
            <Link href="/home" scroll={true} className=" mb-1  h-[45px] w-[140px] ">
                <Image src={mainLogo1} alt="navLogo" className="h-full w-full" quality={100} />
            </Link>
            <button className="flex h-full w-20 items-center justify-center ">
                <span className="text-sm text-slate-700">카테고리</span>
            </button>

            <div className="mx-2 flex  h-12 flex-grow flex-row items-center rounded-3xl border border-black p-2">
                <div className="flex h-full w-11 items-center justify-center">
                    <Image src={search} alt="search" className="h-5 w-5" />
                </div>
                <input placeholder="무엇이든 검색하기" className=" ml-2 mr-4 h-5  w-full outline-none" />
            </div>
            <button></button>
            <button className="flex h-9 w-20 items-center justify-center border border-black">
                <span className="text-sm ">로그인</span>
            </button>
            <button className="ml-2 flex h-9 w-20 items-center justify-center  bg-gray-700">
                <span className="text-sm  text-white">가입하기</span>
            </button>
        </nav>
    );
}

export default Header;
