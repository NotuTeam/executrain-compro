/** @format */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
  searchValue: string;
  sortValue: "asc" | "desc";
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onSortChange,
  searchValue,
  sortValue,
}) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className="w-full bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4 px-6 py-4">
        <div className="flex items-center flex-1">
          <Search className="text-white" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 text-white placeholder-white  bg-transparent border-none outline-none focus:ring-0"
          />
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

      {/* Mobile View */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="flex items-center flex-1 bg-white rounded-full px-4 py-2 shadow-sm">
            <Search className="text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-1 text-white placeholder-white  bg-transparent border-none outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Filter Button */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-10 h-10 bg-[#BE0F34] text-white rounded-full shadow-md hover:bg-[#0096d1] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
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

export default SearchBar;
