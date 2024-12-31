export const POSTS_QUERYKEY = ['posts'] as const; //전체 게시판 쿼리키(전체 게시판 관련 쿼리키)
export const MENTOR_QUERYKEY = ['posts', 'mento'] as const; //전체 멘토 게시판 쿼리키(멘토 관련된 전체 쿼리키)
export const HOME_MENTOR_QUERYKEY = ['posts', 'mento', 'home'] as const; //홈 멘토 게시판 쿼리키(홈 화면에서 멘토 게시판 관련 쿼리키)
export const POSTS_MENTOR_QUERYKEY = ['posts', 'mento', 'main'] as const; //멘토 게시판 쿼리키(멘토 게시판 관련 쿼리키)
export const DETAIL_MENTOR_QUERYKEY = ['posts', 'mento', 'detail'] as const; //멘토 게시판 상세 쿼리키(멘토 게시판 상세 관련 쿼리키)

export const SUBBOARD_QUERYKEY = ['posts', 'subBoard'] as const; //전체 서브 게시판 쿼리키(서브 게시판 관련된 전체 쿼리키)
export const REQUEST_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'request'] as const; //요청 게시판 쿼리키(요청 게시판 관련 쿼리키)
export const QUEST_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'quest'] as const; //질문 게시판 쿼리키(질문 게시판 관련 쿼리키)

export const DETAIL_SUBBOARD_QUERYKEY = ['posts', 'subBoard', 'detail'] as const; //서브 게시판 상세 쿼리키(서브 게시판 상세 관련 쿼리키)
export const DETAIL_REQUEST_QUERYKEY = ['posts', 'subBoard', 'request', 'detail'] as const; //요청 게시판 상세 쿼리키(요청 게시판 상세 관련 쿼리키)
export const DETAIL_QUEST_QUERYKEY = ['posts', 'subBoard', 'quest', 'detail'] as const; //질문 게시판 상세 쿼리키(질문 게시판 상세 관련 쿼리키)
