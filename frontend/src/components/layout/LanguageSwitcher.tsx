"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, Locale, localeNames } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex gap-2">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocale(locale)}
          className={`text-sm font-medium transition-colors ${
            currentLang === locale
              ? "text-foreground underline"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  );
}
