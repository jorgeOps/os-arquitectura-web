"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { FilterProvider, useFilters } from "@/contexts/FilterContext";
import { FilterMatrix } from "./FilterMatrix";
import { ProjectCard, Project } from "./ProjectCard";
import { MOCK_PROJECTS } from "@/lib/mockData";
import { motion, LayoutGroup } from "framer-motion";
import { Locale } from "@/lib/i18n/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioClientProps {
  lang: Locale;
}

function PortfolioContent() {
  const { activeFilters } = useFilters();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Reordenar proyectos: coincidentes primero, luego no coincidentes
  const sortedProjects = useMemo(() => {
    if (activeFilters.size === 0) {
      // Sin filtros, mostrar todos con marca de coincidencia
      return MOCK_PROJECTS.map((project) => ({
        ...project,
        isMatched: true,
      }));
    }

    const matched: (Project & { isMatched: boolean })[] = [];
    const notMatched: (Project & { isMatched: boolean })[] = [];

    MOCK_PROJECTS.forEach((project) => {
      const hasAllFilters = Array.from(activeFilters).every((filterId) =>
        project.tags.includes(filterId)
      );

      if (hasAllFilters) {
        matched.push({ ...project, isMatched: true });
      } else {
        notMatched.push({ ...project, isMatched: false });
      }
    });

    return [...matched, ...notMatched];
  }, [activeFilters]);

  const matchedCount = sortedProjects.filter((p) => p.isMatched).length;

  // Detectar posición del scroll
  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Listener de scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);

    // Observer para detectar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [sortedProjects]);

  // Navegación horizontal
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newPosition =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-6">
      {/* Matriz de filtros - más compacta */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <FilterMatrix />
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-600">
          {activeFilters.size === 0 ? (
            <>
              Mostrando <strong>todos los proyectos</strong> ({MOCK_PROJECTS.length})
            </>
          ) : (
            <>
              <strong>{matchedCount}</strong> proyecto{matchedCount !== 1 ? "s" : ""} coincide{matchedCount !== 1 ? "n" : ""} con los filtros
            </>
          )}
        </p>
      </div>

      {/* Galería de proyectos - Mosaico único de 2 filas */}
      <div className="relative -mx-4 px-4">
        {/* Botón izquierdo - solo visible si se puede hacer scroll a la izquierda */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hover:scale-110"
            aria-label="Scroll izquierda"
          >
            <ChevronLeft size={16} className="text-gray-700" />
          </button>
        )}

        {/* Botón derecho - solo visible si se puede hacer scroll a la derecha */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hover:scale-110"
            aria-label="Scroll derecha"
          >
            <ChevronRight size={16} className="text-gray-700" />
          </button>
        )}

        {/* Gradientes laterales (efecto vignette) - solo visibles si hay scroll disponible */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50/50 to-transparent z-10 pointer-events-none" />
        )}

        {/* Contenedor con scroll horizontal */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide py-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Grid de 2 filas con layout horizontal */}
          <LayoutGroup>
            <motion.div
              className="grid grid-flow-col auto-cols-[160px] gap-3"
              style={{
                gridTemplateRows: "repeat(2, 160px)",
              }}
            >
              {sortedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isMatched={project.isMatched}
                />
              ))}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}

export function PortfolioClient({ lang }: PortfolioClientProps) {
  return (
    <FilterProvider>
      <PortfolioContent />
    </FilterProvider>
  );
}
