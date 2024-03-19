export interface ResponseError {
    ok: boolean,
    message: string,
    code: string
}

interface SuccessResponse<T> {
    status: 'success';
    data: T;
}

interface ErrorResponse {
    status: 'error';
    message: string;
}