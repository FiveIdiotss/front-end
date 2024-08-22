export const MENTOR_QUERYKEY = ['posts', 'mento'] as const; //전체 멘토 게시판 쿼리키(멘토 관련된 전체 쿼리키)

export const HOME_MENTOR_QUERYKEY = ['posts', 'mento', 'home'] as const; //홈 멘토 게시판 쿼리키(홈 화면에서 멘토 게시판 관련 쿼리키)
export const POSTS_MENTOR_QUERYKEY = ['posts', 'mento', 'main'] as const; //멘토 게시판 쿼리키(멘토 게시판 관련 쿼리키)
export const DETAIL_MENTOR_QUERYKEY = ['posts', 'mento', 'detail'] as const; //멘토 게시판 상세 쿼리키(멘토 게시판 상세 관련 쿼리키)

/**
 * Creates a query key for home page requests.
 * @param {number} pageParam - The current page number.
 * @param {number} sizeParam - The page size.
 * @param {string} categoryParam - The category filter.
 * @param {string} searchParam - The search query.
 * @param {boolean} schoolFilter - The school filter status.
 * @param {boolean} starParam - The star rating filter.
 * @returns {(string | number | boolean)[]} The posts mentor query key array.
 */

export function createMentorPostsKey(
    pageParam: number,
    sizeParam: number,
    categoryParam: string,
    searchParam: string,
    schoolFilter: boolean,
    starParam: boolean,
): (string | number | boolean)[] {
    return [...POSTS_MENTOR_QUERYKEY, pageParam, sizeParam, categoryParam, searchParam, schoolFilter, starParam];
}

/**
 * Creates a query key for mentor detail page requests.
 * @param {string | number} mentorId - The mentor ID.
 * @returns {(string | number)[]} The mentor detail query key array.
 */

export function createDetailMentorKey(mentorId: number): (string | number)[] {
    return [...DETAIL_MENTOR_QUERYKEY, mentorId];
}
