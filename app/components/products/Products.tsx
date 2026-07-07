"use client";

import React, { useState } from "react";
import { Share2, Heart, ChevronDown, Play, Minus, Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Container } from "../ui/Container";
import { useCart } from "~/lib/cart-context";
import { RelatedProducts } from "./RelatedProducts";

/* -------------------- Header -------------------- */
const Header = ({ product }: any) => (
    <header className="border-b px-4 py-3 ">
        <Container>
            <nav className="flex items-center gap-2 text-sm text-gray-600">
                <span>Home</span>
                <span>/</span>
                <span>{product.category_name}</span>
                <span>/</span>
                <span className="text-gray-900">{product.title}</span>
            </nav>
        </Container>
    </header>
);

/* -------------------- Image Gallery -------------------- */
const ImageGallery = ({ images }: any) => {
    const [selected, setSelected] = useState(0);

    if (!images?.length) return null;

    return (
        <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg aspect-4/3 overflow-hidden">
                <img
                    src={images[selected].image_url}
                    className="w-full h-full object-contain"
                    alt="product"
                />
            </div>

            <div className="flex gap-2">
                {images.map((img: any, i: number) => (
                    <button
                        key={img.image_id}
                        onClick={() => setSelected(i)}
                        className={`w-20 h-20 rounded-lg border-2 ${selected === i ? "border-red-500" : "border-gray-200"
                            }`}
                    >
                        <img
                            src={img.image_url}
                            className="w-full h-full object-contain rounded"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

/* -------------------- Product Info -------------------- */
const ProductInfo = ({ product, selectedVariantId, setSelectedVariantId }: any) => {
    const [qty, setQty] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    const selectedVariant = product.variants?.find((v: any) => v.variant_id === selectedVariantId);
    const variant = selectedVariant || product.variants?.[0];
    const price = variant?.prices?.[0];
    const inventory = variant?.inventory?.[0];
    const maxQty = inventory?.quantity || 0;

    const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVariantId(Number(e.target.value));
        setQty(1);
    };

    const handleAddToCart = async () => {
        console.log('handleAddToCart');
        const productId = product.product_id;
        const productVariantId = variant?.variant_id;

        console.log('productVariantId === >', productVariantId);

        if (!productVariantId) {
            toast.error('Please select a variant');
            return;
        }

        try {
            setIsAdding(true);
            await addToCart(productId, productVariantId, qty);
            toast.success(`${qty} ${qty === 1 ? 'item' : 'items'} added to cart successfully!`);
        } catch (err) {
            console.log("err", err)
            // toast.error(err?.response?.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div>
                    {/* <div className="text-sm text-gray-500">#{product.product_id}</div> */}

                    <h1 className="text-2xl font-bold mt-2">{product.title}</h1>

                    <div className="text-3xl font-bold text-red-600 mt-3">
                        {price?.currency?.symbol} {price?.selling_price}
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                        Brand: {product.brand_name}
                    </div>
                </div>
            </div>

            {/* Variant Selector */}
            {product.has_variants && product.variants?.length > 0 && (
                <div>
                    <label className="block text-sm mb-2">Variant</label>
                    <div className="relative">
                        <select
                            value={selectedVariantId || ""}
                            onChange={handleVariantChange}
                            className="w-full h-12 pl-4 pr-10 border rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {product.variants.map((v: any) => (
                                <option key={v.variant_id} value={v.variant_id}>
                                    {v.title?.length > 50 ? v.title.substring(0, 50) + "..." : v.title} - {v.prices?.[0]?.currency?.symbol}{v.prices?.[0]?.selling_price}
                                    {v.inventory?.[0]?.quantity === 0 ? " (Out of Stock)" : ""}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {variant?.sku && (
                        <div className="text-xs text-gray-500 mt-1">SKU: {variant.sku}</div>
                    )}
                </div>
            )}

            {/* Quantity */}
            <div>
                <label className="block text-sm mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={qty <= 1}
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <input
                        readOnly
                        value={qty}
                        className="w-16 h-10 border text-center rounded focus:outline-none"
                    />
                    <button
                        onClick={() => setQty(Math.min(maxQty, qty + 1))}
                        className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        disabled={qty >= maxQty}
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                {inventory && (
                    <div className="text-xs text-gray-500 mt-1">
                        {inventory.quantity > 0 ? `${inventory.quantity} available` : "Out of stock"}
                    </div>
                )}
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full primary-btn py-3 rounded flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        ADDING...
                    </>
                ) : (
                    "ADD TO CART"
                )}
            </button>
        </div>
    );
};

const Tabs = ({ activeTab, setActiveTab }: any) => {
    const tabs = ["Description", "Specifications", "Benefits", "Compatibility"];

    return (
        <div className="border-b flex gap-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium ${activeTab === tab
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-500"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

const HtmlContent = ({ html }: any) => (
    <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html || "<p>No data</p>" }}
    />
);


export default function Products({ product }: any) {
    const [activeTab, setActiveTab] = useState("Description");
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        product.variants?.find((v: any) => v.is_default)?.variant_id || product.variants?.[0]?.variant_id || null
    );

    const selectedVariant = product.variants?.find((v: any) => v.variant_id === selectedVariantId);
    const displayImages = selectedVariant?.images?.length > 0
        ? selectedVariant.images
        : product.images || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header product={product} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <ImageGallery images={displayImages} />
                    <ProductInfo product={product} selectedVariantId={selectedVariantId} setSelectedVariantId={setSelectedVariantId} />
                </div>

                <div className="rounded-lg p-6">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="mt-6 overflow-auto">
                        {activeTab === "Description" && (
                            <HtmlContent html={product.description} />
                        )}
                        {activeTab === "Specifications" && (
                            <HtmlContent html={product.specifications} />
                        )}
                        {activeTab === "Benefits" && (
                            <HtmlContent html={product.benefits} />
                        )}
                        {activeTab === "Compatibility" && (
                            <HtmlContent html={product.compatibility} />
                        )}
                    </div>
                </div>

                <RelatedProducts
                    recommendations={product.recommendations}
                    product={product}
                    setSelectedVariantId={setSelectedVariantId}
                />
            </main>
        </div>
    );
}
