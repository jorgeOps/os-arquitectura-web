import { notFound } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { mapSanityProjectToProject } from "@/lib/sanity/mapper";
import { SanityProject } from "@/lib/sanity/types";
import { ProjectPageClient } from "./ProjectPageClient";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params as { lang: Locale; slug: string };
    const project = await client.fetch<SanityProject>(PROJECT_BY_SLUG_QUERY, { slug });

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = (project.title as any)[lang] || (project.title as any).es || "Project";
    const description = (project.excerpt as any)?.[lang] || (project.excerpt as any)?.es || "";

    return {
        title: `${title} | O.S. Arquitectura`,
        description: description,
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params as { lang: Locale; slug: string };

    const sanityProject = await client.fetch<SanityProject>(PROJECT_BY_SLUG_QUERY, { slug });

    if (!sanityProject) {
        notFound();
    }

    const project = mapSanityProjectToProject(sanityProject);

    return (
        <ProjectPageClient project={project} lang={lang} />
    );
}
