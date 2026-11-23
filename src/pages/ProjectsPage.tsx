import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  CONCEPTUAL_PROJECTS,
  ConceptualProject,
  projectPath,
  resolveProjectId,
} from '../data/projectsData';
import { EyePerceptionArtwork } from '../components/EyePerceptionArtwork';
import {
  DESIGN_HEIGHTS,
  DESIGN_VIEW_H,
  DESIGN_W,
  ProjectComposition,
} from '../components/ProjectCompositions';

const N = CONCEPTUAL_PROJECTS.length;
const AREAS = [
  'Investigación del consumidor',
  'Neuromarketing',
  'Percepción',
  'Comportamiento',
  'Marketing sensorial',
  'Experiencia de marca',
];

/** Recuerda qué proyecto se estaba viendo al abrir un detalle, para volver al mismo punto */
let returnToIndex: number | null = null;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* -------------------------------------------------------------------------------------
 * Texto técnico exterior: se reescribe carácter a carácter (con glifos de barrido) cada
 * vez que cambia el proyecto activo, como en la referencia.
 * ----------------------------------------------------------------------------------- */
const GLYPHS = '#/_<>-=+*01ABCDEFXYZ';
const TypeText: React.FC<{ text: string; className?: string; instant?: boolean }> = ({ text, className, instant }) => {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (instant) {
      setShown(text);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += Math.max(1, Math.round(text.length / 40));
      if (i >= text.length) {
        setShown(text);
        window.clearInterval(id);
        return;
      }
      const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      setShown(text.slice(0, i) + glyph);
    }, 16);
    return () => window.clearInterval(id);
  }, [text, instant]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
};

/* -------------------------------------------------------------------------------------
 * Página de un proyecto escalada como una captura dentro de su marco
 * ----------------------------------------------------------------------------------- */
const PageFrame: React.FC<{
  project: ConceptualProject;
  width: number;
  innerRef?: (el: HTMLDivElement | null) => void;
}> = ({ project, width, innerRef }) => {
  const scale = width / DESIGN_W;
  return (
    <div className="relative overflow-hidden bg-neutral-900" style={{ width, height: DESIGN_VIEW_H * scale }}>
      <div
        ref={innerRef}
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{ width: DESIGN_W, transform: `scale(${scale})` }}
      >
        <ProjectComposition project={project} />
      </div>
    </div>
  );
};

/* =====================================================================================
 * EXPERIENCIA DE PROYECTOS — pila de páginas en profundidad sobre negro
 * El scroll de la página mueve un progreso continuo p ∈ [0, N-1]. Cada página se coloca
 * según su distancia d = i - p: la activa en primer plano; las anteriores suben y se
 * hunden detrás; las siguientes esperan debajo. Al subir, todo ocurre a la inversa.
 * ===================================================================================== */
