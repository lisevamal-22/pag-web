import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectCase } from '../data/editorialData';
import { useRouter } from '../context/RouterContext';

const PROJECT_FILTERS: ProjectCategory[] = [
  'Todos',
  'Investigación',
  'Neuromarketing',
  'Percepción',
  'Experiencia de marca',
];

/**
 * Portfolio inmersivo y deslizable horizontal sobre fondo negro (#000000).
 * Soporta arrastre con ratón, swipe táctil, flechas, indicador de posición y ficha completa.
 */
export const ProjectsCarousel: React.FC = () => {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<ProjectCategory>('Todos');
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [openProject, setOpenProject] = useState<ProjectCase | null>(null);

  const dragStartRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const filtered =
    filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const total = filtered.length;
  const clampedIndex = Math.min(activeIndex, Math.max(0, total - 1));

  const goPrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartRef.current = e.clientX;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    const dx = e.clientX - dragStartRef.current;
    if (Math.abs(dx) > 6) isDraggingRef.current = true;
    setDragOffset(dx);
  };

  const handlePointerUp = () => {
    if (dragStartRef.current === null) return;
    if (dragOffset < -55) {
      goNext();
    } else if (dragOffset > 55) {
      goPrev();
    }
    dragStartRef.current = null;
    setDragOffset(0);
    window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  return (
    <section
      aria-labelledby="home-projects-heading"
      className="py-20 lg:py-28 bg-black text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Header compacto + filtros compactos + controles */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/15">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
              Demostraciones conceptuales
            </span>
            <h2
              id="home-projects-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
            >
              PROYECTOS
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar proyectos">
              {PROJECT_FILTERS.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white/75 border-white/20 hover:border-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold tabular-nums text-white/60">
                {String(clampedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={goPrev}
                disabled={total <= 1}
                aria-label="Proyecto anterior"
                className="w-10 h-10 border border-white/25 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-35"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={total <= 1}
                aria-label="Siguiente proyecto"
                className="w-10 h-10 border border-white/25 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-35"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Viewport deslizable horizontal (drag + touch swipe) */}
        <div
          className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translate3d(calc(-${clampedIndex * 100}% + ${dragOffset}px), 0, 0)`,
              transitionDuration: dragStartRef.current !== null ? '0ms' : '500ms',
            }}
          >
            {filtered.map((project) => (
              <article key={project.id} className="w-full shrink-0">
                <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] bg-neutral-900 overflow-hidden border border-white/15">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {/* Scrim editorial para lectura limpia con contraste alto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2.5 max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                        {project.category} · {project.demoLabel}
                      </p>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/85 line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (!isDraggingRef.current) setOpenProject(project);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-black hover:bg-[#0042FD] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Ver proyecto</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Indicador de posición + acceso a página completa */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ir al proyecto ${idx + 1}: ${item.title}`}
                className={`h-1.5 transition-all cursor-pointer ${
                  idx === clampedIndex ? 'w-10 bg-[#00D6B6]' : 'w-4 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/proyectos')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#00D6B6] cursor-pointer"
          >
            <span>Explorar archivo completo</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Modal ficha completa del proyecto (Contexto, Reto, Metodología, Hallazgos, Aplicación) */}
      {openProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpenProject(null)}
        >
          <div
            className="bg-white text-black max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-8 border border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/15">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  {openProject.category} · {openProject.demoLabel}
                </p>
                <h3 id="project-modal-title" className="font-display text-2xl sm:text-3xl text-black">
                  {openProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenProject(null)}
                aria-label="Cerrar ficha del proyecto"
                className="p-2 border border-black/20 hover:border-black cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  01. Contexto
                </h4>
                <p className="text-sm text-black/80 leading-relaxed">{openProject.context}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  02. Reto
                </h4>
                <p className="text-sm text-black/80 leading-relaxed">{openProject.challenge}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  03. Metodología
                </h4>
                <p className="text-sm text-black/80 leading-relaxed">{openProject.methodology}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  04. Aplicación estratégica
                </h4>
                <p className="text-sm text-black/80 leading-relaxed">
                  {openProject.strategicApplication}
                </p>
              </div>
            </div>

            <div className="p-5 bg-neutral-50 border border-black/15 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black">
                Resultados demostrativos y aprendizajes clave
              </h4>
              <ul className="space-y-2 text-sm text-black/80">
                {openProject.findings.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0042FD] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const pid = openProject.id;
                  setOpenProject(null);
                  navigate('/proyectos', { projectId: pid });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <span>Abrir en página de Proyectos</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenProject(null);
                  navigate('/contacto');
                }}
                className="text-xs font-semibold uppercase tracking-wider underline cursor-pointer"
              >
                Consultar un estudio similar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
