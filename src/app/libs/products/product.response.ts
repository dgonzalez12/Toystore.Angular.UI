export class ProductResponse<T> {
    success: boolean;
    message: string;
    obj: T;
}