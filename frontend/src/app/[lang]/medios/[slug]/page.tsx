import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function MediaCoverageDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {lang === "es"
              ? "Detalle de Cobertura Mediática"
              : "Media Coverage Detail"}
          </h1>
          <p className="text-gray-500">
            {lang === "es"
              ? `Mostrando cobertura: ${slug}`
              : `Showing coverage: ${slug}`}
          </p>
          {/* TODO: Conectar con Sanity para obtener la cobertura específica */}
        </div>
      </Container>
    </div>
  );
}
