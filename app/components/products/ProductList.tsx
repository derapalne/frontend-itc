"use client";
import { Product as IProduct } from "../../interfaces/Product";
import ProductForList from "./ProductForList";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import ProductSearcher from "./ProductSearcher";
import { SearchFilter } from "../../interfaces/Filter";
import { useSearchParams } from "next/navigation";

const fetchItems = async (): Promise<IProduct[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/`);
    const jsonResponse: IProduct[] = await response.json();
    return jsonResponse;
};

const fetchItemsWithFilters = async (
    searchValue: string,
    filters?: SearchFilter[]
): Promise<IProduct[]> => {
    let additionalFilters = "";
    filters?.forEach((f) => {
        if (f.filter === "brand" && f.value !== "Select a Brand") additionalFilters += "&b=" + f.value;
        if (f.filter === "tag") additionalFilters += `&t=${f.value}`;
    });
    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/?n=${searchValue}&d=${searchValue}${additionalFilters}`
    );
    const jsonResponse: IProduct[] = await response.json();
    return jsonResponse;
};

export default function ProductList() {
    const urlParams = useSearchParams();

    const [tagFilter, setTagFilter] = useState(urlParams.get("tag"));

    const [isLoading, setIsLoading] = useState(true);
    const [errorFetching, setErrorFetching] = useState(false);
    const [usingFilters, setUsingFilters] = useState(false);
    const [products, setProducts] = useState<IProduct[]>();
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
        async function getItems() {
            try {
                const items = await fetchItems();
                setProducts(items);
                setIsLoading(false);
            } catch (error) {
                setErrorFetching(true);
            }
        }
        // Toggle fake cache based con env configuration
        const ms = process.env["FAKE_CACHE"] ? Math.random() * 1000 + 500 : 0;
        const fakeCache = setTimeout(getItems, ms);
    }, []);

    async function getItemsWithFilters(searchValue: string, filters?: SearchFilter[]) {
        let items: IProduct[];
        if (searchValue !== "" || filters) {
            setUsingFilters(true);
            items = await fetchItemsWithFilters(searchValue, filters ? filters : undefined);
            return setProducts(items);
        }
        setUsingFilters(false);
        items = await fetchItems();
        return setProducts(items);
    }

    if (errorFetching)
        return (
            <div className="h-screen w-11/12 py-4 mx-auto text-center opacity-40">
                There was an error fetching the products, please try again later.
            </div>
        );

    if (isLoading)
        return (
            <div className="min-h-screen w-11/12 py-4 mx-auto text-center opacity-40">
                Loading Products...
            </div>
        );

    return (
        <div className="min-h-screen">
            <ProductSearcher
                params={{
                    searchProductsWithFilters: getItemsWithFilters,
                    tagFilter: tagFilter ? tagFilter : "",
                }}
            ></ProductSearcher>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-9/12 sm:w-11/12 pt-4 mx-auto">
                {(!products || products.length === 0) && (
                    <div className="col-span-4 w-9/12 mx-auto text-center">
                        <p className="opacity-40">
                            No products found!{" "}
                            {usingFilters && `Try using other keywords to match your search.`}{" "}
                            {!accessToken && !usingFilters && `Login to add one.`}
                            {!usingFilters && (
                                <Link
                                    href="/initialize"
                                    className="mx-2 font-medium hover:underline hover:font-semibold"
                                >
                                    Click here to initialize database
                                </Link>
                            )}
                        </p>
                    </div>
                )}
                {products &&
                    products.map((p) => (
                        <ProductForList
                            key={p.id}
                            params={{
                                id: p.id,
                                name: p.name,
                                description: p.description,
                                image_url: p.image_url,
                                price: p.price,
                                brand_id: p.brand_id,
                                brand: p.brand,
                                creator_user_id: p.creator_user_id,
                                user: p.user,
                                tags: p.tags,
                                is_on_cart: false,
                            }}
                        />
                    ))}
                {accessToken ? (
                    <Link
                        href="/add-product"
                        className="flex flex-col justify-center items-center min-h-[200px] p-1 shadow cursor-pointer duration-300 dark:border-0 dark:bg-stone-900 hover:bg-stone-200/[0.3] dark:hover:bg-stone-800"
                    >
                        + Add Product +
                    </Link>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
