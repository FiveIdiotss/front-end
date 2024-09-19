import React, { useEffect, useState } from 'react';
import { SearchResultsType } from '../../_lib/homeSearchService';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';

type SearchItem = {
    term: string; // 검색 키워드
    date: string; // 검색 날짜
};

interface Props {
    searchResult?: SearchResultsType;
    searchKeyword: string;
}
function ResultSearch({ searchResult, searchKeyword }: Props) {
    const router = useRouter();
    const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);

    useEffect(() => {
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);
    const addSearchTerm = (term: string) => {
        const newSearchItem: SearchItem = {
            term: term,
            date: new Date().toLocaleDateString(), // 검색한 날짜 저장
        };

        // 중복된 검색어 제거 후 상단에 새로운 항목 추가
        let updatedSearches = recentSearches.filter((item) => item.term !== term);
        updatedSearches = [newSearchItem, ...updatedSearches.slice(0, 4)]; // 최대 5개만 저장

        // 로컬 스토리지에 저장
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        setRecentSearches(updatedSearches);
    };

    const handleRoute = (url: string) => {
        router.push(url);
        addSearchTerm(searchKeyword);
    };

    return (
        <div className="flex w-full flex-grow flex-col gap-1">
            <button
                onClick={() => handleRoute('/posts/mentor?search=' + searchKeyword)}
                className=" flex w-full items-center justify-between rounded-lg  p-1 "
            >
                멘토링
                <ArrowRightIcon className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {searchResult?.boardTitles.length === 0 && (
                    <span className="mx-auto  text-sm text-gray-400">검색 결과가 없습니다.</span>
                )}
                {searchResult?.boardTitles.map((result, index) => (
                    <button
                        onClick={() => handleRoute('/posts/mentor?search=' + result)}
                        key={index}
                        className="flex w-full justify-start   border-b  p-2 text-left text-sm text-gray-600"
                    >
                        {result}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handleRoute('/posts/quest?search=' + searchKeyword)}
                className=" mt-4 flex w-full items-center justify-between rounded-lg p-1 "
            >
                질문
                <ArrowRightIcon className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {searchResult?.subBoardTitle_quest.length === 0 && (
                    <span className=" mx-auto text-sm text-gray-400">검색 결과가 없습니다.</span>
                )}

                {searchResult?.subBoardTitle_quest.map((result, index) => (
                    <button
                        onClick={() => handleRoute('/posts/quest?search=' + result)}
                        key={index}
                        className="flex w-full justify-between border-b p-2 text-left text-sm text-gray-600"
                    >
                        <span>{result}</span>
                    </button>
                ))}
            </div>
            <button
                onClick={() => handleRoute('/posts/request?search=' + searchKeyword)}
                className=" mt-4 flex w-full items-center justify-between rounded-lg  p-1 "
            >
                멘토링 요청
                <ArrowRightIcon className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {searchResult?.subBoardTitle_request.length === 0 && (
                    <span className=" mx-auto text-sm text-gray-400">검색 결과가 없습니다.</span>
                )}

                {searchResult?.subBoardTitle_request.map((result, index) => (
                    <button
                        onClick={() => handleRoute('/posts/request?search=' + result)}
                        key={index}
                        className="flex w-full justify-between border-b p-2 text-left text-sm text-gray-600"
                    >
                        <span>{result}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ResultSearch;
