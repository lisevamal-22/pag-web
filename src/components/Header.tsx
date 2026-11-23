import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useRouter, RoutePath } from '../context/RouterContext';
import { SensiaLogo } from './BrandMarks';
import { SERVICES } from '../data/servicesData';

interface InsightsSubItem {
  id: string;
  label: string;
  to: string;
  scrollToId: string;
}

const INSIGHTS_DROPDOWN_ITEMS: InsightsSubItem[] = [
  {
    id: 'investigaciones',
    label: 'Investigaciones y newsletter',
    to: '/insights#investigaciones',
    scrollToId: 'investigaciones',
  },
  {
    id: 'recursos',
    label: 'Recursos gratuitos',
    to: '/insights#recursos',
    scrollToId: 'recursos',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    to: '/insights#podcast',
    scrollToId: 'podcast',
  },
];

const CONTACT_PATH: RoutePath = '/contacto';

const NAV_MIDDLE_ITEMS: { label: string; path: RoutePath }[] = [
  { label: 'Metodología', path: '/metodologia' },
  { label: 'Proyectos', path: '/proyectos' },
  { label: 'Laboratorio', path: '/laboratorio' },
  { label: 'Sobre nosotros', path: '/sobre-nosotros' },
];

export const Header: React.FC = () => {
  const { pathname, serviceSlug, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [insightsMenuOpen, setInsightsMenuOpen] = useState(false);

  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);
  const insightsDropdownRef = useRef<HTMLDivElement | null>(null);
  const servicesCloseTimer = useRef<number | null>(null);
  const insightsCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setServicesMenuOpen(false);
        setInsightsMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesMenuOpen(false);
      }
      if (insightsDropdownRef.current && !insightsDropdownRef.current.contains(target)) {
        setInsightsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (to: string, options?: { scrollToId?: string }) => {
    setMobileOpen(false);
    setServicesMenuOpen(false);
    setInsightsMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileInsightsOpen(false);
    navigate(to, options);
  };

  /**
   * CTA «HABLEMOS DE TU PROYECTO»: enlace real a /contacto (funciona sin JS, con
   * clic central / Ctrl+clic para abrir en otra pestaña y con lectores de pantalla) y
   * navegación SPA en el clic normal.
   */
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    handleNav(CONTACT_PATH);
  };

  const openServicesDesktop = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setInsightsMenuOpen(false);
    setServicesMenuOpen(true);
  };

  const scheduleCloseServicesDesktop = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    servicesCloseTimer.current = window.setTimeout(() => {
      setServicesMenuOpen(false);
    }, 140);
  };

  const openInsightsDesktop = () => {
    if (insightsCloseTimer.current) clearTimeout(insightsCloseTimer.current);
    setServicesMenuOpen(false);
    setInsightsMenuOpen(true);
  };

  const scheduleCloseInsightsDesktop = () => {
    if (insightsCloseTimer.current) clearTimeout(insightsCloseTimer.current);
    insightsCloseTimer.current = window.setTimeout(() => {
      setInsightsMenuOpen(false);
    }, 140);
  };

  const isServicesActive = pathname === '/servicios';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[74px] flex items-center justify-between gap-4">
        {/* Logotipo principal estático */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0042FD]"
          aria-label="SENSIA LABs — Ir al inicio"
        >
          <SensiaLogo variant="dark" size="md" />
        </a>

        {/* Navegación principal (1. Inicio · 2. Qué hacemos · 3. Metodología · 4. Proyectos · 5. Laboratorio · 6. Sobre nosotros · 7. Insights) */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-4 xl:gap-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`text-[12px] xl:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0042FD] ${
              pathname === '/'
                ? 'text-[#0042FD] border-[#0042FD]'
                : 'text-black/80 border-transparent hover:text-black hover:border-black/40'
            }`}
          >
            Inicio
          </a>

          {/* QUÉ HACEMOS: clic navega a /servicios · hover abre lista compacta de 6 nombres */}
          <div
            ref={servicesDropdownRef}
            className="relative flex items-center"
            onMouseEnter={openServicesDesktop}
            onMouseLeave={scheduleCloseServicesDesktop}
          >
            <a
              href="/servicios"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/servicios');
              }}
              onFocus={openServicesDesktop}
              aria-current={isServicesActive && !serviceSlug ? 'page' : undefined}
              aria-haspopup="true"
              aria-expanded={servicesMenuOpen}
              className={`inline-flex items-center gap-1 text-[12px] xl:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0042FD] ${
                isServicesActive
                  ? 'text-[#0042FD] border-[#0042FD]'
                  : 'text-black/80 border-transparent hover:text-black hover:border-black/40'
              }`}
            >
              <span>Qué hacemos</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  servicesMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </a>

            {servicesMenuOpen && (
              <div
                onMouseEnter={openServicesDesktop}
                onMouseLeave={scheduleCloseServicesDesktop}
                className="absolute left-0 top-full pt-3 z-50 w-[260px]"
              >
                <ul className="bg-white border border-black py-2 shadow-lg">
                  {SERVICES.map((service) => {
                    const isCurrentService = serviceSlug === service.slug;
                    return (
                      <li key={service.slug}>
                        <a
                          href={service.path}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(service.path);
                          }}
                          className={`block px-4 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap ${
                            isCurrentService
                              ? 'text-[#0042FD] bg-neutral-50 font-semibold'
                              : 'text-black/85 hover:text-[#0042FD] hover:bg-neutral-50'
                          }`}
                        >
                          {service.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* 3. Metodología · 4. Proyectos · 5. Laboratorio · 6. Sobre nosotros */}
          {NAV_MIDDLE_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[12px] xl:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0042FD] ${
                  isActive
                    ? 'text-[#0042FD] border-[#0042FD]'
                    : 'text-black/80 border-transparent hover:text-black hover:border-black/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* INSIGHTS: clic navega a /insights · hover abre lista compacta de 3 enlaces */}
          <div
            ref={insightsDropdownRef}
            className="relative flex items-center"
            onMouseEnter={openInsightsDesktop}
            onMouseLeave={scheduleCloseInsightsDesktop}
          >
            <a
              href="/insights"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/insights');
              }}
              onFocus={openInsightsDesktop}
              aria-current={pathname === '/insights' ? 'page' : undefined}
              aria-haspopup="true"
              aria-expanded={insightsMenuOpen}
              className={`inline-flex items-center gap-1 text-[12px] xl:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0042FD] ${
                pathname === '/insights'
                  ? 'text-[#0042FD] border-[#0042FD]'
                  : 'text-black/80 border-transparent hover:text-black hover:border-black/40'
              }`}
            >
              <span>Insights</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  insightsMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </a>

            {insightsMenuOpen && (
              <div
                onMouseEnter={openInsightsDesktop}
                onMouseLeave={scheduleCloseInsightsDesktop}
                className="absolute right-0 lg:left-0 top-full pt-3 z-50 w-[250px]"
              >
                <ul className="bg-white border border-black py-2 shadow-lg">
                  {INSIGHTS_DROPDOWN_ITEMS.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.to}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(sub.to, { scrollToId: sub.scrollToId });
                        }}
                        className="block px-4 py-2.5 text-[13px] font-medium text-black/85 hover:text-[#0042FD] hover:bg-neutral-50 transition-colors whitespace-nowrap"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Acción comercial principal + Menú móvil */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={CONTACT_PATH}
            onClick={handleContactClick}
            aria-current={pathname === CONTACT_PATH ? 'page' : undefined}
            className="relative z-10 hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-[11px] xl:text-xs font-semibold tracking-wider uppercase whitespace-nowrap shrink-0 hover:bg-[#0042FD] focus-visible:bg-[#0042FD] transition-colors duration-200 cursor-pointer touch-manipulation select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0042FD]"
          >
            <span>HABLEMOS DE TU PROYECTO</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-black border border-black/15 hover:border-black transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0042FD]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil minimalista y claro */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-black/10 bg-white px-4 py-5 space-y-2 shadow-lg max-h-[82vh] overflow-y-auto"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`px-3 py-3 text-sm font-semibold border-b border-black/5 transition-colors ${
                pathname === '/' ? 'text-[#0042FD]' : 'text-black hover:text-[#0042FD]'
              }`}
            >
              Inicio
            </a>

            {/* Qué hacemos móvil: enlace directo a /servicios + botón indicador para desplegar los 6 servicios */}
            <div className="border-b border-black/5">
              <div className="flex items-center justify-between">
                <a
                  href="/servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/servicios');
                  }}
                  className={`flex-1 px-3 py-3 text-sm font-semibold transition-colors ${
                    isServicesActive ? 'text-[#0042FD]' : 'text-black hover:text-[#0042FD]'
                  }`}
                >
                  Qué hacemos
                </a>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  aria-label="Desplegar los seis servicios"
                  className="w-11 h-11 flex items-center justify-center text-black/70 hover:text-black cursor-pointer shrink-0"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileServicesOpen && (
                <ul className="pb-2 pl-6 pr-3 space-y-0.5">
                  {SERVICES.map((srv) => (
                    <li key={srv.slug}>
                      <a
                        href={srv.path}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(srv.path);
                        }}
                        className={`block py-2 text-sm transition-colors ${
                          serviceSlug === srv.slug
                            ? 'text-[#0042FD] font-semibold'
                            : 'text-black/75 hover:text-[#0042FD]'
                        }`}
                      >
                        {srv.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {NAV_MIDDLE_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.path);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-3 text-sm font-semibold border-b border-black/5 transition-colors ${
                    isActive ? 'text-[#0042FD]' : 'text-black hover:text-[#0042FD]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Insights móvil: enlace directo a /insights + botón para desplegar los 3 apartados */}
            <div className="border-b border-black/5">
              <div className="flex items-center justify-between">
                <a
                  href="/insights"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/insights');
                  }}
                  className={`flex-1 px-3 py-3 text-sm font-semibold transition-colors ${
                    pathname === '/insights' ? 'text-[#0042FD]' : 'text-black hover:text-[#0042FD]'
                  }`}
                >
                  Insights
                </a>
                <button
                  type="button"
                  onClick={() => setMobileInsightsOpen((v) => !v)}
                  aria-expanded={mobileInsightsOpen}
                  aria-label="Desplegar apartados de Insights"
                  className="w-11 h-11 flex items-center justify-center text-black/70 hover:text-black cursor-pointer shrink-0"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileInsightsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileInsightsOpen && (
                <ul className="pb-2 pl-6 pr-3 space-y-0.5">
                  {INSIGHTS_DROPDOWN_ITEMS.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.to}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(sub.to, { scrollToId: sub.scrollToId });
                        }}
                        className="block py-2 text-sm text-black/75 hover:text-[#0042FD] transition-colors"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          <div className="pt-3">
            <a
              href={CONTACT_PATH}
              onClick={handleContactClick}
              aria-current={pathname === CONTACT_PATH ? 'page' : undefined}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0042FD] hover:bg-black focus-visible:bg-black text-white text-xs font-semibold tracking-wider uppercase cursor-pointer touch-manipulation transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0042FD]"
            >
              <span>HABLEMOS DE TU PROYECTO</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
