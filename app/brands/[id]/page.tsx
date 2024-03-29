"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Brand as IBrand } from "@/app/interfaces/Brand";
import Brand from "@/app/components/brands/Brand";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";

const fetchBrandData = async (id: number): Promise<IBrand> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/brands/${id}`);
    const jsonResponse: IBrand = await response.json();
    return jsonResponse;
};

export default function BrandPage() {
    const productId = parseInt(usePathname().split("/")[2]);
    const [brand, setBrand] = useState<IBrand>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getBrandData() {
            const brandData = await fetchBrandData(productId);
            setBrand(brandData);
            setIsLoading(false);
        }
        // Toggle fake cache based con env configuration
        const ms = process.env["FAKE_CACHE"] ? Math.random() * 1000 + 500 : 0;
        const fakeCache = setTimeout(getBrandData, ms);
    }, [productId]);

    if (isLoading)
        return (
            <>
                <Header />
                <Main>
                    <div className="w-7/12 pt-4 mx-auto text-center opacity-40">
                        <h3 className="">Loading brand data...</h3>
                    </div>
                </Main>
            </>
        );

    if (!brand)
        return (
            <>
                <Header />
                <Main>
                    <div className="w-7/12 mx-auto">
                        <h3>No brand found!</h3>
                    </div>
                </Main>
            </>
        );

    return (
        <>
            <Header />
            <Main>
                <div className="w-7/12 pt-4 mx-auto">
                    <Brand params={brand} />
                </div>
            </Main>
        </>
    );
}
