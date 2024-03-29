"use client";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Product from "../../components/products/Product";
import { Product as IProduct } from "../../interfaces/Product";
import ProductSkeleton from "@/app/components/products/ProductSkeleton";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";

const fetchProductData = async (id: number): Promise<IProduct> => {
    const accessToken = Cookies.get("access_token");
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse: IProduct = await response.json();
    return jsonResponse;
};

export default function Products() {
    const productId = parseInt(usePathname().split("/")[2]);

    const [product, setProduct] = useState<IProduct>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getProductData() {
            const productData = await fetchProductData(productId);
            setProduct(productData);
            setIsLoading(false);
        }
        // Toggle fake cache based con env configuration
        const ms = process.env["FAKE_CACHE"] ? Math.random() * 1000 + 500 : 0;
        const fakeCache = setTimeout(getProductData, ms);
    }, [productId]);

    if (isLoading)
        return (
            <>
                <Header />
                <Main>
                    <div className="w-7/12 pt-4 mx-auto text-center opacity-90">
                        <ProductSkeleton />
                    </div>
                </Main>
            </>
        );

    if (!product)
        return (
            <>
                <Header />
                <Main>
                    <div className="w-7/12 mx-auto">
                        <h3>No product found!</h3>
                    </div>
                </Main>
            </>
        );

    return (
        <>
            <Header />
            <Main>
                <div className="w-7/12 pt-4 mx-auto">
                    <Product params={product} />
                </div>
            </Main>
        </>
    );
}
