import { ProductUID } from "./product.interface";

export type CommentUID = number;

export interface ICommentResponse {
    id: CommentUID;
    productId: ProductUID;
    description: string;
    date: string;
}

export interface ICommentRequest {
    productId: ProductUID;
    description: string;
    date: string;
}