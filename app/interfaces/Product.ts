import { Brand } from "./Brand";

export interface Product {
    id: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    brand: Brand;
}