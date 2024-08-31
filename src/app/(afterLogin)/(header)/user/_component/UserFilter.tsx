import React from 'react';
import SearchIcon from '@/app/_icons/common/SearchIcon';
import SectionDivider from '@/app/(afterLogin)/_component/SectionDivider';

function UserFilter({ title }: { title: string }) {
    return (
        <div className=" flex w-full flex-col items-start gap-3">
            <span className="   border-gray-300 text-lg font-semibold text-gray-800 mobile:text-xl">{title}</span>
            <div className="flex w-full flex-row items-center rounded-md border border-gray-300  bg-white pr-2 mobile:w-3/5 ">
                <input type="search" className=" mx-3 my-2 w-full bg-inherit text-sm outline-none" placeholder="검색" />
                <SearchIcon className="h-5 w-5 text-indigo-400" />
            </div>
            {/* <div className="flex flex-row gap-1">
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">최근 6개월</span>
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">2024</span>
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">2023</span>
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">2022</span>
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">2021</span>
                <span className="rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs">전체</span>
                <SectionDivider position="y" className="py-1" color="border-neutral-300" />
                <span className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs">검색 초기화</span>
            </div> */}
        </div>
    );
}

export default UserFilter;
