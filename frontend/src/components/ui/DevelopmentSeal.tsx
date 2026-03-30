"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function DevelopmentSeal() {
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-12 sm:right-12 z-[100] pointer-events-none select-none">
      <motion.div
        initial={{ scale: 2.5, opacity: 0, rotate: -35 }}
        animate={{ scale: 1, opacity: 1, rotate: -15 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
          delay: 0.6
        }}
        className="relative flex items-center justify-center p-1"
      >
        {/* Exterior border of the stamp */}
        <div className="border-[4px] sm:border-[5px] border-red-600 rounded-lg p-1 bg-white/40 backdrop-blur-[2px] shadow-[0_8px_16px_rgba(220,38,38,0.2)]">
          {/* Inner border */}
          <div className="border-[2px] sm:border-[3px] border-red-600 rounded px-5 py-2 sm:px-6 sm:py-3 flex flex-col justify-center items-center text-center mix-blend-multiply relative overflow-hidden">
            
            <span className="text-red-700 font-bold text-[10px] sm:text-xs tracking-[0.4em] uppercase leading-none mb-1.5 ml-[0.4em]">
              Página Web
            </span>
            
            <div className="w-[130%] h-[2px] sm:h-[3px] bg-red-600/80 my-1 rounded-full" />
            
            <span className="text-red-700 font-black text-xl sm:text-3xl tracking-[0.15em] leading-tight ml-[0.15em]">
              EN DESARROLLO
            </span>
            
            {/* Vintage texture overlay representing missing ink */}
            <div 
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.95)_1px,transparent_1px)] bg-[length:6px_6px] opacity-25"
            />
            <div 
              className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:14px_14px] opacity-15"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
