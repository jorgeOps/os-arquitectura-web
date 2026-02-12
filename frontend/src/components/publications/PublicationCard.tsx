"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Building2, FileText, ExternalLink } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { Locale } from "@/lib/i18n/config";

export interface Publication {
  _id: string;
  title: {
    es?: string;
    en?: string;
  };
  slug: { current: string } | null;
  coverImage?: any;
  publishDate?: string;
  publisher?: string;
  authors?: string[];
  pdfFile?: any;
  externalLink?: string;
  tags?: string[];
  featured?: boolean;
}

interface PublicationCardProps {
  publication: Publication;
  lang: Locale;
}

export function PublicationCard({ publication, lang }: PublicationCardProps) {
  const title = publication.title?.[lang] || publication.title?.es || "Sin título";
  const slug = publication.slug?.current;

  // Formato de fecha
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link
      href={`/${lang}/publicaciones/${slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Imagen de portada */}
      {publication.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={urlFor(publication.coverImage).width(600).height(400).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {publication.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <FileText size={48} className="text-gray-400" />
          {publication.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </div>
          )}
        </div>
      )}

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          {/* Fecha de publicación */}
          {publication.publishDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>{formatDate(publication.publishDate)}</span>
            </div>
          )}

          {/* Editorial */}
          {publication.publisher && (
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-gray-400" />
              <span>{publication.publisher}</span>
            </div>
          )}

          {/* Autores */}
          {publication.authors && publication.authors.length > 0 && (
            <div className="text-xs text-gray-500">
              {lang === 'es' ? 'Por' : 'By'} {publication.authors.join(', ')}
            </div>
          )}
        </div>

        {/* Tags */}
        {publication.tags && publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {publication.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {publication.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-500 text-xs">
                +{publication.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Enlaces adicionales (PDF o enlace externo) */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          {publication.pdfFile && (
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <FileText size={14} />
              <span>PDF</span>
            </div>
          )}
          {publication.externalLink && (
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <ExternalLink size={14} />
              <span>{lang === 'es' ? 'Ver online' : 'View online'}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
