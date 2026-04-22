/** @format */

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useDebounce } from "@/lib/useDebounce";

interface CompProps {
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onDeptChange: (value: string) => void;
  searchValue: string;
  levelValue: string;
  deptValue: string;
  departmentOptions: string[];
}

const EXPERIENCE_OPTIONS = [
  { value: "ALL", label: "All Levels" },
  { value: "JUNIOR", label: "Junior (0–2 years)" },
  { value: "MID", label: "Mid-level (3–5 years)" },
  { value: "SENIOR", label: "Senior (5+ years)" },
  { value: "LEAD", label: "Lead / Principal" },
];

const SearchBar: React.FC<CompProps> = ({
  onSearchChange,
  onLevelChange,
  onDeptChange,
  searchValue,
  levelValue,
  deptValue,
  departmentOptions,
}) => {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const levelDropdownRef = useRef<HTMLDivElement>(null);
  const deptDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== searchValue) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, searchValue]);

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        levelDropdownRef.current &&
        !levelDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLevelDropdownOpen(false);
      }
      if (
        deptDropdownRef.current &&
        !deptDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDeptDropdownOpen(false);
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

  const handleLevelChange = useCallback(
    (value: string) => {
      onLevelChange(value);
      setIsLevelDropdownOpen(false);
    },
    [onLevelChange],
  );

  const handleDeptChange = useCallback(
    (value: string) => {
      onDeptChange(value);
      setIsDeptDropdownOpen(false);
    },
    [onDeptChange],
  );

  const getLevelLabel = (value: string) => {
    const option = EXPERIENCE_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : "All Levels";
  };

  const getDeptLabel = (value: string) => {
    return value === "ALL" ? "All Departments" : value;
  };

  const handleDeptClick = (value: string) => {
    if (deptValue === value) {
      onDeptChange("ALL");
    } else {
      handleDeptChange(value);
    }
  };

  return (
    <div className="w-full border border-primary-600 rounded-full">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4 px-2 py-2">
        <div className="flex items-center flex-1">
          <Search className="text-white" />
          <input
            type="text"
            placeholder="Search for opportunities..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full px-4 py-2 text-white placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
          />
        </div>

        {/* Level Dropdown */}
        <div className="relative z-50" ref={levelDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLevelDropdownOpen(!isLevelDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-600 rounded-full border border-gray-300 hover:border-[#BE0F34] hover:text-[#BE0F34] transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">
              {getLevelLabel(levelValue)}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isLevelDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isLevelDropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
              {EXPERIENCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLevelChange(option.value);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    levelValue === option.value
                      ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{option.label}</span>
                  {levelValue === option.value && (
                    <span className="text-[#BE0F34]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="relative z-50" ref={deptDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDeptDropdownOpen(!isDeptDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-[#BE0F34] text-white rounded-full border border-[#BE0F34] hover:text-[#BE0F34] hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">
              {getDeptLabel(deptValue)}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isDeptDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDeptDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeptChange("ALL");
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  deptValue === "ALL"
                    ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>All Departments</span>
                {deptValue === "ALL" && (
                  <span className="text-[#BE0F34]">✓</span>
                )}
              </button>
              {departmentOptions
                .filter((opt) => opt !== "ALL")
                .map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeptClick(dept);
                      setIsDeptDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                      deptValue === dept
                        ? "text-[#BE0F34] font-medium bg-[#BE0F34]/10"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{dept}</span>
                    {deptValue === dept && (
                      <span className="text-[#BE0F34]">✓</span>
                    )}
                  </button>
                ))}
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
              placeholder="Search for opportunities..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full px-3 py-1 text-white placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Filter Button */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-10 h-10 bg-[#BE0F34] text-white rounded-full shadow-md hover:bg-[#a01a35] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                {/* Level Section */}
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Experience Level
                  </h3>
                  <div className="space-y-2">
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleLevelChange(option.value);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                          levelValue === option.value
                            ? "bg-[#BE0F34] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department Section */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Department
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => {
                        handleDeptChange("ALL");
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                        deptValue === "ALL"
                          ? "bg-[#BE0F34] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Departments
                    </button>
                    {departmentOptions
                      .filter((opt) => opt !== "ALL")
                      .map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            handleDeptClick(dept);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                            deptValue === dept
                              ? "bg-[#BE0F34] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
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
