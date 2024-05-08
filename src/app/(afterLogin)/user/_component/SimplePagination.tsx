import React from 'react';
type Props = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
};

function SimplePagination({ page, setPage, totalPages }: Props) {
    return (
        <div className="flex w-full flex-row justify-center gap-4">
            <button
                className="ml-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 py-2 text-sm shadow-sm hover:border-neutral-500 disabled:opacity-30"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                <span className={`text-xs text-neutral-800 `}>이전 페이지</span>
            </button>
            <button
                className="ml-2 flex flex-row items-center rounded-md border border-neutral-300 px-2 text-sm shadow-sm hover:border-neutral-500 disabled:opacity-30"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                <span className="text-xs text-neutral-800">다음 페이지</span>
            </button>
        </div>
    );
}

export default SimplePagination;
