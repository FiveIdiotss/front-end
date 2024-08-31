import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type QueryValue = string | null; // 쿼리 값이 null일 수도 있으므로 타입을 확장

export const useQueryParameter = (queryParamName: string, defaultValue?: QueryValue) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const currentValue = (searchParams.get(queryParamName) as QueryValue) || defaultValue || null;

    const handleChange = (value: QueryValue) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === defaultValue || value === null) {
            newSearchParams.delete(queryParamName);
        } else {
            newSearchParams.set(queryParamName, value);
        }

        router.push(`${pathName}?${newSearchParams.toString()}`);
    };

    return {
        currentValue,
        handleChange,
    };
};
/**
 * useQueryParameter
 *
 * 이 훅은 URL 쿼리 파라미터를 관리하고, 쿼리 파라미터에 따른 상태 변경을 처리합니다.
 * 탭 네비게이션, 페이지네이션, 필터링 등 다양한 시나리오에서 사용할 수 있습니다.
 *
 * @param queryParamName - 관리할 쿼리 파라미터의 이름 (예: 'tab', 'page')
 * @param defaultValue - 쿼리 파라미터가 없을 때 사용할 기본값 (선택 사항)
 *
 * @returns {Object} - currentValue와 handleChange 함수를 포함하는 객체
 *   - currentValue: 현재 URL에 설정된 쿼리 파라미터 값 (없을 경우 기본값 또는 null)
 *   - handleChange: 쿼리 파라미터 값을 변경하는 함수
 *
 * @example
 * const { currentValue, handleChange } = useQueryParameter('tab', '멘토링');
 * handleChange('다른 탭 이름');
 */
