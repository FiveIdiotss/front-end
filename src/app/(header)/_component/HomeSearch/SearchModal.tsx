import NonStandardModal from '@/app/_component/common/NonStandardModal';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import ArrowRightIcon from '@/app/_icons/common/ArrowRightIcon';

import SearchIcon from '@/app/_icons/common/SearchIcon';
import { useCallback, useEffect, useRef, useState } from 'react';
import ResentSearch from './ResentSearch';
import HotSearch from './HotSearch';
import { debounce, set } from 'lodash';
import { useSearchResultsQuery } from '../../_lib/homeSearchService';
import ResultSearch from './ResultSearch';

type Props = {
    onClose: () => void;
};

function SearchModal({ onClose }: Props) {
    const [isFocus, setIsFocus] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const searchResultsQuery = useSearchResultsQuery({ keyword: search, enabled: search.length > 0 });
    const { data: searchResults, error, isPending } = searchResultsQuery;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };
    const handleKeyword = (term: string) => {
        setSearch(term);
        if (inputRef.current) {
            inputRef.current.value = term;
            inputRef.current.focus;
        }
    };
    const handleDebouncedSearch = useCallback(debounce(handleSearch, 200), []);
    const handleBack = () => {
        if (search.length > 0) {
            setSearch('');
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.focus();
            }

            return;
        }
        onClose();
    };

    if (error) return;

    return (
        <NonStandardModal
            onClose={onClose}
            className="  h-full w-full border-gray-300 bg-white p-4 mobile:h-[600px]  mobile:w-[450px] mobile:rounded-md mobile:border"
            modalBackground="bg-black bg-opacity-40"
            titleClassName="text-neutral-800"
            backButtonTheme="black"
            isHeader={false}
        >
            <div className="flex flex-col  items-center gap-6 ">
                <div className=" flex w-full flex-row gap-3  ">
                    <button onClick={handleBack} className=" mobile:hidden">
                        <ArrowLeftBackIcon className="h-6 w-6 text-gray-500" />
                    </button>
                    <div className="flex flex-grow items-center gap-2 rounded-lg border border-gray-300 p-3">
                        <input
                            ref={inputRef}
                            className="flex-grow rounded-full bg-inherit px-1  outline-none"
                            type="search"
                            placeholder="제목, 내용, 학과 검색"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={handleDebouncedSearch}
                        />
                        <SearchIcon className={`h-5 w-5  ${isFocus ? ' text-primary' : 'text-gray-700'}`} />
                    </div>
                    <button onClick={handleBack} className=" hidden text-gray-500 mobile:block">
                        <span>취소</span>
                    </button>
                </div>
                {!searchResults && search.length === 0 && (
                    <div
                        className={`  w-full flex-grow flex-col items-start gap-6 overflow-y-auto ${search.length > 0 ? 'hidden' : 'flex'} `}
                    >
                        <div className="flex w-full  flex-col gap-2">
                            <span className="font-semibold">인기 검색어</span>
                            <HotSearch handleHotSearch={handleKeyword} />
                        </div>
                        <div className="flex w-full flex-col gap-2 ">
                            <span className="font-semibold">최근 검색어</span>
                            <ResentSearch handleRecentSearch={handleKeyword} />
                        </div>
                    </div>
                )}
                {searchResults && search.length > 0 && (
                    <ResultSearch searchResult={searchResults} searchKeyword={search} />
                )}
            </div>
        </NonStandardModal>
    );
}
//확인 취소 모달

export default SearchModal;
