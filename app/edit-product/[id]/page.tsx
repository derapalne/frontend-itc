"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Product from "../../components/Product";
import { Product as IProduct } from "../../interfaces/Product";
import Header from "@/app/components/Header";
import EditProductForm from "@/app/components/EditProductForm";
import Footer from "@/app/components/Footer";

const fetchProductData = async (id: number): Promise<IProduct> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/${id}`);
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
        const fakeCache = setTimeout(getProductData, Math.random() * 2000 + 500);
    }, [productId]);

    if (isLoading)
        return (
            <>
                <Header />
                <main className="h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 mx-auto text-center">
                        <h3 className="">Loading product data...</h3>
                    </div>
                </main>
                <Footer />
            </>
        );

    if (!product)
        return (
            <>
                <Header />
                <main className="h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 mx-auto text-center">
                        <h3>No product found!</h3>
                    </div>
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                <div className="w-full mx-auto text-center">
                    <EditProductForm params={product} />
                </div>
            </main>
            <Footer />
        </>
    );
}
