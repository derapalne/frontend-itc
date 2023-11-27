"use client";
import { Product as IProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Link from "next/link";
import Image from "next/image";

export default function ProductForList({ params }: { params: IProduct }) {
    const { id, name, image_url, price } = params;
    let brand: IBrand;
    if (!params.brand) brand = { id: 0, name: "", logo_url: "" };
    else brand = params.brand;
    return (
        <Link
            className="flex flex-col p-4 cursor-pointer duration-300 border border-stone-100 dark:border-stone-950 dark:bg-stone-900 hover:bg-stone-200/[0.3] dark:hover:bg-stone-800"
            href={`/products/${id}`}
        >
            <div className="mx-auto object-center relative h-28 w-28">
                <Image
                    src={image_url}
                    alt={name}
                    className={image_url.startsWith("https://pics.freeicons") ? "dark:invert" : "mt-4 object-cover"}
                    width={96}
                    height={96}
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
                {name} <u className="text-sm no-underline opacity-70">- {brand.name}</u>
            </h3>
            <p className="text-end font-bold">${price}</p>
        </Link>
    );
}
