"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Product({ params }: { params: IProduct }) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState("");
    // Traer cookie de access token
    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
    }, []);
    // Traer data de productos de los params y manejar en caso de que no haya Brand
    const { id, name, description, image_url, price } = params;
    let brand: IBrand;
    if (!params.brand) brand = { id: 0, name: "", logo_url: "" };
    else brand = params.brand;

    function handleEditButtonClick() {
        router.push(`/edit-product/${id}`);
    }
    
    return (
        <div className="flex flex-col p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <div className="mx-auto object-center relative h-32 w-40">
                <Image
                    src={image_url}
                    alt={name}
                    className={image_url.startsWith("https://pics.freeicons") ? "dark:invert" : "object-cover"}
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
            <p className="text-end font-bold mr-8">${price}</p>
            {accessToken ? (
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
