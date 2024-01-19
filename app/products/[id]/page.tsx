"use client";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Product from "../../components/Product";
import { Product as IProduct } from "../../interfaces/Product";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductSkeleton from "@/app/components/ProductSkeleton";

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
                <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 pt-4 mx-auto text-center opacity-90">
                        <ProductSkeleton />
                    </div>
                </main>
                <Footer />
            </>
        );

    if (!product)
        return (
            <>
                <Header />
                <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 mx-auto">
                        <h3>No product found!</h3>
                    </div>
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                <div className="w-7/12 pt-4 mx-auto">
                    <Product params={product} />
                </div>
            </main>
            <Footer />
        </>
    );
}
