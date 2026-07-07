import { X } from "lucide-react";

interface Filter {
    id: string;
    label: string;
}

interface Props {
    filters: Filter[];
    removeFilter: (id: string) => void;
    clearAllFilters: () => void;
}

export default function ActiveFilters({
    filters,
    removeFilter,
    clearAllFilters,
}: Props) {

    if (!filters.length) return null;

    return (
        <div className="mb-6">

            <div className="flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-2 flex-wrap">

                    <span className="text-sm font-medium text-gray-700">
                        Active Filters:
                    </span>

                    {filters.map((filter) => (
                        <span
                            key={filter.id}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
                        >
                            {filter.label}

                            <button 
                                onClick={() => removeFilter(filter.id)}
                                className="ml-1 hover:text-blue-600"
                            >
                                <X className="w-3 h-3" />
                            </button>

                        </span>
                    ))}
                </div>

                <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                    Clear all
                </button>

            </div>

        </div>
    );
}