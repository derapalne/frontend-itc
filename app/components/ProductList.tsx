"use client";
import { Product as IProduct } from "../interfaces/Product";
import ProductForList from "./ProductForList";
import { useEffect, useState } from "react";

const fetchItems = async (): Promise<IProduct[]> => {
    // console.log(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}`);
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/`);
    const jsonResponse: IProduct[] = await response.json();
    return jsonResponse;
};

export default function ProductList() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<IProduct[]>();

    useEffect(() => {
        async function getItems() {
            const items = await fetchItems();
            setProducts(items);
            setIsLoading(false);
        }
        const fakeCache = setTimeout(getItems, Math.random() * 2000 + 500);
    }, []);

    if (isLoading) return <div className="w-9/12 mx-auto text-center">Loading Products...</div>;

    if (!products) return <div>No products!!</div>;

    return (
        <div className="grid grid-cols-4 gap-2 w-9/12 mx-auto">
            {products.map((p) => (
                <ProductForList
                    key={p.id}
                    params={{
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        image_url: p.image_url,
                        price: p.price,
                        brand: p.brand,
                    }}
                />
            ))}
        </div>
    );
}
