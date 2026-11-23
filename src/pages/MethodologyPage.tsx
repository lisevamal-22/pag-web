import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { MethodologyGlassStage } from '../components/MethodologyGlassStage';
import { useRouter } from '../context/RouterContext';

interface ScrollPhaseCopy {
  id: 'observar' | 'comprender' | 'interpretar' | 'transformar';
  code: string;
  title: string;
  lead: string;
  body: string;
  accentHex: string;
  highlightWord?: string;
}

const SCROLL_PHASES: ScrollPhaseCopy[] = [
  {
    id: 'observar',
    code: '01 / OBSERVAR',
    title: 'Todo comienza con una pregunta.',
    lead: 'Estado inicial: las láminas de vidrio todavía están recogidas.',
    body: 'Observamos el contexto, los estímulos y lo que ocurre alrededor del consumidor.',
    accentHex: '#0042FD',
  },
  {
    id: 'comprender',
    code: '02 / COMPRENDER',
    title: 'Miramos más allá de lo evidente.',
    lead: 'Descubrimos lo que ocurre debajo de la superficie.',
    body: 'Investigamos los procesos que explican cómo las personas perciben y reaccionan.',
    accentHex: '#00D6B6',
  },
  {
    id: 'interpretar',
    code: '03 / INTERPRETAR',
    title: 'Conectamos las señales y encontramos significado.',
    lead: 'La información dispersa adquiere una forma reconocible.',
    body: 'Transformamos la información en insights que ayudan a comprender al consumidor.',
    accentHex: '#FFD203',
    highlightWord: 'FLORECER.',
  },
  {
    id: 'transformar',
    code: '04 / TRANSFORMAR',
    title: 'El conocimiento se convierte en acción.',
    lead: 'La escultura se despliega por completo como resultado del proceso.',
    body: 'Aplicamos los insights para orientar decisiones de marca, comunicación y experiencia.',
    accentHex: '#FE5D0A',
  },
];

function getPhaseIndexFromProgress(p: number): number {
  if (p < 0.25) return 0;
  if (p < 0.5) return 1;
  if (p < 0.75) return 2;
  return 3;
}

