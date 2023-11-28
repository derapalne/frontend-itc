import { Brand } from "./Brand";
import { IUser } from "./User";

export interface CreateProduct {
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand_id: number;
}

export interface UpdateProduct {
    id?: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand_id: number;
    brand?: Brand;
}

export interface Product {
    id?: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand: Brand;
    brand_id: number;
    creator_user_id: number;
    user: IUser;
}

export interface ProductUserPage {
    id: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand: Brand;
    brand_id: number;
    creator_user_id: number;
}
