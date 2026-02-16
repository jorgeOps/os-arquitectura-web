"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Award, ArrowUpRight } from "lucide-react";
import { SanityProject, SanityAward } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/client";
import { Locale } from "@/lib/i18n/config";

interface HomeClientProps {
    lang: Locale;
    projects: SanityProject[];
    awards: SanityAward[];
}

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export function HomeClient({ lang, projects, awards }: HomeClientProps) {
    // Hero Carousel Logic
    const heroProjects = projects.slice(0, 5);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (heroProjects.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroProjects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroProjects.length]); // Dependencies for effect

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    const philosophyRef = useRef<HTMLElement>(null);

    const handleScrollToPhilosophy = () => {
        philosophyRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div ref={containerRef} className="bg-white text-gray-900 selection:bg-black selection:text-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Parallax */}
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <AnimatePresence mode="popLayout">
                        {heroProjects.length > 0 && heroProjects[currentIndex]?.mainImage && (
                            <motion.div
                                key={heroProjects[currentIndex]._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                            >
                                <Image
                                    src={urlFor(heroProjects[currentIndex].mainImage).width(1920).height(1080).url()}
                                    alt={heroProjects[currentIndex].title?.[lang] || "Architecture Hero"}
                                    fill
                                    className="object-cover brightness-[0.6]"
                                    priority={currentIndex === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 text-center px-6 max-w-6xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                >
                    <motion.h1
                        variants={fadeIn}
                        className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tighter mb-8 leading-none"
                    >
                        O.S. <span className="font-bold">Arquitectura</span>
                    </motion.h1>

                    <motion.div variants={fadeIn} className="h-px w-32 bg-white/50 mx-auto mb-8" />

                    <motion.p
                        variants={fadeIn}
                        className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-12"
                    >
                        {lang === 'es'
                            ? 'Espacios que dialogan con el entorno y perduran en el tiempo.'
                            : 'Spaces that dialogue with the environment and endure in time.'}
                    </motion.p>

                    <motion.div variants={fadeIn}>
                        <Link
                            href={`/${lang}/proyectos`}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
                        >
                            <span className="text-lg font-medium tracking-wide">
                                {lang === 'es' ? 'Ver Portfolio' : 'View Portfolio'}
                            </span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Current Project Label */}
                <div className="absolute bottom-12 right-6 md:right-12 z-20 pointer-events-none mix-blend-difference">
                    <AnimatePresence mode="wait">
                        {heroProjects.length > 0 && heroProjects[currentIndex]?.slug?.current && (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link
                                    href={`/${lang}/proyectos/${heroProjects[currentIndex].slug.current}`}
                                    className="flex flex-col items-end text-right pointer-events-auto cursor-pointer group"
                                >
                                    <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.2em] mb-1 group-hover:text-white/90 transition-colors duration-300">
                                        {lang === 'es' ? 'Proyecto' : 'Project'}
                                    </span>
                                    <span className="text-sm md:text-base text-white font-medium tracking-wide group-hover:underline underline-offset-4 decoration-white/50 transition-all duration-300">
                                        {heroProjects[currentIndex]?.title?.[lang] || heroProjects[currentIndex]?.title?.es}
                                    </span>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Scroll Indicator */}
                <motion.button
                    onClick={handleScrollToPhilosophy}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown size={32} />
                </motion.button>
            </section>

            {/* Philosophy / Intro Section */}
            <section ref={philosophyRef} className="py-24 md:py-32 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
                            {lang === 'es' ? 'Filosofía' : 'Philosophy'}
                        </h2>
                        <p className="text-3xl md:text-5xl font-light leading-tight text-gray-900">
                            {lang === 'es'
                                ? '"La arquitectura no es solo construir, es crear emociones y experiencias a través del espacio y la luz."'
                                : '"Architecture is not just building, it is creating emotions and experiences through space and light."'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects - Parallax List */}
            <section className="py-24 md:py-32 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-4">
                                {lang === 'es' ? 'Proyectos Seleccionados' : 'Selected Works'}
                            </h2>
                            <div className="h-1 w-20 bg-gray-900" />
                        </div>
                        <Link
                            href={`/${lang}/proyectos`}
                            className="hidden md:flex items-center gap-2 text-lg font-medium hover:opacity-60 transition-opacity"
                        >
                            {lang === 'es' ? 'Ver todos' : 'View all'} <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="space-y-20 md:space-y-32">
                        {projects.map((project, index) => (
                            <ProjectListItem
                                key={project._id}
                                project={project}
                                lang={lang}
                                index={index}
                            />
                        ))}
                    </div>

                    <div className="mt-20 text-center md:hidden">
                        <Link
                            href={`/${lang}/proyectos`}
                            className="inline-flex items-center gap-2 text-lg font-medium hover:opacity-60 transition-opacity"
                        >
                            {lang === 'es' ? 'Ver todos los proyectos' : 'View all projects'} <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            {awards.length > 0 && (
                <section className="py-24 md:py-32 px-6 bg-black text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-4">
                                {lang === 'es' ? 'Reconocimientos' : 'Recognition'}
                            </h2>
                            <div className="w-16 h-px bg-white/30 mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {awards.map((award, index) => (
                                <motion.div
                                    key={award._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group relative p-8 border border-white/10 hover:border-white/30 transition-colors duration-300"
                                >
                                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <Award size={24} />
                                    </div>
                                    <h3 className="text-xl font-medium mb-3 group-hover:text-yellow-400 transition-colors">
                                        {award.name?.[lang] || award.name?.es}
                                    </h3>
                                    <p className="text-white/60 mb-2">{award.organization}</p>
                                    <p className="text-sm font-mono text-white/40">{award.year}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact CTA */}
            <section className="py-32 px-6 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
                            {lang === 'es' ? 'Creemos algo único' : 'Let\'s create something unique'}
                        </h2>
                        <Link
                            href={`/${lang}/contacto`}
                            className="inline-block px-12 py-5 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                        >
                            {lang === 'es' ? 'Iniciar Conversación' : 'Start Conversation'}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function ProjectListItem({ project, lang, index }: { project: SanityProject; lang: Locale; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Image */}
            <div className="w-full md:w-3/5 relative group cursor-pointer overflow-hidden rounded-sm">
                <Link href={`/${lang}/proyectos/${project.slug?.current}`}>
                    <div className="aspect-[16/10] relative overflow-hidden">
                        {project.mainImage ? (
                            <Image
                                src={urlFor(project.mainImage).width(1200).height(750).url()}
                                alt={project.title?.[lang] || project.title?.es || 'Project'}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                                {lang === 'es' ? 'Ver Proyecto' : 'View Project'} <ArrowUpRight size={16} />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/5 space-y-6">
                <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                    <span>0{index + 1}</span>
                    <span className="w-12 h-px bg-gray-300" />
                    <span>{project.year || '2024'}</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                    <Link href={`/${lang}/proyectos/${project.slug?.current}`} className="hover:text-gray-600 transition-colors">
                        {project.title?.[lang] || project.title?.es}
                    </Link>
                </h3>

                <p className="text-gray-500 text-lg leading-relaxed line-clamp-3">
                    {project.excerpt?.[lang] || project.excerpt?.es}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                    {project.buildingType && (
                        <span className="text-sm border border-gray-200 px-3 py-1 rounded-full text-gray-500 capitalize">
                            {project.buildingType.replace('_', ' ')}
                        </span>
                    )}
                    {project.location?.city && (
                        <span className="text-sm border border-gray-200 px-3 py-1 rounded-full text-gray-500">
                            {project.location.city}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
