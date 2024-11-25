import React, { useEffect, useState } from 'react';
import { SearchResultsType } from '../../_lib/homeSearchService';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import ResultSearchCard from './ResultSearchCard';

type SearchItem = {
    term: string; // 검색 키워드
    date: string; // 검색 날짜
};

interface Props {
    searchResult?: SearchResultsType;
    searchKeyword: string;
}

// 검색어를 강조하고, 검색어가 존재하는지 여부를 반환하는 함수

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

    const isMentorResult = searchResult?.boards_title.length === 0 && searchResult?.boards_content.length === 0;
    const isRequestResult =
        searchResult?.subBoards_request_title.length === 0 && searchResult?.subBoards_request_content.length === 0;
    const isQuestResult =
        searchResult?.subBoards_quest_title.length === 0 && searchResult?.subBoards_quest_content.length === 0;

    return (
        <div className="flex w-full flex-grow flex-col gap-1">
            <button
                onClick={() => handleRoute('/posts/mentor?search=' + searchKeyword)}
                className=" flex w-full items-center justify-between rounded-lg  p-1 "
            >
                멘토링
                <ArrowRightIcon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {isMentorResult && <span className="mx-auto  text-sm text-gray-400">검색 결과가 없습니다.</span>}
                {searchResult?.boards_title.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="MENTOR"
                    />
                ))}
                {searchResult?.boards_content.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="MENTOR"
                    />
                ))}
            </div>

            <button
                onClick={() => handleRoute('/posts/quest?search=' + searchKeyword)}
                className=" mt-4 flex w-full items-center justify-between rounded-lg p-1 "
            >
                질문
                <ArrowRightIcon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {isQuestResult && <span className=" mx-auto text-sm text-gray-400">검색 결과가 없습니다.</span>}

                {searchResult?.subBoards_quest_title.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="QUEST"
                    />
                ))}
                {searchResult?.subBoards_quest_content.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="QUEST"
                    />
                ))}
            </div>
            <button
                onClick={() => handleRoute('/posts/request?search=' + searchKeyword)}
                className=" mt-4 flex w-full items-center justify-between rounded-lg  p-1 "
            >
                멘토링 요청
                <ArrowRightIcon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex flex-col gap-2 p-1">
                {isRequestResult && <span className=" mx-auto text-sm text-gray-400">검색 결과가 없습니다.</span>}

                {searchResult?.subBoards_request_title.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="REQUEST"
                    />
                ))}
                {searchResult?.subBoards_request_content.map((result, index) => (
                    <ResultSearchCard
                        key={index}
                        handleRoute={handleRoute}
                        result={result}
                        searchKeyword={searchKeyword}
                        type="REQUEST"
                    />
                ))}
            </div>
        </div>
    );
}

export default ResultSearch;
