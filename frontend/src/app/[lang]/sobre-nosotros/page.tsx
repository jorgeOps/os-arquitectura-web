import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import Image from "next/image";


export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {dict.nav.about}
          </h1>
          <div className="w-24 h-1 bg-gray-900"></div>
        </div>

        {/* Carlos Olivé - Fundador con foto */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Foto */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/foto_carlos_olive.jpg"
                alt="Carlos Olivé Sauret"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Información */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Carlos Olivé Sauret</h2>
              <p className="text-sm text-gray-500 mb-6">Arquitecto - Fundador</p>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Olivé Sauret Arquitectura</strong> es un despacho de Arquitectura, Consultoría y Project Management, dirigido por <strong>Carlos Olivé Sauret</strong> arquitecto titulado por la Escuela Técnica Superior de Arquitectura de Madrid en el año 1996 con calificación Sobresaliente.
                </p>

                <p>
                  Olivé Sauret Arquitectura se constituyó en el año 1993. Desde entonces, llevamos 31 años de ejercicio profesional continuado.
                </p>

                <p>
                  En la primera mitad de nuestra carrera profesional desarrollamos numerosos Proyectos de Ejecución y Direcciones Facultativas, tanto residencial como terciario.
                </p>

                <p>
                  En la segunda mitad de esta trayectoria profesional venimos compaginado el desarrollo de proyectos propios con el trabajo de consultoría, aplicando el "know-how" adquirido y dirigiendo equipos de colaboradores externos en proyectos para la Administración, Fondos de Inversión, y grandes consultoras.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Principales clientes */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Principales clientes</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Administración */}
            <div>
              <div className="mb-4 pb-3 border-b-2 border-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                  Administración
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Ayuntamiento de Pozuelo de Alarcón',
                  'Dirección General de Patrimonio de la Comunidad de Madrid',
                  'Dirección General de Tráfico (DGT)',
                  'Ministerio del Interior; Dirección General de Policía (DGP)',
                  'Adif-Comfersa',
                  'Empresa Municipal de la Vivienda de Madrid (EMV)',
                  'Madrid Espacios y Congresos'
                ].map((client, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                    <span className="text-gray-400 group-hover:text-gray-600 mt-0.5 flex-shrink-0">▪</span>
                    <span className="leading-snug">{client}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultoras */}
            <div>
              <div className="mb-4 pb-3 border-b-2 border-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                  Consultoras
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'BNP Paribas Real Estate',
                  'CBRE (Richard Ellis)',
                  'Cushman & Wakefield',
                  'Savills-Aguirre Newman',
                  'Jamestown',
                  'Dentons'
                ].map((client, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                    <span className="text-gray-400 group-hover:text-gray-600 mt-0.5 flex-shrink-0">▪</span>
                    <span className="leading-snug">{client}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fondos de Inversión */}
            <div>
              <div className="mb-4 pb-3 border-b-2 border-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                  Fondos de Inversión
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'UBS Real Estate',
                  'URO Property Holdings',
                  'Eagle Eye Pozuelo',
                  'Bankia-Pensiones',
                  'Deo Lux Spain SARL Luxembourg',
                  'TV Zaragoza Plaza SARL Luxembourg',
                  'GRES Nederland Cooperatief, U.A.',
                  'Albufera SARL Luxembourg',
                  'Ziref Lux Spain 1 SARL Luxembourg',
                  'Ataraxia Inversiones SL',
                  'Nineteen Lavander SARL Luxembourg',
                  'Nineteen Desert Rose SARL Luxembourg',
                  'PFE Spain Megapark SL',
                  'Eighteen Hawthorn SARL Luxembourg'
                ].map((client, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                    <span className="text-gray-400 group-hover:text-gray-600 mt-0.5 flex-shrink-0">▪</span>
                    <span className="leading-snug">{client}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresas privadas */}
            <div>
              <div className="mb-4 pb-3 border-b-2 border-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                  Empresas privadas
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Hotel Príncipe Pío S.A.',
                  'Linkia FP',
                  'Stulz Real Estate España SL',
                  'The Well Come Home Real Estate',
                  'Hispalyt (Asociación Española de Fabricantes de Ladrillos y Tejas)',
                  'El País',
                  'Colegio Oficial de Administradores de Fincas de Madrid'
                ].map((client, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                    <span className="text-gray-400 group-hover:text-gray-600 mt-0.5 flex-shrink-0">▪</span>
                    <span className="leading-snug">{client}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contacto CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 mb-6">
            ¿Tienes un proyecto en mente? Nos encantaría conocerlo.
          </p>
          <a
            href={`/${lang}/contacto`}
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Contactar
          </a>
        </div>
      </Container>
    </div>
  );
}
