"use client";
import { useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | undefined>("");

    // useEffect para que se ejecute una sola vez
    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        setAccessToken(accessTokenCookie);
    }, []);

    if (accessToken === undefined) router.push("/products");

    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                <AddProductForm></AddProductForm>
            </main>
            <Footer />
        </>
    );
}
