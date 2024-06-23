import React from 'react';
import SectionDivider from '../SectionDivider';
import Image from 'next/image';
import search from '@/../public/search.svg';

function HeaderSearch() {
    return (
        <div className="flex flex-grow items-center justify-end mobile:justify-center  ">
            <div className="mx-2    hidden h-12 w-full max-w-[550px] flex-row items-center rounded-3xl border  bg-neutral-200 p-2 mobile:flex">
                <input
                    placeholder="무엇이든 검색하기"
                    className=" ml-2 mr-4 h-5  w-full bg-inherit text-sm text-neutral-700 outline-none "
                />

                <SectionDivider position="y" className="mx-1 py-[2px]" color="border-neutral-400" />
                <button className="flex h-full w-11 items-center justify-center">
                    <Image src={search} alt="search" className="h-5 w-5 text-neutral-700" />
                </button>
            </div>
            <button className=" mobile:hidden">
                <Image src={search} alt="search" className="h-5 w-5 text-neutral-700" />
            </button>
        </div>
    );
}

export default HeaderSearch;
