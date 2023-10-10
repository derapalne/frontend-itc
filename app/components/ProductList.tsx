"use client";
import { Product as IProduct } from "../interfaces/Product";
import ProductForList from "./ProductForList";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const fetchItems = async (): Promise<IProduct[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/`);
    const jsonResponse: IProduct[] = await response.json();
    return jsonResponse;
};

export default function ProductList() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<IProduct[]>();
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
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
            {accessToken ? (
                <Link
                    href="/add-product"
                    className="flex flex-col justify-center items-center p-1 shadow rounded-lg cursor-pointer duration-300 dark:border-0 dark:bg-stone-900 hover:bg-stone-200/[0.3] dark:hover:bg-stone-800"
                >
                    + Add Product +
                </Link>
            ) : (
                <></>
            )}
        </div>
    );
}
