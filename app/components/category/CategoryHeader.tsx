interface CategoryHeaderProps {
    categoryName?: string;
    productCount?: number;
}

export default function CategoryHeader({ categoryName = "All Products", productCount = 0 }: CategoryHeaderProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-6">

                <h1 className="text-2xl font-bold">
                    {categoryName}
                </h1>

                <div className="flex items-center gap-4">

                    <span className="text-sm text-gray-600">
                        {productCount} products available
                    </span>

                    <select className="border rounded px-3 py-1 text-sm">
                        <option>Sort by: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Name: A to Z</option>
                        <option>Name: Z to A</option>
                    </select>

                </div>
            </div>

            <div className="mb-8">

                <h2 className="text-xl font-semibold mb-3">
                    Transform Your Packaging Process
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                    Revolutionize your packaging line with our state-of-the-art case
                    and box erectors.
                </p>

                <button className="bg-red-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-900 transition-colors">
                    Schedule Equipment Consultation
                </button>

            </div>
        </>
    );
}