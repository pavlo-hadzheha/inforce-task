import { CommentUID  } from "./comment.interface";

export type ProductUID = number;

export interface IProductResponse {
    id: ProductUID;
    imageUrl: string;
    name: string;
    count: number;
    size: { 
        width: number;
        height: number 
    };
    weight: number;
    weight_unit: string;
    comments: CommentUID[];
}

export interface IProductRequest {
    imageUrl: string;
    name: string;
    count: number;
    size: { 
        width: number;
        height: number 
    };
    weight: number;
    weight_unit: string;
    comments: CommentUID[];
}