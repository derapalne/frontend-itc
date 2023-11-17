"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { UserData as IUserData } from "../interfaces/UserData";

export default function Header() {
    const [userData, setUserData] = useState<IUserData>();
    useEffect(() => {
        const userDataCookie = Cookies.get("user_data");
        if (userDataCookie) setUserData(JSON.parse(userDataCookie ? userDataCookie : ""));
    }, []);
    return (
        <header className="flex flex-row justify-around py-10 w-full border-2 border-stone-100 border-b-orange-400 bg-stone-50 dark:border-black dark:border-b-orange-600 dark:bg-stone-800 ">
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
