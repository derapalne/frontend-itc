import { Product } from "./Product";

export interface ICart {
    id: number;
    name: string;
    user_id: number;
    products: Product[];
    isActive: boolean;
    ordered_on?: string;
}