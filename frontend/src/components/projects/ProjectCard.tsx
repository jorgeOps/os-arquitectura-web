"use client";

import { motion } from "framer-motion";
import { useFilters } from "@/contexts/FilterContext";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  area: string;
  image: string;
  tags: string[]; // IDs de los filtros asociados
}

interface ProjectCardProps {
  project: Project;
  isMatched?: boolean; // Si coincide con los filtros activos
}

export function ProjectCard({ project, isMatched = true }: ProjectCardProps) {
  const { setHighlightedFilters, clearHighlights } = useFilters();

  const handleMouseEnter = () => {
    setHighlightedFilters(project.tags);
  };

  const handleMouseLeave = () => {
    clearHighlights();
  };

  return (
    <motion.div
      layout
      className="group relative cursor-pointer w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isMatched ? 1 : 0.3,
        filter: isMatched ? "blur(0px)" : "blur(1px)",
      }}
      transition={{ duration: 0.5, layout: { duration: 0.6, type: "spring", bounce: 0.15 } }}
    >
      {/* Contenedor de la imagen */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg shadow-md">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
        />

        {/* Overlay con información básica (visible en hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
            <h3 className="text-xs font-bold mb-1 line-clamp-2">{project.title}</h3>
            <div className="flex flex-col gap-0.5 text-[10px]">
              <div className="flex items-center gap-1">
                <MapPin size={10} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={10} />
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
