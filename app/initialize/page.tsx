"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

async function postInitialization(accessToken: string) {
    console.log(accessToken);
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/init`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export default function InitializePage() {
    const [firstRender, setFirstRender] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
    }, []);

    async function initialize() {
        const response = await postInitialization(accessToken);
        console.log(response);
        router.push("/products");
    }

    if (firstRender && accessToken) {
        initialize();
        setFirstRender(false);
    }
}
