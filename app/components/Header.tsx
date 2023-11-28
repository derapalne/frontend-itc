"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { UserData as IUserData } from "../interfaces/UserData";
import { useTheme } from "next-themes";

export default function Header() {
    const [userData, setUserData] = useState<IUserData>();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const userDataCookie = Cookies.get("user_data");
        if (userDataCookie) setUserData(JSON.parse(userDataCookie ? userDataCookie : ""));
    }, []);

    function handleDarkModeToggle() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <header className="flex flex-row justify-around py-10 w-full border-2 border-stone-100 border-b-orange-400 bg-stone-50 dark:border-black dark:border-b-orange-600 dark:bg-stone-800 ">
            <h2 className="font-bold text-lg">
                <Link href="/">Free Shopping</Link>
            </h2>
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

                {userData?.isAdmin ? (
                    <li className="mx-4 hover:font-normal duration-300">
                        <Link href="/admin">Admin Tab</Link>
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
                <li
                    className="p-0 cursor-pointer rounded-xl duration-300 hover:ring-1 hover:ring-orange-600 hover:dark:ring-orange-500"
                    title="Toggle Dark Mode"
                    onClick={handleDarkModeToggle}
                >
                    {theme === "light" ? `🌑` : `🌕`}
                </li>
            </ul>
        </header>
    );
}
