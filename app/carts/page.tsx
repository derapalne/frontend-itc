"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UserData } from "@/app/interfaces/UserData";
import { ICart } from "../interfaces/Cart";
import ProductForList from "../components/products/ProductForList";
import Header from "../components/Header";
import Main from "../components/Main";

const fetchActiveCart = async (accessToken: string): Promise<{ cart: ICart; total: number }> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/users/active-cart`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse: ICart = await response.json();
    let total = 0;
    jsonResponse.products && jsonResponse.products.forEach((p) => (total += p.price));
    return { cart: jsonResponse, total: total };
};

const fetchOrderedCarts = async (accessToken: string): Promise<ICart[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/users/ordered-carts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse: ICart[] = await response.json();
    return jsonResponse;
};

const postOrderCart = async (cartId: number, accessToken: string) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/carts/${cartId}/order`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
};

const deleteItemFromCart = async (productId: number, accessToken: string) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/carts`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({ product_id: productId }),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
};

const formatDate = (date: string): string => {
    const actualDate = new Date(date);
    return actualDate.toLocaleDateString();
};

export default function CartPage() {
    const router = useRouter();

    const [activeCart, setActiveCart] = useState<ICart>();
    const [orderedCarts, setOrderedCarts] = useState<ICart[]>();
    // Active Cart is Loading
    const [acIsLoading, setAcIsLoading] = useState(true);
    // Ordered Carts are Loaging
    const [ocIsLoading, setOcIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [activeUserData, setActiveUserData] = useState<UserData>();
    const [cartTotal, setCartTotal] = useState(0);
    const [deletedProducts, setDeletedProducts] = useState<number[]>([]);
    const [confirmOrderText, setConfirmOrderText] = useState("Confirm Order");

    const accessTokenCookie = Cookies.get("access_token");
    if (!accessToken && accessTokenCookie) setAccessToken(accessTokenCookie);

    const activeUserDataCookie = Cookies.get("user_data");
    if (!activeUserData && activeUserDataCookie) setActiveUserData(JSON.parse(activeUserDataCookie));

    useEffect(() => {
        async function getActiveCartData() {
            const { cart, total } = await fetchActiveCart(accessToken);
            setActiveCart(cart);
            setCartTotal(total);
            setAcIsLoading(false);
        }
        // Toggle fake cache based con env configuration
        const activeMs = process.env["FAKE_CACHE"] ? Math.random() * 1000 + 500 : 0;
        const fakeActiveCache = setTimeout(getActiveCartData, activeMs);
        async function getOrderedCartsData() {
            const cart = await fetchOrderedCarts(accessToken);
            setOrderedCarts(cart);
            setOcIsLoading(false);
        }
        // Same for ordered carts
        const orderedMs = process.env["FAKE_CACHE"] ? Math.random() * 1000 + 500 : 0;
        const fakeOrderedCache = setTimeout(getOrderedCartsData, orderedMs);
        if (!accessToken) {
            console.log("No access token found");
            router.push("/products");
        }
    }, [accessToken, setAcIsLoading, router]);

    async function handleOrderCartButton() {
        if (!activeCart) return;
        setConfirmOrderText("Confirming Order...");
        const ordered = await postOrderCart(activeCart.id, accessToken);
        if (ordered.error) return setConfirmOrderText("There has been an error, please try again later");
        console.log("Has to refresh");
        console.log(ordered);
        if (ordered[0] === 1) {
            console.log("Refreshing...");
            router.push("thank-you-for-ordering");
        }
    }

    async function handleRemoveProductFromCartButton(productId: number, productPrice: number) {
        if (!activeCart) return;
        const removed = await deleteItemFromCart(productId, accessToken);
        console.log(removed);
        if (removed.error || removed.statusCode === 500) return;
        console.log("Removed product successfully");
        setCartTotal(cartTotal - productPrice);
        const existingProducts = activeCart.products.filter((p) => p.id !== productId);
        setActiveCart({ ...activeCart, products: existingProducts });
    }

    return (
        <>
            <Header />
            <Main>
                <div className="w-full mx-auto px-2 text-center">
                    <div>
                        {acIsLoading ? (
                            <div>
                                <h3>Active Cart is Loading...</h3>
                            </div>
                        ) : activeCart && activeCart.id !== 0 ? (
                            <div className="my-4">
                                <div className="grid grid-cols-2">
                                    <h3 className="col-span-2 my-auto font-semibold text-lg">
                                        Cart N°{activeCart.id}
                                    </h3>
                                </div>
                                <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {activeCart.products?.map((p) => {
                                        const id = p.id ? p.id : 0;
                                        return (
                                            <div className="grid relative" key={p.id}>
                                                <ProductForList
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
                                                        is_on_cart: true,
                                                    }}
                                                />
                                                <div className="absolute right-4 top-4">
                                                    <button
                                                        className="px-4 py-2 sm:px-2 sm:py-0 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                                                        onClick={() => {
                                                            handleRemoveProductFromCartButton(
                                                                id,
                                                                p.price
                                                            );
                                                        }}
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="mb-4">Total: ${cartTotal}</h4>
                                    <button
                                        className="m-auto p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                                        onClick={handleOrderCartButton}
                                    >
                                        {confirmOrderText}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3>
                                    You don&apos;t have any active carts. Add a product to create one.
                                </h3>
                            </div>
                        )}
                    </div>
                    <div>
                        {ocIsLoading ? (
                            <div>
                                <h3>Previously Ordered Carts are Loading...</h3>
                            </div>
                        ) : orderedCarts && orderedCarts.length ? (
                            orderedCarts.map((cart) => {
                                let orderedCartTotal = 0;
                                return (
                                    <div className="my-4" key={cart.id}>
                                        <div className="grid grid-cols-2">
                                            <h3 className="col-span-2 my-auto font-semibold text-lg">
                                                Cart N°{cart.id}
                                            </h3>
                                        </div>
                                        <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {cart.products?.map((p) => {
                                                orderedCartTotal += p.price;
                                                return (
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
                                                            is_on_cart: true,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <h4 className="mb-4">Total: ${orderedCartTotal}</h4>
                                            {cart.ordered_on && (
                                                <span>Ordered on: {formatDate(cart.ordered_on)}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <h3>You haven&apos;t ordered anything yet.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </Main>
        </>
    );
}
