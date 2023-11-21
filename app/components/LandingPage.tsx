"use client";
import Link from "next/link";
import Image from "next/image";
import { Product as IProduct } from "../interfaces/Product";
import { useEffect, useState } from "react";
import ProductForList from "./ProductForList";

async function fetchRandomProduct(): Promise<IProduct> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/random`);
    const jsonResponse: IProduct = await response.json();
    return jsonResponse;
}

export default function LandingPage() {
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        async function getRandomProduct() {
            const randomProduct = await fetchRandomProduct();
            setProduct(randomProduct);
        }
        getRandomProduct();
    }, []);

    const productElement = product ? (
        <ProductForList params={product}></ProductForList>
    ) : (
        <div className="text-center">
            <h4>Loading Product...</h4>
            <p className="opacity-40">
                Don&apos;t find any products?
                <Link
                    href="/initialize"
                    className="mx-2 font-medium hover:underline hover:font-semibold"
                >
                    Click here to initialize database
                </Link>
            </p>
        </div>
    );

    return (
        <>
            <h1 className="my-12 mx-auto w-11/12 sm:w-9/12 py-4 px-8 text-center text-4xl md:text-6xl font-bold shadow-bottom rounded dark:shadow-bottom-dark">
                Free Shopping
            </h1>
            <div className="w-11/12 md:w-9/12 mx-auto my-16">
                <h3 className="font-medium">
                    This is{" "}
                    <Link
                        href="https://www.linkedin.com/in/felipe-simon-rosello/"
                        className="text-orange-500 hover:underline"
                    >
                        Felipe Simón Roselló
                    </Link>
                    &apos;s JS portfolio page.
                </h3>
                <p className="w-10/12 ml-auto text-center">
                    Made with
                    <strong>
                        <Link href="https://nextjs.org" className="text-blue-600 underline mx-1">
                            Next.js
                        </Link>
                    </strong>
                    and
                    <strong>
                        <Link href="https://nestjs.com" className="text-rose-600 underline mx-1">
                            NestJS
                        </Link>
                    </strong>
                </p>
                <p className="pt-4">
                    Here you can browse existing products, add your own (only after{" "}
                    <Link href="/signup" className="underline">
                        creating your account
                    </Link>{" "}
                    and/or{" "}
                    <Link href="/login" className="underline">
                        logging in
                    </Link>
                    ), from different brands which you can add your own as well!
                </p>
            </div>
            <div>
                <h4 className="text-center font-semibold text-lg">Here&apos;s a random product!</h4>
                <div className="w-8/12 md:w-4/12 my-4 mx-auto">{productElement}</div>
                <div className="text-center mt-6">
                    <Link
                        className="text-lg p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                        href="/products"
                    >
                        See all Products
                    </Link>
                </div>
            </div>
            <div className="w-9/12 mt-12 mx-auto flex flex-col">
                <h3 className="text-center">Have fun!</h3>
                <ul className="flex justify-evenly">
                    <li className="font-bold text-sky-600 duration-300 hover:underline">
                        <Link href="https://www.linkedin.com/in/felipe-simon-rosello/">
                            LinkedIn
                            <Image
                                src="https://pics.freeicons.io/uploads/icons/png/16090541531530099327-512.png"
                                className="mx-auto"
                                alt="LinkedIn"
                                width="20"
                                height="20"
                            />
                        </Link>
                    </li>
                    <li className="font-bold duration-300 hover:underline">
                        <Link href="https://github.com/derapalne">
                            GitHub
                            <Image
                                className="mx-auto"
                                src="https://pics.freeicons.io/uploads/icons/png/13702699181561032680-512.png"
                                alt="GitHub"
                                width="20"
                                height="20"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
