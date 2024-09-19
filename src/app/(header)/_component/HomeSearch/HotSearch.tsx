import React, { use, useEffect } from 'react';
import { useHotKeywordsQuery } from '../../_lib/homeHotKeywordService';
import ErrorDataUI from '@/app/_component/ErrorDataUI';

interface Props {
    handleHotSearch: (tag: string) => void;
}

function HotSearch({ handleHotSearch }: Props) {
    const hotKeywordsQuery = useHotKeywordsQuery();
    const { data: hotKeywords, isPending, error } = hotKeywordsQuery;
    useEffect(() => {
        if (hotKeywords) {
            console.log(hotKeywords);
        }
    }, [hotKeywords]);

    return (
        <div className="flex w-full flex-row flex-wrap">
            {error && (
                <ErrorDataUI
                    className="mx-auto "
                    onReset={hotKeywordsQuery.refetch}
                    text={'오류가 발생했습니다. 다시 시도해주세요.'}
                />
            )}
            {isPending &&
                [...Array(9)].map((_, index) => (
                    <span
                        key={index}
                        className=" text-smhover:bg-opacity-70 m-1 h-7 w-14 cursor-pointer rounded-lg bg-purple-50"
                    ></span>
                ))}
            {hotKeywords?.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => handleHotSearch(tag)}
                    className=" m-1 cursor-pointer rounded-lg bg-purple-100 px-2 py-1 text-left text-sm text-primary hover:bg-opacity-60"
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

export default HotSearch;
