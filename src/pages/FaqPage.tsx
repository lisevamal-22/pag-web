import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/editorialData';
import { useRouter } from '../context/RouterContext';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <div>
      {/* Header */}
      <section className="bg-white text-black py-20 lg:py-28 border-b border-black/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
            Preguntas frecuentes
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.03]">
            CLARIDAD ANTES DE EMPEZAR A INVESTIGAR.
          </h1>
          <p className="text-base sm:text-xl text-black/75 max-w-xl">
            Dudas habituales sobre servicios, procesos y resultados.
          </p>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-16 lg:py-24 bg-white text-black">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="divide-y divide-black/15 border-y border-black/15">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <h2 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      id={`${item.id}-button`}
                      className="w-full py-6 flex items-center justify-between gap-6 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#0042FD]"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-semibold text-[#0042FD] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-display text-lg sm:text-xl lg:text-2xl text-black group-hover:text-[#0042FD] transition-colors">
                          {item.question}
                        </span>
                      </div>
                      <span className="w-9 h-9 border border-black/15 flex items-center justify-center shrink-0 group-hover:border-black transition-colors">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h2>

                  {isOpen && (
                    <div
                      id={`${item.id}-panel`}
                      role="region"
                      aria-labelledby={`${item.id}-button`}
                      className="pb-7 pl-0 sm:pl-9 pr-4"
                    >
                      <p className="text-base text-black/80 leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Orientation CTA */}
          <div className="mt-16 p-8 sm:p-10 bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl text-white">
                ¿Prefieres descubrir directamente qué podemos investigar en tu caso?
              </h2>
              <p className="text-sm text-white/75">
                Empieza por tu necesidad empresarial o escríbenos para valorar tu proyecto.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/', { scrollToId: 'asistente' })}
                className="px-5 py-3.5 bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#00D6B6] hover:text-black transition-colors cursor-pointer"
              >
                Traductor de necesidades
              </button>
              <button
                type="button"
                onClick={() => navigate('/contacto')}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/35 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <span>Contacto</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
