import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/brandConfig';

/**
 * Sección TESTIMONIOS: composición editorial visual sobre fondo negro (#000000).
 * Combina retrato/identidad visual con jerarquía tipográfica limpia sin tarjetas genéricas.
 * Los elementos sin autorización real están claramente identificados como DEMO / provisionales.
 */
export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef<number | null>(null);

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];

  const handlePrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    setDragOffset(e.clientX - dragStartRef.current);
  };

  const handlePointerUp = () => {
    if (dragStartRef.current === null) return;
    if (dragOffset < -50) handleNext();
    else if (dragOffset > 50) handlePrev();
    dragStartRef.current = null;
    setDragOffset(0);
  };

  if (!current) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-28 bg-black text-white border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
              Testimonios · Formato editorial
            </span>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white max-w-3xl"
            >
              LO QUE OCURRE CUANDO MIRAMOS MÁS ALLÁ.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold tabular-nums text-white/60 mr-1">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Testimonio anterior"
              className="w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente testimonio"
              className="w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Viewport editorial deslizable de testimonios con retrato visual */}
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
              transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
              transitionDuration: dragStartRef.current !== null ? '0ms' : '500ms',
            }}
          >
            {TESTIMONIALS.map((item, idx) => (
              <article key={item.id} className="w-full shrink-0 pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Bloque visual de identidad: retrato con presencia editorial y etiqueta provisional */}
                  <div className="lg:col-span-4 flex flex-row sm:flex-row lg:flex-col items-end lg:items-stretch gap-5">
                    <div className="relative w-32 sm:w-44 lg:w-full max-w-[320px] aspect-[4/5] bg-neutral-900 border border-white/20 overflow-hidden shrink-0">
                      {item.photoUrl ? (
                        <img
                          src={item.photoUrl}
                          alt={item.photoAlt ?? item.name}
                          referrerPolicy="no-referrer"
                          draggable={false}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-2xl text-white/45">
                          DEMO
                        </div>
                      )}

                      <span
                        className="absolute top-0 left-0 w-14 h-1.5"
                        style={{
                          backgroundColor:
                            idx === 0 ? '#00D6B6' : idx === 1 ? '#FFD203' : '#FE5D0A',
                        }}
                        aria-hidden="true"
                      />

                      {item.isDemo && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3.5 py-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFD203]">
                            Imagen provisional · DEMO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Identificador de marca / empresa colaboradora */}
                    {item.companyLogoLabel && (
                      <div className="lg:max-w-[320px] pt-2 border-t border-white/15 flex items-center justify-between gap-3 w-full">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-white/80 font-semibold">
                          {item.companyLogoLabel}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                          Identidad placeholder
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Testimonio protagonista y atribución editorial */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60">
                      {item.demoBadge && (
                        <span className="text-[#FFD203] font-semibold">{item.demoBadge}</span>
                      )}
                      {item.sector && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.sector}</span>
                        </>
                      )}
                      {item.collaborationType && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#00D6B6]">{item.collaborationType}</span>
                        </>
                      )}
                    </div>

                    <blockquote className="font-display text-2xl sm:text-4xl lg:text-[42px] text-white leading-[1.09] text-balance">
                      «{item.quote}»
                    </blockquote>

                    <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <p className="font-display text-lg sm:text-xl text-white">{item.name}</p>
                      <p className="text-xs sm:text-sm text-white/70">
                        {item.role} <span aria-hidden="true">·</span> {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Indicadores de posición */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ver testimonio ${idx + 1}`}
                className={`h-1.5 transition-all cursor-pointer ${
                  idx === activeIndex ? 'w-10 bg-[#00D6B6]' : 'w-4 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-white/50">
            Retratos, identidades y citas de muestra (DEMO) listos para sustituir por casos reales
            autorizados.
          </p>
        </div>
      </div>
    </section>
  );
};
