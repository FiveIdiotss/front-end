export type ErrorResponse = {
    data: [];
    message: string;
    success: boolean;
};
export type FetchErrorResponseType = {
    message: string;
    status: number;
    data: ErrorResponse | null;
};
export type SuccessResponse<T> = {
    data: T;
    message: string;
    success: boolean;
};
