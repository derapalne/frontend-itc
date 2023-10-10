"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        Cookies.remove("access_token");
        Cookies.remove("user_data");
        router.push("/login");
    })
}
