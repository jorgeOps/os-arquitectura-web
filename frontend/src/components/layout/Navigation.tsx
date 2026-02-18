"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n/config";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavigationProps {
  lang: Locale;
}

export function Navigation({ lang }: NavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: `/${lang}`, label: lang === "es" ? "Inicio" : "Home" },
    { href: `/${lang}/proyectos`, label: lang === "es" ? "Proyectos" : "Projects" },
    { href: `/${lang}/sobre-nosotros`, label: lang === "es" ? "Sobre Nosotros" : "About Us" },
  ];

  const dropdownItems = [
    {
      href: `/${lang}/publicaciones`,
      label: lang === "es" ? "Publicaciones" : "Publications",
      description: lang === "es" ? "Artículos y manuales" : "Articles and manuals"
    },
    {
      href: `/${lang}/media`,
      label: lang === "es" ? "Media" : "Media",
      description: lang === "es" ? "Apariciones en medios" : "Media appearances"
    },
    {
      href: `/${lang}/premios`,
      label: lang === "es" ? "Premios" : "Awards",
      description: lang === "es" ? "Reconocimientos" : "Recognitions"
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
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

        {/* Desktop Dropdown Menu */}
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
              className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Desktop Dropdown Content */}
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

      {/* Mobile Menu Button - Visible only on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMobileMenuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      {/* Mobile Menu - Portalled to body to escape Header stacking context */}
      {mounted && createPortal(
        <>
          {/* Mobile Menu Overlay - Opaque */}
          <div
            className={`fixed inset-0 bg-black/80 z-[9998] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Sidebar - Full height, no scroll */}
          <div
            className={`fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {lang === "es" ? "Menú" : "Menu"}
                </h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Content - Start from top */}
              <nav className="flex-1 overflow-y-auto">
                <div className="w-full py-6">
                  <div className="space-y-2 px-6">
                    {/* Mobile Language Switcher */}
                    <div className="pb-4 mb-4 border-b border-gray-200">
                      <LanguageSwitcher currentLang={lang} />
                    </div>

                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}

                    {/* Mobile Dropdown Section */}
                    <div className="pt-2">
                      <button
                        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                      >
                        <span>{lang === "es" ? "Noticias y Reconocimientos" : "News & Recognition"}</span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ease-in-out ${isMobileDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Mobile Dropdown Items - Animated slide down */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="mt-1 space-y-1">
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors ml-4"
                            >
                              <div className="text-base font-medium text-gray-900">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-500 mt-0.5">
                                {item.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/${lang}/contacto`}
                      onClick={closeMobileMenu}
                      className="block px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                    >
                      {lang === "es" ? "Contacto" : "Contact"}
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 p-6 flex-shrink-0">
                <p className="text-xs text-gray-500 text-center">
                  O.S. Arquitectura © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
