import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">{dict.nav.about}</h1>
      <p className="text-muted-foreground">
        Esta página mostrará información sobre el estudio.
      </p>
    </Container>
  );
}
