import { HomeClient } from "@/components/home/HomeClient";
import { Locale } from "@/lib/i18n/config";
import { client } from "@/lib/sanity/client";
import { FEATURED_PROJECTS_QUERY, ONGOING_PROJECTS_QUERY, FEATURED_AWARDS_QUERY, HERO_POOL_QUERY } from "@/lib/sanity/queries";
import { SanityProject, SanityAward } from "@/lib/sanity/types";

export const dynamic = 'force-dynamic';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };

  // Fetch content
  const [featuredProjects, ongoingProjects, awards, heroPool] = await Promise.all([
    client.fetch<SanityProject[]>(FEATURED_PROJECTS_QUERY).catch(() => []),
    client.fetch<SanityProject[]>(ONGOING_PROJECTS_QUERY).catch(() => []),
    client.fetch<SanityAward[]>(FEATURED_AWARDS_QUERY).catch(() => []),
    client.fetch<SanityProject[]>(HERO_POOL_QUERY).catch(() => []),
  ]);

  // Shuffle hero pool to get 5 random projects
  const shuffledHeroProjects = heroPool
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-white">
      <HomeClient
        lang={lang}
        featuredProjects={featuredProjects}
        ongoingProjects={ongoingProjects}
        heroProjects={shuffledHeroProjects}
        awards={awards}
      />
    </main>
  );
}
