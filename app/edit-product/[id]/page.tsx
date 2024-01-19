"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Product as IProduct } from "../../interfaces/Product";
import Header from "@/app/components/Header";
import EditProductForm from "@/app/components/EditProductForm";
import Footer from "@/app/components/Footer";
import { UserData } from "@/app/interfaces/UserData";

const fetchProductData = async (id: number): Promise<IProduct> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/${id}`);
    const jsonResponse: IProduct = await response.json();
    return jsonResponse;
};

export default function EditProductPage() {
    const router = useRouter();

    const productId = parseInt(usePathname().split("/")[2]);
    const [product, setProduct] = useState<IProduct>();
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [activeUserData, setActiveUserData] = useState<UserData>();

    const accessTokenCookie = Cookies.get("access_token");
    if (!accessToken && accessTokenCookie) setAccessToken(accessTokenCookie);

    const activeUserDataCookie = Cookies.get("user_data");
    if (!activeUserData && activeUserDataCookie)
        setActiveUserData(JSON.parse(activeUserDataCookie));

    if (
        product &&
        (!accessToken ||
            (activeUserData && product && activeUserData.id !== product.creator_user_id))
    ) {
        console.log(accessToken, activeUserData, product);
        router.push("/products");
    }

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
                <main className="min-h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
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
                <main className="min-h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
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
            <main className="min-h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                <div className="w-full mx-auto text-center">
                    <EditProductForm params={product} />
                </div>
            </main>
            <Footer />
        </>
    );
}
