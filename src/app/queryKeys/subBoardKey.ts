export const SUBBOARD_QUERYKEY = ['posts', 'subBoard'] as const; //전체 서브 게시판 쿼리키(서브 게시판 관련된 전체 쿼리키)
export const REQUEST_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'request'] as const; //요청 게시판 쿼리키(요청 게시판 관련 쿼리키)
export const QUEST_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'quest'] as const; //질문 게시판 쿼리키(질문 게시판 관련 쿼리키)

export const DETAIL_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'detail'] as const; //서브 게시판 상세 쿼리키(서브 게시판 상세 관련 쿼리키)

/**
 * Creates a query key for sub board page requests.
 * @param {string} subBoardType - 질문 게시판 또는 요청 게시판 인지 키값으로 이용.
 * @param {number} pageParam - The current page number.
 * @param {number} sizeParam - The page size.
 * @param {string} categoryParam - The category filter.
 * @param {string} searchParam - The search query.
 * @param {boolean} schoolFilter - The school filter status.
 * @param {boolean} starParam - The star rating filter.
 * @returns {(string | number | boolean)[]} The sub board query key array.
 */

export function createSubBoardPostsKey(
    subBoardType: 'QUEST' | 'REQUEST',
    pageParam: number,
    sizeParam: number,
    categoryParam: string,
    searchParam: string,
    schoolFilter: boolean,
    starParam: boolean,
): (string | number | boolean | undefined)[] {
    if (subBoardType === 'QUEST')
        return [...QUEST_SUBBOARD_QUERYKEY, sizeParam, categoryParam, searchParam, schoolFilter, starParam];
    else
        return [
            ...REQUEST_SUBBOARD_QUERYKEY,
            pageParam,
            sizeParam,
            categoryParam,
            searchParam,
            schoolFilter,
            starParam,
        ];
}

/**
 * Creates a query key for sub board detail page requests.
 * @param {string | number} subBoardId - The sub board ID.
 * @returns {(string | number)[]} The sub board detail query key array.
 */

export function createSubBoardDetailKey(subBoardId: number): (string | number)[] {
    return [...DETAIL_SUBBOARD_QUERYKEY, subBoardId];
}

/**
 * Creates a query key for sub board reply page requests.
 * @param {number} subBoardId - The sub board ID.
 * @param {number} pageParam - The current page number.
 * @param {number} sizeParam - The page size.
 * @returns {(string | number)[]} The sub board reply query key array.
 */

export function createSubBoardReplyKey(subBoardId: number, pageParam: number, sizeParam: number): (string | number)[] {
    return [...DETAIL_SUBBOARD_QUERYKEY, subBoardId, 'reply', pageParam, sizeParam];
}
