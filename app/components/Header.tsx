"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

type UserData = {
    username: string;
};

export default function Header() {
    const [userData, setUserData] = useState<UserData>();
    useEffect(() => {
        const userDataCookie = Cookies.get("user_data");
        if (userDataCookie) setUserData(JSON.parse(userDataCookie ? userDataCookie : ""));
    }, []);
    return (
        <header className="flex flex-row justify-around py-10 border-2 mb-8 border-stone-100 border-b-stone-200 dark:border-black dark:border-b-stone-800 dark:bg-stone-700 ">
            <h2 className="font-bold text-lg">Free Shopping</h2>
            <ul className="flex flex-row justify-around font-light dark:font-thin">
                <li className="mx-4 hover:font-normal duration-300">
                    <Link href="/products">Products</Link>
                </li>
                {userData ? (
                    <li>
                        <span>Hello, {userData.username}!</span>
                    </li>
                ) : (
                    ``
                )}

                <li className="mx-4 hover:font-normal duration-300">
                    {userData ? (
                        <Link href="/logout">Logout</Link>
                    ) : (
                        <Link href="/login">Login</Link>
                    )}
                </li>
            </ul>
        </header>
    );
}
