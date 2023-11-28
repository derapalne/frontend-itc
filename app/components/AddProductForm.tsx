"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { CreateProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Image from "next/image";

const fetchBrands = async (): Promise<IBrand[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/brands/`);
    const jsonResponse: IBrand[] = await response.json();
    return jsonResponse;
};

const submitProduct = async (
    product: CreateProduct,
    image: File,
    accessToken: string,
    setWarningMessage: Function
) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(product),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.status === 500 || jsonResponse.status === 403 || !jsonResponse.id) {
        setWarningMessage(jsonResponse.message);
        return false;
    }
    const formData = new FormData();
    formData.append("image", image);
    const imageResponse = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/${jsonResponse.id}/image`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        }
    );
    const jsonImageResponse = await imageResponse.json();
    console.log(jsonImageResponse);
    if (jsonImageResponse.error) {
        setWarningMessage(jsonImageResponse.message);
        return false;
    }
    setWarningMessage("");
    return true;
};

export default function AddProductForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState<File>();
    const [price, setPrice] = useState(0);
    const [warningMessage, setWarningMessage] = useState("");
    const [brands, setBrands] = useState<IBrand[]>();
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
        async function getBrands() {
            const fetchedBrands = await fetchBrands();
            setBrands(fetchedBrands);
        }
        getBrands();
    }, []);

    function handleBrandSelection(id: number) {
        setSelectedBrandId(id);
    }

    function handlNameChange(ev: React.FormEvent<HTMLInputElement>) {
        setName(ev.currentTarget.value);
    }

    function handleDescriptionChange(ev: React.FormEvent<HTMLTextAreaElement>) {
        setDescription(ev.currentTarget.value);
    }

    function handlImageUrlChange(ev: React.FormEvent<HTMLInputElement>) {
        setImageUrl(ev.currentTarget.value);
    }

    function handlImageChange(ev: React.FormEvent<HTMLInputElement>) {
        const images = ev.currentTarget.files;
        if (!images) return;
        const image = images.item(0);
        if (image) setImage(image);
    }

    function handlPriceChange(ev: React.FormEvent<HTMLInputElement>) {
        setPrice(parseInt(ev.currentTarget.value));
    }

    async function handleSubmit(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        if (!selectedBrandId) return setWarningMessage("Please select a brand");
        if (!name) return setWarningMessage("Please enter a name");
        if (!description) return setWarningMessage("Please enter a description");
        if (!price) return setWarningMessage("Please enter a price");
        // if (!imageUrl) return setWarningMessage("Please enter an image url");
        if (!image) return setWarningMessage("Please provide an image");
        const product: CreateProduct = {
            name: name,
            description: description,
            image_url: imageUrl,
            price: price,
            brand_id: selectedBrandId,
        };
        const added = await submitProduct(product, image, accessToken, setWarningMessage);
        if (added) router.push("/products");
    }

    return (
        <form className="flex flex-col items-center w-11/12 md:w-10/12 mx-auto p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <h2 className="font-bold text-xl">Add Product</h2>
            <div className="mt-4">
                <h4 className="text-center">Select brand:</h4>
                <div className="my-4 mx-auto grid grid-cols-4 w-10/12">
                    {brands &&
                        brands.map((b) => (
                            <div
                                key={b.id}
                                className={`flex flex-col items-center m-2 p-2 cursor-pointer rounded-lg duration-200 ${
                                    b.id === selectedBrandId ? "bg-stone-300 dark:bg-stone-700" : ""
                                } hover:bg-stone-300 dark:hover:bg-stone-700`}
                                onClick={() => handleBrandSelection(b.id)}
                            >
                                <Image src={b.logo_url} alt={b.name} width={50} height={50} />
                                <h4 className="mt-2 text-sm text-center">{b.name}</h4>
                            </div>
                        ))}
                    {(!brands || brands.length === 0) && (
                        <div className="col-span-4">
                            No brands found! Please populate the database.
                        </div>
                    )}
                </div>
            </div>

            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="username">
                    Name:
                </label>
                <input
                    className="w-10/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="username"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={handlNameChange}
                />
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="description">
                    Description:
                </label>
                <textarea
                    className="w-11/12 h-24 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="description"
                    rows={3}
                    placeholder="Product description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            {/*<div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="image_url">
                    Image Url:
                </label>
                <input
                    className="w-10/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="image_url"
                    type="text"
                    placeholder="Product Image (URL)"
                    value={imageUrl}
                    onChange={handlImageUrlChange}
                />
            </div> */}
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="image_url">
                    Image:
                </label>
                <input
                    className="w-10/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="image"
                    type="file"
                    placeholder="Product Image (URL)"
                    accept="image/*"
                    onChange={handlImageChange}
                />
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="price">
                    Price:
                </label>
                <input
                    className="w-10/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="price"
                    type="number"
                    placeholder="1, 500, 12345"
                    value={price}
                    onChange={handlPriceChange}
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
                    Add Product
                </button>
            </div>
        </form>
    );
}
