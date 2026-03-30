import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O.S. Arquitectura - Olivé Sauret",
  description: "Olivé Sauret Arquitectura es un despacho de Arquitectura, Consultoría y Project Management, dirigido por Carlos Olivé Sauret arquitecto titulado por la Escuela Técnica Superior de Arquitectura de Madrid en el año 1996 con calificación Sobresaliente.",
  icons: {
    icon: '/images/favicon_os3.png',
    apple: '/images/favicon_os3.png',
  },
  openGraph: {
    title: "O.S. Arquitectura - Olivé Sauret",
    description: "Olivé Sauret Arquitectura es un despacho de Arquitectura, Consultoría y Project Management, dirigido por Carlos Olivé Sauret arquitecto titulado por la Escuela Técnica Superior de Arquitectura de Madrid en el año 1996 con calificación Sobresaliente.",
    images: ['/images/logo_azul_os.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "O.S. Arquitectura - Olivé Sauret",
    description: "Olivé Sauret Arquitectura es un despacho de Arquitectura, Consultoría y Project Management, dirigido por Carlos Olivé Sauret arquitecto titulado por la Escuela Técnica Superior de Arquitectura de Madrid en el año 1996 con calificación Sobresaliente.",
    images: ['/images/logo_azul_os.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
