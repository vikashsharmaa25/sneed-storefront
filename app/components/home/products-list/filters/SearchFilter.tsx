import React, { useEffect, useState, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useFetcher, Link } from "react-router";

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchFilter: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const [isOpen, setIsOpen] = useState(false);
    const fetcher = useFetcher();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.length >= 2) {
                fetcher.load(`/api.products?productName=${encodeURIComponent(inputValue)}`);
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(inputValue);
        setIsOpen(false);
    };

    const clearSearch = () => {
        setInputValue("");
        setSearchQuery("");
        setIsOpen(false);
    };

    const products = fetcher.data?.products || [];

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => inputValue.length >= 2 && setIsOpen(true)}
                        placeholder="Search product or tag..."
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    {(inputValue || fetcher.state === "loading") && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                            {fetcher.state === "loading" && (
                                <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
                            )}
                            {inputValue && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isOpen && (inputValue.length >= 2) && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {fetcher.state !== "loading" && products.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                            No products found matching "{inputValue}"
                        </div>
                    ) : (
                        <div className="py-2">
                            {products.slice(0, 5).map((product: any) => (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                                        <img src={product.image_url || product.variant_image_url} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                            {product.product_title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Rs. {product.selling_price?.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                            {products.length > 0 && (
                                <button
                                    onClick={handleSearch}
                                    className="w-full py-2.5 bg-gray-50 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors border-t border-gray-100"
                                >
                                    View all results for "{inputValue}"
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
