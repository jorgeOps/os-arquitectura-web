import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">{dict.blog.title}</h1>
      <p className="text-muted-foreground">
        Esta página mostrará la lista de posts desde Sanity.
      </p>
    </Container>
  );
}