const ProjectsStack: React.FC<{ onOpen: (p: ConceptualProject) => void }> = ({ onOpen }) => {
  // Al volver desde un detalle, se retoma el mismo proyecto
  const [initialIndex] = useState<number | null>(() => {
    const v = returnToIndex;
    returnToIndex = null;
    return v;
  });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(initialIndex ?? 0);
  const [layout, setLayout] = useState({ vw: 1440, stageH: 826, frameW: 900, isDesktop: true });

  // Medidas del escenario
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const headerH = vw >= 1024 ? 74 : 64;
      const stageH = window.innerHeight - headerH;
      const isDesktop = vw >= 1024;
      const byWidth = isDesktop ? Math.min(1040, vw * 0.6) : vw * (vw >= 640 ? 0.8 : 0.9);
      const byHeight = (stageH * (isDesktop ? 0.52 : 0.46)) / (DESIGN_VIEW_H / DESIGN_W);
      setLayout({ vw, stageH, frameW: Math.round(Math.min(byWidth, byHeight)), isDesktop });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const scrollToProject = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * i) / (N - 1) + 1, behavior: smooth ? 'smooth' : ('instant' as ScrollBehavior) });
  }, []);

  // Volver desde un detalle: situar el scroll en el proyecto que se estaba viendo
  useEffect(() => {
    if (initialIndex != null) requestAnimationFrame(() => scrollToProject(initialIndex, false));
  }, [initialIndex, scrollToProject]);

  // Bucle de animación: lee el scroll y coloca cada página
  useEffect(() => {
    let raf = 0;
    let smoothed = -1;
    let smoothedRaw = -1;
    let lastActive = -1;
    const frameH = (layout.frameW * DESIGN_VIEW_H) / DESIGN_W;
    const scale = layout.frameW / DESIGN_W;

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const rect = track.getBoundingClientRect();
        const span = Math.max(1, rect.height - window.innerHeight);
        const raw = clamp(-rect.top / span, 0, 1) * (N - 1);
        // Pausa en cada proyecto: la transición ocurre en la parte central de cada tramo
        const base = Math.floor(raw);
        const target = Math.min(N - 1, base + smoothstep(0.2, 0.8, raw - base));
        smoothed = smoothed < 0 ? target : smoothed + (target - smoothed) * 0.12;
        smoothedRaw = smoothedRaw < 0 ? raw : smoothedRaw + (raw - smoothedRaw) * 0.12;
        const p = smoothed;

        for (let i = 0; i < N; i++) {
          const el = pageRefs.current[i];
          if (!el) continue;
          const d = i - p;
          const ad = Math.abs(d);
          const sg = Math.sign(d);
          // Las páginas lejanas se apilan cada vez más juntas (profundidad)
          const y = sg * frameH * 0.5 * (1 - Math.exp(-1.25 * ad));
          const s = 1 - 0.075 * Math.min(ad, 3) + 0.035 * Math.max(0, 1 - ad * 2);
          const z = -ad * 160;
          const rx = clamp(d, -1.5, 1.5) * -2.2;
          el.style.transform = `translate3d(-50%, calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(4)})`;
          el.style.zIndex = String(1000 - Math.round(ad * 100));
          const vis = 1 - smoothstep(2.6, 3.4, ad);
          el.style.opacity = vis.toFixed(3);
          el.style.visibility = vis <= 0.001 ? 'hidden' : 'visible';
          const dim = dimRefs.current[i];
          if (dim) dim.style.opacity = Math.min(0.62, ad * 0.42).toFixed(3);
          // Desplazamiento interior de la página activa (los paneles se desplazan verticalmente)
          const inner = innerRefs.current[i];
          if (inner) {
            // Recorre la página mientras está en primer plano (incluida la pausa entre proyectos)
            const start = i === 0 ? 0 : i - 0.4;
            const end = i === N - 1 ? N - 1 : i + 0.45;
            const local = clamp((smoothedRaw - start) / (end - start), 0, 1);
            const travel = (DESIGN_HEIGHTS[CONCEPTUAL_PROJECTS[i].id] ?? 1600) - DESIGN_VIEW_H;
            inner.style.transform = `scale(${scale}) translateY(${(-local * travel).toFixed(1)}px)`;
          }
        }
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleY(${(p / (N - 1)).toFixed(4)})`;
        const nextActive = Math.round(p);
        if (nextActive !== lastActive) {
          lastActive = nextActive;
          setActive(nextActive);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layout]);

  const current = CONCEPTUAL_PROJECTS[active] ?? CONCEPTUAL_PROJECTS[0];
  const frameH = (layout.frameW * DESIGN_VIEW_H) / DESIGN_W;
  const centerY = layout.stageH * (layout.isDesktop ? 0.5 : 0.44);
  // Bloque de datos: a la derecha de la página si cabe; si no, debajo
  const metaBeside = layout.isDesktop && layout.vw / 2 + layout.frameW / 2 + 24 + 250 < layout.vw - 24;
  const metaTop = metaBeside
    ? centerY + frameH / 2 - 130
    : Math.min(layout.stageH - 150, centerY + frameH / 2 + 22);

  return (
    <div
      ref={trackRef}
      className="relative bg-black"
      style={{ height: `calc(${N - 1} * 92vh + 100dvh - ${layout.isDesktop ? 74 : 64}px)` }}
    >
      <section
        aria-label="Proyectos conceptuales de SENSIA LABs"
        className="sticky top-16 lg:top-[74px] w-full overflow-hidden bg-black text-white select-none"
        style={{ height: layout.stageH, perspective: '1600px' }}
      >
        {/* Bloque técnico superior izquierdo */}
        <div className="absolute left-4 sm:left-8 top-5 z-[1100] pointer-events-none max-w-[60vw] lg:max-w-[280px] space-y-4 font-mono text-[10px] sm:text-[11px] leading-[1.35] uppercase tracking-wide">
          <h1 className="font-display text-base sm:text-xl lg:text-2xl leading-[1.05] normal-case tracking-tight">
            PROYECTOS QUE REVELAN LO QUE NO SE VE.
          </h1>
          <p className="hidden sm:block text-white/85">
            {AREAS.map((a, i) => (
              <span key={a} className={`block ${i === active ? 'text-white' : 'text-white/45'}`}>
                {a}
              </span>
            ))}
          </p>
          <p className="hidden lg:block text-white/60">
            Archivo conceptual
            <br />
            Demostraciones de estudio
            <br />
            Sin clientes ni resultados reales
          </p>
          <p className="hidden lg:block text-white/85">
            Y26
            <br />
            SENSIA.LABS
          </p>
        </div>

        {/* Índice lateral derecho: salto a cada proyecto */}
        <nav
          aria-label="Ir a un proyecto"
          className="absolute right-3 sm:right-8 top-5 z-[1100] flex flex-col items-end gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase"
        >
          {CONCEPTUAL_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollToProject(i)}
              aria-current={i === active ? 'step' : undefined}
              aria-label={`Proyecto ${p.number}: ${p.title} (${p.category})`}
              className={`flex items-center gap-2 py-0.5 cursor-pointer transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white ${
                i === active ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span className="hidden md:inline">{p.category}</span>
              <span className="tabular-nums">{p.number}</span>
              <span
                className="block h-[3px] transition-all duration-300"
                style={{ width: i === active ? 22 : 8, background: i === active ? p.accentPrimary : 'rgba(255,255,255,0.3)' }}
              />
            </button>
          ))}
          <div className="mt-3 w-[2px] h-16 bg-white/15 overflow-hidden self-end" aria-hidden="true">
            <div ref={progressBarRef} className="w-full h-full bg-white origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>
        </nav>

        {/* Pila de páginas */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {CONCEPTUAL_PROJECTS.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.id}
                ref={(el) => {
                  pageRefs.current[i] = el;
                }}
                className="absolute left-1/2 will-change-transform"
                style={{ top: centerY, transform: 'translate3d(-50%, -50%, 0)' }}
              >
                <a
                  href={projectPath(p)}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    if (isActive) onOpen(p);
                    else scrollToProject(i);
                  }}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={isActive ? undefined : true}
                  aria-label={`Abrir el proyecto ${p.number}: ${p.title}. ${p.category}. Demostración conceptual.`}
                  className={`group block relative shadow-[0_30px_80px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D6B6] ${
                    isActive ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <PageFrame
                    project={p}
                    width={layout.frameW}
                    innerRef={(el) => {
                      innerRefs.current[i] = el;
                    }}
                  />
                  <div
                    ref={(el) => {
                      dimRefs.current[i] = el;
                    }}
                    className="absolute inset-0 bg-black pointer-events-none"
                    style={{ opacity: 0 }}
                  />
                  {isActive && (
                    <span
                      className="absolute inset-0 pointer-events-none border-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
                      style={{ borderColor: p.accentPrimary }}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </div>

        {/* Bloque técnico del proyecto activo, junto al borde inferior derecho de la página */}
        <div
          className="absolute z-[1100] font-mono text-[10px] sm:text-[11px] leading-[1.35] uppercase tracking-wide"
          style={
            metaBeside
              ? { left: `calc(50% + ${Math.round(layout.frameW / 2) + 24}px)`, top: metaTop, width: 250 }
              : layout.isDesktop
                ? { left: `calc(50% - ${Math.round(layout.frameW / 2)}px)`, top: metaTop, width: layout.frameW }
                : { left: 16, right: 16, top: metaTop }
          }
        >
          <div className={`space-y-2.5 sm:space-y-3 ${metaBeside ? '' : 'bg-black/85 p-3 -mx-3'}`}>
            <TypeText className="block text-white" text={`${current.number} / ${String(N).padStart(2, '0')} — ${current.title}`} />
            <TypeText className="block text-white/70" text={`${current.category} · ${current.methodology}`} />
            <TypeText className="block text-white/50" text={`Demostración conceptual · Y${current.year.slice(2)}`} />
            <button
              type="button"
              onClick={() => onOpen(current)}
              className="inline-flex items-center gap-2 mt-1 px-3 py-2 bg-white text-black hover:bg-[#00D6B6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D6B6]"
            >
              <span>Abrir proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="absolute left-4 sm:left-8 bottom-4 z-[1100] font-mono text-[10px] uppercase tracking-widest text-white/45 pointer-events-none">
          {active === N - 1 ? 'Sigue bajando para continuar' : 'Desplázate para descubrir el siguiente proyecto'}
        </p>
      </section>
    </div>
  );
};

/* Alternativa para movimiento reducido: las mismas páginas, en una secuencia estática */
const ProjectsStaticList: React.FC<{ onOpen: (p: ConceptualProject) => void }> = ({ onOpen }) => {
  const [w, setW] = useState(900);
  useLayoutEffect(() => {
    const m = () => setW(Math.min(1040, window.innerWidth - 32));
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  return (
    <section aria-label="Proyectos conceptuales de SENSIA LABs" className="bg-black text-white py-12 lg:py-16">
      <div className="max-w-[1100px] mx-auto px-4 space-y-12">
        <h1 className="font-display text-2xl sm:text-4xl tracking-tight">PROYECTOS QUE REVELAN LO QUE NO SE VE.</h1>
        {CONCEPTUAL_PROJECTS.map((p) => (
          <article key={p.id} className="space-y-3">
            <a
              href={projectPath(p)}
              onClick={(e) => {
                e.preventDefault();
                onOpen(p);
              }}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D6B6]"
              aria-label={`Abrir el proyecto ${p.number}: ${p.title}`}
            >
              <PageFrame project={p} width={w} />
            </a>
            <p className="font-mono text-[11px] uppercase tracking-wide text-white/70">
              {p.number} — {p.title} · {p.category} · Demostración conceptual
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export const ProjectsPage: React.FC = () => {
  const { projectSlug, highlightedProjectId, navigate } = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const selectedProject = resolveProjectId(projectSlug) ?? resolveProjectId(highlightedProjectId);
  const openProject = useCallback(
    (p: ConceptualProject) => {
      returnToIndex = CONCEPTUAL_PROJECTS.findIndex((x) => x.id === p.id);
      navigate(projectPath(p));
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    if (selectedProject) returnToIndex = CONCEPTUAL_PROJECTS.findIndex((x) => x.id === selectedProject.id);
    navigate('/proyectos');
  }, [navigate, selectedProject]);

  const scrollToProject = (i: number) => {
    const main = document.getElementById('main-content');
    const top = main ? main.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: top + i, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // =========================================================================
  // VISTA DETALLADA DEL PROYECTO (/proyectos/:slug)
  // =========================================================================
  if (selectedProject) {
    const totalProjects = N;
    const detailIdx = CONCEPTUAL_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevDetail =
      detailIdx > 0 ? CONCEPTUAL_PROJECTS[detailIdx - 1] : CONCEPTUAL_PROJECTS[totalProjects - 1];
    const nextDetail =
      detailIdx < totalProjects - 1 ? CONCEPTUAL_PROJECTS[detailIdx + 1] : CONCEPTUAL_PROJECTS[0];

    return (
      <div className="bg-black text-white min-h-screen">
        <div className="border-b border-white/15 bg-black">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-[#00D6B6] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a proyectos</span>
            </button>

            <span className="font-mono text-xs uppercase tracking-widest text-white/60">
              PROYECTO {selectedProject.number} · {selectedProject.category}
            </span>
          </div>
        </div>

        <section className="py-12 lg:py-16">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
            <div className="bg-white text-black border border-white p-6 sm:p-10 lg:p-14 space-y-10">
              <div className="space-y-4 border-b border-black/15 pb-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-black/60">
                  <span
                    className="w-3 h-3 shrink-0"
                    style={{ backgroundColor: selectedProject.accentPrimary }}
                    aria-hidden="true"
                  />
                  <span className="text-black font-bold">
                    PROYECTO {selectedProject.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>Demostración conceptual</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight leading-[1.01] text-black">
                  {selectedProject.title}
                </h1>

                <p className="text-base sm:text-xl text-black/75 max-w-3xl leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 aspect-[16/10] bg-neutral-100 border border-black/15 overflow-hidden">
                  <img
                    src={selectedProject.primaryImage}
                    alt={selectedProject.primaryImageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-4 aspect-[4/3] lg:aspect-auto bg-neutral-900 border border-black/15 overflow-hidden">
                  {selectedProject.id === 'el-color-que-convierte' ? (
                    <EyePerceptionArtwork isActive />
                  ) : (
                    <img
                      src={selectedProject.secondaryImage ?? selectedProject.primaryImage}
                      alt={selectedProject.secondaryImageAlt ?? selectedProject.primaryImageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-2">
                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0042FD] font-semibold">
                    01 · Contexto
                  </span>
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                    {selectedProject.context}
                  </p>
                </div>

                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FE5D0A] font-semibold">
                    02 · Reto
                  </span>
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00D6B6] font-semibold">
                    03 · Objetivo
                  </span>
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                    {selectedProject.objective}
                  </p>
                </div>

                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                    04 · Metodología
                  </span>
                  <p className="text-sm font-semibold text-black">{selectedProject.methodology}</p>
                  <p className="text-sm text-black/75 leading-relaxed">
                    {selectedProject.methodDetail}
                  </p>
                </div>

                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/60 font-semibold">
                    05 · Alcance demostrativo
                  </span>
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                    Planteamiento editorial demostrativo diseñado por SENSIA LABs para ilustrar cómo
                    investigamos antes de diseñar o producir, sin atribución de métricas a clientes
                    reales.
                  </p>
                </div>

                <div className="space-y-2 border-t border-black/20 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0042FD] font-semibold">
                    06 · Aprendizajes y aplicación
                  </span>
                  <ul className="space-y-2 text-sm text-black/80">
                    {selectedProject.findings.map((finding) => (
                      <li key={finding} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0042FD] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-black/60 pt-2 leading-relaxed">
                    {selectedProject.strategicApplication}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => openProject(prevDetail)}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/75 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Proyecto {prevDetail.number}</span>
              </button>

              <button
                type="button"
                onClick={goBack}
                className="px-5 py-2.5 border border-white/25 hover:border-white font-mono text-xs uppercase tracking-widest text-white cursor-pointer"
              >
                Volver a la galería
              </button>

              <button
                type="button"
                onClick={() => openProject(nextDetail)}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/75 hover:text-white cursor-pointer"
              >
                <span>Proyecto {nextDetail.number}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-[#0042FD] text-white">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-8 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight leading-[1.03] max-w-3xl">
              ¿INVESTIGAMOS TU PRÓXIMO PROYECTO?
            </h2>
            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-black hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>HABLEMOS DE TU PROYECTO</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // 1. EXPERIENCIA DE PÁGINAS SUPERPUESTAS + 2. CIERRE (ANTES DEL FOOTER GLOBAL)
  // =========================================================================
  return (
    <div className="bg-black text-white">
      {reducedMotion ? (
        <ProjectsStaticList onOpen={openProject} />
      ) : (
        <ProjectsStack onOpen={openProject} />
      )}

      {/* BLOQUE 2: SECCIÓN FINAL DE CIERRE (SEPARADA DE LA GALERÍA Y PREVIA AL FOOTER GLOBAL) */}
      <section
        id="proyectos-cierre"
        className="py-20 lg:py-28 bg-[#0042FD] text-white border-t border-white/15"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-white/80">
              SENSIA LABs · Investigación aplicada
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.02] text-white">
              ¿INVESTIGAMOS TU PRÓXIMO PROYECTO?
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-black hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>HABLEMOS DE TU PROYECTO</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToProject(0)}
              className="inline-flex items-center gap-2 px-5 py-4 border border-white/35 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
              <span>Volver al proyecto 01</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
