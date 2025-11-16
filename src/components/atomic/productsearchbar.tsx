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

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  searchValue,
  categoryValue,
  sortValue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryValue
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "IT Training", value: "IT_TRAINING" },
    { label: "IT Consultant", value: "IT_CONSULTANT" },
    { label: "IT Support", value: "IT_SUPPORT" },
  ];

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
    const category = categories.find((cat) => cat.value === value);
    return category ? category.label : "All Categories";
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4 px-6 py-4">
        <div className="flex items-center flex-1">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === category.value
                  ? "bg-[#00AEEF] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-[#00AEEF] hover:text-[#00AEEF]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative z-50" ref={sortDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSortDropdownOpen(!isSortDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-600 rounded-full border border-gray-300 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors duration-200 whitespace-nowrap"
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
                    ? "text-[#00AEEF] font-medium bg-[#00AEEF]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Newest First</span>
                {sortValue === "desc" && (
                  <span className="text-[#00AEEF]">✓</span>
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
                    ? "text-[#00AEEF] font-medium bg-[#00AEEF]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Oldest First</span>
                {sortValue === "asc" && (
                  <span className="text-[#00AEEF]">✓</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="flex items-center flex-1 bg-white rounded-full px-4 py-2 shadow-sm">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-1 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Filter Button */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-10 h-10 bg-[#00AEEF] text-white rounded-full shadow-md hover:bg-[#0096d1] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                {/* Category Section */}
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
                          ? "bg-[#00AEEF] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryClick(category.value)}
                        className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? "bg-[#00AEEF] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Section */}
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
                          ? "bg-[#00AEEF] text-white"
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
                          ? "bg-[#00AEEF] text-white"
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

export default SearchBar;
