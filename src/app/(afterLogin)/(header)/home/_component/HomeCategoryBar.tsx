import React from 'react';
import { CATEGORY_LIST } from '../../../utils/categoryConstants';
import CateogryIcon from '../../../_component/CategoryIcon';
import Link from 'next/link';
import SectionDivider from '../../../_component/SectionDivider';

function HomeCategoryBar() {
    return (
        <div className="mb-4 mt-10 flex w-full flex-row flex-wrap justify-center">
            {CATEGORY_LIST.map((category, index) =>
                category.parameter === 'bookmark' ? null : (
                    <div
                        key={category.parameter}
                        className="flex flex-col items-center justify-center gap-1  border-neutral-300 border-opacity-70  transition-all duration-300  hover:-translate-y-1 hover:bg-primary hover:bg-opacity-85 "
                    >
                        <Link href={`/posts/mentor${category.parameter === 'all' ? '' : `?category=${category.name}`}`}>
                            <div
                                className={`h-28 w-32 cursor-pointer   ${index !== 8 ? 'border-r border-neutral-200' : ''} flex flex-col items-center justify-center gap-3    hover:text-white`}
                            >
                                <CateogryIcon className="h-14 w-14 text-inherit  " category={category.parameter} />
                                <span className="text-sm font-light ">{category.name}</span>
                            </div>
                        </Link>
                    </div>
                ),
            )}
        </div>
    );
}

export default HomeCategoryBar;
