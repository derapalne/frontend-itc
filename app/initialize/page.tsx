"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Main from "../components/Main";
import Header from "../components/Header";

async function postInitialization() {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/init`, {
        method: "POST",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export default function InitializePage() {
    const [firstRender, setFirstRender] = useState(true);
    const [text, setText] = useState("...");
    const router = useRouter();

    async function initialize() {
        const response = await postInitialization();
        console.log(response);
        router.push("/products");
    }

    if (firstRender) {
        initialize();
        setFirstRender(false);
    }

    setInterval(() => {
        if (text.length === 3) setText("");
        else setText(text + ".");
    }, 1000);

    return (
        <>
            <Header />
            <Main>
                <h3 className="text-lg text-center font-bold">
                    Initializing page. This may take a few seconds{text}
                </h3>
            </Main>
        </>
    );
}
