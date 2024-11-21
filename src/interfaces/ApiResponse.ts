interface ApiResponse<T> {
    code: number;
    data: T;
    msg: string;
}

export default ApiResponse