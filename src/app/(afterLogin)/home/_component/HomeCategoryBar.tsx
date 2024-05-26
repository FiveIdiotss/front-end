import React from 'react';
import { CATEGORY_LIST } from '../../utils/categoryConstants';
import CateogryIcon from '../../_component/CategoryIcon';
import Link from 'next/link';

function HomeCategoryBar() {
    return (
        <div className=" flex w-full flex-row flex-wrap justify-center gap-3">
            {CATEGORY_LIST.map((category) =>
                category.parameter === 'bookmark' ? null : (
                    <div key={category.parameter} className="m-1  flex flex-col items-center justify-center gap-1     ">
                        <Link href={`/posts/mentor${category.parameter === 'all' ? '' : `?category=${category.name}`}`}>
                            <div className="cursor-pointer rounded-md border-2 border-primary  border-opacity-25 bg-white p-4 hover:bg-gray-200 ">
                                <CateogryIcon className="h-7 w-7 text-neutral-700" category={category.parameter} />
                            </div>
                        </Link>

                        <span className="text-sm">{category.name}</span>
                    </div>
                ),
            )}
        </div>
    );
}

export default HomeCategoryBar;
