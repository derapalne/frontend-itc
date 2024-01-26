import React, { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchFilter } from "../../interfaces/Filter";
import { Brand as IBrand } from "../../interfaces/Brand";
import { IProductListing } from "../../interfaces/Product";

const fetchBrands = async (): Promise<IBrand[]> => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/brands/`);
    const jsonResponse: IBrand[] = await response.json();
    return jsonResponse;
};

const fetchProductListing = async (value: string): Promise<IProductListing[]> => {
    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products/listing?n=${value}&l=4`
    );
    const jsonResponse: IProductListing[] = await response.json();
    return jsonResponse;
};

const defaultBrandValue = "Select a Brand";

export default function ProductSearcher({
    params,
}: {
    params: { searchProductsWithFilters: Function; tagFilter: string };
}) {
    const [displayText, setDisplayText] = useState("All Products");
    const [searchValue, setSearchValue] = useState("");
    // This is for only sending data when Enter is pressed
    const [fetchNewProducts, setFetchNewProducts] = useState(true);
    // Initialize with default value
    const [brands, setBrands] = useState<IBrand[]>([{ id: 0, name: defaultBrandValue, logo_url: "" }]);
    // For filtering brands
    const [brandFilter, setBrandFilter] = useState(defaultBrandValue);
    // Product Suggestions
    const [productSuggestions, setProductSuggestions] = useState<IProductListing[]>([]);
    const [fetchNewSuggestions, setFetchNewSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

    const [tagSearchValue, setTagSearchValue] = useState(params.tagFilter);

    const [showFilters, setShowFilters] = useState(false);
    const [showEnterButton, setShowEnterButton] = useState(false);

    function handleSearchValueChange(ev: FormEvent<HTMLInputElement>) {
        ev.preventDefault();
        setSearchValue(ev.currentTarget.value);
        setFetchNewSuggestions(true);
        setShowEnterButton(true);
    }

    function handleSearchKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key === "Enter") {
            if (selectedSuggestionIndex !== 0)
                setSearchValue(productSuggestions[selectedSuggestionIndex - 1].name.toLowerCase());
            setFetchNewProducts(true);
        }
        if (ev.key === "ArrowDown") {
            ev.preventDefault();
            setSelectedSuggestionIndex(
                selectedSuggestionIndex < productSuggestions?.length
                    ? selectedSuggestionIndex + 1
                    : selectedSuggestionIndex
            );
        }
        if (ev.key === "ArrowUp") {
            ev.preventDefault();
            setSelectedSuggestionIndex(
                selectedSuggestionIndex > 1 ? selectedSuggestionIndex - 1 : selectedSuggestionIndex
            );
        }
    }

    function handleBrandNameChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        ev.preventDefault();
        setBrandFilter(ev.currentTarget.value);
        setFetchNewProducts(true);
    }

    function handleTagSearchValueChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setTagSearchValue(ev.currentTarget.value);
        setFetchNewProducts(true);
    }

    useEffect(() => {
        // For adding/removing filters to the search and sending the request
        // to the parent component
        if (fetchNewProducts) {
            const filters: SearchFilter[] = [];
            if (brandFilter) filters.push({ filter: "brand", value: brandFilter });
            if (tagSearchValue) filters.push({ filter: "tag", value: tagSearchValue });
            params.searchProductsWithFilters(searchValue, filters);
            // Update display text
            if (searchValue || brandFilter !== defaultBrandValue || tagSearchValue) {
                setDisplayText(
                    `${searchValue}${
                        brandFilter !== defaultBrandValue ? ` - By Brand: ${brandFilter}` : ""
                    }${tagSearchValue ? ` - By tag: ${tagSearchValue}` : ""}`
                );
            } else setDisplayText("All Products");
            setShowEnterButton(false);
            setFetchNewProducts(false);
            setProductSuggestions([]);
        }
        // Fetch Brands
        async function getBrands() {
            const fetchedBrands = await fetchBrands();
            fetchedBrands.unshift(brands[0]);
            if (fetchedBrands) setBrands(fetchedBrands);
        }
        // Only if Brands are not present (only once)
        if (brands.length === 1) getBrands();
        // For fetching suggestions
        async function getSuggestions() {
            const fetchedProducts = await fetchProductListing(searchValue);
            setProductSuggestions(fetchedProducts);
            setFetchNewSuggestions(false);
            setSelectedSuggestionIndex(0);
        }
        if (fetchNewSuggestions) getSuggestions();
        if (searchValue.length === 0) setProductSuggestions([]);
    }, [
        fetchNewProducts,
        params,
        searchValue,
        brandFilter,
        brands,
        fetchNewSuggestions,
        tagSearchValue,
    ]);

    function handleShowFiltersButtonClick(ev: React.MouseEvent<HTMLButtonElement>) {
        setShowFilters(!showFilters);
    }

    function handleEnterButtonClick(ev: React.MouseEvent<HTMLButtonElement>) {
        setProductSuggestions([]);
        setFetchNewProducts(true);
    }

    function handleSuggestionClick(ev: React.MouseEvent<HTMLLIElement>) {
        setProductSuggestions([]);
        setSearchValue(ev.currentTarget.innerText);
        setFetchNewProducts(true);
    }

    return (
        <div className="my-4 text-center">
            <div>
                <div className="mx-auto mb-2 w-72 overflow-clip">
                    <div className="text-left bg-stone-100 dark:bg-stone-900 border-2 border-stone-100 border-b-stone-300 dark:border-stone-900 dark:border-b-stone-700">
                        <label className="mr-1" htmlFor="search">
                            🔎
                        </label>
                        <input
                            className="w-10/12 bg-stone-100 dark:bg-stone-900 focus-visible:border-0"
                            name="search"
                            type="text"
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                        {showEnterButton && (
                            <button
                                className="text-orange-400 hover:text-orange-500 dark:hover:text-orange-400 dark:text-orange-500"
                                onClick={handleEnterButtonClick}
                            >
                                ▶
                            </button>
                        )}
                    </div>
                    <div className="absolute w-72 z-10">
                        <div>
                            <ul className="flex flex-col">
                                {productSuggestions &&
                                    productSuggestions.map((p, i) => (
                                        <li
                                            className={`pl-8 whitespace-nowrap overflow-hidden text-ellipsis text-left cursor-default ${
                                                selectedSuggestionIndex - 1 !== i
                                                    ? `bg-stone-100 dark:bg-stone-900`
                                                    : `bg-stone-200 dark:bg-stone-800`
                                            }`}
                                            key={p.id}
                                            onClick={handleSuggestionClick}
                                            onMouseOver={() => setSelectedSuggestionIndex(i)}
                                        >
                                            {p.name.toLocaleLowerCase()}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {showFilters ? (
                    <div className="mt-2 mx-auto w-5/12">
                        <button
                            className="ml-4 p-1 text-sm rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                            onClick={handleShowFiltersButtonClick}
                        >
                            Hide Filters
                        </button>
                        <div className="grid grid-cols-2">
                            <label className="mx-2 opacity-60" htmlFor="brand">
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
                        <div className="grid grid-cols-2">
                            <label className="mx-2 opacity-60" htmlFor="tag">
                                Tag:
                            </label>
                            <input
                                className="bg-stone-100 dark:bg-stone-900 focus-visible:border-0"
                                name="tag"
                                type="text"
                                value={tagSearchValue}
                                onChange={handleTagSearchValueChange}
                            />
                        </div>
                    </div>
                ) : (
                    <button
                        className="ml-4 p-1 text-sm rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                        onClick={handleShowFiltersButtonClick}
                    >
                        Show Filters
                    </button>
                )}
            </div>
            <h4 className="mx-auto text-center pt-4 opacity-50">Listing: {displayText}</h4>
        </div>
    );
}
