"use client";

import React from "react";

import { motion } from "framer-motion";
import { useFilters } from "@/contexts/FilterContext";

interface FilterTabProps {
  id: string;
  label: string;
  onClick: () => void;
}

export function FilterTab({ id, label, onClick }: FilterTabProps) {
  const { activeFilters, highlightedFilters } = useFilters();
  const isActive = activeFilters.has(id);
  const isHighlighted = highlightedFilters.has(id);

  // Definición de estilos por estado
  const stateStyles = isActive
    ? {
      bg: "bg-stone-300",
      border: "border-stone-500",
      text: "text-gray-900",
      zIndex: "z-30",
    }
    : isHighlighted
      ? {
        bg: "bg-gray-200",
        border: "border-gray-800",
        text: "text-gray-900 font-medium",
        zIndex: "z-20",
      }
      : {
        bg: "bg-white",
        border: "border-gray-400",
        text: "text-gray-500 hover:text-gray-800",
        zIndex: "z-10",
      };

  return (
    <motion.button
      onClick={onClick}
      className={`relative group h-8 sm:h-9 shrink-0 origin-bottom ${stateStyles.zIndex}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      {/* Cuerpo principal del filtro */}
      <div
        className={`
          relative h-full px-2 sm:px-3
          border-x border-t ${stateStyles.border}
          ${stateStyles.bg}
          transition-all duration-200
          group-hover:brightness-95
          shadow-[7px_4px_0px_-4px_rgba(0,0,0,0.1)]
        `}
      >
        {/* Texto */}
        <span
          className={`
            relative z-10
            flex items-center h-full
            text-[10px] sm:text-xs capitalize tracking-wide
            whitespace-nowrap
            ${stateStyles.text}
          `}
        >
          {label}
        </span>
      </div>
    </motion.button>
  );
}