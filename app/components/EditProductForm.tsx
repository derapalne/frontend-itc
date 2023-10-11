"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "../interfaces/Product";
import { Brand as IBrand } from "../interfaces/Brand";
import Image from "next/image";

const fetchBrands = async (): Promise<IBrand[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/brands/`);
    const jsonResponse: IBrand[] = await response.json();
    return jsonResponse;
};

const updateProduct = async (
    product: IProduct,
    accessToken: string,
    setWarningMessage: Function
) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/Json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(product),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.status === 500 || jsonResponse.status === 403) {
        setWarningMessage(jsonResponse.message);
        return false;
    }
    if (jsonResponse[0] === 1) {
        setWarningMessage("");
        return true;
    }
};

const deleteProduct = async (id: number, accessToken: string, setWarningMessage: Function) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/Json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id: id }),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.status === 500 || jsonResponse.status === 403) {
        setWarningMessage(jsonResponse.message);
        return false;
    }
    if (jsonResponse.id === id) {
        setWarningMessage("");
        return true;
    }
};

export default function EditProductForm({ params }: { params: IProduct }) {
    const router = useRouter();
    const [name, setName] = useState(params.name);
    const [description, setDescription] = useState(params.description);
    const [imageUrl, setImageUrl] = useState(params.image_url);
    const [price, setPrice] = useState(params.price);
    const [warningMessage, setWarningMessage] = useState("");
    const [brands, setBrands] = useState<IBrand[]>();
    const [selectedBrandId, setSelectedBrandId] = useState(params.brand?.id);
    const [accessToken, setAccessToken] = useState("");

    const [deleteButtonText, setDeleteButtonText] = useState("Delete Product");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteTimeout, setDeleteTimeout] = useState<NodeJS.Timeout>();

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

    function handlPriceChange(ev: React.FormEvent<HTMLInputElement>) {
        setPrice(parseInt(ev.currentTarget.value));
    }

    async function handleSubmit(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        if (!selectedBrandId) return setWarningMessage("Please select a brand");
        if (!name) return setWarningMessage("Please enter a name");
        if (!description) return setWarningMessage("Please enter a description");
        if (!price) return setWarningMessage("Please enter a price");
        if (!imageUrl) return setWarningMessage("Please enter an image url");
        const product: IProduct = {
            id: params.id,
            name: name,
            description: description,
            image_url: imageUrl,
            price: price,
            brand_id: selectedBrandId,
        };
        const added = await updateProduct(product, accessToken, setWarningMessage);
        if (added) router.push("/products");
    }

    function handleConfirmDelete() {
        setConfirmDelete(true);
    }

    function handleDeleteClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        handleDeleteProduct(params.id ? params.id : 0);
    }

    async function handleDeleteProduct(id: number) {
        if (!confirmDelete) {
            setDeleteButtonText("Click to confirm");
            const timeout = setTimeout(() => {
                setConfirmDelete(false);
                setDeleteButtonText("Delete Product");
            }, 2000);
            setDeleteTimeout(timeout);
            return handleConfirmDelete();
        }
        clearTimeout(deleteTimeout);
        setDeleteButtonText("Deleting...");
        const deleted = await deleteProduct(id, accessToken, setWarningMessage);
        if (deleted) router.push("/products");
    }

    return (
        <form className="flex flex-col p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <h2 className="font-bold text-xl">Add Product</h2>
            <div className="mt-4">
                <h4>Select brand:</h4>
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
                                <h4 className="mt-2 text-sm">{b.name}</h4>
                            </div>
                        ))}
                </div>
            </div>

            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="username">
                    Name:
                </label>
                <input
                    className="w-6/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
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
                    className="w-8/12 h-24 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="description"
                    rows={3}
                    placeholder="Product description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="image_url">
                    Image Url:
                </label>
                <input
                    className="w-6/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="image_url"
                    type="text"
                    placeholder="Product Image (URL)"
                    value={imageUrl}
                    onChange={handlImageUrlChange}
                />
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="price">
                    Price:
                </label>
                <input
                    className="w-6/12 bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
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
                    className="m-auto p-2 rounded duration-300 bg-stone-200/[0.5] hover:bg-stone-300 dark:hover:bg-stone-400 dark:bg-stone-600"
                    onClick={handleSubmit}
                >
                    Update Product
                </button>
            </div>
            <div>
                <button
                    className="mx-auto mt-4 p-2 rounded duration-300 bg-rose-300 hover:bg-rose-500 dark:hover:bg-rose-500 dark:bg-rose-600"
                    onClick={handleDeleteClick}
                >
                    {deleteButtonText}
                </button>
            </div>
        </form>
    );
}
