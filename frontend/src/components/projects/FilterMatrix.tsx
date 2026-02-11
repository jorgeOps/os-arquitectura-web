"use client";

import { useFilters } from "@/contexts/FilterContext";
import { FilterTab } from "./FilterTab";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterRow {
  category: string;
  title: string;
  options: { id: string; label: string }[];
}

const FILTER_ROWS: FilterRow[] = [
  {
    category: "type",
    title: "Tipo de edificio",
    options: [
      { id: "residential", label: "Residencial" },
      { id: "commercial", label: "Comercial" },
      { id: "office", label: "Oficinas" },
      { id: "cultural", label: "Cultural" },
      { id: "mixed", label: "Uso mixto" },
    ],
  },
  {
    category: "location",
    title: "Ubicación",
    options: [
      { id: "madrid", label: "Madrid" },
      { id: "barcelona", label: "Barcelona" },
      { id: "valencia", label: "Valencia" },
      { id: "bilbao", label: "Bilbao" },
      { id: "international", label: "Internacional" },
    ],
  },
  {
    category: "status",
    title: "Estado",
    options: [
      { id: "built", label: "Construido" },
      { id: "construction", label: "En construcción" },
      { id: "project", label: "Proyecto" },
      { id: "competition", label: "Concurso" },
      { id: "renovation", label: "Rehabilitación" },
    ],
  },
  {
    category: "year",
    title: "Año",
    options: [
      { id: "2024", label: "2024" },
      { id: "2023", label: "2023" },
      { id: "2022", label: "2022" },
      { id: "2020-2021", label: "2020-2021" },
      { id: "pre-2020", label: "Antes de 2020" },
    ],
  },
  {
    category: "scale",
    title: "Escala",
    options: [
      { id: "small", label: "< 500m²" },
      { id: "medium", label: "500-2000m²" },
      { id: "large", label: "2000-5000m²" },
      { id: "xlarge", label: "> 5000m²" },
      { id: "urban", label: "Urbanismo" },
    ],
  },
];

export function FilterMatrix() {
  const { activeFilters, toggleFilter, clearAllFilters } = useFilters();

  return (
    <div className="space-y-0">
      {/* Header con contador de filtros activos */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-gray-600">
          Clasificación de proyectos
        </h2>
        <AnimatePresence>
          {activeFilters.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={14} />
              Limpiar filtros ({activeFilters.size})
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filas de filtros */}
      <div className="space-y-0">
        {FILTER_ROWS.map((row, index) => (
          <div
            key={row.category}
            className="relative pt-6"
          >
            {/* Grid de 2 columnas: título | opciones - TODO pegado a la línea inferior */}
            <div className="grid grid-cols-[200px_1fr] gap-8 items-end">
              {/* Título de la categoría - pegado a línea base */}
              <div className="text-sm font-medium text-gray-500 pb-[2px]">
                {row.title}
              </div>

              {/* Solapas asentadas en la línea base - sin gap entre ellas */}
              <div className="flex flex-wrap gap-[4px] items-end relative z-10">
                {row.options.map((option) => (
                  <FilterTab
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    onClick={() => toggleFilter(option.id)}
                  />
                ))}
              </div>
            </div>

            {/* Línea base continua (suelo del archivador) */}
            <div className="absolute left-0 right-0 bottom-0 border-b border-gray-400 z-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
