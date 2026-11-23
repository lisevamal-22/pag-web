import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getServiceBySlug } from '../data/servicesData';
import { resolveProjectId } from '../data/projectsData';

export type RoutePath =
  | '/'
  | '/servicios'
  | '/metodologia'
  | '/proyectos'
  | '/sobre-nosotros'
  | '/laboratorio'
  | '/insights'
  | '/faq'
  | '/contacto';

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_METADATA: Record<RoutePath, PageMeta> = {
  '/': {
    title: 'SENSIA LABs — Entiende lo que hay detrás de cada decisión',
    description:
      'Investigamos cómo las personas perciben, sienten y eligen. Laboratorio de investigación del consumidor y neuromarketing.',
  },
  '/servicios': {
    title: 'Qué hacemos — Servicios de investigación | SENSIA LABs',
    description:
      'Investigación del consumidor, neuromarketing, percepción, comportamiento, marketing sensorial y experiencia de marca.',
  },
  '/metodologia': {
    title: 'Metodología — Observar, Comprender, Interpretar, Transformar | SENSIA LABs',
    description:
      'De la curiosidad al conocimiento. Cada pregunta de marca requiere una metodología de investigación adecuada.',
  },
  '/proyectos': {
    title: 'Proyectos y demostraciones conceptuales | SENSIA LABs',
    description:
      'Casos conceptuales aplicados a percepción visual, packaging, experiencia en espacio y toma de decisiones.',
  },
  '/sobre-nosotros': {
    title: 'Sobre nosotros y equipo | SENSIA LABs',
    description:
      'Detrás de cada insight, hay curiosidad. Conoce nuestra visión, equipo y oportunidades de colaboración.',
  },
  '/laboratorio': {
    title: 'Laboratorio de percepción — Experiencias interactivas | SENSIA LABs',
    description:
      'Experimentos interactivos sobre atención selectiva, fluidez cognitiva, memoria breve y efecto del contexto.',
  },
  '/insights': {
    title: 'SENSIA Insights — Revista de investigación y comportamiento | SENSIA LABs',
    description:
      'Artículos, evidencias y recursos sobre percepción, atención, toma de decisiones y comportamiento humano.',
  },
  '/faq': {
    title: 'Preguntas frecuentes | SENSIA LABs',
    description:
      'Respuestas claras sobre neuromarketing, investigación del consumidor, plazos y proceso de trabajo.',
  },
  '/contacto': {
    title: 'Contacto — Hablemos de tu proyecto | SENSIA LABs',
    description:
      'Cuéntanos qué te gustaría descubrir de tus clientes y exploremos cómo investigarlo.',
  },
};

interface RouterContextValue {
  pathname: RoutePath;
  serviceSlug: string | null;
  articleSlug: string | null;
  /** Proyecto abierto en /proyectos/:slug (null en la galería) */
  projectSlug: string | null;
  highlightedServiceId: string | null;
  highlightedProjectId: string | null;
  navigate: (
    to: string,
    options?: { scrollToId?: string; serviceId?: string; projectId?: string }
  ) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizeRoute(rawPath: string): {
  pathname: RoutePath;
  serviceSlug: string | null;
  articleSlug: string | null;
  projectSlug?: string | null;
} {
  const clean = rawPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

  if (clean.startsWith('/servicios/')) {
    const rawSlug = clean.replace('/servicios/', '').trim();
    const matched = getServiceBySlug(rawSlug);
    if (matched) {
      return { pathname: '/servicios', serviceSlug: matched.slug, articleSlug: null };
    }
    return { pathname: '/servicios', serviceSlug: null, articleSlug: null };
  }

  if (clean.startsWith('/proyectos/')) {
    const matched = resolveProjectId(clean.replace('/proyectos/', '').trim());
    return {
      pathname: '/proyectos',
      serviceSlug: null,
      articleSlug: null,
      projectSlug: matched ? matched.id : null,
    };
  }

  if (clean.startsWith('/insights/')) {
    const slug = clean.replace('/insights/', '').trim();
    return { pathname: '/insights', serviceSlug: null, articleSlug: slug || null };
  }

  const validRoutes: RoutePath[] = [
    '/',
    '/servicios',
    '/metodologia',
    '/proyectos',
    '/sobre-nosotros',
    '/laboratorio',
    '/insights',
    '/faq',
    '/contacto',
  ];

  if (validRoutes.includes(clean as RoutePath)) {
    return { pathname: clean as RoutePath, serviceSlug: null, articleSlug: null };
  }

  return { pathname: '/', serviceSlug: null, articleSlug: null };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routeState, setRouteState] = useState<{
    pathname: RoutePath;
    serviceSlug: string | null;
    articleSlug: string | null;
    projectSlug: string | null;
    highlightedServiceId: string | null;
    highlightedProjectId: string | null;
  }>(() => {
    const initial = normalizeRoute(window.location.pathname);
    return {
      ...initial,
      projectSlug: initial.projectSlug ?? null,
      highlightedServiceId: null,
      highlightedProjectId: null,
    };
  });

  const updateDocumentMeta = useCallback((path: RoutePath, serviceSlug: string | null, projectSlug: string | null) => {
    const matchedService = getServiceBySlug(serviceSlug);
    const matchedProject = resolveProjectId(projectSlug);
    const meta = matchedService
      ? {
          title: `${matchedService.title} — Qué hacemos | SENSIA LABs`,
          description: `${matchedService.showcaseSummary} ${matchedService.heroUtility}`,
        }
      : matchedProject
        ? {
            title: `${matchedProject.title} — Proyectos | SENSIA LABs`,
            description: matchedProject.summary,
          }
        : PAGE_METADATA[path] ?? PAGE_METADATA['/'];

    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, []);

  useEffect(() => {
    updateDocumentMeta(routeState.pathname, routeState.serviceSlug, routeState.projectSlug);
  }, [routeState.pathname, routeState.serviceSlug, routeState.projectSlug, updateDocumentMeta]);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizeRoute(window.location.pathname);
      setRouteState({
        ...next,
        projectSlug: next.projectSlug ?? null,
        highlightedServiceId: null,
        highlightedProjectId: null,
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { scrollToId?: string; serviceId?: string; projectId?: string }) => {
      const [pathPart, hashPart] = to.split('#');
      const targetPath = pathPart || '/';
      const normalized = normalizeRoute(targetPath);

      if (window.location.pathname + window.location.hash !== to) {
        window.history.pushState({}, '', to);
      }

      setRouteState({
        pathname: normalized.pathname,
        serviceSlug: normalized.serviceSlug,
        articleSlug: normalized.articleSlug,
        projectSlug: normalized.projectSlug ?? null,
        highlightedServiceId: options?.serviceId ?? null,
        highlightedProjectId: options?.projectId ?? null,
      });

      const scrollTarget = options?.scrollToId || hashPart;
      if (scrollTarget) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(scrollTarget);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 70);
        });
      } else {
        // 'instant' evita que `scroll-behavior: smooth` (index.css) anime el salto: sin esto,
        // al navegar desde una zona baja de la página se mostraba primero el final de la nueva
        // página (p. ej. el footer de /contacto) y después se desplazaba lentamente hacia arriba.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    },
    []
  );

  return (
    <RouterContext.Provider
      value={{
        pathname: routeState.pathname,
        serviceSlug: routeState.serviceSlug,
        articleSlug: routeState.articleSlug,
        projectSlug: routeState.projectSlug,
        highlightedServiceId: routeState.highlightedServiceId,
        highlightedProjectId: routeState.highlightedProjectId,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}
