import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { client } from "@/lib/sanity/client";
import { PUBLICATIONS_QUERY } from "@/lib/sanity/queries";
import { SanityPublication } from "@/lib/sanity/types";
import { PublicationCard } from "@/components/publications/PublicationCard";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  // Fetch publications from Sanity
  const publications = await client.fetch<SanityPublication[]>(PUBLICATIONS_QUERY);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.publications?.title || "Publicaciones"}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === "es"
              ? "Artículos, manuales y guías técnicas publicadas por nuestro estudio"
              : "Articles, manuals and technical guides published by our studio"}
          </p>
        </div>

        {publications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">
              {lang === "es"
                ? "No hay publicaciones disponibles en este momento."
                : "No publications available at this time."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication) => (
              <PublicationCard
                key={publication._id}
                publication={publication}
                lang={lang}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
