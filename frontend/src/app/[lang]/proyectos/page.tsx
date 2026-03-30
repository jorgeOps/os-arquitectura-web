import { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/Container";
import { PortfolioClient } from "@/components/projects/PortfolioClient";
import { client } from "@/lib/sanity/client";
import { PROJECTS_QUERY } from "@/lib/sanity/queries";
import { mapSanityProjectToProject } from "@/lib/sanity/mapper";
import { SanityProject } from "@/lib/sanity/types";

// Force dynamic rendering to ensure fresh data from Sanity
export const dynamic = 'force-dynamic';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };

  // Fetch projects from Sanity
  const sanityProjects = await client.fetch<SanityProject[]>(PROJECTS_QUERY);
  const projects = sanityProjects.map(mapSanityProjectToProject);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            Explora todos nuestros proyectos. Pasa el ratón sobre las
            imágenes para descubrir sus características.
          </p>
        </div>

        <PortfolioClient lang={lang} initialProjects={projects} />
      </Container>
    </div>
  );
}
