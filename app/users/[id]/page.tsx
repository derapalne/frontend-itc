"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IUser } from "@/app/interfaces/User";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { UserData } from "@/app/interfaces/UserData";
import UserPanel from "@/app/components/UserPanel";

const fetchUserData = async (id: number): Promise<IUser> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/users/${id}`);
    const jsonResponse: IUser = await response.json();
    return jsonResponse;
};

export default function UserPage() {
    const userId = parseInt(usePathname().split("/")[2]);
    const [activeUserData, setActiveUserData] = useState<UserData>();
    const [userData, setUserData] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getProductData() {
            const activeUserDataCookie = Cookies.get("user_data");
            if (activeUserDataCookie) setActiveUserData(JSON.parse(activeUserDataCookie));
            if (!userData) {
                const fetchedUserData = await fetchUserData(userId);
                setUserData(fetchedUserData);
                setIsLoading(false);
            }
        }
        const fakeCache = setTimeout(getProductData, Math.random() * 2000 + 500);
    }, [userId, userData]);

    if (isLoading)
        return (
            <>
                <Header />
                <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 pt-4 mx-auto text-center opacity-40">
                        <h3 className="">Loading user data...</h3>
                    </div>
                </main>
                <Footer />
            </>
        );

    if (!userData)
        return (
            <>
                <Header />
                <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                    <div className="w-7/12 mx-auto">
                        <h3>No user found!</h3>
                    </div>
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                <div className="w-7/12 pt-4 mx-auto">
                    <UserPanel
                        params={{
                            user: userData,
                            ownProfile:
                                activeUserData && activeUserData.id === userData.id ? true : false,
                        }}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
