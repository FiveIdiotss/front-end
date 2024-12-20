'use client';
import React, { useCallback, useEffect, useState } from 'react';
import SectionDivider from '@/app/_component/common/SectionDivider';
import SearchIcon from '@/app/_icons/common/SearchIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import DotLoadingIcon from '@/app/_icons/common/DotLoadingIcon';

function CategorySearch() {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const debouncedHandleSubmit = useCallback(
        debounce((value: string) => {
            setLoading(false); // 디바운스 시간이 경과하고 함수가 실행될 때 로딩 상태를 false로 설정
            const params = new URLSearchParams(searchParams.toString());
            if (value === '') {
                params.delete('search');
                params.delete('page');
            } else {
                params.set('search', value);
                params.delete('page');
                console.log('params', params);
            }
            router.replace(pathname + '?' + params.toString());
        }, 400), // 디바운스 시간을 300ms로 설정
        [searchParams, pathname],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true); // 입력이 시작될 때 로딩 상태를 true로 설정
        debouncedHandleSubmit(e.target.value);
    };
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Button clicked!');
        handleInputChange({ target: { value: inputRef.current?.value } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    useEffect(() => {
        if (inputRef.current === null) return;
        inputRef.current.onfocus = () => setIsFocused(true);
        inputRef.current.onblur = () => setIsFocused(false);
    }, []);
    useEffect(() => {
        if (searchParams.size === 0) {
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [searchParams]); // 검색어가 없을 때 input 초기화, 선언적 프로그래밍 패러다임에 위반되긴 하지만, 이렇게 사용하는 것이 더 직관적이라고 판단하여 사용함

    return (
        <div
            className={` flex h-11 w-full  flex-row items-center  rounded-md border  bg-white p-2   ${isFocused ? 'border-gray-300' : 'border-gray-200'} `}
        >
            <input
                ref={inputRef}
                type="search"
                onFocus={() => inputRef.current?.focus()}
                placeholder="제목, 내용 검색"
                className=" ml-2 mr-4 h-5  w-full bg-inherit text-sm text-gray-500 outline-none "
                onKeyDown={handleKeyDown} // 엔터 키로 검색
                defaultValue={searchParams.get('search') || ''}
            />

            <div className="flex h-full w-11 cursor-pointer items-center justify-center">
                <button onClick={handleButtonClick}>
                    <SearchIcon className={`h-5 w-5 ${isFocused ? 'rotate-90 text-blue-600' : 'text-gray-200'}`} />
                </button>

                {/* {loading && (
                    <div className=" h-full w-full ">
                        <DotLoadingIcon />
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default CategorySearch;
