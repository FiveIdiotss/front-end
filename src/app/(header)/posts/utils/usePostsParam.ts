import { useSearchParams } from 'next/navigation';

export const usePostsParam = () => {
    const searchParams = useSearchParams();
    const pageParam = Number(searchParams.get('page')) || 1; //페이지 선택
    const sizeParam = Number(searchParams.get('size')) || 24; //페이지 사이즈
    const categoryParam = searchParams.get('category') || ''; //카테고리 선택
    const searchParam = searchParams.get('search') || ''; //검색어
    const schoolFilter = Boolean(searchParams.get('schoolFilter')) || false; //학교필터
    const starParam = Boolean(searchParams.get('star')) || false; //북마크 필터

    return {
        keys: [pageParam, sizeParam, categoryParam, searchParam, schoolFilter, starParam],
        pageParam,
        sizeParam,
        categoryParam,
        searchParam,
        schoolFilter,
        starParam,
    };
};
