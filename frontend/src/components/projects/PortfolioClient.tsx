"use client";

import { useMemo, useState } from "react";
import { FilterProvider, useFilters } from "@/contexts/FilterContext";
import { FilterMatrix } from "./FilterMatrix";
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

    const matched: (Project & { isMatched: boolean })[] = [];
    const notMatched: (Project & { isMatched: boolean })[] = [];

    initialProjects.forEach((project) => {
      // Changed from .every() (AND) to .some() (OR) to allow inclusive filtering 
      // (e.g. "Madrid" OR "Barcelona")
      const matchesFilter = Array.from(activeFilters).some((filterId) =>
        project.tags.includes(filterId)
      );

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
    <div className="space-y-8">
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
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
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

      {/* Galería de proyectos - Vertical Layout with Centered Items */}
      <div className="w-full">
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-3 lg:gap-4"
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
                className="w-[160px] h-[160px]" // Fixed size as requested to match previous look
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
