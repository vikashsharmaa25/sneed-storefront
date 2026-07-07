import React, { useState, useEffect } from "react";
import { useSearchParams, useRouteLoaderData } from "react-router";
import { Container } from "../ui/Container";
import CategoryFilters from "./CategoryFilters";
import ActiveFilters from "./ActiveFilters";
import CategoryHeader from "./CategoryHeader";
import ProductGrid from "./ProductGrid";
import type { RootLoader } from "../../root";

interface Filter {
    id: string;
    label: string;
    checked: boolean;
    category?: string;
}

interface FilterCategory {
    id: string;
    name: string;
    filters: Filter[];
}

export interface Product {
    id: string;
    name: string;
    originalPrice?: number;
    salePrice?: number;
    regularPrice?: number;
    image: string;
    onSale?: boolean;
}

export default function CategoriesPage({
    products: initialProducts,
    onFilterChange
}: {
    products?: Product[];
    onFilterChange?: (filters: any[]) => void;
}) {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const data = useRouteLoaderData<RootLoader>('root');
    const categories = data?.categories || [];

    const products = initialProducts;
    // console.log("products", products)
    const createCategoryFilters = () => {
        if (!categories || categories.length === 0) return [];

        return categories.map((category: any) => ({
            id: category.id.toString(),
            label: category.name,
            checked: false,
            category: category.slug || category.id.toString()
        }));
    };

    const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
        {
            id: "category",
            name: "Category",
            filters: createCategoryFilters()
        },
        {
            id: "price",
            name: "Price Range",
            filters: [
                { id: "100k-300k", label: "Rs. 100,000 - Rs. 300,000", checked: false },
                { id: "300k-500k", label: "Rs. 300,000 - Rs. 500,000", checked: false },
                { id: "500k-1m", label: "Rs. 500,000 - Rs. 1,000,000", checked: false },
                { id: "1m-plus", label: "Rs. 1,000,000+", checked: false },
            ]
        },
    ]);

    useEffect(() => {
        if (categoryParam) {
            setFilterCategories(prev =>
                prev.map(category => ({
                    ...category,
                    filters: category.filters.map(filter =>
                        filter.id === categoryParam || filter.category === categoryParam
                            ? { ...filter, checked: true }
                            : filter
                    )
                }))
            );
        }
    }, [categoryParam]);

    const handleFilterChange = (filterId: string) => {
        setFilterCategories((prev) => {
            const updatedFilters = prev.map((category) => ({
                ...category,
                filters: category.filters.map((filter) =>
                    filter.id === filterId
                        ? { ...filter, checked: !filter.checked }
                        : filter
                )
            }));

            const activeFilters = updatedFilters.flatMap((cat) =>
                cat.filters.filter((f) => f.checked)
            );

            if (onFilterChange) {
                onFilterChange(activeFilters);
            }

            return updatedFilters;
        });
    };

    const clearAllFilters = () => {
        setFilterCategories((prev) =>
            prev.map((category) => ({
                ...category,
                filters: category.filters.map((filter) => ({ ...filter, checked: false }))
            }))
        );
    };

    const removeFilter = (filterId: string) => {
        setFilterCategories((prev) =>
            prev.map((category) => ({
                ...category,
                filters: category.filters.map((filter) =>
                    filter.id === filterId
                        ? { ...filter, checked: false }
                        : filter
                )
            }))
        );
    };

    const activeFilters = filterCategories.flatMap((category) =>
        category.filters.filter((f) => f.checked)
    );
    const filteredProducts = (products || []).filter(product => {
        if (activeFilters.length === 0) return true;

        return activeFilters.some(filter => {
            if (filter.category) {
                const productCategoryId = (product as any).category_id;
                const filterCategoryId = parseInt(filter.id);
                return productCategoryId === filterCategoryId;
            }
            const productName = (product as any).product_title || product.name;
            if (filter.label) {
                return productName.toLowerCase().includes(filter.label.toLowerCase());
            }
            return false;
        });
    });

    // console.log("filteredProducts", filteredProducts)

    const getCategoryDisplayName = (categoryParam: string | null) => {
        if (!categoryParam) return "All Products";

        return categoryParam
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Container className="py-8">
            <div className="flex gap-8">

                <CategoryFilters
                    filterCategories={filterCategories}
                    onChange={handleFilterChange}
                />

                <div className="flex-1">

                    <ActiveFilters
                        filters={activeFilters}
                        removeFilter={removeFilter}
                        clearAllFilters={clearAllFilters}
                    />

                    <CategoryHeader
                        categoryName={getCategoryDisplayName(categoryParam)}
                        productCount={filteredProducts.length}
                    />

                    <ProductGrid products={filteredProducts} />

                </div>
            </div>
        </Container>
    );
}