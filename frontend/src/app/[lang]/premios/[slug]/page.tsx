import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { client, urlFor } from "@/lib/sanity/client";
import { AWARD_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { SanityAward } from "@/lib/sanity/types";
import { PortableTextContent } from "@/components/publications/PortableTextContent";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Building2, Trophy, ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function AwardDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);

  // Fetch award from Sanity
  const award = await client.fetch<SanityAward>(
    AWARD_BY_SLUG_QUERY,
    { slug }
  );

  // If award not found, show 404
  if (!award) {
    notFound();
  }

  const name = award.name?.[lang] || award.name?.es || "Sin nombre";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen de portada */}
      <div className="relative w-full h-[40vh] bg-gradient-to-br from-yellow-900 to-yellow-700">
        {award.coverImage ? (
          <>
            <Image
              src={urlFor(award.coverImage).width(1920).height(600).url()}
              alt={award.coverImage.alt || name}
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : null}

        <Container className="relative h-full flex flex-col justify-end pb-12">
          {/* Botón volver */}
          <Link
            href={`/${lang}/premios`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            {lang === 'es' ? 'Volver a premios' : 'Back to awards'}
          </Link>

          {/* Título y metadata */}
          <div>
            {award.featured && (
              <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {lang === 'es' ? 'Destacado' : 'Featured'}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{award.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                <span>{award.organization}</span>
              </div>
              {award.category && (
                <div className="flex items-center gap-2">
                  <Trophy size={16} />
                  <span>{award.category}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Contenido principal */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Contenido del premio */}
          <div className="space-y-8">
            {/* Descripción */}
            <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
              <PortableTextContent content={award.description} lang={lang} />
            </div>

            {/* Video si existe */}
            {award.video?.asset?.url && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-sm font-semi-bold text-gray-900 capitalize tracking-wider mb-4">
                  {lang === 'es' ? 'Video Adjunto' : 'Award Video'}
                </h3>
                <video
                  controls
                  className="w-full rounded-lg"
                  src={award.video.asset.url}
                >
                  {lang === 'es' ? 'Tu navegador no soporta el elemento de video.' : 'Your browser does not support the video element.'}
                </video>
              </div>
            )}

            {/* Galería de la ceremonia */}
            {award.ceremonyGallery && award.ceremonyGallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Galería de la Ceremonia' : 'Ceremony Gallery'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {award.ceremonyGallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={urlFor(img).width(600).height(600).url()}
                        alt={img.alt || `Ceremonia ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar con info adicional */}
          <div className="space-y-6">
            {/* Proyecto relacionado */}
            {award.relatedProject && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Proyecto Ganador' : 'Winning Project'}
                </h3>
                <Link
                  href={`/${lang}/proyectos/${award.relatedProject.slug?.current || ''}`}
                  className="group block"
                >
                  {award.relatedProject.mainImage && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-gray-100">
                      <Image
                        src={urlFor(award.relatedProject.mainImage).width(400).height(300).url()}
                        alt={award.relatedProject.title?.[lang] || award.relatedProject.title?.es || "Proyecto"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {award.relatedProject.title?.[lang] || award.relatedProject.title?.es || "Ver proyecto"}
                  </p>
                </Link>
              </div>
            )}

            {/* Recursos */}
            {(award.certificate || award.externalLink) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Recursos' : 'Resources'}
                </h3>
                <div className="space-y-3">
                  {award.certificate && (
                    <a
                      href={award.certificate.asset?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                    >
                      <div className="p-2 bg-blue-500 text-white rounded-lg">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {lang === 'es' ? 'Ver Certificado' : 'View Certificate'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lang === 'es' ? 'Documento PDF' : 'PDF Document'}
                        </div>
                      </div>
                      <Download size={16} className="text-gray-400 group-hover:text-blue-600" />
                    </a>
                  )}
                  {award.externalLink && (
                    <a
                      href={award.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                    >
                      <div className="p-2 bg-green-500 text-white rounded-lg">
                        <ExternalLink size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {lang === 'es' ? 'Ver Página Oficial' : 'View Official Page'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lang === 'es' ? 'Enlace externo' : 'External link'}
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-green-600" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {award.tags && award.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {lang === 'es' ? 'Etiquetas' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag, index) => (
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
          </div>
        </div>
      </Container>
    </div>
  );
}
