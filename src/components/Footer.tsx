import React, { useState } from 'react';
import { ArrowUpRight, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SensiaLogo } from './BrandMarks';
import { BRAND_CONTACT_CONFIG } from '../data/brandConfig';

type LegalDocKey = 'aviso' | 'privacidad' | 'cookies' | null;

const LEGAL_TEXTS: Record<Exclude<LegalDocKey, null>, { title: string; body: string }> = {
  aviso: {
    title: 'Aviso legal',
    body: 'SENSIA LABs es una plataforma web dedicada a la investigación del consumidor, percepción y experiencia de marca. Los contenidos publicados tienen carácter informativo y divulgativo. Las demostraciones conceptuales del portfolio no representan resultados comerciales atribuidos a terceros.',
  },
  privacidad: {
    title: 'Política de privacidad',
    body: 'Los datos introducidos en el Traductor de Necesidades, formularios de contacto o candidatura espontánea se validan localmente en tu navegador mientras no exista una integración externa activa. Ningún dato personal se envía ni cede a terceros sin tu consentimiento explícito.',
  },
  cookies: {
    title: 'Política de cookies',
    body: 'Este sitio únicamente utiliza almacenamiento local técnico del navegador (por ejemplo, para conservar tus artículos guardados en Favoritos dentro de SENSIA Insights) sin rastreadores publicitarios de terceros.',
  },
};

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const [openLegal, setOpenLegal] = useState<LegalDocKey>(null);

  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Qué hacemos', to: '/servicios' },
    { label: 'Metodología', to: '/metodologia' },
    { label: 'Proyectos', to: '/proyectos' },
    { label: 'Laboratorio', to: '/laboratorio' },
    { label: 'Sobre nosotros', to: '/sobre-nosotros' },
    { label: 'Insights', to: '/insights' },
    { label: 'FAQ', to: '/faq' },
  ];

  const serviceLinks = [
    { label: 'Investigación del consumidor', to: '/servicios/investigacion-consumidor' },
    { label: 'Neuromarketing', to: '/servicios/neuromarketing' },
    { label: 'Percepción', to: '/servicios/percepcion' },
    { label: 'Comportamiento', to: '/servicios/comportamiento' },
    { label: 'Marketing sensorial', to: '/servicios/marketing-sensorial' },
    { label: 'Experiencia de marca', to: '/servicios/experiencia-marca' },
  ];

  const aboutLinks = [
    { label: 'Sobre nosotros', to: '/sobre-nosotros' },
    { label: 'Nuestro equipo', to: '/sobre-nosotros#equipo' },
    { label: 'Únete a nosotros', to: '/sobre-nosotros#unete' },
  ];

  const { email, phone, location, socials } = BRAND_CONTACT_CONFIG;

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
        {/* Corporate Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* BLOQUE 1. MARCA */}
          <div className="lg:col-span-3 space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="inline-block focus-visible:outline-2 focus-visible:outline-[#00D6B6]"
              aria-label="SENSIA LABs — Inicio"
            >
              <SensiaLogo variant="light" size="md" />
            </a>
            <p className="font-display text-xl text-white">«Entender lo que no siempre se ve».</p>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Investigación del consumidor, neuromarketing y percepción aplicados a decisiones de
              marca.
            </p>
          </div>

          {/* BLOQUE 2. NAVEGACIÓN */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Navegación
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.to);
                    }}
                    className="text-sm text-white/80 hover:text-[#00D6B6] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOQUE 3. SERVICIOS */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Servicios
            </h2>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.to);
                    }}
                    className="text-sm text-white/80 hover:text-[#00D6B6] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOQUE 4. CONÓCENOS */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Conócenos
            </h2>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.to);
                    }}
                    className="text-sm text-white/80 hover:text-[#00D6B6] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOQUE 5. CONTACTO Y REDES SOCIALES */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Contacto y redes
            </h2>

            <div className="space-y-2.5 text-sm text-white/75">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D6B6] shrink-0" aria-hidden="true" />
                {email ? (
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                ) : (
                  <span className="text-white/55">Canal de correo por configurar</span>
                )}
              </div>

              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#00D6B6] shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00D6B6] shrink-0" aria-hidden="true" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate('/contacto')}
                className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-3 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Ir a contacto</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            {/* Redes sociales reconocibles (enlaces reales si están configurados, o acceso preparado) */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { name: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
                { name: 'Instagram', href: socials.instagram, Icon: Instagram },
                { name: 'YouTube', href: socials.youtube, Icon: Youtube },
              ].map(({ name, href, Icon }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} de SENSIA LABs`}
                    className="w-10 h-10 border border-white/25 flex items-center justify-center text-white hover:border-[#00D6B6] hover:text-[#00D6B6] transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    key={name}
                    type="button"
                    onClick={() => navigate('/contacto')}
                    title={`${name} — pendiente de enlace oficial`}
                    aria-label={`${name} — contactar con SENSIA LABs`}
                    className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* FRANJA INFERIOR */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} SENSIA LABs. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setOpenLegal('aviso')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Aviso legal
            </button>
            <button
              type="button"
              onClick={() => setOpenLegal('privacidad')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de privacidad
            </button>
            <button
              type="button"
              onClick={() => setOpenLegal('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de cookies
            </button>
          </div>
        </div>

        {/* Legal Notice Disclosure Panel */}
        {openLegal && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label={LEGAL_TEXTS[openLegal].title}
            className="mt-6 p-6 bg-white text-black flex items-start justify-between gap-6"
          >
            <div className="space-y-2 max-w-3xl">
              <h3 className="font-display text-lg text-black">{LEGAL_TEXTS[openLegal].title}</h3>
              <p className="text-sm text-black/80 leading-relaxed">
                {LEGAL_TEXTS[openLegal].body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpenLegal(null)}
              aria-label="Cerrar aviso"
              className="p-2 border border-black/20 hover:border-black cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
