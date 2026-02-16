import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { client } from "@/lib/sanity/client";
import { MEDIA_COVERAGE_QUERY } from "@/lib/sanity/queries";
import { SanityMediaCoverage } from "@/lib/sanity/types";
import { MediaCard } from "@/components/media/MediaCard";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function MediaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  // Fetch media coverage from Sanity
  const mediaItems = await client.fetch<SanityMediaCoverage[]>(MEDIA_COVERAGE_QUERY);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === "es" ? "Media" : "Media"}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === "es"
              ? "Apariciones en medios de comunicación y cobertura mediática"
              : "Media appearances and coverage"}
          </p>
        </div>

        {mediaItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">
              {lang === "es"
                ? "No hay contenido de media disponible en este momento."
                : "No media content available at this time."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((media) => (
              <MediaCard
                key={media._id}
                media={media}
                lang={lang}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
