import React from 'react';
import SectionDivider from '../SectionDivider';
import Image from 'next/image';
import search from '@/../public/search.svg';
import SearchIcon from '@/app/_icons/common/SearchIcon';

function HeaderSearch() {
    return (
        <div className="flex flex-grow items-center  justify-end mobile:justify-center  ">
            <div className="mx-2 flex  h-12   w-full  max-w-[550px] flex-row items-center overflow-hidden rounded-md bg-white   shadow-md  ">
                <input placeholder="무엇이든 검색하기" className=" h-5   flex-grow bg-inherit px-4  outline-none " />
                <button className="flex h-full  shrink-0 items-center justify-center bg-primary px-5 ">
                    <SearchIcon className="h-6 w-6 text-white" />
                </button>
            </div>
        </div>
    );
}

export default HeaderSearch;
