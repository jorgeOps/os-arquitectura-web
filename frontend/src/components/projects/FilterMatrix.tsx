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

      {/* Contenedor con scroll horizontal global */}
      <div className="overflow-x-auto pb-2 custom-scrollbar">
        {/* Filas de filtros con comportamiento elástico */}
        <div className="space-y-0 min-w-full w-fit">
          {FILTER_ROWS.map((row) => (
            <div
              key={row.category}
              className="relative pt-6 w-full"
            >
              {/* Grid de 2 columnas: título | opciones */}
              <div className="grid grid-cols-[160px_1fr] gap-8 items-end w-full">
                {/* Título de la categoría - pegado a línea base */}
                <div className="text-sm font-medium text-gray-500 pb-[2px]">
                  {row.title}
                </div>

                {/* Solapas asentadas en la línea base - sin gap entre ellas */}
                <div className="flex flex-nowrap gap-[4px] items-end relative z-10 pb-[1px]">
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

              {/* Línea base continua (suelo del archivador) - abarca todo el ancho */}
              <div className="absolute left-0 right-0 bottom-0 border-b border-gray-400 z-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
