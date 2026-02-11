"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type FilterCategory = "type" | "location" | "status" | "year" | "scale";

export interface FilterOption {
  id: string;
  label: string;
  category: FilterCategory;
}

interface FilterContextType {
  // Filtros activos (seleccionados por click)
  activeFilters: Set<string>;
  // Filtros resaltados (por hover en imagen)
  highlightedFilters: Set<string>;
  // Acciones
  toggleFilter: (filterId: string) => void;
  setHighlightedFilters: (filterIds: string[]) => void;
  clearHighlights: () => void;
  clearAllFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [highlightedFilters, setHighlightedFiltersState] = useState<Set<string>>(
    new Set()
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
  };

  const setHighlightedFilters = (filterIds: string[]) => {
    setHighlightedFiltersState(new Set(filterIds));
  };

  const clearHighlights = () => {
    setHighlightedFiltersState(new Set());
  };

  const clearAllFilters = () => {
    setActiveFilters(new Set());
  };

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        highlightedFilters,
        toggleFilter,
        setHighlightedFilters,
        clearHighlights,
        clearAllFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
