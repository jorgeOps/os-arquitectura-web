"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
} as const;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring" as const, stiffness: 100 },
    },
} as const;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactClient() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("loading");

        // Simular envío (reemplazar con lógica real)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Form submitted:", formState);
            setSubmitStatus("success");

            // Reset form después de 3 segundos
            setTimeout(() => {
                setFormState({ name: "", email: "", subject: "", message: "" });
                setSubmitStatus("idle");
            }, 3000);
        } catch (error) {
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* LEFT COLUMN: Info & Context (Sticky on Desktop) */}
            <div className="w-full md:w-5/12 lg:w-4/12 bg-gray-900 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
                        CON<br />TAC<br />TO.
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-sm">
                        Diseñamos espacios que inspiran. Cuéntanos tu visión y construyamos algo extraordinario juntos.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 relative z-10"
                >
                    {/* Contact Details */}
                    <div className="space-y-6">
                        <motion.div variants={itemVariants} className="group flex items-start gap-4">
                            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-lime-300 group-hover:text-gray-900 transition-colors duration-300">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Email</p>
                                <a href="mailto:info@olive-sauret.com" className="text-lg hover:text-lime-300 transition-colors">
                                    info@olive-sauret.com
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group flex items-start gap-4">
                            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-lime-300 group-hover:text-gray-900 transition-colors duration-300">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Teléfono</p>
                                <a href="tel:+34913456789" className="text-lg hover:text-lime-300 transition-colors">
                                    +34 913 456 789
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group flex items-start gap-4">
                            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-lime-300 group-hover:text-gray-900 transition-colors duration-300">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Estudio</p>
                                <p className="text-lg leading-snug">
                                    Madrid, España
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Socials - Descomentar y añadir enlaces reales cuando estén disponibles */}
                    {/* <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800 flex gap-4">
                        <a
                            href="https://instagram.com/olivesauret"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:-translate-y-1"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/company/olivesauret"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </motion.div> */}
                </motion.div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-16 lg:p-24 flex items-center justify-center bg-white">
                <motion.div
                    className="w-full max-w-2xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
                    <p className="text-gray-500 mb-10">Responderemos a la mayor brevedad posible.</p>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Name Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                                disabled={submitStatus === "loading" || submitStatus === "success"}
                                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Nombre"
                            />
                            <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nombre completo *
                            </label>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                disabled={submitStatus === "loading" || submitStatus === "success"}
                                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Correo electrónico"
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Correo electrónico *
                            </label>
                        </div>

                        {/* Subject Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                value={formState.subject}
                                onChange={handleChange}
                                disabled={submitStatus === "loading" || submitStatus === "success"}
                                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Asunto"
                            />
                            <label
                                htmlFor="subject"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Asunto *
                            </label>
                        </div>

                        {/* Message Input */}
                        <div className="relative group">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                required
                                value={formState.message}
                                onChange={handleChange}
                                disabled={submitStatus === "loading" || submitStatus === "success"}
                                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Mensaje"
                            />
                            <label
                                htmlFor="message"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Mensaje *
                            </label>
                        </div>

                        {/* Submit Status Messages */}
                        <AnimatePresence mode="wait">
                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                                >
                                    <CheckCircle2 size={20} className="shrink-0" />
                                    <p className="text-sm font-medium">¡Mensaje enviado! Nos pondremos en contacto pronto.</p>
                                </motion.div>
                            )}

                            {submitStatus === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                                >
                                    <AlertCircle size={20} className="shrink-0" />
                                    <p className="text-sm font-medium">Error al enviar. Por favor, inténtalo de nuevo.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={submitStatus === "loading" || submitStatus === "success"}
                                className="group relative inline-flex items-center justify-start overflow-hidden rounded-full px-8 py-4 bg-gray-900 font-bold text-white transition-all duration-300 hover:bg-gray-800 hover:pr-12 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:pr-8"
                            >
                                {submitStatus === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-lg">Enviando...</span>
                                    </span>
                                ) : submitStatus === "success" ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 size={20} />
                                        <span className="text-lg">Enviado</span>
                                    </span>
                                ) : (
                                    <>
                                        <span className="mr-2 text-lg">Enviar mensaje</span>
                                        <span className="absolute right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px]">
                                            <ArrowRight size={20} />
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
