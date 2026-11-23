import React from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, Sparkles } from 'lucide-react';
import { SERVICES, getServiceBySlug, ServiceItem } from '../data/servicesData';
import { PROJECTS } from '../data/editorialData';
import { ServiceVisualStage } from '../components/ServiceShowcaseVisual';
import { useRouter } from '../context/RouterContext';
import { useNeeds } from '../context/NeedsContext';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { payload, setPayload, clearPayload } = useNeeds();

  const service: ServiceItem = getServiceBySlug(slug) ?? SERVICES[0];
  const relatedProjects = PROJECTS.filter((p) => service.relatedProjectIds.includes(p.id));
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const hasAssistantContext = Boolean(payload.recommendation && payload.needId !== null);

  const handleGoToContact = () => {
    if (hasAssistantContext && payload.recommendation) {
      // Preserva íntegramente el contexto y notas del asistente al pasar a /contacto
      setPayload({
        ...payload,
        recommendation: {
          ...payload.recommendation,
          primaryServiceId: service.id,
        },
      });
    } else {
      // Preselección limpia de servicio para consulta directa
      setPayload({
        needId: null,
        followUpId: null,
        customChallengeText: '',
        additionalNotes: '',
        recommendation: {
          isCustomChallenge: false,
          needLabel: service.contactNeedCategory,
          primaryServiceId: service.id,
          secondaryServiceIds: [],
          recommendedTitle: service.title.toUpperCase(),
          description: service.description,
          whatWeInvestigate: service.whatWeInvestigate.map((w) => w.title),
          questionsAnswered: service.discoverExamples.map((d) => d.question),
          indicativeMethodology: service.possibleTechniques,
          businessOutcomes: service.brandContributions.map((b) => b.title),
        },
      });
    }
    navigate('/contacto');
  };

  return (
    <div>
      {/* Migas de pan y barra de contexto si viene del Asistente */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-xs text-black/60">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:text-black transition-colors"
            >
              Inicio
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/servicios"
              onClick={(e) => {
                e.preventDefault();
                navigate('/servicios');
              }}
              className="hover:text-black transition-colors"
            >
              Qué hacemos
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-black">
              {service.index}. {service.title}
            </span>
          </nav>

          <a
            href="/servicios"
            onClick={(e) => {
              e.preventDefault();
              navigate('/servicios');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/75 hover:text-[#0042FD] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Todos los servicios</span>
          </a>
        </div>

        {hasAssistantContext && payload.recommendation && (
          <div className="bg-[#0042FD] text-white">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#FFD203] shrink-0" aria-hidden="true" />
                <span>
                  Contexto conservado del asistente:{' '}
                  <strong className="font-semibold">
                    {payload.recommendation.customChallengeText
                      ? `«${payload.recommendation.customChallengeText}»`
                      : payload.recommendation.needLabel}
                  </strong>
                  . Lo trasladaremos al formulario si decides escribirnos.
                </span>
              </div>
              <button
                type="button"
                onClick={clearPayload}
                className="underline text-white/80 hover:text-white cursor-pointer shrink-0"
              >
                Descartar contexto
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 01. HERO DEL SERVICIO */}
      <section className="bg-black text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 shrink-0"
                  style={{
                    backgroundColor:
                      service.accentHex === '#000000' ? '#00D6B6' : service.accentHex,
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/75">
                  Servicio {service.index} · {service.title}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.03] text-white">
                {service.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                {service.heroUtility}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleGoToContact}
                  className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>HABLEMOS DE TU PROYECTO</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] border border-white/15 overflow-hidden">
                <ServiceVisualStage serviceId={service.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. QUÉ INVESTIGAMOS */}
      <section className="py-16 lg:py-24 bg-white text-black border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                02 · Qué investigamos
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
                FOCO DE ESTUDIO EN {service.shortTitle.toUpperCase()}
              </h2>
            </div>
            <p className="lg:col-span-6 text-base text-black/75 leading-relaxed max-w-xl lg:justify-self-end">
              {service.whatIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.whatWeInvestigate.map((pillar, i) => (
              <div
                key={pillar.title}
                className="p-6 border border-black/15 bg-neutral-50 flex flex-col justify-between gap-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold tabular-nums text-black/45">
                    0{i + 1}
                  </span>
                  <span
                    className="w-3 h-3 block"
                    style={{ backgroundColor: pillar.accentHex }}
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-black leading-snug">{pillar.title}</h3>
                  <p className="text-sm text-black/70 leading-relaxed">{pillar.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. QUÉ PODEMOS DESCUBRIR */}
      <section className="py-16 lg:py-24 bg-neutral-50 text-black border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FE5D0A]">
              03 · Qué podemos descubrir
            </p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-black">
              PREGUNTAS REALES QUE RESPONDE ESTE ESTUDIO
            </h2>
            <p className="text-base text-black/75 leading-relaxed">{service.discoverIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.discoverExamples.map((ex, idx) => (
              <div
                key={ex.question}
                className="bg-white border border-black/15 p-6 sm:p-8 flex flex-col justify-between gap-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0042FD]">
                    {ex.signalLabel}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-black/40">
                    Pregunta 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl text-black leading-snug">
                  {ex.question}
                </h3>

                <p className="text-sm text-black/65 pt-4 border-t border-black/10">
                  {ex.scenario}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CÓMO LO INVESTIGAMOS & 05. QUÉ PUEDE APORTAR A TU MARCA */}
      <section className="py-16 lg:py-24 bg-white text-black border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 04. CÓMO LO INVESTIGAMOS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                04 · Cómo lo investigamos
              </p>
              <h2 className="font-display text-3xl tracking-tight text-black">
                TÉCNICAS Y METODOLOGÍAS POSIBLES
              </h2>
              <p className="text-sm sm:text-base text-black/75 leading-relaxed">
                {service.howIntro}
              </p>
            </div>

            <ul className="divide-y divide-black/10 border-y border-black/15">
              {service.possibleTechniques.map((tech, idx) => (
                <li key={tech} className="py-4 flex items-start gap-4">
                  <span className="text-xs font-semibold tabular-nums text-[#0042FD] mt-1">
                    0{idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-black">{tech}</span>
                </li>
              ))}
            </ul>

            <p className="p-4 bg-neutral-50 border border-black/10 text-xs sm:text-sm text-black/70 leading-relaxed">
              {service.methodologyNote}
            </p>
          </div>

          {/* 05. QUÉ PUEDE APORTAR A TU MARCA */}
          <div className="lg:col-span-6 space-y-6 bg-black text-white p-6 sm:p-10">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                05 · Qué puede aportar a tu marca
              </p>
              <h2 className="font-display text-3xl tracking-tight text-white">
                DECISIONES Y VALOR APLICADO
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {service.brandValueIntro}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {service.brandContributions.map((contrib) => (
                <div
                  key={contrib.title}
                  className="p-5 bg-white/[0.05] border border-white/15 space-y-1.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D6B6] shrink-0 mt-1" aria-hidden="true" />
                    <h3 className="font-display text-lg text-white">{contrib.title}</h3>
                  </div>
                  <p className="text-sm text-white/70 pl-6 leading-relaxed">{contrib.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06. PROYECTO RELACIONADO */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-neutral-50 text-black border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  06 · Proyecto relacionado
                </p>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-black">
                  APLICACIÓN EN DEMOSTRACIÓN CONCEPTUAL
                </h2>
              </div>

              <a
                href="/proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/proyectos');
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD]"
              >
                <span>Explorar todos los proyectos</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div
              className={`grid grid-cols-1 ${
                relatedProjects.length > 1 ? 'md:grid-cols-2' : ''
              } gap-8`}
            >
              {relatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white border border-black/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  <div
                    className={`${
                      relatedProjects.length === 1 ? 'lg:col-span-5' : 'lg:col-span-12'
                    } aspect-[16/10] bg-neutral-100 overflow-hidden`}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`${
                      relatedProjects.length === 1 ? 'lg:col-span-7' : 'lg:col-span-12'
                    } p-6 sm:p-8 flex flex-col justify-between gap-5`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-black/55">
                        <span className="font-semibold text-[#0042FD]">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.demoLabel}</span>
                      </div>
                      <h3 className="font-display text-2xl text-black leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-black/75 leading-relaxed">{project.summary}</p>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/proyectos', {
                            projectId: project.id,
                            scrollToId: `proyecto-${project.id}`,
                          })
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Ver demostración completa</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navegación rápida a otros servicios */}
      <section className="py-12 bg-white text-black border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/55">
              Explorar otras especialidades
            </h2>
            <a
              href="/servicios"
              onClick={(e) => {
                e.preventDefault();
                navigate('/servicios');
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[#0042FD] hover:underline"
            >
              Ver escaparate completo →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {otherServices.map((other) => (
              <a
                key={other.slug}
                href={other.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(other.path);
                }}
                className="group p-4 border border-black/15 hover:border-black transition-colors flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tabular-nums text-black/45">
                    {other.index}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-black/30 group-hover:text-[#0042FD] transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-display text-sm text-black group-hover:text-[#0042FD] transition-colors">
                  {other.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 07. CTA FINAL */}
      <section className="py-20 lg:py-28 bg-[#0042FD] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD203]">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{service.title}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-white">
              ¿LO INVESTIGAMOS JUNTOS?
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-xl">
              {hasAssistantContext
                ? 'Conservaremos la necesidad y el contexto que indicaste en el asistente para preparar nuestra respuesta.'
                : 'Cuéntanos qué necesitas comprender de tus clientes y diseñaremos el enfoque de estudio adecuado.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGoToContact}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-black hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>HABLEMOS DE TU PROYECTO</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
