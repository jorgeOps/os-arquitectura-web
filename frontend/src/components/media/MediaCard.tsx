"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Building2, FileText, ExternalLink, Download, Eye, Tv, Radio, Newspaper, Globe, ImageIcon } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { Locale } from "@/lib/i18n/config";
import { SanityMediaCoverage } from "@/lib/sanity/types";

interface MediaCardProps {
  media: SanityMediaCoverage;
  lang: Locale;
}

export function MediaCard({ media, lang }: MediaCardProps) {
  const title = media.title?.[lang] || media.title?.es || "Sin título";
  const slug = media.slug?.current;

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

  // Formato de rango de fechas
  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      if (startYear === endYear) {
        return `${startYear}`;
      }
      return `${startYear} - ${endYear}`;
    }

    if (startDate) {
      return new Date(startDate).getFullYear().toString();
    }

    if (endDate) {
      return new Date(endDate).getFullYear().toString();
    }

    return null;
  };

  // Icono según tipo de cobertura
  const getCoverageIcon = (type: string) => {
    switch (type) {
      case 'tv':
        return <Tv size={14} className="text-purple-600" />;
      case 'radio':
        return <Radio size={14} className="text-blue-600" />;
      case 'press':
        return <Newspaper size={14} className="text-gray-700" />;
      case 'online':
        return <Globe size={14} className="text-green-600" />;
      default:
        return null;
    }
  };

  // Traducción de tipos de cobertura
  const getCoverageLabel = (type: string) => {
    const labels: Record<string, { es: string; en: string }> = {
      tv: { es: 'TV', en: 'TV' },
      radio: { es: 'Radio', en: 'Radio' },
      press: { es: 'Prensa', en: 'Press' },
      online: { es: 'Online', en: 'Online' },
    };
    return labels[type]?.[lang] || type;
  };

  // Obtener el primer PDF si existe
  const firstPDF = media.documents && media.documents.length > 0 ? media.documents[0] : null;
  const pdfUrl = firstPDF?.asset?.url;

  return (
    <Link
      href={`/${lang}/media/${slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Imagen de portada o Preview de PDF */}
      {pdfUrl ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          {/* Preview del PDF */}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            title={`Preview of ${title}`}
          />
          {/* Overlay sutil para mejorar hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Badge de PDF */}
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <FileText size={14} />
            PDF
          </div>

          {media.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </div>
          )}
        </div>
      ) : media.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={urlFor(media.coverImage).width(600).height(400).url()}
            alt={media.coverImage.alt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {media.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <FileText size={48} className="text-gray-400" />
          {media.featured && (
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

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {/* Rango de fechas */}
          {formatDateRange(media.startDate, media.endDate) && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>{formatDateRange(media.startDate, media.endDate)}</span>
            </div>
          )}

          {/* Medios de comunicación */}
          {media.mediaOutlets && media.mediaOutlets.length > 0 && (
            <div className="flex items-start gap-2">
              <Building2 size={16} className="text-gray-400 mt-0.5" />
              <span className="line-clamp-2">{media.mediaOutlets.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Tipos de cobertura */}
        {media.coverageType && media.coverageType.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {media.coverageType.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                {getCoverageIcon(type)}
                {getCoverageLabel(type)}
              </span>
            ))}
          </div>
        )}

        {/* Indicadores de recursos */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          {/* Documentos/PDFs */}
          {media.documents && media.documents.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-blue-600">
              <FileText size={16} />
              <span>{media.documents.length} {lang === 'es' ? 'PDF' : 'PDF'}{media.documents.length > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Videos */}
          {media.videos && media.videos.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-red-600">
              <Tv size={16} />
              <span>{media.videos.length} {lang === 'es' ? 'Video' : 'Video'}{media.videos.length > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Enlaces externos */}
          {media.externalLinks && media.externalLinks.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <ExternalLink size={16} />
              <span>{lang === 'es' ? 'Enlaces' : 'Links'}</span>
            </div>
          )}

          {/* Galería */}
          {media.gallery && media.gallery.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-purple-600">
              <ImageIcon size={16} />
              <span>{media.gallery.length} {lang === 'es' ? 'Fotos' : 'Photos'}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
