'use client';
import React from 'react';
import SearchIcon from '@/app/_icons/common/SearchIcon';
import SearchModal from './SearchModal';

function HomeSearch() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="flex flex-grow items-center justify-center    ">
                <button
                    onClick={handleOpen}
                    className="mx-2   flex h-12   w-full max-w-[550px]   flex-row items-center overflow-hidden rounded-lg   bg-white shadow-md    "
                >
                    <span className=" flex flex-grow justify-start px-4 text-gray-400">검색</span>
                    <div className="flex h-full  shrink-0 items-center  justify-center bg-primary px-5 ">
                        <SearchIcon className="h-6 w-6 text-white" />
                    </div>
                </button>
            </div>
            {open && <SearchModal onClose={handleClose} />}
        </>
    );
}

export default HomeSearch;
