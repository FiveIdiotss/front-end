import ArrowLeftBackIcon from '@/app/_icons/icon/ArrowLeftBackIcon';
import ListIcon from '@/app/_icons/icon/ListIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

function PostsDetailNav() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="   flex w-36 flex-col items-center ">
            <div className="sticky top-[170px] flex flex-col gap-7">
                <span
                    className=" flex h-11 w-11 rotate-45 cursor-pointer  items-center justify-center  rounded-md border  border-neutral-400  bg-white font-medium shadow-sm  "
                    onClick={handleBack}
                >
                    <ArrowLeftBackIcon className="h-5 w-5 -rotate-45 text-neutral-400" />
                </span>

                <span
                    className=" flex h-11 w-11 rotate-45 cursor-pointer  items-center justify-center  rounded-md border  border-neutral-400  bg-white font-medium shadow-sm  "
                    onClick={handleBack}
                >
                    <ListIcon className="h-5 w-5 -rotate-45 text-neutral-400" />
                </span>
            </div>
        </div>
    );
}

export default PostsDetailNav;
