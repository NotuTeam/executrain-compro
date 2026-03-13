/** @format */
"use client";

import { useState } from "react";

const filters = ["IT Training", "IT Consultant", "IT Support"];

export default function ProductFilter() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() =>
            setSelectedFilter(selectedFilter === filter ? null : filter)
          }
          className={`px-5 py-2 rounded-full border-2 border-white transition-colors ${
            selectedFilter === filter
              ? "bg-white text-primary-500"
              : "bg-transparent text-white hover:bg-white hover:text-primary-500"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
