import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">{dict.nav.contact}</h1>
      <p className="text-muted-foreground">
        Esta página mostrará un formulario de contacto.
      </p>
    </Container>
  );
}
