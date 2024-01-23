"use client";
import { useEffect, useState } from "react";
import AddProductForm from "../components/products/AddProductForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Main from "../components/Main";

export default function AddProductPage() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | undefined>("");

    // useEffect to execute only once
    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        setAccessToken(accessTokenCookie);
    }, []);

    // If access token is not present, then user is not authorized
    if (accessToken === undefined) router.push("/products");

    return (
        <>
            <Header />
            <Main>
                <AddProductForm></AddProductForm>
            </Main>
        </>
    );
}
