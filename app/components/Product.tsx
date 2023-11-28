"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Image from "next/image";
import Cookies from "js-cookie";
import { UserData } from "../interfaces/UserData";
import Link from "next/link";

export default function Product({ params }: { params: IProduct }) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState("");
    const [userData, setUserData] = useState<UserData>();
    // Traer cookie de access token
    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
        const userDataCookie = Cookies.get("user_data");
        if (userDataCookie) setUserData(JSON.parse(userDataCookie));
    }, []);
    // Traer data de productos de los params y manejar en caso de que no haya Brand
    const { id, name, description, image_url, price, user } = params;
    let brand: IBrand;
    if (!params.brand) brand = { id: 0, name: "", logo_url: "" };
    else brand = params.brand;

    function handleEditButtonClick() {
        router.push(`/edit-product/${id}`);
    }

    return (
        <div className="flex flex-col p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <div className="mx-auto object-center relative w-40">
                <Image
                    src={image_url}
                    alt={name}
                    className={
                        image_url.startsWith("https://pics.freeicons")
                            ? "dark:invert"
                            : "object-cover"
                    }
                    width={256}
                    height={256}
                />
                <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    className="absolute top-0 right-0"
                    width={30}
                    height={30}
                />
            </div>
            <h3 className="grow">
                <span className="font-bold text-xl">{name}</span>
                <u className="text-sm no-underline opacity-70 ml-2">- {brand.name}</u>
            </h3>
            <div>
                <span className="font-light">Description:</span>
                <p className="px-8">{description}</p>
            </div>
            <p className="mr-8 text-end font-bold">${price}</p>
            <p className="mr-8 text-end font-light text-xs">
                Uploaded by{" "}
                <Link className="font-normal hover:underline" href={`/users/${user.id}`}>
                    {user.username} ({user.n_products})
                </Link>
            </p>
            {accessToken && userData?.id === user.id ? (
                <button
                    className="m-auto p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                    onClick={handleEditButtonClick}
                >
                    Edit Product
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}
