"use client";

import { useRouter } from "next/navigation";
import { ProjectContent } from "@/components/projects/ProjectContent";
import { Project } from "@/components/projects/ProjectCard";
import { Locale } from "@/lib/i18n/config";

interface ProjectPageClientProps {
    project: Project;
    lang: Locale;
}

export function ProjectPageClient({ project, lang }: ProjectPageClientProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 pt-24 md:pt-32">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
                <ProjectContent
                    project={project}
                    onClose={() => router.push(`/${lang}/proyectos`)}
                    className="min-h-[60vh]"
                />
            </div>
        </div>
    );
}