export const MethodologyPage: React.FC = () => {
  const { navigate } = useRouter();
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(0);

  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    let ticking = false;

    const computeClampedProgress = () => {
      const track = scrollTrackRef.current;
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalScrollable = Math.max(1, rect.height - viewportH);
      return Math.max(0, Math.min(1, -rect.top / totalScrollable));
    };

    const syncReactState = () => {
      ticking = false;
      const clamped = computeClampedProgress();
      progressRef.current = clamped;
      setScrollPercent(clamped);

      const nextPhase = getPhaseIndexFromProgress(clamped);
      setActivePhaseIndex((prev) => (prev !== nextPhase ? nextPhase : prev));
    };

    const handleScrollOrResize = () => {
      progressRef.current = computeClampedProgress();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(syncReactState);
      }
    };

    syncReactState();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  const jumpToPhase = (index: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const docTop = window.scrollY + rect.top;
    const totalScrollable = Math.max(1, rect.height - window.innerHeight);
    // Centro de cada tramo para mostrar cómodamente la fase elegida sin impedir el scroll libre
    const targetProgress = index === 0 ? 0.04 : index === 1 ? 0.36 : index === 2 ? 0.62 : 0.94;
    window.scrollTo({
      top: docTop + totalScrollable * targetProgress,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const activePhase = SCROLL_PHASES[activePhaseIndex] ?? SCROLL_PHASES[0];
  const isInterpretarHighlight = activePhaseIndex === 2;

  return (
    <div className="bg-white text-black">
      {/* Encabezado editorial limpio de entrada */}
      <section className="bg-white text-black pt-14 pb-10 lg:pt-20 lg:pb-12 border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
              Metodología · Scrollytelling SENSIA LABs
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-black">
              DE LA CURIOSIDAD AL CONOCIMIENTO.
            </h1>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-black/55">
            <ArrowDown className="w-4 h-4 text-[#0042FD]" aria-hidden="true" />
            <span>Desplázate para seguir la evolución de la escultura</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA CONTINUA VINCULADA AL SCROLL (4 TRAMOS / 1 ÚNICA ESCULTURA DE VIDRIO) */}
      <section
        ref={scrollTrackRef}
        aria-label="Secuencia narrativa de metodología en cuatro fases vinculada al desplazamiento"
        className="relative min-h-[340vh] md:min-h-[420vh] bg-white"
        style={{ overflowX: 'clip' }}
      >
        <div className="sticky top-[64px] lg:top-[74px] h-[calc(100vh-64px)] lg:h-[calc(100vh-74px)] w-full overflow-hidden border-b border-black/10 bg-white">
          <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-10 py-6 lg:py-10 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-10 items-center">
            {/* ZONA VISUAL PROTAGONISTA: ESCULTURA DE VIDRIO FLUIDO + PALABRA FLORECER EN FASE 03 */}
            <div className="w-full h-[50%] lg:h-full lg:col-span-7 relative order-1 lg:order-2 flex items-center justify-center">
              <MethodologyGlassStage progressRef={progressRef} reducedMotion={reducedMotion} />

              {/* Palabra protagonista en Fase 03 sin tapar la escultura ni superponerse al texto */}
              <AnimatePresence>
                {isInterpretarHighlight && (
                  <motion.div
                    key="florecer-protagonist"
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute top-3 left-3 sm:top-6 sm:left-6"
                  >
                    <span className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-black block leading-none">
                      FLORECER.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicador discreto de fase en esquina inferior de la escena */}
              <div className="pointer-events-none absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-[11px] font-semibold uppercase tracking-widest text-black/45 tabular-nums">
                Fase 0{activePhaseIndex + 1} · 04
              </div>
            </div>

            {/* ZONA DE TEXTO SINCRONIZADA CON EL SCROLL (SIN SUPERPOSICIONES) */}
            <div className="w-full h-[50%] lg:h-auto lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between lg:justify-center gap-6 lg:gap-10">
              {/* Barra de progreso continuo vinculada directamente al scroll */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-widest text-black/45">
                  <span>Progreso continuo</span>
                  <span className="tabular-nums">{Math.round(scrollPercent * 100)}%</span>
                </div>
                <div className="w-full h-[3px] bg-black/10 overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full transition-colors duration-300 origin-left"
                    style={{
                      width: `${Math.max(4, scrollPercent * 100)}%`,
                      backgroundColor: activePhase.accentHex,
                    }}
                  />
                </div>

                {/* Referencia limpia de las 4 fases (no botones protagonistas; solo marcadores de posición) */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {SCROLL_PHASES.map((ph, idx) => {
                    const isCurrent = idx === activePhaseIndex;
                    return (
                      <button
                        key={ph.id}
                        type="button"
                        onClick={() => jumpToPhase(idx)}
                        aria-current={isCurrent ? 'step' : undefined}
                        className={`text-left text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                          isCurrent ? 'text-black' : 'text-black/35 hover:text-black/70'
                        }`}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 mr-1.5 align-middle"
                          style={{
                            backgroundColor: isCurrent ? ph.accentHex : 'rgba(0,0,0,0.2)',
                          }}
                          aria-hidden="true"
                        />
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bloque narrativo de la fase actual */}
              <div className="min-h-[175px] sm:min-h-[210px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase.id}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <span
                      className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest"
                      style={{
                        color:
                          activePhase.accentHex === '#FFD203' ? '#000000' : activePhase.accentHex,
                      }}
                    >
                      {activePhase.code}
                    </span>

                    <h2 className="font-display text-2xl sm:text-4xl lg:text-[42px] tracking-tight leading-[1.08] text-black">
                      {activePhase.title}
                    </h2>

                    <p className="text-sm sm:text-lg text-black/80 leading-relaxed max-w-md">
                      {activePhase.body}
                    </p>

                    <p className="text-xs sm:text-sm text-black/50 pt-1">{activePhase.lead}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIERRE DE LA EXPERIENCIA */}
      <section className="py-24 lg:py-36 bg-black text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
              Cierre metodológico · SENSIA LABs
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-white">
              DE LA CURIOSIDAD AL CONOCIMIENTO.
            </h2>
            <p className="text-base sm:text-xl text-white/75 max-w-2xl leading-relaxed">
              Cada pregunta de negocio requiere elegir cómo observar, comprender, interpretar y
              transformar la información en decisiones claras.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/servicios')}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>DESCUBRE QUÉ PODEMOS INVESTIGAR</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
