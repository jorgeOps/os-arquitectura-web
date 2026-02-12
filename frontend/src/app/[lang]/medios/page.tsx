import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function MediaCoveragePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.nav.media || "Medios"}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === "es"
              ? "Apariciones del estudio en medios de comunicación"
              : "Studio appearances in media outlets"}
          </p>
        </div>

        {/* TODO: Timeline de eventos con galería */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500">
              {lang === "es"
                ? "Las coberturas mediáticas se mostrarán aquí como una línea temporal una vez configuradas en Sanity"
                : "Media coverage will be displayed here as a timeline once configured in Sanity"}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
