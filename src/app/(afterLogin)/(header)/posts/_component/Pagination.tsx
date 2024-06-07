'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
    page: number;
    // setPage: (page: number) => void;

    totalPages: number; //전체 페이지 수
};

function Pagination({ page, totalPages }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [startPage, setStartPage] = useState<number>(2); //시작 페이지

    const handleRouter = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.replace(pathname + '?' + params.toString());
    };

    const handlePageChange = (pageNumber: number) => {
        handleRouter(pageNumber); // setPage(pageNumber);
    };
    const handleSinglePrevPage = () => {
        if (page % 6 === 2 && page !== 2) setStartPage(startPage - 6);
        handlePageChange(page - 1);
    };
    const handleSingleNextPage = () => {
        if (page % 6 === 1 && page !== totalPages - 1 && page !== 1) setStartPage(startPage + 6);
        handlePageChange(page + 1);
    };

    //...버튼 클릭시 이전 페이지 6개 보여주기
    const handlePrevGroupPage = () => {
        setStartPage(startPage - 6);
        handlePageChange(startPage - 6);
        // setPage(startPage - 6);
    };

    //...버튼 클릭시 다음 페이지 6개 보여주기
    const handleNextGroupPage = () => {
        setStartPage(startPage + 6);
        handlePageChange(startPage + 6);
    };

    return (
        <div className="mt-4 flex flex-row gap-2">
            {/* 이전페이지 */}
            <button
                onClick={handleSinglePrevPage}
                className="mr-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 text-sm hover:border-neutral-500 disabled:opacity-30"
                disabled={page === 1}
            >
                <span className="text-xs text-neutral-800">이전 페이지</span>
            </button>

            {/* 첫페이지 */}
            <button
                onClick={() => {
                    handlePageChange(1);
                    setStartPage(2);
                }}
                className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === 1 ? ' bg-primary bg-opacity-80 text-white' : ''}`}
            >
                1
            </button>

            {/* 가려진 이전페이지 */}
            <button
                onClick={handlePrevGroupPage}
                className={`h-7 w-7 rounded-md border border-neutral-300 font-light hover:border-neutral-600 ${page === 1 ? ' bg-primary bg-opacity-80 text-white' : ''} ${page < 8 ? 'hidden' : ''}`}
            >
                {`...`}
            </button>

            {Array.from({ length: Math.min(6, totalPages - startPage) }, (_, i) => startPage + i).map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === pageNum ? ' bg-primary bg-opacity-80 text-white' : ''}`}
                >
                    {pageNum}
                </button>
            ))}

            {/* 가려진 다음페이지 */}
            <button
                onClick={handleNextGroupPage}
                className={`h-7 w-7 rounded-md border border-neutral-300 font-light hover:border-neutral-600  ${page === totalPages ? ' bg-primary bg-opacity-80 text-white' : ''} ${totalPages - startPage < 6 ? 'hidden' : ''}`}
            >{`...`}</button>

            {/* 마지막페이지  */}
            <button
                onClick={() => {
                    handlePageChange(totalPages);
                    setStartPage(totalPages - ((totalPages - 2) % 6));
                }}
                className={`h-7 w-7 rounded-md border border-neutral-300 text-sm font-light hover:border-neutral-600 ${page === totalPages ? ' bg-primary bg-opacity-80 text-white' : ''} ${totalPages === 1 || totalPages === 0 ? 'hidden' : ''}`}
            >
                {totalPages || 2}
            </button>

            {/* 다음페이지 */}
            <button
                onClick={handleSingleNextPage}
                className="ml-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 text-sm hover:border-neutral-500 disabled:opacity-30"
                disabled={totalPages === page || totalPages === 0 || totalPages === 1}
            >
                <span className="text-xs text-neutral-800">다음 페이지</span>
            </button>
        </div>
    );
}

export default Pagination;
