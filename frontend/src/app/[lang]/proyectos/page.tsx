import { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { PortfolioClient } from "@/components/projects/PortfolioClient";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Living Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            Explora nuestros proyectos de arquitectura. Pasa el ratón sobre las
            imágenes para descubrir sus características.
          </p>
        </div>

        <PortfolioClient lang={lang} />
      </Container>
    </div>
  );
}
