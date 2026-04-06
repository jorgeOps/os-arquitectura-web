"use client";

import { useMemo, useState } from "react";
import { FilterProvider, useFilters } from "@/contexts/FilterContext";
import { FilterMatrix, FILTER_ROWS } from "./FilterMatrix";
import { ProjectCard, Project } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/lib/i18n/config";

interface PortfolioClientProps {
  lang: Locale;
  initialProjects: Project[];
}

function PortfolioContent({ initialProjects }: { initialProjects: Project[] }) {
  const { activeFilters } = useFilters();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Reordenar proyectos: coincidentes primero, luego no coincidentes
  const sortedProjects = useMemo(() => {
    if (activeFilters.size === 0) {
      // Sin filtros, mostrar todos con marca de coincidencia
      return initialProjects.map((project) => ({
        ...project,
        isMatched: true,
      }));
    }

    // Agrupar filtros activos por categoría
    const groupedActiveFilters: Record<string, string[]> = {};
    Array.from(activeFilters).forEach(filterId => {
      for (const row of FILTER_ROWS) {
        if (row.options.some(opt => opt.id === filterId)) {
          if (!groupedActiveFilters[row.category]) {
            groupedActiveFilters[row.category] = [];
          }
          groupedActiveFilters[row.category].push(filterId);
          break;
        }
      }
    });

    const activeCategories = Object.keys(groupedActiveFilters);

    const matched: (Project & { isMatched: boolean })[] = [];
    const notMatched: (Project & { isMatched: boolean })[] = [];

    initialProjects.forEach((project) => {
      // Intersección (AND) entre categorías, Unión (OR) dentro de una misma categoría.
      const matchesFilter = activeCategories.every((category) => {
        const requiredTagsForCategory = groupedActiveFilters[category];
        return requiredTagsForCategory.some(tag => project.tags.includes(tag));
      });

      if (matchesFilter) {
        matched.push({ ...project, isMatched: true });
      } else {
        notMatched.push({ ...project, isMatched: false });
      }
    });

    return [...matched, ...notMatched];
  }, [activeFilters, initialProjects]);

  const matchedCount = sortedProjects.filter((p) => p.isMatched).length;

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Detalle del Proyecto (Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Matriz de filtros - más compacta */}
      <div className="bg-white rounded-lg shadow-sm p-2 sm:p-3 md:p-4 border border-gray-200">
        <FilterMatrix />
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-600">
          {activeFilters.size === 0 ? (
            <>
              Mostrando <strong>todos los proyectos</strong> ({initialProjects.length})
            </>
          ) : (
            <>
              <strong>{matchedCount}</strong> proyecto{matchedCount !== 1 ? "s" : ""} coincide{matchedCount !== 1 ? "n" : ""} con los filtros
            </>
          )}
        </p>
      </div>

      {/* Galería de proyectos - Responsive Grid */}
      <div className="w-full">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4"
        >
          <AnimatePresence>
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-square shrink-0"
              >
                <ProjectCard
                  project={project}
                  isMatched={project.isMatched}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export function PortfolioClient({ lang, initialProjects }: PortfolioClientProps) {
  return (
    <FilterProvider>
      <PortfolioContent initialProjects={initialProjects} />
    </FilterProvider>
  );
}
