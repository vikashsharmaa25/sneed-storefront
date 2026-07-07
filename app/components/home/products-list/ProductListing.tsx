import React from "react";
import { useSearchParams, useNavigation } from "react-router";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import BrandFilter from "./filters/BrandFilter";
import SearchFilter from "./filters/SearchFilter";
import ProductGrid from "./ProductGrid";
import { Container } from "~/components/ui/Container";
import { PackageSearch, X } from "lucide-react";
import ProductCardSkeleton from "../../common/ProductCardSkeleton";

type ProductListingProps = {
    products: any[];
    categories?: any[];
    brands?: any[];
};

const ProductListing: React.FC<ProductListingProps> = ({ products, categories: apiCategories, brands: apiBrands }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation();
    const isFiltering = navigation.state === "loading" && navigation.location?.search !== "";

    const categories = apiCategories ? apiCategories.map((cat: any) => ({
        id: cat.id.toString(),
        label: cat.name,
        count: 0
    })) : [];

    const brands = apiBrands ? apiBrands.map((brand: any) => ({
        id: brand.id.toString(),
        label: brand.name,
        count: 0
    })) : [];

    const priceRanges = [
        { id: "under50", label: "Under Rs. 50,000", count: 2 },
        { id: "50-100", label: "Rs. 50,000 - Rs. 100,000", count: 3 },
        { id: "100-200", label: "Rs. 100,000 - Rs. 200,000", count: 7 },
        { id: "over200", label: "Over Rs. 200,000", count: 2 },
    ];

    const selectedCategoryId = searchParams.get("categoryId");
    const selectedPriceRange = searchParams.get("priceRange");

    const toggleCategory = (categoryId: string) => {
        const params = new URLSearchParams(searchParams);
        if (params.get("categoryId") === categoryId) {
            params.delete("categoryId");
        } else {
            params.set("categoryId", categoryId);
        }
        setSearchParams(params, { preventScrollReset: true });
    };

    const toggleBrand = (brandId: string) => {
        const params = new URLSearchParams(searchParams);
        if (params.get("brandId") === brandId) {
            params.delete("brandId");
        } else {
            params.set("brandId", brandId);
        }
        setSearchParams(params, { preventScrollReset: true });
    };

    const togglePriceRange = (rangeId: string) => {
        const params = new URLSearchParams(searchParams);
        if (params.get("priceRange") === rangeId) {
            params.delete("priceRange");
            params.delete("minPrice");
            params.delete("maxPrice");
        } else {
            params.set("priceRange", rangeId);
            if (rangeId === "under50") {
                params.set("minPrice", "0");
                params.set("maxPrice", "50000");
            } else if (rangeId === "50-100") {
                params.set("minPrice", "50000");
                params.set("maxPrice", "100000");
            } else if (rangeId === "100-200") {
                params.set("minPrice", "100000");
                params.set("maxPrice", "200000");
            } else if (rangeId === "over200") {
                params.set("minPrice", "200000");
                params.delete("maxPrice");
            }
        }
        setSearchParams(params, { preventScrollReset: true });
    };

    const setSearchQuery = (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set("productName", query);
        } else {
            params.delete("productName");
        }
        setSearchParams(params, { preventScrollReset: true });
    };

    const hasActiveFilters = !!(
        selectedCategoryId ||
        searchParams.get("brandId") ||
        selectedPriceRange ||
        searchParams.get("productName")
    );

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("categoryId");
        params.delete("brandId");
        params.delete("priceRange");
        params.delete("minPrice");
        params.delete("maxPrice");
        params.delete("productName");
        setSearchParams(params, { preventScrollReset: true });
    };

    const getActiveFiltersList = () => {
        const list = [];
        if (selectedCategoryId) {
            const cat = categories.find(c => c.id === selectedCategoryId);
            if (cat) {
                list.push({
                    type: "category",
                    label: `Category: ${cat.label}`,
                    clear: () => toggleCategory(selectedCategoryId)
                });
            }
        }
        if (searchParams.get("brandId")) {
            const brandId = searchParams.get("brandId")!;
            const brand = brands.find(b => b.id === brandId);
            if (brand) {
                list.push({
                    type: "brand",
                    label: `Brand: ${brand.label}`,
                    clear: () => toggleBrand(brandId)
                });
            }
        }
        if (selectedPriceRange) {
            const range = priceRanges.find(r => r.id === selectedPriceRange);
            if (range) {
                list.push({
                    type: "price",
                    label: `Price: ${range.label}`,
                    clear: () => togglePriceRange(selectedPriceRange)
                });
            }
        }
        if (searchParams.get("productName")) {
            const query = searchParams.get("productName")!;
            list.push({
                type: "search",
                label: `Search: "${query}"`,
                clear: () => setSearchQuery("")
            });
        }
        return list;
    };

    const activeFilters = getActiveFiltersList();

    return (
        <div className="bg-white">
            <Container>
                <div className="flex items-center justify-center py-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our <span className="title-heading">Products</span></h1>
                </div>

                <section className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <div className="hidden lg:block">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors duration-200 flex items-center gap-1 active:scale-95 animate-fade-in"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="border border-gray-200 p-4 rounded-xl mt-6">

                                <CategoryFilter
                                    categories={categories}
                                    selectedCategories={selectedCategoryId ? [selectedCategoryId] : []}
                                    toggleCategory={toggleCategory}
                                />

                                <BrandFilter
                                    brands={brands}
                                    selectedBrands={searchParams.get("brandId") ? [searchParams.get("brandId")!] : []}
                                    toggleBrand={toggleBrand}
                                />

                                <PriceFilter
                                    priceRanges={priceRanges}
                                    selectedPriceRange={selectedPriceRange}
                                    togglePriceRange={togglePriceRange}
                                />
                            </div>
                        </div>

                        <div className={`lg:col-span-3 transition-opacity duration-300 ${isFiltering ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <h2 className="text-xl font-semibold text-gray-500">
                                    {products.length > 0 ? `Showing ${products.length} products` : "No products found"}
                                </h2>
                                <div className="w-full md:max-w-md">
                                    <SearchFilter
                                        searchQuery={searchParams.get("productName") || ""}
                                        setSearchQuery={setSearchQuery}
                                    />
                                </div>
                            </div>

                            {activeFilters.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2 select-none">Active Filters:</span>
                                    {activeFilters.map((filter, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-full shadow-sm transition-all hover:border-gray-300"
                                        >
                                            {filter.label}
                                            <button
                                                onClick={filter.clear}
                                                className="p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                                title={`Remove ${filter.label}`}
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    ))}
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors ml-auto px-2 py-1 active:scale-95"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}

                            {products.length > 0 ? (
                                isFiltering ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {[...Array(6)].map((_, i) => (
                                            <ProductCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <ProductGrid products={products} />
                                )
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                                        <PackageSearch className="w-12 h-12 text-indigo-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
                                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                        We couldn't find any products matching your current filters. Try adjusting your selection or clearing all filters.
                                    </p>
                                    <button
                                        onClick={() => setSearchParams(new URLSearchParams(), { preventScrollReset: true })}
                                        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg active:scale-95"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default ProductListing;
