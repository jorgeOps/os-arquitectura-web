import { notFound } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { client, urlFor } from "@/lib/sanity/client";
import { MEDIA_COVERAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { SanityMediaCoverage } from "@/lib/sanity/types";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Building2,
  ExternalLink,
  Download,
  Eye,
  Tv,
  Radio,
  Newspaper,
  Globe,
  FileText,
  ArrowLeft
} from "lucide-react";
import { PortableTextContent } from "@/components/publications/PortableTextContent";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface MediaDetailPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };

  // Fetch media coverage from Sanity
  const media = await client.fetch<SanityMediaCoverage>(
    MEDIA_COVERAGE_BY_SLUG_QUERY,
    { slug }
  );

  if (!media) {
    notFound();
  }

  const title = media.title?.[lang] || media.title?.es || "Sin título";
  const description = media.description?.[lang] || media.description?.es;

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
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (startDate) {
      return formatDate(startDate);
    }

    if (endDate) {
      return formatDate(endDate);
    }

    return null;
  };

  // Icono según tipo de cobertura
  const getCoverageIcon = (type: string) => {
    switch (type) {
      case 'tv':
        return <Tv size={18} className="text-purple-600" />;
      case 'radio':
        return <Radio size={18} className="text-blue-600" />;
      case 'press':
        return <Newspaper size={18} className="text-gray-700" />;
      case 'online':
        return <Globe size={18} className="text-green-600" />;
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Back button */}
        <Link
          href={`/${lang}/media`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {lang === 'es' ? 'Volver a Media' : 'Back to Media'}
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero image */}
          {media.coverImage && (
            <div className="relative aspect-[21/9] w-full bg-gray-100">
              <Image
                src={urlFor(media.coverImage).width(1200).height(600).url()}
                alt={media.coverImage.alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              {formatDateRange(media.startDate, media.endDate) && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} className="text-gray-400" />
                  <span className="font-medium">{formatDateRange(media.startDate, media.endDate)}</span>
                </div>
              )}

              {media.mediaOutlets && media.mediaOutlets.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 size={20} className="text-gray-400" />
                  <span>{media.mediaOutlets.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Coverage types */}
            {media.coverageType && media.coverageType.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {media.coverageType.map((type, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    {getCoverageIcon(type)}
                    {getCoverageLabel(type)}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableTextContent content={media.description} lang={lang} />
              </div>
            )}

            {/* Documents/PDFs Section */}
            {media.documents && media.documents.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'es' ? 'Documentos' : 'Documents'}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {media.documents.map((doc: any, index: number) => {
                    const pdfUrl = doc.asset?.url;
                    const fileName = doc.asset?.originalFilename || `document-${index + 1}.pdf`;
                    const docTitle = doc.title || fileName;

                    return (
                      <div
                        key={doc._key || index}
                        className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText size={24} className="text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                              {docTitle}
                            </h3>
                            <p className="text-sm text-gray-500">
                              PDF {doc.asset?.size ? `• ${Math.round(doc.asset.size / 1024)} KB` : ''}
                            </p>
                          </div>
                        </div>

                        {/* PDF Preview */}
                        {pdfUrl && (
                          <div className="mb-4 bg-white rounded-lg overflow-hidden border border-gray-200">
                            <iframe
                              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
                              className="w-full h-48 pointer-events-none"
                              title={`Preview of ${docTitle}`}
                            />
                          </div>
                        )}

                        {/* Action buttons */}
                        {pdfUrl && (
                          <div className="flex gap-3">
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              <Eye size={16} />
                              {lang === 'es' ? 'Abrir PDF' : 'Open PDF'}
                            </a>
                            <a
                              href={`${pdfUrl}?dl=${fileName}`}
                              download={fileName}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              <Download size={16} />
                              {lang === 'es' ? 'Descargar' : 'Download'}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* External Links */}
            {media.externalLinks && media.externalLinks.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'es' ? 'Enlaces Externos' : 'External Links'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {media.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
                    >
                      <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <span className="flex-1 text-gray-900 font-medium truncate">{link.title || link.url}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {media.gallery && media.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'es' ? 'Galería' : 'Gallery'}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {media.gallery.map((image: any, index: number) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={urlFor(image).width(600).height(450).url()}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </article>
      </Container>
    </div>
  );
}
