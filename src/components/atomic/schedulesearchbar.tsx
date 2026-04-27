/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useServices } from "@/services/service/hook";
import { serviceToCategoryFormat } from "@/lib/utils";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onScheduleCategoryChange: (value: string[]) => void;
  onProductCategoryChange: (value: string | undefined) => void;
  searchValue: string;
  scheduleCategoryValue: string[];
  productCategoryValue?: string;
  scheduleCategoryList: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onScheduleCategoryChange,
  onProductCategoryChange,
  searchValue,
  scheduleCategoryValue,
  productCategoryValue,
  scheduleCategoryList = [],
}) => {
  const [selectedScheduleCategories, setSelectedScheduleCategories] = useState<
    string[]
  >(scheduleCategoryValue);
  const [selectedProductCategory, setSelectedProductCategory] = useState<
    string | undefined
  >(productCategoryValue);
  const [isScheduleCategoryDropdownOpen, setIsScheduleCategoryDropdownOpen] =
    useState(false);
  const [isProductCategoryDropdownOpen, setIsProductCategoryDropdownOpen] =
    useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const scheduleCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const productCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const { data: services = [] } = useServices();

  const productCategories = services.map(
    (service: { service_name: string }) => ({
      label: service.service_name,
      value: serviceToCategoryFormat(service.service_name),
    }),
  );

  useEffect(() => {
    setSelectedScheduleCategories(scheduleCategoryValue);
  }, [scheduleCategoryValue]);

  useEffect(() => {
    setSelectedProductCategory(productCategoryValue);
  }, [productCategoryValue]);

  const handleScheduleCategoryClick = (value: string) => {
    let nextCategories: string[];
    if (selectedScheduleCategories.includes(value)) {
      nextCategories = selectedScheduleCategories.filter(
        (cat) => cat !== value,
      );
    } else {
      nextCategories = [...selectedScheduleCategories, value];
    }

    setSelectedScheduleCategories(nextCategories);
    onScheduleCategoryChange(nextCategories);
  };

  const handleProductCategoryClick = (value: string) => {
    if (selectedProductCategory === value) {
      setSelectedProductCategory(undefined);
      onProductCategoryChange(undefined);
    } else {
      setSelectedProductCategory(value);
      onProductCategoryChange(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        scheduleCategoryDropdownRef.current &&
        !scheduleCategoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsScheduleCategoryDropdownOpen(false);
      }
      if (
        productCategoryDropdownRef.current &&
        !productCategoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductCategoryDropdownOpen(false);
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

  const getScheduleCategoryLabel = () => {
    if (!selectedScheduleCategories.length) return "All Categories";
    if (selectedScheduleCategories.length === 1)
      return selectedScheduleCategories[0];
    return `${selectedScheduleCategories.length} Categories Selected`;
  };

  const getProductCategoryLabel = () => {
    if (!selectedProductCategory) return "All Services";
    const category = productCategories.find(
      (cat) => cat.value === selectedProductCategory,
    );
    return category ? category.label : "All Services";
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

        <div className="relative z-50" ref={scheduleCategoryDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsScheduleCategoryDropdownOpen(
                !isScheduleCategoryDropdownOpen,
              );
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-600 rounded-full border border-gray-300 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">
              {getScheduleCategoryLabel()}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isScheduleCategoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isScheduleCategoryDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedScheduleCategories([]);
                  onScheduleCategoryChange([]);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  selectedScheduleCategories.length === 0
                    ? "text-primary-500 font-medium bg-primary-500/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>All Categories</span>
                {selectedScheduleCategories.length === 0 && (
                  <span className="text-primary-500">✓</span>
                )}
              </button>
              {scheduleCategoryList.map((category: string) => (
                <button
                  key={category}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleScheduleCategoryClick(category);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    selectedScheduleCategories.includes(category)
                      ? "text-primary-500 font-medium bg-primary-500/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category}</span>
                  {selectedScheduleCategories.includes(category) && (
                    <span className="text-primary-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-50" ref={productCategoryDropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsProductCategoryDropdownOpen(!isProductCategoryDropdownOpen);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-full border border-primary-500 hover:text-primary-500 hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            <span className="text-sm font-medium">
              {getProductCategoryLabel()}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isProductCategoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProductCategoryDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedProductCategory(undefined);
                  onProductCategoryChange(undefined);
                  setIsProductCategoryDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  !selectedProductCategory
                    ? "text-primary-500 font-medium bg-primary-500/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>All Services</span>
                {!selectedProductCategory && (
                  <span className="text-primary-500">✓</span>
                )}
              </button>
              {productCategories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleProductCategoryClick(category.value);
                    setIsProductCategoryDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    selectedProductCategory === category.value
                      ? "text-primary-500 font-medium bg-primary-500/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category.label}</span>
                  {selectedProductCategory === category.value && (
                    <span className="text-primary-500">✓</span>
                  )}
                </button>
              ))}
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
              className="flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full shadow-md hover:bg-[#0096d1] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Schedule Category
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedScheduleCategories([]);
                        onScheduleCategoryChange([]);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                        selectedScheduleCategories.length === 0
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Schedule Categories
                    </button>
                    {scheduleCategoryList.map((category: string) => (
                      <button
                        key={category}
                        onClick={() => handleScheduleCategoryClick(category)}
                        className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                          selectedScheduleCategories.includes(category)
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Product Category
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedProductCategory(undefined);
                        onProductCategoryChange(undefined);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                        !selectedProductCategory
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Product Categories
                    </button>
                    {productCategories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() =>
                          handleProductCategoryClick(category.value)
                        }
                        className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                          selectedProductCategory === category.value
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.label}
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
