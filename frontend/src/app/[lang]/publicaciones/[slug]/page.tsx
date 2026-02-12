import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { client, urlFor } from "@/lib/sanity/client";
import { PUBLICATION_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { SanityPublication } from "@/lib/sanity/types";
import { PortableTextContent } from "@/components/publications/PortableTextContent";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Building2, User, FileText, ExternalLink, ArrowLeft, Download } from "lucide-react";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);

  // Fetch publication from Sanity
  const publication = await client.fetch<SanityPublication>(
    PUBLICATION_BY_SLUG_QUERY,
    { slug }
  );

  // If publication not found, show 404
  if (!publication) {
    notFound();
  }

  const title = publication.title?.[lang] || publication.title?.es || "Sin título";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen de portada */}
      <div className="relative w-full h-[40vh] bg-gradient-to-br from-gray-900 to-gray-700">
        {publication.coverImage ? (
          <>
            <Image
              src={urlFor(publication.coverImage).width(1920).height(600).url()}
              alt={title}
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : null}

        <Container className="relative h-full flex flex-col justify-end pb-12">
          {/* Botón volver */}
          <Link
            href={`/${lang}/publicaciones`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            {lang === 'es' ? 'Volver a publicaciones' : 'Back to publications'}
          </Link>

          {/* Título y metadata */}
          <div>
            {publication.featured && (
              <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {lang === 'es' ? 'Destacado' : 'Featured'}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-white/90">
              {publication.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(publication.publishDate)}</span>
                </div>
              )}
              {publication.publisher && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  <span>{publication.publisher}</span>
                </div>
              )}
              {publication.authors && publication.authors.length > 0 && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{publication.authors.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Contenido principal */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Contenido de la publicación */}
          <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
            <PortableTextContent content={publication.content} lang={lang} />
          </div>

          {/* Sidebar con info adicional */}
          <div className="space-y-6">
            {/* Archivos y enlaces */}
            {(publication.pdfFile || publication.externalLink) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Recursos' : 'Resources'}
                </h3>
                <div className="space-y-3">
                  {publication.pdfFile && (
                    <a
                      href={publication.pdfFile.asset?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                    >
                      <div className="p-2 bg-blue-500 text-white rounded-lg">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lang === 'es' ? 'Documento completo' : 'Full document'}
                        </div>
                      </div>
                      <Download size={16} className="text-gray-400 group-hover:text-blue-600" />
                    </a>
                  )}
                  {publication.externalLink && (
                    <a
                      href={publication.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                    >
                      <div className="p-2 bg-green-500 text-white rounded-lg">
                        <ExternalLink size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {lang === 'es' ? 'Ver en línea' : 'View online'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lang === 'es' ? 'Abrir enlace externo' : 'Open external link'}
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-green-600" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {publication.tags && publication.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Etiquetas' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {publication.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
              <div className="space-y-2">
                {publication.publishDate && (
                  <div>
                    <span className="font-medium text-gray-900">
                      {lang === 'es' ? 'Fecha de publicación:' : 'Publication date:'}
                    </span>
                    <br />
                    {formatDate(publication.publishDate)}
                  </div>
                )}
                {publication.publisher && (
                  <div>
                    <span className="font-medium text-gray-900">
                      {lang === 'es' ? 'Editorial/Medio:' : 'Publisher/Media:'}
                    </span>
                    <br />
                    {publication.publisher}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
