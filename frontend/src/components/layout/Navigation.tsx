import Link from "next/link";
import { Locale } from "@/lib/i18n/config";

interface NavigationProps {
  lang: Locale;
}

export function Navigation({ lang }: NavigationProps) {
  const navItems = [
    { href: `/${lang}`, label: lang === "es" ? "Inicio" : "Home" },
    { href: `/${lang}/proyectos`, label: lang === "es" ? "Proyectos" : "Projects" },
    { href: `/${lang}/blog`, label: "Blog" },
    { href: `/${lang}/sobre-nosotros`, label: lang === "es" ? "Sobre Nosotros" : "About Us" },
    { href: `/${lang}/contacto`, label: lang === "es" ? "Contacto" : "Contact" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium transition-colors hover:text-foreground/80"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
