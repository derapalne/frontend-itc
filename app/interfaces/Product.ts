import { Brand } from "./Brand";
import { ITag } from "./Tag";
import { IUser } from "./User";

export interface CreateProduct {
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand_id: number;
    tag_ids?: number[];
}

export interface UpdateProduct {
    id?: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand_id: number;
    brand?: Brand;
    tag_ids?: number[];
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
    is_on_cart: boolean;
    tags: ITag[];
}

export interface IProductListing {
    id: number;
    name: string;
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

export interface ProductBrandPage {
    id: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand_id: number;
    creator_user_id: number;
    user: IUser;
}