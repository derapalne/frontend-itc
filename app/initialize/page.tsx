"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function postInitialization() {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/init`, {
        method: "POST",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export default function InitializePage() {
    const [firstRender, setFirstRender] = useState(true);
    const router = useRouter();

    async function initialize() {
        const response = await postInitialization();
        console.log(response);
        router.push("/products");
    }

    if (firstRender) {
        console.log("initializing...");
        initialize();
        setFirstRender(false);
    }
}
