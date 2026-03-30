"use client";

import React from "react";

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
    category: "buildingType",
    title: "Tipo de edificio",
    options: [
      { id: "office", label: "Terciario oficinas" },
      { id: "commercial", label: "Terciario comercial" },
      { id: "institutional", label: "Terciario dotacional" },
      { id: "residential_collective", label: "Residencial colectivo" },
      { id: "residential_single", label: "Residencial unifamiliar" },
      { id: "industrial", label: "Industrial" },
      { id: "building_other", label: "Otro" },
    ],
  },
  {
    category: "workType",
    title: "Tipo de obra",
    options: [
      { id: "new_build", label: "Obra nueva" },
      { id: "renovation", label: "Rehabilitación" },
      { id: "work_other", label: "Otro" },
    ],
  },
  {
    category: "serviceScope",
    title: "Tipo de trabajo",
    options: [
      { id: "full_mission", label: "Misión completa" },
      { id: "previous_projects", label: "Proyectos Previos" },
      { id: "pm", label: "Project Management" },
      { id: "consulting", label: "Consultoría" },
      { id: "service_other", label: "Otro" },
    ],
  },
  {
    category: "status",
    title: "Estado del trabajo",
    options: [
      { id: "study", label: "En estudio" },
      { id: "ongoing", label: "En curso" },
      { id: "finished", label: "Finalizado" },
      { id: "status_other", label: "Otro" },
    ],
  },
  {
    category: "location",
    title: "Localización",
    options: [
      { id: "madrid", label: "Madrid" },
      { id: "barcelona", label: "Barcelona" },
      { id: "location_other", label: "Otro" },
    ],
  },
];

export function FilterMatrix() {
  const { activeFilters, toggleFilter, clearAllFilters } = useFilters();

  return (
    <div className="space-y-0">
      {/* Header con contador de filtros activos */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-600">
          Clasificación de proyectos
        </h2>
        <AnimatePresence>
          {activeFilters.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Limpiar filtros ({activeFilters.size})</span>
              <span className="sm:hidden">Limpiar ({activeFilters.size})</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Contenedor con scroll horizontal global */}
      <div className="overflow-x-auto pb-2 custom-scrollbar">
        {/* Filas de filtros con comportamiento elástico */}
        <div className="space-y-0 min-w-full w-fit">
          {FILTER_ROWS.map((row) => (
            <div
              key={row.category}
              className="relative pt-6 w-full border-b border-gray-400"
            >
              {/* Grid de 2 columnas: título | opciones - Responsive */}
              <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-2 sm:gap-4 md:gap-8 items-end w-full">
                {/* Título de la categoría - pegado a línea base */}
                <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 pb-[1px] leading-tight">
                  {row.title}
                </div>

                {/* Solapas asentadas en la línea base - fusionadas con la línea */}
                <div className="flex flex-nowrap gap-2 sm:gap-3 items-end relative z-10">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
