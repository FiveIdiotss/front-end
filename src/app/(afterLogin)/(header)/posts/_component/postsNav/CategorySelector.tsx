'use client';
import ArrowDropIcon from '@/app/_icons/common/ArrowDropIcon';
import CloseIcon from '@/app/_icons/common/CloseIcon';
import React from 'react';
import { CloseButton } from 'react-toastify';
import CategorySelectorList from './CategorySelectorList';
import { useSearchParams } from 'next/navigation';

function CategorySelector() {
    const [isHovered, setIsHovered] = React.useState(false);
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || '전체 전공';
    return (
        <>
            <div className="relative flex  ">
                <div
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-md  "
                    onClick={() => setIsHovered(!isHovered)}
                >
                    <span className="text-xl font-bold">{categoryParam}</span>
                    <div className=" rounded-md  border ">
                        <ArrowDropIcon className=" h-7 w-7 text-neutral-600" isOpen={false} />
                    </div>
                </div>

                <div
                    className={`absolute   top-12 flex w-fit  flex-col  hover:cursor-default ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${
                        isHovered ? ' max-h-[1000px]   opacity-100' : 'max-h-0 w-0  overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-[6px] flex h-[400px] w-72 flex-col rounded-lg border bg-white  shadow-lg  shadow-neutral-300">
                        <div className="flex   w-full justify-between p-5 text-neutral-800">
                            <span className=" text-xl font-medium">학과별</span>
                            <button onClick={() => setIsHovered(false)}>
                                <CloseIcon className="h-7 w-7 text-inherit" />
                            </button>
                        </div>
                        <CategorySelectorList />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategorySelector;
