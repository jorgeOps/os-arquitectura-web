"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n/config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  lang: Locale;
}

export function Navigation({ lang }: NavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: lang === "es" ? "Inicio" : "Home" },
    { href: `/${lang}/proyectos`, label: lang === "es" ? "Proyectos" : "Projects" },
    { href: `/${lang}/blog`, label: "Blog" },
    { href: `/${lang}/sobre-nosotros`, label: lang === "es" ? "Sobre Nosotros" : "About Us" },
  ];

  const dropdownItems = [
    {
      href: `/${lang}/publicaciones`,
      label: lang === "es" ? "Publicaciones" : "Publications",
      description: lang === "es" ? "Artículos y manuales" : "Articles and manuals"
    },
    {
      href: `/${lang}/medios`,
      label: lang === "es" ? "Medios" : "Media",
      description: lang === "es" ? "Apariciones en medios" : "Media appearances"
    },
    {
      href: `/${lang}/premios`,
      label: lang === "es" ? "Premios" : "Awards",
      description: lang === "es" ? "Reconocimientos" : "Recognitions"
    },
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

      {/* Dropdown Menu */}
      <div
        className="relative group"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className="text-sm font-medium transition-colors hover:text-foreground/80 flex items-center gap-1"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {lang === "es" ? "Noticias y Reconocimientos" : "News & Recognition"}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 pt-2 z-50">
            <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors group/item"
                >
                  <div className="text-sm font-medium text-gray-900 group-hover/item:text-gray-700">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        href={`/${lang}/contacto`}
        className="text-sm font-medium transition-colors hover:text-foreground/80"
      >
        {lang === "es" ? "Contacto" : "Contact"}
      </Link>
    </nav>
  );
}
