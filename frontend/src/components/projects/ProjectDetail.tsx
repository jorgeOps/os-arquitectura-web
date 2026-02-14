"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "./ProjectCard";
import { ProjectContent } from "./ProjectContent";

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-8 pointer-events-none">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
            />

            {/* Card Expanded - Full screen on mobile, modal on desktop */}
            <motion.div
                layoutId={`project-card-${project.id}`}
                className="relative w-full max-w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
                <ProjectContent project={project} onClose={onClose} className="flex-1 min-h-0" />
            </motion.div>
        </div>
    );
}
