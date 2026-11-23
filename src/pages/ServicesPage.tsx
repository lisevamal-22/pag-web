import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { ServiceVisualStage } from '../components/ServiceShowcaseVisual';
import { NeedsTranslator } from '../components/NeedsTranslator';
import { useRouter } from '../context/RouterContext';

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();

  const [s1, s2, s3, s4, s5, s6] = SERVICES;

  return (
    <div>
      {/* Hero visual de escaparate */}
      <section className="bg-black text-white py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
            Qué hacemos · Nuestras especialidades
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.03] text-white max-w-4xl">
            SEIS FORMAS DE ENTENDER LO QUE HAY DETRÁS DE CADA DECISIÓN.
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-2xl">
            Explora cada área para descubrir qué investigamos, qué preguntas responde y cómo se
            aplica a tu marca.
          </p>
        </div>
      </section>

      {/* Composición editorial visual dinámica de los 6 servicios */}
      <section className="py-16 lg:py-24 bg-white text-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Fila 1: Servicio 01 protagonista en formato horizontal 12 columnas */}
          {s1 && (
            <article className="group grid grid-cols-1 lg:grid-cols-12 border border-black overflow-hidden bg-[#0042FD] text-white">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden">
                <ServiceVisualStage serviceId={s1.slug} showLabelBadge={false} />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD203] tabular-nums block">
                    {s1.index} · Especialidad
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl leading-tight text-white">
                    {s1.title}
                  </h2>
                  <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                    {s1.showcaseSummary}
                  </p>
                </div>

                <div>
                  <a
                    href={s1.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(s1.path);
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black hover:bg-black hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Descubrir servicio</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* Fila 2: Servicios 02 (Neuromarketing, negro) y 03 (Percepción, aguamarina / blanco) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {s2 && (
              <article className="lg:col-span-7 border border-black bg-black text-white flex flex-col justify-between overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <ServiceVisualStage serviceId={s2.slug} showLabelBadge={false} />
                </div>
                <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div className="space-y-2.5 max-w-md">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6] tabular-nums block">
                      {s2.index}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-white">{s2.title}</h2>
                    <p className="text-sm sm:text-base text-white/75">{s2.showcaseSummary}</p>
                  </div>
                  <a
                    href={s2.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(s2.path);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 self-start sm:self-end"
                  >
                    <span>Descubrir</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            )}

            {s3 && (
              <article className="lg:col-span-5 border border-black bg-[#00D6B6] text-black flex flex-col justify-between overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <ServiceVisualStage serviceId={s3.slug} showLabelBadge={false} />
                </div>
                <div className="p-8 flex flex-col justify-between gap-6 flex-1">
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-black/70 tabular-nums block">
                      {s3.index}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-black">{s3.title}</h2>
                    <p className="text-sm sm:text-base text-black/85">{s3.showcaseSummary}</p>
                  </div>
                  <div>
                    <a
                      href={s3.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(s3.path);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>Descubrir servicio</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            )}
          </div>

          {/* Fila 3: Servicio 04 (Comportamiento) invertido con énfasis amarillo */}
          {s4 && (
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-black overflow-hidden bg-[#FFD203] text-black">
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-black/70 tabular-nums block">
                    {s4.index} · Especialidad
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl leading-tight text-black">
                    {s4.title}
                  </h2>
                  <p className="text-base sm:text-lg text-black/85 leading-relaxed">
                    {s4.showcaseSummary}
                  </p>
                </div>

                <div>
                  <a
                    href={s4.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(s4.path);
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Descubrir servicio</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden order-1 lg:order-2">
                <ServiceVisualStage serviceId={s4.slug} showLabelBadge={false} />
              </div>
            </article>
          )}

          {/* Fila 4: Servicios 05 (Marketing sensorial) y 06 (Experiencia de marca) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {s5 && (
              <article className="lg:col-span-6 border border-black bg-white text-black flex flex-col justify-between overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <ServiceVisualStage serviceId={s5.slug} showLabelBadge={false} />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-between gap-6 flex-1">
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#0042FD] tabular-nums block">
                      {s5.index}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-black">{s5.title}</h2>
                    <p className="text-sm sm:text-base text-black/75">{s5.showcaseSummary}</p>
                  </div>
                  <div>
                    <a
                      href={s5.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(s5.path);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>Descubrir servicio</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {s6 && (
              <article className="lg:col-span-6 border border-black bg-[#FE5D0A] text-white flex flex-col justify-between overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <ServiceVisualStage serviceId={s6.slug} showLabelBadge={false} />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-between gap-6 flex-1">
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/80 tabular-nums block">
                      {s6.index}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-white">{s6.title}</h2>
                    <p className="text-sm sm:text-base text-white/90">{s6.showcaseSummary}</p>
                  </div>
                  <div>
                    <a
                      href={s6.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(s6.path);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>Descubrir servicio</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Asistente de necesidades para orientar hacia el servicio adecuado */}
      <NeedsTranslator variant="editorial" />
    </div>
  );
};
