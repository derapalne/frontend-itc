import { ProductBrandPage } from "./Product";

export interface Brand {
    id: number;
    logo_url: string;
    name: string;
    products?: ProductBrandPage[];
    creationDate?: string;
}
