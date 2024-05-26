'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CateogryIcon from '../../_component/CategoryIcon';
import SectionDivider from '../../_component/SectionDivider';
import CategorySearch from './CategorySearch';
import { pushNotification } from '@/app/util/pushNotification';
import { CATEGORY_LIST } from '../../utils/categoryConstants';

function CategoryBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function isCategoryInUrlParams(url: string, category: string) {
        if (pathname !== '/posts/mentor') return false;
        if (category === '전체') return !searchParams.has('category');
        const params = new URLSearchParams(url);
        const categories = params.get('category')?.split(',') || [];
        return categories.includes(category);
    } // 파라미터를 가져와서 해당 카테고리가 있는지 확인하는 함수(배열로 변환해 확인)

    const setSelectParams = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === '전체') {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        router.replace(pathname + '?' + params, { scroll: false }); // URL 파라미터를 변경
    }; // 카테고리를 선택하면 URL에 파라미터를 추가하거나 제거하는 함수
    const handleToggle = () => {
        const isToggled = searchParams.has('schoolFilter');
        const params = new URLSearchParams(searchParams.toString());
        if (isToggled) {
            params.delete('schoolFilter');
        } else {
            params.set('schoolFilter', 'true');
        }
        router.replace(pathname + '?' + params, { scroll: false });
        pushNotification('학교 필터링이 ' + (isToggled ? '해제' : '적용') + '되었습니다.', 'success', 'dark');
    };
    const handleRest = () => {
        router.replace(pathname);
        pushNotification('필터가 초기화 되었습니다.', 'success', 'dark');
    };

    return (
        <div className="w-56 flex-shrink-0  ">
            <div className="sticky top-[142px] flex  flex-col gap-2 px-2">
                <CategorySearch />
                <div className=" flex w-full flex-col justify-center rounded-md     py-2 ">
                    {CATEGORY_LIST.map((category, index) => (
                        <>
                            {index !== 0 && (
                                <SectionDivider className={`my-1 ${index === 2 ? '' : ''} border-gray-50`} />
                            )}
                            <div
                                key={category.parameter}
                                className={`flex  cursor-pointer justify-start rounded-md px-2 py-2  ${isCategoryInUrlParams(searchParams.toString(), category.name) ? 'bg-indigo-50' : 'hover:bg-indigo-50'} `}
                                onClick={() => setSelectParams(category.name)}
                            >
                                <div
                                    className={`flex  flex-row items-center gap-4   ${isCategoryInUrlParams(searchParams.toString(), category.name) ? 'font-semibold text-indigo-500' : 'text-neutral-500 '} `}
                                >
                                    <CateogryIcon
                                        category={category.parameter}
                                        className={`h-5 w-5 ${isCategoryInUrlParams(searchParams.toString(), category.parameter) ? 'text-indigo-500' : 'text-neutral-500 '}`}
                                    />
                                    <span className="">{category.name}</span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className=" flex w-full flex-row items-center justify-center gap-2 rounded-md border border-dotted border-neutral-300 bg-neutral-50 py-5">
                    <span className="text-sm text-neutral-600">우리학교만 보기</span>
                    <div
                        className={`relative inline-block w-10 select-none rounded-md align-middle transition duration-100 ease-in ${searchParams.has('schoolFilter') ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer `}
                        onClick={handleToggle}
                    >
                        <span
                            className={`block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in ${searchParams.has('schoolFilter') ? 'translate-x-4' : ''}`}
                        ></span>
                    </div>
                </div>

                <div className="mt-6 flex w-full justify-center ">
                    <button
                        className="mr-1 cursor-pointer rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs text-neutral-500"
                        onClick={handleRest}
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryBar;
