import ClockIcon from '@/app/_icons/common/ClockIcon';
import React, { useEffect, useState } from 'react';
type SearchItem = {
    term: string; // 검색 키워드
    date: string; // 검색 날짜
};
interface Props {
    handleRecentSearch: (term: string) => void;
}
function ResentSearch({ handleRecentSearch }: Props) {
    const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);

    // 검색어 삭제 함수
    const removeSearchTerm = (term: string) => {
        const updatedSearches = recentSearches.filter((item) => item.term !== term);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        setRecentSearches(updatedSearches);
    };

    useEffect(() => {
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);
    return (
        <div className="flex flex-col gap-2 p-1">
            {recentSearches.length === 0 && (
                <span className="mx-auto text-sm text-gray-400">최근 검색어가 없습니다.</span>
            )}
            {recentSearches.map((item, index) => (
                <div key={index} className="flex w-full gap-2 text-sm text-gray-500">
                    <button
                        onClick={() => handleRecentSearch(item.term)}
                        className="flex flex-grow flex-row items-center gap-2 text-left text-sm text-gray-800"
                    >
                        <ClockIcon className="h-4 w-4 shrink-0 text-gray-400 " />
                        {item.term}
                    </button>
                    <div className="flex shrink-0 flex-row gap-4 text-sm">
                        <button className="text-sm text-gray-500">{item.date}</button>
                        <button onClick={() => removeSearchTerm(item.term)} className="text-xs text-red-400">
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResentSearch;
