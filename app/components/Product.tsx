"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Image from "next/image";
import Cookies from "js-cookie";
import { UserData } from "../interfaces/UserData";
import Link from "next/link";

async function addProductToCart(productId: number, accessToken: string) {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/carts/`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: productId,
        }),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
}

export default function Product({ params }: { params: IProduct }) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState("");
    const [userData, setUserData] = useState<UserData>();
    const [cartButtonText, setCartButtonText] = useState("Add Product to Cart 🛒");
    const [isProductOnCart, setIsProductOnCart] = useState(false);
    const [productAddedToCart, setProductAddedToCart] = useState(false);

    // Traer data de productos de los params y manejar en caso de que no haya Brand
    const { id, name, description, image_url, price, user, is_on_cart } = params;
    let brand: IBrand;
    if (!params.brand) brand = { id: 0, name: "", logo_url: "" };
    else brand = params.brand;

    // Traer cookie de access token
    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
        const userDataCookie = Cookies.get("user_data");
        if (userDataCookie) setUserData(JSON.parse(userDataCookie));
        if (is_on_cart && !productAddedToCart) {
            setIsProductOnCart(true);
            setCartButtonText("Product On Cart 🛒");
        }
    }, [is_on_cart, setIsProductOnCart, productAddedToCart]);

    function handleEditButtonClick() {
        router.push(`/edit-product/${id}`);
    }

    async function handleAddButtonClick() {
        if (!id || isProductOnCart) return;
        const response = await addProductToCart(id, accessToken);
        if (response.success) {
            setCartButtonText("Product On Cart 🛒");
            setIsProductOnCart(true);
            setProductAddedToCart(true);
        }
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
                <Link href={`/brands/${brand.id}`} className="text-sm no-underline opacity-70 ml-2">
                    - <u className="no-underline hover:underline">{brand.name}</u>
                </Link>
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
            {accessToken && userData?.id !== user.id ? (
                <button
                    className={`m-auto p-2 rounded duration-300 bg-orange-400 dark:bg-orange-500 ${
                        isProductOnCart
                            ? "cursor-default"
                            : "hover:bg-orange-500 dark:hover:bg-orange-400"
                    }`}
                    onClick={handleAddButtonClick}
                >
                    {cartButtonText}
                </button>
            ) : (
                <></>
            )}

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
