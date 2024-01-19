"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

async function deleteResetDatabase(accessToken: string) {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/init`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export default function AdminPanel() {
    const router = useRouter();
    const [resetButtonText, setResetButtonText] = useState("Reset Product and Brand Databases");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
        else router.push("/");
    }, [router]);

    async function handleResetButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setResetButtonText("Resetting Products and Brands...");
        const response = await deleteResetDatabase(accessToken);
        if (response.success) setResetButtonText("Products and Brands Resetted");
        else setResetButtonText("There has been an error");
        console.log(response);
    }

    if (!accessToken)
        return (
            <div>
                <div className="w-9/12 my-8 mx-auto flex justify-center">
                    <h4 className="opacity-40">Fetching data...</h4>
                </div>
            </div>
        );

    return (
        <div>
            <h3 className="m-8 text-center text-xl font-bold">Admin Tab</h3>
            <div className="w-9/12 mx-auto flex justify-center">
                <button
                    className="p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                    onClick={handleResetButtonClick}
                >
                    {resetButtonText}
                </button>
            </div>
        </div>
    );
}
