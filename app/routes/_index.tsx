import { useLoaderData } from "react-router";
import Home from "~/components/Home";
import { getProducts } from "~/lib/api/products.server";
import { getCategories } from "~/lib/api/categories.server";
import { getBrands } from "~/lib/api/brands.server";
import { getSuccessStories, getBlogs, getSeoArticles, getMessageSections } from "~/lib/api/content-management";
import { getFlashSales } from "~/lib/api/flash-sale";
import { getHeroBanners } from "~/lib/api/hero-banner.server";
import { getStats } from "~/lib/api/stats.server";

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const languageCode = url.searchParams.get("languageCode");
    const currencyCodeId = url.searchParams.get("currencyCodeId");
    const categoryId = url.searchParams.get("categoryId");
    const brandId = url.searchParams.get("brandId");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const productName = url.searchParams.get("productName");
    const inStock = url.searchParams.get("inStock");
    const sortBy = url.searchParams.get("sortBy") || "updated_at";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";
    const limit = url.searchParams.get("limit") || "50";
    const offset = url.searchParams.get("offset");

    const [products, categories, brands, successStories, blogs, seoArticles, flashSales, heroBanners, stats, messageSections] = await Promise.all([
        getProducts({
            languageCode: languageCode || undefined,
            currencyCodeId: currencyCodeId ? parseInt(currencyCodeId) : undefined,
            categoryId: categoryId ? parseInt(categoryId) : undefined,
            brandId: brandId ? parseInt(brandId) : undefined,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            productName: productName || undefined,
            inStock: inStock === "true" ? true : inStock === "false" ? false : undefined,
            sortBy,
            sortOrder,
            limit: parseInt(limit),
            offset: offset ? parseInt(offset) : undefined,
        }).catch((error: Error) => {
            console.error('[Index] Failed to fetch products:', error);
            return [];
        }),
        getCategories().catch((error: Error) => {
            console.error('[Index] Failed to fetch categories:', error);
            return [];
        }),
        getBrands().catch((error: Error) => {
            console.error('[Index] Failed to fetch brands:', error);
            return [];
        }),
        getSuccessStories().catch((error: Error) => {
            console.error('[Index] Failed to fetch success stories:', error);
            return [];
        }),
        getBlogs().catch((error: Error) => {
            console.error('[Index] Failed to fetch blogs:', error);
            return [];
        }),
        getSeoArticles().catch((error: Error) => {
            console.error('[Index] Failed to fetch SEO articles:', error);
            return [];
        }),
        getFlashSales().catch((error: Error) => {
            console.error('[Index] Failed to fetch flash sales:', error);
            return [];
        }),
        getHeroBanners().catch((error: Error) => {
            console.error('[Index] Failed to fetch hero banners:', error);
            return [];
        }),
        getStats().catch((error: Error) => {
            console.error('[Index] Failed to fetch stats:', error);
            return [];
        }),
        getMessageSections().catch((error: Error) => {
            console.error('[Index] Failed to fetch message sections:', error);
            return [];
        })
    ]);
    return {
        products,
        categories,
        brands,
        successStories,
        blogs,
        seoArticles,
        flashSales,
        heroBanners,
        stats,
        messageSections
    };
}

export default function Index() {
    const { products, categories, brands, successStories, blogs, seoArticles, flashSales, heroBanners, stats, messageSections } =
        useLoaderData<typeof loader>();

    console.log("products", products)

    console.log(products)
    return <Home
        products={products}
        categories={categories}
        brands={brands}
        successStories={successStories}
        blogs={blogs}
        seoArticles={seoArticles}
        flashSales={flashSales}
        heroBanners={heroBanners}
        stats={stats}
        messageSections={messageSections}
    />;
}
