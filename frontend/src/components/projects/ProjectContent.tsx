"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "./ProjectCard";
import { X, MapPin, Calendar, Ruler, Award, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import Image from "next/image";

// Mapa completo de traducciones para todos los filtros/tags y building types
const TAG_TRANSLATIONS: Record<string, string> = {
    // Building Types
    'office': 'Terciario oficinas',
    'commercial': 'Terciario comercial',
    'institutional': 'Terciario dotacional',
    'residential_collective': 'Residencial colectivo',
    'residential_single': 'Residencial unifamiliar',
    'industrial': 'Industrial',
    'building_other': 'Otro',
    // Work Types
    'new_build': 'Obra nueva',
    'renovation': 'Rehabilitación',
    'work_other': 'Otro',
    // Service Scope
    'full_mission': 'Misión completa',
    'previous_projects': 'Proyectos Previos',
    'pm': 'Project Management',
    'consulting': 'Consultoría',
    'service_other': 'Otro',
    // Status
    'study': 'En estudio',
    'ongoing': 'En curso',
    'finished': 'Finalizado',
    'status_other': 'Otro',
    // Location
    'madrid': 'Madrid',
    'barcelona': 'Barcelona',
    'location_other': 'Otro',
};

// Simple custom component for portable text
const PortableTextRenderer = ({ value }: { value: any }) => {
    if (!value) return null;
    return (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
            {Array.isArray(value) && value.map((block: any) => {
                if (block._type !== 'block' || !block.children) return null;
                return (
                    <p key={block._key}>
                        {block.children.map((child: any) => child.text).join('')}
                    </p>
                )
            })}
        </div>
    )
}

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

    useEffect(() => {
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
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors text-white backdrop-blur-sm"
            >
                <X size={24} />
            </button>

            <div className="absolute top-6 left-6 text-white/50 font-mono text-sm">
                {currentIndex + 1} / {images.length}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors hover:scale-110"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors hover:scale-110"
                    >
                        <ChevronRight size={40} />
                    </button>
                </>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none"
                >
                    <div className="relative w-full h-full pointer-events-auto">
                        <Image
                            src={images[currentIndex]}
                            alt={`Gallery image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

interface ProjectContentProps {
    project: Project;
    onClose?: () => void;
    className?: string; // Additional classes for the container
}

export function ProjectContent({ project, onClose, className = "" }: ProjectContentProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const allImages = [project.image, ...(project.gallery || [])];

    const hasDetails = Boolean(
        project.client ||
        (project.collaborators && project.collaborators.length > 0) ||
        (project.awards && project.awards.length > 0)
    );

    const hasMetadata = Boolean(
        project.location || project.year || project.area || project.buildingType
    );

    return (
        <>
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <ImageLightbox
                        images={allImages}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>

            <div className={`flex flex-col bg-white overflow-hidden ${className}`}>
                {/* Main Scrollable Content */}
                <div className="flex-1 overflow-y-auto min-h-0 bg-white">
                    {/* Header with Back Button */}
                    {onClose && (
                        <div className="flex justify-end px-4 sm:px-6 py-4 bg-white sticky top-0 z-20 border-b border-gray-100/50 backdrop-blur-sm bg-white/90">
                            <button
                                onClick={onClose}
                                className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-2 group"
                            >
                                <span>Volver a Proyectos</span>
                            </button>
                        </div>
                    )}

                    {/* Hero Section */}
                    <div
                        className="relative w-full h-[50vh] md:h-[65vh] cursor-zoom-in group"
                        onClick={() => setLightboxIndex(0)}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                        {/* Scroll hint on Image */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce md:hidden">
                            <span className="text-xs uppercase tracking-widest">Scroll</span>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-20">
                        {/* Title & Metadata Header */}
                        <div className={`${hasMetadata ? 'border-b border-gray-100 pb-6 mb-8' : 'mb-8'}`}>
                            {/* Breadcrumb de filtros/tags */}
                            {project.tags && project.tags.length > 0 && (
                                <div className="mb-2 text-xs sm:text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                                    {project.tags.map((tag, index) => (
                                        <React.Fragment key={tag}>
                                            <span>{TAG_TRANSLATIONS[tag] || tag}</span>
                                            {index < project.tags.length - 1 && <span className="text-gray-400">›</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight leading-tight break-words"
                            >
                                {project.title}
                            </motion.h2>

                            {hasMetadata && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                    {project.location && (
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Ubicación</span>
                                            <div className="text-sm sm:text-base md:text-lg text-gray-900 break-words">
                                                {project.location}
                                            </div>
                                        </div>
                                    )}
                                    {project.year && (
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Año</span>
                                            <div className="text-sm sm:text-base md:text-lg text-gray-900">
                                                {project.year}
                                            </div>
                                        </div>
                                    )}
                                    {project.area && (
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Área</span>
                                            <div className="text-sm sm:text-base md:text-lg text-gray-900">
                                                {project.area}
                                            </div>
                                        </div>
                                    )}
                                    {project.buildingType && (
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Tipología</span>
                                            <div className="text-sm sm:text-base md:text-lg text-gray-900 break-words">
                                                {TAG_TRANSLATIONS[project.buildingType] || project.buildingType.replace(/_/g, ' ')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={`grid grid-cols-1 ${hasDetails ? 'lg:grid-cols-[1fr_320px] gap-12 lg:gap-16' : ''}`}>
                            {/* Left Column: Context & Gallery */}
                            <div className="space-y-12">
                                {/* Description */}
                                {project.description && (
                                    <section>
                                        <div className="border-b border-gray-200 pb-2 mb-4">
                                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Memoria</h4>
                                        </div>
                                        <PortableTextRenderer value={project.description} />
                                    </section>
                                )}

                                {/* Gallery Grid */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <section>
                                        <div className="border-b border-gray-200 pb-2 mb-4">
                                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Galería</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {project.gallery.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`relative rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in group ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
                                                        }`}
                                                    onClick={() => setLightboxIndex(idx + 1)}
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`Galería ${idx + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column: Sidebar Details */}
                            {hasDetails && (
                                <aside className="space-y-8">
                                    <div className="p-6 bg-gray-50 rounded-2xl space-y-6 sticky top-8">
                                        <div className="border-b border-gray-200 pb-2">
                                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Detalles del Proyecto</h4>
                                        </div>

                                        {project.client && (
                                            <div>
                                                <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Cliente</h5>
                                                <p className="text-gray-900 text-sm">{project.client}</p>
                                            </div>
                                        )}

                                        {project.collaborators && project.collaborators.length > 0 && (
                                            <div>
                                                <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Colaboradores</h5>
                                                <ul className="space-y-2">
                                                    {project.collaborators.map((collab, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600">
                                                            <span className="font-medium text-gray-900">{collab.name}</span>
                                                            <span className="block text-xs opacity-70">{collab.role}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {project.awards && project.awards.length > 0 && (
                                            <div>
                                                <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Premios</h5>
                                                <ul className="space-y-3">
                                                    {project.awards.map((award, idx) => (
                                                        <li key={idx} className="flex gap-3 items-start text-sm">
                                                            <Award size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                                                            <div>
                                                                <span className="font-medium text-gray-900 block">{award.name}</span>
                                                                <span className="text-xs text-gray-500">{award.organization}, {award.year}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>

                    {/* Footer / Navigation Hint could go here */}
                    <div className="h-20" />
                </div>
            </div>
        </>
    );
}
