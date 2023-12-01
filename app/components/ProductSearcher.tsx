import { FormEvent, useEffect, useState } from "react";
import { SearchFilter } from "../interfaces/Filter";
import { Brand as IBrand } from "../interfaces/Brand";

const fetchBrands = async (): Promise<IBrand[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/brands/`);
    const jsonResponse: IBrand[] = await response.json();
    return jsonResponse;
};

export default function ProductSearcher({
    params,
}: {
    params: { searchProductsWithFilters: Function };
}) {
    const defaultBrandValue = "Select a Brand";

    const [displayText, setDisplayText] = useState("All Products");
    const [searchValue, setSearchValue] = useState("");
    // This is for only sending data when Enter is pressed
    const [alreadyFetchedValue, setAlreadyFetchedValue] = useState(false);
    const [brandFilter, setBrandFilter] = useState(defaultBrandValue);
    // Initialize with default value
    const [brands, setBrands] = useState<IBrand[]>([
        { id: 0, name: defaultBrandValue, logo_url: "" },
    ]);

    function handleSearchValueChange(ev: FormEvent<HTMLInputElement>) {
        ev.preventDefault();
        setSearchValue(ev.currentTarget.value);
    }

    function handleSearchKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key === "Enter") setAlreadyFetchedValue(false);
    }

    function handleBrandNameChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        ev.preventDefault();
        setBrandFilter(ev.currentTarget.value);
        setAlreadyFetchedValue(false);
    }

    useEffect(() => {
        // For adding/removing filters to the search and sending the request
        // to the parent component
        if (!alreadyFetchedValue) {
            const filters: SearchFilter[] = [];
            if (brandFilter) filters.push({ filter: "brand", value: brandFilter });
            params.searchProductsWithFilters(searchValue, filters);
            // Update display text
            if (searchValue || brandFilter !== defaultBrandValue) {
                setDisplayText(
                    `${searchValue}${
                        brandFilter !== defaultBrandValue ? ` - By Brand: ${brandFilter}` : ""
                    }`
                );
            } else setDisplayText("All Products");
            setAlreadyFetchedValue(true);
        }
        // Fetch Brands
        async function getBrands() {
            const fetchedBrands = await fetchBrands();
            fetchedBrands.unshift(brands[0]);
            if (fetchedBrands) setBrands(fetchedBrands);
        }
        // Only if Brands are not present (only once)
        if (brands.length === 1) getBrands();
    }, [alreadyFetchedValue, params, searchValue, brandFilter, brands]);

    return (
        <div className="my-4 text-center">
            <div>
                <label className="mr-2" htmlFor="search">
                    🔎
                </label>
                <input
                    className="mx-auto bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="search"
                    type="text"
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    onKeyDown={handleSearchKeyDown}
                />
                <label className="ml-2 opacity-60" htmlFor="brand">
                    Brand:
                </label>
                <select
                    className="mx-auto bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700"
                    name="brand"
                    value={brandFilter}
                    onChange={handleBrandNameChange}
                >
                    {brands &&
                        brands.map((b) => {
                            return (
                                <option key={b.id} value={b.name}>
                                    {b.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <h4 className="mx-auto text-center pt-4 opacity-50">Listing: {displayText}</h4>
        </div>
    );
}
