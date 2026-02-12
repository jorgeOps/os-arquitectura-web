"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { Locale } from "@/lib/i18n/config";

// Lightbox para ampliar imágenes
interface ImageLightboxProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

function ImageLightbox({ imageUrl, alt, onClose }: ImageLightboxProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Navegación con teclado
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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

      {/* Imagen ampliada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

interface PortableTextContentProps {
  content: any; // LocalizedBlockContent
  lang: Locale;
}

export function PortableTextContent({ content, lang }: PortableTextContentProps) {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

  // El contenido es un objeto { es: [...], en: [...] }
  const localizedContent = content?.[lang] || content?.es || [];

  if (!localizedContent || localizedContent.length === 0) {
    return (
      <div className="text-gray-500 italic">
        {lang === 'es' ? 'No hay contenido disponible' : 'No content available'}
      </div>
    );
  }

  // Componentes personalizados para renderizar el contenido
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        const imageUrl = urlFor(value).width(1200).url();
        const fullImageUrl = urlFor(value).width(2400).url();
        const alt = value.alt || "Imagen";

        return (
          <figure className="my-8">
            <div
              className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in group"
              onClick={() => setLightboxImage({ url: fullImageUrl, alt })}
            >
              <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
              {/* Indicador de zoom */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
                {typeof value.caption === 'object'
                  ? (value.caption.es || value.caption.en || '')
                  : value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-12">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-10">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-gray-300 pl-6 py-2 my-6 italic text-gray-700">
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => (
        <p className="text-base text-gray-700 leading-relaxed mb-4">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
      number: ({ children }: any) => <li className="ml-4">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-gray-900">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }: any) => {
        const target = value?.blank ? "_blank" : undefined;
        const rel = value?.blank ? "noopener noreferrer" : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={rel}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <>
      {/* Lightbox para imágenes */}
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            imageUrl={lightboxImage.url}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      <div className="prose prose-lg max-w-none">
        <PortableText value={localizedContent} components={portableTextComponents} />
      </div>
    </>
  );
}
