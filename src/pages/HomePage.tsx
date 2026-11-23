import React, { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { HeroMotionCanvas } from '../components/HeroMotionCanvas';
import { CognitiveConceptsStage } from '../components/CognitiveConceptsStage';
import { NeedsTranslator } from '../components/NeedsTranslator';
import { ServiceShowcaseVisual, ServiceDisciplineItem } from '../components/ServiceShowcaseVisual';
import { MethodologyPlantCanvas } from '../components/MethodologyPlantCanvas';
import { PerceptionPreviewExperiment } from '../components/PerceptionPreviewExperiment';
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  COGNITIVE_CONCEPTS,
  METHODOLOGY_PHASES,
  INSIGHT_ARTICLES,
  FAQ_ITEMS,
} from '../data/editorialData';
import { useRouter } from '../context/RouterContext';

const SERVICE_DISCIPLINES: ServiceDisciplineItem[] = [
  {
    id: 'investigacion-consumidor',
    slug: 'investigacion-consumidor',
    title: 'Investigación del consumidor',
    summary: 'Conoce qué motiva, influye y condiciona las decisiones de tus clientes.',
    style: 'blue',
  },
  {
    id: 'neuromarketing',
    slug: 'neuromarketing',
    title: 'Neuromarketing',
    summary: 'Descubre cómo reaccionan las personas ante los estímulos de tu marca.',
    style: 'black',
  },
  {
    id: 'percepcion',
    slug: 'percepcion',
    title: 'Percepción',
    summary: 'Comprende cómo interpretan los consumidores tu marca, productos y mensajes.',
    style: 'white',
  },
  {
    id: 'comportamiento',
    slug: 'comportamiento',
    title: 'Comportamiento',
    summary: 'Investiga qué hay detrás de las elecciones y decisiones de compra.',
    style: 'white',
  },
  {
    id: 'marketing-sensorial',
    slug: 'marketing-sensorial',
    title: 'Marketing sensorial',
    summary: 'Diseña experiencias que conecten con los sentidos de tus consumidores.',
    style: 'aqua',
  },
  {
    id: 'experiencia-marca',
    slug: 'experiencia-marca',
    title: 'Experiencia de marca',
    summary: 'Comprende cómo viven, perciben y recuerdan tu marca tus clientes.',
    style: 'orange',
  },
];

