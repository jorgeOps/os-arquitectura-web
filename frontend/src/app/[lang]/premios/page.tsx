import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function AwardsPage({
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
            {dict.nav.awards || "Premios"}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === "es"
              ? "Premios y reconocimientos otorgados a nuestros proyectos"
              : "Awards and recognitions granted to our projects"}
          </p>
        </div>

        {/* TODO: Grid de premios con filtros */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500">
              {lang === "es"
                ? "Los premios se mostrarán aquí una vez configurados en Sanity"
                : "Awards will be displayed here once configured in Sanity"}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
