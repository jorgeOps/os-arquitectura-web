import { Locale } from "@/lib/i18n/config";
import { ContactClient } from "@/components/contact/ContactClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };

  return <ContactClient />;
}
