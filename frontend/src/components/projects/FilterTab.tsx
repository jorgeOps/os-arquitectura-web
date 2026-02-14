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
      text: "text-gray-900 font-bold",
      zIndex: "z-30",
      shadowColor: "bg-stone-400",
    }
    : isHighlighted
      ? {
        bg: "bg-gray-200",
        border: "border-gray-800",
        text: "text-gray-900 font-medium",
        zIndex: "z-20",
        shadowColor: "bg-gray-400",
      }
      : {
        bg: "bg-white",
        border: "border-gray-400",
        text: "text-gray-500 hover:text-gray-800",
        zIndex: "z-10",
        shadowColor: "bg-gray-300",
      };

  return (
    <motion.button
      onClick={onClick}
      // ML-8: AÑADIDO MARGEN IZQUIERDO para que la "pata" inclinada no choque con el vecino
      className={`relative group h-9 ml-8 shrink-0 ${stateStyles.zIndex} ${isActive ? "hover:drop-shadow-[0_1px_0_rgba(156,163,175,0.6)]" : ""}`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.1 }}
    >
      {/* 1. SOMBRA LATERAL (Recta a la derecha) */}
      <div
        className={`
          absolute -right-[5px] top-2 bottom-0 w-[5px]
          ${stateStyles.shadowColor}
          transition-colors duration-200
        `}
      />

      {/* 2. CUERPO PRINCIPAL (Rectángulo derecho) */}
      <div className={`
        relative h-full px-2
        transform origin-bottom scale-y-90
        border-t border-r
        ${!isActive ? "border-b" : "border-b-0"}
        ${stateStyles.bg} ${stateStyles.border}
        ${!isActive ? "border-b-gray-400" : ""}
        transition-colors duration-200
      `}
      >
        {/* 3. OÍDO IZQUIERDO (La pieza inclinada) 
           SOLUCIÓN GEOMÉTRICA:
           - absolute right-[100%]: Se pega exactamente al borde izquierdo del cuerpo.
           - origin-bottom-right: La transformación nace de la esquina inferior derecha,
             asegurando que conecte perfectamente abajo.
        */}
        {/* OÍDO IZQUIERDO */}
        <div
          className={`
          absolute right-[100%] top-[-1px] bottom-[-1px] w-8
          origin-bottom-right -skew-x-[40deg]
          border-l border-t border-b border-b-gray-400
          ${stateStyles.bg} ${stateStyles.border}
          transition-colors duration-200
          z-0 pointer-events-none
        `}
        />

        {/* TEXTO */}
        <span
          className={`
          relative z-10
          block text-xs capitalize tracking-wide
          pt-4 pb-1 whitespace-nowrap
          ${stateStyles.text}
          transform origin-bottom scale-y-110
        `}
        >
          {label}
        </span>

      </div>
    </motion.button>
  );
}