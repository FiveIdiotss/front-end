import SearchResultIcon from '@/app/_icons/common/SearchResultIcon';
import ShareIcon from '@/app/_icons/common/ShareIcon';
import React from 'react';

const highlightSearchKeyword = (
    text: string,
    searchKeyword: string,
    highlightClass: string = 'text-yellow-600 bg-yellow-100',
) => {
    if (!searchKeyword) return { highlightedText: text, exists: false }; // 검색어가 없으면 원본 텍스트 반환

    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = text.split(regex);

    const exists = regex.test(text); // 검색어 존재 여부 확인

    const highlightedText = parts.map((part, index) => (
        <span key={index} className={`${part.toLowerCase() === searchKeyword.toLowerCase() ? highlightClass : ''} `}>
            {part}
        </span>
    ));
    console.log('highlightedText', highlightedText);

    return { highlightedText, exists };
};

interface Props {
    handleRoute: (url: string) => void;
    result: string;
    searchKeyword: string;
    type: 'MENTOR' | 'QUEST' | 'REQUEST';
}

function ResultSearchCard({ handleRoute: router, result, searchKeyword, type }: Props) {
    const { highlightedText, exists } = highlightSearchKeyword(result, searchKeyword);

    const handleRoute = () => {
        if (type === 'MENTOR') {
            router('/posts/mentor?search=' + result);
        } else if (type === 'QUEST') {
            router('/posts/quest?search=' + result);
        } else {
            router('/posts/request?search=' + result);
        }
    };
    return (
        <button
            onClick={handleRoute}
            className=" flex w-full items-center gap-3     py-2    text-gray-500 hover:bg-gray-50"
        >
            <SearchResultIcon className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="flex-grow  break-words text-left">{highlightedText}</span>
            <ShareIcon className="h-4 w-4 shrink-0 text-gray-400" />
        </button>
    );
}

export default ResultSearchCard;
