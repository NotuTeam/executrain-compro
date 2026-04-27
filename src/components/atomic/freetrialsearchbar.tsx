/** @format */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortChange: (value: "asc" | "desc") => void;
  searchValue: string;
  categoryValue?: string;
  sortValue: "asc" | "desc";
}

const FREE_TRIAL_CATEGORIES = [
  { label: "Data Analytics", value: "DATA_ANALYTICS" },
  { label: "Automation", value: "AUTOMATION" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
  { label: "Emotional Intelligence", value: "EMOTIONAL_INTELLIGENCE" },
];

const FreeTrialSearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  searchValue,
  categoryValue,
  sortValue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryValue,
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory(categoryValue);
  }, [categoryValue]);

  const handleCategoryClick = (value: string) => {
    if (selectedCategory === value) {
      setSelectedCategory(undefined);
      onCategoryChange(undefined);
    } else {
      setSelectedCategory(value);
      onCategoryChange(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (value: "asc" | "desc") => {
    onSortChange(value);
    setIsSortDropdownOpen(false);
  };

  const getSortLabel = () => {
    return sortValue === "desc" ? "Newest First" : "Oldest First";
  };

  const getCategoryLabel = (value: string | undefined) => {
    if (!value) return "All Categories";
    const category = FREE_TRIAL_CATEGORIES.find((cat) => cat.value === value);
    return category ? category.label : "All Categories";
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
      <div className="hidden md:flex items-center gap-4 px-6 py-4">
        <div className="flex items-center flex-1">
          <Search className="text-white" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 text-white placeholder-white bg-transparent border-none outline-none focus:ring-0"
          />
        </div>

        <div className="relative z-50" ref={categoryDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-600 rounded-full border border-gray-300 hover:border-[#BE0F34] hover:text-[#BE0F34] transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">
              {getCategoryLabel(selectedCategory)}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isCategoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryDropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCategory(undefined);
                  onCategoryChange(undefined);
                  setIsCategoryDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  !selectedCategory
                    ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>All Categories</span>
                {!selectedCategory && <span className="text-[#BE0F34]">✓</span>}
              </button>
              {FREE_TRIAL_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCategoryClick(category.value);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === category.value
                      ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category.label}</span>
                  {selectedCategory === category.value && (
                    <span className="text-[#BE0F34]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-50" ref={sortDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSortDropdownOpen(!isSortDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-[#BE0F34] text-white rounded-full border border-[#BE0F34] hover:text-[#BE0F34] hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">{getSortLabel()}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isSortDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSortChange("desc");
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  sortValue === "desc"
                    ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Newest First</span>
                {sortValue === "desc" && (
                  <span className="text-[#BE0F34]">✓</span>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSortChange("asc");
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  sortValue === "asc"
                    ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Oldest First</span>
                {sortValue === "asc" && (
                  <span className="text-[#BE0F34]">✓</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 bg-transparent rounded-full px-4 py-2">
            <Search className="text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-1 text-white placeholder-white bg-transparent border-none outline-none focus:ring-0 text-sm"
            />
          </div>

          <div className="relative" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-10 h-10 bg-[#BE0F34] text-white rounded-full shadow-md hover:bg-[#0096d1] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(undefined);
                        onCategoryChange(undefined);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                        !selectedCategory
                          ? "bg-[#BE0F34] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Categories
                    </button>
                    {FREE_TRIAL_CATEGORIES.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryClick(category.value)}
                        className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? "bg-[#BE0F34] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Sort By
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleSortChange("desc");
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors flex items-center justify-between ${
                        sortValue === "desc"
                          ? "bg-[#BE0F34] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>Newest First</span>
                      {sortValue === "desc" && <span>✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        handleSortChange("asc");
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors flex items-center justify-between ${
                        sortValue === "asc"
                          ? "bg-[#BE0F34] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>Oldest First</span>
                      {sortValue === "asc" && <span>✓</span>}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialSearchBar;
