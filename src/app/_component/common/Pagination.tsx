'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SimplePagination from './SimplePagination';
import WidePagination from './WidePagination';

type Props = {
    // setPage: (page: number) => void;

    totalPages: number; //전체 페이지 수
};

function Pagination({ totalPages }: Props) {
    return (
        <>
            <div className="block  h-fit w-full mobile:hidden">
                <SimplePagination totalPages={totalPages || 1} />
            </div>
            <div className="hidden h-fit w-full mobile:block">
                <WidePagination totalPages={totalPages || 1} />
            </div>
        </>
    );
}

export default Pagination;