const HOME_FAQ_IDS = ['faq-1', 'faq-2', 'faq-3', 'faq-5', 'faq-8', 'faq-9', 'faq-10'];

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  const [activeConceptId, setActiveConceptId] = useState<string>(COGNITIVE_CONCEPTS[0].id);
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>(SERVICE_DISCIPLINES[0].id);
  const [activePhaseId, setActivePhaseId] = useState<string>(METHODOLOGY_PHASES[0].id);
  const [openFaqId, setOpenFaqId] = useState<string | null>(HOME_FAQ_IDS[0]);

  const activeConcept =
    COGNITIVE_CONCEPTS.find((c) => c.id === activeConceptId) ?? COGNITIVE_CONCEPTS[0];
  const activePhase =
    METHODOLOGY_PHASES.find((p) => p.id === activePhaseId) ?? METHODOLOGY_PHASES[0];
  const activeDiscipline =
    SERVICE_DISCIPLINES.find((d) => d.id === activeDisciplineId) ?? SERVICE_DISCIPLINES[0];

  const homeFaqs = FAQ_ITEMS.filter((item) => HOME_FAQ_IDS.includes(item.id));

  const scrollToAssistant = () => {
    const el = document.getElementById('asistente');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* 01. HERO: MOTION GRAPHICS ORGÁNICO EN PALETA OFICIAL SENSIA LABs */}
      <section
        aria-label="Portada SENSIA LABs"
        className="relative min-h-[calc(100vh-74px)] flex items-end lg:items-center bg-white overflow-hidden"
      >
        <HeroMotionCanvas />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20 pointer-events-none">
          <div className="max-w-3xl space-y-6 pointer-events-auto">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[72px] xl:text-[80px] leading-[0.96] tracking-tight text-black">
              ENTIENDE LO QUE HAY DETRÁS DE CADA DECISIÓN.
            </h1>

            <p className="text-base sm:text-xl text-black/85 font-medium max-w-xl">
              Investigamos cómo las personas perciben, sienten y eligen.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToAssistant}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0042FD]"
              >
                <span>DESCUBRE QUÉ PODEMOS INVESTIGAR</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 02. INVESTIGAMOS LO QUE NO SE VE — MOTION GRAPHICS EXPLICATIVO */}
      <section aria-labelledby="unseen-heading" className="bg-black text-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2
              id="unseen-heading"
              className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white max-w-3xl"
            >
              INVESTIGAMOS LO QUE NO SE VE.
            </h2>
            <p className="text-sm sm:text-base text-white/65 max-w-sm">
              Selecciona un concepto para ver el ejemplo visual en movimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {COGNITIVE_CONCEPTS.map((concept) => {
                const isActive = concept.id === activeConcept.id;
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => setActiveConceptId(concept.id)}
                    aria-pressed={isActive}
                    className={`p-6 text-left border transition-colors duration-150 flex flex-col justify-between min-h-[120px] cursor-pointer ${
                      isActive
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white'
                    }`}
                  >
                    <span
                      className="w-3 h-3 block"
                      style={{ backgroundColor: concept.accentHex }}
                      aria-hidden="true"
                    />
                    <span className="font-display text-xl sm:text-2xl tracking-tight">
                      {concept.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 border border-white/20 p-6 sm:p-8 flex flex-col justify-between gap-5 bg-white/[0.02]">
              <CognitiveConceptsStage conceptId={activeConcept.id} />

              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl text-white">
                  {activeConcept.subtitle}
                </h3>
                <p className="text-sm text-white/75">{activeConcept.exampleQuestion}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. ASISTENTE DE NECESIDADES (6 OPCIONES) */}
      <NeedsTranslator />

      {/* 04. QUÉ HACEMOS (CONTENIDO VISUAL PROTAGONISTA POR SERVICIO) */}
      <section aria-labelledby="home-services-heading" className="py-20 lg:py-28 bg-white text-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/15">
            <h2
              id="home-services-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black"
            >
              QUÉ HACEMOS
            </h2>
            <button
              type="button"
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] cursor-pointer self-start sm:self-auto"
            >
              <span>Ver detalle completo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Escenario visual protagonista cambiante */}
            <div className="lg:col-span-6">
              <ServiceShowcaseVisual
                discipline={activeDiscipline}
                onExplore={(slug) => navigate(`/servicios/${slug}`)}
              />
            </div>

            {/* Selector editorial variado de 6 áreas */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SERVICE_DISCIPLINES.map((item) => {
                const isSelected = item.id === activeDisciplineId;
                const bgClass =
                  item.style === 'black'
                    ? 'bg-black text-white border-black'
                    : item.style === 'aqua'
                    ? 'bg-[#00D6B6] text-black border-[#00D6B6]'
                    : item.style === 'orange'
                    ? 'bg-[#FE5D0A] text-white border-[#FE5D0A]'
                    : item.style === 'blue'
                    ? 'bg-[#0042FD] text-white border-[#0042FD]'
                    : 'bg-white text-black border-black/20 hover:border-black';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDisciplineId(item.id)}
                    aria-pressed={isSelected}
                    className={`p-5 sm:p-6 text-left border transition-transform duration-150 cursor-pointer flex flex-col justify-between min-h-[130px] ${bgClass} ${
                      isSelected ? 'ring-2 ring-offset-2 ring-black' : ''
                    }`}
                  >
                    <span className="font-display text-xl sm:text-2xl leading-tight">
                      {item.title}
                    </span>
                    <span className="text-xs opacity-85 pt-3">{item.summary}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05. METODOLOGÍA — HISTORIA VISUAL INTERACTIVA DE CRECIMIENTO (SIN FRANJA NEGRA) */}
      <section
        aria-labelledby="home-methodology-heading"
        className="py-20 lg:py-28 bg-white text-black border-t border-black/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                Metodología
              </span>
              <h2
                id="home-methodology-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black"
              >
                DE LA CURIOSIDAD AL CONOCIMIENTO.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/metodologia')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] cursor-pointer self-start sm:self-auto"
            >
              <span>Ver metodología</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Motion graphics narrativo de la planta */}
            <div className="lg:col-span-7">
              <MethodologyPlantCanvas phaseId={activePhase.id} />
            </div>

            {/* Selector de las 4 fases + breve explicación */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {METHODOLOGY_PHASES.map((phase) => {
                  const isSelected = phase.id === activePhase.id;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setActivePhaseId(phase.id)}
                      aria-pressed={isSelected}
                      className={`p-4 sm:p-5 text-left border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/15 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold tabular-nums ${
                            isSelected ? 'text-[#00D6B6]' : 'text-[#0042FD]'
                          }`}
                        >
                          {phase.index}
                        </span>
                        <span className="font-display text-lg sm:text-xl">{phase.title}</span>
                      </div>
                      <span
                        className="w-2.5 h-2.5 shrink-0"
                        style={{ backgroundColor: phase.accentHex }}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="p-5 border border-black/15 bg-neutral-50">
                <p className="text-sm sm:text-base text-black/85 leading-relaxed">
                  {activePhase.objective}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. EXPERIENCIA DE PERCEPCIÓN */}
      <PerceptionPreviewExperiment />

      {/* 07. PROYECTOS — PORTFOLIO INMERSIVO DESLIZABLE */}
      <ProjectsCarousel />

      {/* 08. TESTIMONIOS — CARRUSEL INTERACTIVO */}
      <TestimonialsSection />

      {/* 09. SENSIA INSIGHTS */}
      <section aria-labelledby="home-insights-heading" className="py-20 lg:py-28 bg-white text-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/15">
            <h2
              id="home-insights-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black"
            >
              SENSIA INSIGHTS
            </h2>
            <button
              type="button"
              onClick={() => navigate('/insights')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] cursor-pointer self-start sm:self-auto"
            >
              <span>Explorar revista</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INSIGHT_ARTICLES.slice(0, 3).map((article) => (
              <article key={article.slug} className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  {article.coverImage && (
                    <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.coverAlt ?? article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-xs text-black/55 block">
                      {article.category} · {article.readTime}
                    </span>
                    <h3 className="font-display text-xl text-black leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/insights/${article.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0042FD] hover:underline cursor-pointer self-start"
                >
                  <span>Leer</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PREGUNTAS FRECUENTES EN HOMEPAGE (ACORDEÓN MINIMALISTA) */}
      <section
        aria-labelledby="home-faq-heading"
        className="py-20 lg:py-28 bg-neutral-50 text-black border-t border-black/10"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/15">
            <h2
              id="home-faq-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black"
            >
              ¿TIENES DUDAS?
            </h2>
            <button
              type="button"
              onClick={() => navigate('/faq')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] cursor-pointer self-start sm:self-auto"
            >
              <span>Ver todas las preguntas</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-black/15 border-b border-black/15">
            {homeFaqs.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-6 text-left cursor-pointer group"
                  >
                    <span className="font-display text-lg sm:text-xl text-black group-hover:text-[#0042FD] transition-colors">
                      {item.question}
                    </span>
                    <span
                      className="w-8 h-8 border border-black/20 flex items-center justify-center shrink-0 group-hover:border-black transition-colors"
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-12 text-sm sm:text-base text-black/75 leading-relaxed max-w-3xl">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <section aria-labelledby="home-final-cta-heading" className="py-24 lg:py-32 bg-[#0042FD] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl space-y-8">
            <h2
              id="home-final-cta-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-white"
            >
              ¿QUÉ TE GUSTARÍA DESCUBRIR?
            </h2>
            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-black hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>HABLEMOS DE TU PROYECTO</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
