"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const submitForm = async (username: string, password: string, setWarningMessage: Function) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.status === 500 || jsonResponse.status === 403) {
        setWarningMessage(jsonResponse.message);
        return false;
    }
    if (jsonResponse.access_token) {
        Cookies.set("access_token", jsonResponse.access_token, { expires: 1 / 24 / 6 });
        Cookies.set("user_data", JSON.stringify(jsonResponse.userData), { expires: 1 / 24 / 6 });
        setWarningMessage("");
        return true;
    }
};

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    function handleUsernameChange(ev: React.FormEvent<HTMLInputElement>) {
        setUsername(ev.currentTarget.value);
    }

    function handlePasswordChange(ev: React.FormEvent<HTMLInputElement>) {
        setPassword(ev.currentTarget.value);
    }

    async function handleSubmit(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        const logged = await submitForm(username, password, setWarningMessage);
        if (logged) router.push("/products");
    }

    return (
        <form className="flex flex-col items-center w-11/12 md:w-7/12 mx-auto p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <h2 className="font-bold text-xl">Login</h2>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="username">
                    Username:
                </label>
                <input
                    className="w-6/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="username"
                    type="text"
                    placeholder="Your username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="password">
                    Password:
                </label>
                <input
                    className="w-6/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    onChange={handlePasswordChange}
                />
            </div>
            <div>
                <span className="text-rose-500">{warningMessage}</span>
            </div>
            <div>
                <button
                    className="m-auto p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                    onClick={handleSubmit}
                >
                    Log In
                </button>
            </div>
            <div className="mt-8 text-sm">
                <p>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-bold underline text-orange-400 dark:text-orange-500">
                        Sign up
                    </Link>
                    .{" "}
                </p>
            </div>
        </form>
    );
}
