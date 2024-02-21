'use client';

import React, { useState } from 'react';
import FaChevronRight from '../_component/icon/chevronRight';
import FaChevronLeft from '../_component/icon/chevronLeft';

const mentorPosts = [
    'title 1',
    'title 2',
    'title 3',
    'title 4',
    'title 5',
    'title 6',
    'title 7',
    'title 8',
    'title 9',
    'title 10',
    'title 11',
    'title 12',
    'title 13',
    'title 14',
    'title 15',
    'title 16',
    'title 17',
    'title 18',
    'title 19',
    'title 20',
    'title 21',
    'title 22',
    'title 23',
    'title 24',
    'title 25',
    'title 26',
    'title 27',
    'title 28',
    'title 29',
    'title 30',
    'title 31',
    'title 32',
];

export default function MentorsDetail() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 페이지당 표시할 아이템 수
    const totalPages = Math.ceil(mentorPosts.length / itemsPerPage);

    // 현재 페이지에 따라 보여줄 아이템 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mentorPosts.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const paginate = (pageNumber: number) => {
        // 페이지 범위를 벗어나지 않도록 처리
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentItems.map((post, index) => (
                    <div
                        key={index}
                        className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200"
                    >
                        {post}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-center ">
                    {/* 이전 페이지로 이동하는 버튼 (첫 번째 페이지에서는 숨김) */}
                    <div className="mr-2">
                        {currentPage > 1 && (
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="flex items-center rounded px-3 py-1"
                            >
                                <FaChevronLeft />
                                <span className="hover:underline">이전</span>
                            </button>
                        )}
                    </div>
                    {/* Pagination 버튼들 */}
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`mx-1 rounded border border-gray-500 px-3 py-1 hover:bg-gray-200 ${
                                    currentPage === pageNumber ? 'bg-gray-200' : ''
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    {/* 다음 페이지로 이동하는 버튼 */}
                    <div className="ml-2">
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center rounded  px-3 py-1"
                        >
                            <span className="hover:underline">다음</span>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
