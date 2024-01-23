"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Product as IProduct } from "../../interfaces/Product";
import EditProductForm from "@/app/components/products/EditProductForm";
import { UserData } from "@/app/interfaces/UserData";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";

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
    if (!activeUserData && activeUserDataCookie) setActiveUserData(JSON.parse(activeUserDataCookie));

    if (
        product &&
        (!accessToken || (activeUserData && product && activeUserData.id !== product.creator_user_id))
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
                <Main>
                    <div className="w-7/12 mx-auto text-center">
                        <h3 className="">Loading product data...</h3>
                    </div>
                </Main>
            </>
        );

    if (!product)
        return (
            <>
                <Header />
                <Main>
                    <div className="w-7/12 mx-auto text-center">
                        <h3>No product found!</h3>
                    </div>
                </Main>
            </>
        );

    return (
        <>
            <Header />
            <Main>
                <div className="w-full mx-auto text-center">
                    <EditProductForm params={product} />
                </div>
            </Main>
        </>
    );
}
