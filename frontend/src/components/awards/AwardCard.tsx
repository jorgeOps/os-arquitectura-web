"use client";

import Link from "next/link";
import Image from "next/image";
import { SanityAward } from "@/lib/sanity/types";
import { Locale } from "@/lib/i18n/config";
import { urlFor } from "@/lib/sanity/client";
import { Trophy, Building2, Calendar, ExternalLink, FileText, Video } from "lucide-react";

interface AwardCardProps {
  award: SanityAward;
  lang: Locale;
}

export function AwardCard({ award, lang }: AwardCardProps) {
  const name = award.name?.[lang] || award.name?.es || "Sin nombre";

  return (
    <Link href={`/${lang}/premios/${award.slug?.current || ""}`}>
      <article className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Imagen */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          {award.coverImage ? (
            <Image
              src={urlFor(award.coverImage).width(800).height(600).url()}
              alt={award.coverImage.alt || name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-50">
              <Trophy size={48} className="text-yellow-600" />
            </div>
          )}

          {/* Badge de destacado */}
          {award.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 flex flex-col flex-1">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Metadata principal */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-medium">{award.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-gray-400" />
              <span className="truncate">{award.organization}</span>
            </div>
          </div>

          {/* Categoría si existe */}
          {award.category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                <Trophy size={14} />
                {award.category}
              </span>
            </div>
          )}

          {/* Spacer flex para empujar los iconos al final */}
          <div className="flex-1" />

          {/* Indicadores de recursos */}
          {(award.video || award.certificate || award.externalLink) && (
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              {award.video && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Video size={16} className="text-red-500" />
                  <span>{lang === 'es' ? 'Video' : 'Video'}</span>
                </div>
              )}
              {award.certificate && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FileText size={16} className="text-blue-500" />
                  <span>{lang === 'es' ? 'Certificado' : 'Certificate'}</span>
                </div>
              )}
              {award.externalLink && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ExternalLink size={16} className="text-green-500" />
                  <span>{lang === 'es' ? 'Enlace' : 'Link'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
