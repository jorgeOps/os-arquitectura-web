import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Navigation } from "./Navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  lang: Locale;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold">
            Portfolio
          </Link>

          <div className="flex items-center gap-6">
            <Navigation lang={lang} />
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      </Container>
    </header>
  );
}
