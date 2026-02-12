"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "./ProjectCard";
import { X, MapPin, Calendar, Ruler, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PortableText } from "next-sanity"; // You might need to install this or use a custom renderer

// Simple custom component for portable text if package not available,
// but assuming standard portable text usage.
const PortableTextRenderer = ({ value }: { value: any }) => {
    if (!value) return null;
    return (
        <div className="prose prose-sm max-w-none text-gray-500">
            {/* Minimal implementation, ideally use @portabletext/react */}
            {Array.isArray(value) && value.map((block: any, i: number) => {
                if (block._type !== 'block' || !block.children) return null;
                return (
                    <p key={block._key} className="mb-4">
                        {block.children.map((child: any) => child.text).join('')}
                    </p>
                )
            })}
        </div>
    )
}

// Lightbox/Carrusel para imágenes de galería
interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Navegación con teclado
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goToPrevious(e as any);
            if (e.key === "ArrowRight") goToNext(e as any);
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            {/* Botón cerrar */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
                <X size={24} className="text-white" />
            </button>

            {/* Contador de imágenes */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Botón anterior */}
            {images.length > 1 && (
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110"
                    aria-label="Imagen anterior"
                >
                    <ChevronLeft size={24} className="text-white" />
                </button>
            )}

            {/* Imagen actual */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Imagen ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Botón siguiente */}
            {images.length > 1 && (
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110"
                    aria-label="Imagen siguiente"
                >
                    <ChevronRight size={24} className="text-white" />
                </button>
            )}

            {/* Miniaturas navegación (opcional, solo si hay varias imágenes) */}
            {images.length > 1 && images.length <= 10 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentIndex
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Ir a imagen ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Incluir la imagen principal + galería para el lightbox
    const allImages = [project.image, ...(project.gallery || [])];

    return (
        <>
            {/* Lightbox para imágenes */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <ImageLightbox
                        images={allImages}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
                />

                {/* Card Expanded */}
                <motion.div
                    layoutId={`project-card-${project.id}`}
                    className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1">
                        {/* Hero Image - REDUCIDO Y CLICKABLE */}
                        <div
                            className="relative h-[30vh] w-full cursor-zoom-in group"
                            onClick={() => setLightboxIndex(0)}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                                <motion.h2
                                    layoutId={`project-title-${project.id}`}
                                    className="text-3xl md:text-4xl font-bold mb-2"
                                >
                                    {project.title}
                                </motion.h2>
                                <div className="flex flex-wrap gap-4 text-sm font-medium opacity-90">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={18} /> {project.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={18} /> {project.year}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Ruler size={18} /> {project.area}
                                    </span>
                                </div>
                            </div>
                            {/* Indicador de zoom */}
                            <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Click para ampliar
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 p-4 md:p-8">
                            {/* Main Content */}
                            <div className="space-y-8">
                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Sobre el proyecto</h3>
                                    {project.description ? (
                                        <PortableTextRenderer value={project.description} />
                                    ) : (
                                        <p className="text-gray-500 italic">Sin descripción detallada.</p>
                                    )}
                                </div>

                                {/* Gallery - RESPONSIVE Y CLICKABLE */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Galería</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {project.gallery.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in group"
                                                    onClick={() => setLightboxIndex(idx + 1)} // +1 porque la principal es el índice 0
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`Galería ${idx + 1}`}
                                                        fill
                                                        className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                                                    />
                                                    {/* Overlay sutil en hover */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Details */}
                            <div className="space-y-8 h-fit md:sticky md:top-8">
                                {/* Client */}
                                {project.client && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Cliente</h4>
                                        <p className="text-gray-900 font-medium">{project.client}</p>
                                    </div>
                                )}

                                {/* Collaborators */}
                                {project.collaborators && project.collaborators.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Colaboradores</h4>
                                        <ul className="space-y-2">
                                            {project.collaborators.map((collab, idx) => (
                                                <li key={idx} className="text-sm">
                                                    <span className="font-semibold text-gray-900">{collab.name}</span>
                                                    <span className="text-gray-500 block text-xs">{collab.role}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Awards */}
                                {project.awards && project.awards.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Premios</h4>
                                        <ul className="space-y-3">
                                            {project.awards.map((award, idx) => (
                                                <li key={idx} className="flex gap-2 text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                    <Award size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-semibold block">{award.name}</span>
                                                        <span className="text-xs text-gray-500">{award.organization}, {award.year}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
