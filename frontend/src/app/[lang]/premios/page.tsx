import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { client } from "@/lib/sanity/client";
import { AWARDS_QUERY } from "@/lib/sanity/queries";
import { SanityAward } from "@/lib/sanity/types";
import { AwardCard } from "@/components/awards/AwardCard";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function AwardsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  // Fetch awards from Sanity
  const awards = await client.fetch<SanityAward[]>(AWARDS_QUERY);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === "es" ? "Premios y Reconocimientos" : "Awards & Recognition"}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === "es"
              ? "Reconocimientos y galardones recibidos por nuestros proyectos"
              : "Recognition and awards received for our projects"}
          </p>
        </div>

        {awards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">
              {lang === "es"
                ? "No hay premios disponibles en este momento."
                : "No awards available at this time."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => (
              <AwardCard
                key={award._id}
                award={award}
                lang={lang}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
