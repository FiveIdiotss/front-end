import React from 'react';
import { CATEGORY_LIST } from '@/app/util/categoryConstants';
import CateogryIcon from '@/app/_icons/Category/CategoryIcon';
import Link from 'next/link';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';

// const COLOR_LIST = [
//     '',
//     '',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
//     'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200',
// ];
function HomeCategoryBar() {
    return (
        <div className="  grid w-full grid-cols-4 justify-center  gap-x-2  gap-y-5 rounded-md       mobile:grid-cols-8">
            {CATEGORY_LIST.map((category, index) =>
                category.parameter === 'bookmark' ? null : (
                    <Link
                        key={category.parameter}
                        href={`/posts/mentor${category.parameter === 'all' ? '' : `?category=${category.name}`}`}
                    >
                        <div
                            className={`flex  h-20 flex-row items-center justify-center text-gray-500     transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `}
                        >
                            <div className="flex w-full cursor-pointer flex-col items-center justify-between gap-3 ">
                                <CateogryIcon className="h-7 w-7 text-secondary " category={category.parameter} />
                                <span className="flex flex-row items-center justify-center gap-1 text-sm ">
                                    {category.name}
                                    {/* <ArrowLeftBackIcon className="h-3 w-3 rotate-180 text-gray-400" /> */}
                                </span>
                            </div>
                            {/* <div
                                className={`h-full border-l  ${index === 4 ? 'hidden mobile:block' : ''}   ${index === 8 ? 'hidden ' : ''} `}
                            /> */}
                        </div>
                    </Link>
                ),
            )}
        </div>
    );
}

export default HomeCategoryBar;
