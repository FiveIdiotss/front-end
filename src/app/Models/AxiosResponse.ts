export type ErrorResponse = {
    data: [];
    message: string;
    success: boolean;
};
export type SuccessResponse<T> = {
    data: T;
    message: string;
    success: boolean;
};
