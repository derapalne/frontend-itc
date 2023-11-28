import { ProductUserPage as Product } from "./Product";

export interface IUser {
    id: number;
    username: string;
    n_products: number;
    products?: Product[];
    creationDate?: string;
}
