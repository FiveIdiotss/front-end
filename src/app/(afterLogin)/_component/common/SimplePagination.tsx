'use client';
import ArrowIcon from '@/app/_icons/common/ArrowRightIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ReactPaginate from 'react-paginate';

function SimplePagination({ totalPages, isPageScroll = true }: { totalPages: number; isPageScroll?: boolean }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleRouter = ({ selected }: { selected: number }) => {
        const page = selected + 1;
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.replace(pathname + '?' + params.toString(), { scroll: isPageScroll });
    };

    const forcePage = Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : 0;

    const goToPreviousPage = () => {
        if (forcePage === 0) return;
        handleRouter({ selected: forcePage - 1 });
    };
    const goToNextPage = () => {
        if (forcePage === totalPages) return;
        handleRouter({ selected: forcePage + 1 });
    };

    return (
        <div className="mt-auto flex w-full items-center justify-between  py-2">
            <button
                onClick={goToPreviousPage}
                disabled={forcePage === 0}
                className={`mr-1 flex h-8 items-center justify-center px-2  text-gray-600 ${forcePage === 0 ? 'cursor-not-allowed opacity-0' : ''}`}
            >
                <ArrowIcon className="h-auto w-6 rotate-180 transform" />
                이전
            </button>

            <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                breakLabel={
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                        <span>...</span>
                    </div>
                }
                pageCount={totalPages}
                onPageChange={handleRouter}
                containerClassName={'flex flex-row font-medium  text-lg text-gray-600 mx-auto    items-center '}
                pageLinkClassName={
                    'flex items-center justify-center w-9 h-9 text-sm b rounded-lg hover:bg-gray-100 hover:text-red-700'
                }
                activeLinkClassName="text-red-700 font-bold underline underline-offset-2 decoration-2"
                pageRangeDisplayed={4} //선택된 페이지 주변에 보여질 페이지 수
                marginPagesDisplayed={1} //첫 페이지와 마지막 페이지 주변에 보여질 페이지 수
                forcePage={forcePage} //선택된 페이지
            />
            <button
                onClick={goToNextPage}
                disabled={forcePage === totalPages - 1}
                className={`ml-1 flex h-8 items-center justify-center rounded-md px-2 py-1 text-gray-700 ${forcePage === totalPages - 1 ? 'cursor-not-allowed opacity-0' : ''}`}
            >
                다음
                <ArrowIcon className="h-auto w-6 text-inherit" />
            </button>
        </div>
    );
}

export default SimplePagination;
