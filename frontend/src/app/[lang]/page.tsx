import { HomeClient } from "@/components/home/HomeClient";
import { Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import { FEATURED_PROJECTS_QUERY, FEATURED_AWARDS_QUERY } from "@/lib/sanity/queries";
import { SanityProject, SanityAward } from "@/lib/sanity/types";

export const dynamic = 'force-dynamic';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };

  // Fetch featured content
  const [projects, awards] = await Promise.all([
    client.fetch<SanityProject[]>(FEATURED_PROJECTS_QUERY),
    client.fetch<SanityAward[]>(FEATURED_AWARDS_QUERY),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <HomeClient
        lang={lang}
        projects={projects}
        awards={awards}
      />
    </main>
  );
}
