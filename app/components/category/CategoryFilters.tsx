interface Filter {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterCategory {
  id: string;
  name: string;
  filters: Filter[];
}

interface Props {
  filterCategories: FilterCategory[];
  onChange: (id: string) => void;
}

export default function CategoryFilters({ filterCategories, onChange }: Props) {
  return (
    <div className="w-64 shrink-0">
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        {filterCategories.map((category) => (
          <div key={category.id}>
            <h3 className="font-semibold text-lg mb-4">{category.name}</h3>
            <div className="space-y-3">
              {category.filters.map((filter) => (
                <label key={filter.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filter.checked}
                    onChange={() => onChange(filter.id)}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-sm">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}