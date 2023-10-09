"use client";
import { Product as IProduct } from "../interfaces/Product";
import Image from "next/image";

export default function Product({ params }: { params: IProduct }) {
    const { id, name, description, image_url, price, brand } = params;
    return (
        <div className="flex flex-col p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <div className="mx-auto object-center relative h-32 w-40">
                <Image
                    src={image_url}
                    alt={name}
                    className="dark:invert"
                    width={128}
                    height={128}
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
            <button className="m-auto p-2 rounded duration-300 bg-stone-200/[0.5] hover:bg-stone-300 dark:hover:bg-stone-400 dark:bg-stone-600">
                Add to Cart
            </button>
        </div>
    );
}
