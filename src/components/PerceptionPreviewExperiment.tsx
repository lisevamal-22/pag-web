import React, { useState } from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

type ChoiceKey = 'profiles' | 'vessel' | 'alternating';

const CHOICES: { key: ChoiceKey; label: string }[] = [
  { key: 'profiles', label: 'Dos perfiles humanos enfrentados en azul' },
  { key: 'vessel', label: 'Una copa o figura geométrica central en blanco' },
  { key: 'alternating', label: 'Alternan ambos según dónde fije la mirada' },
];

/**
 * Sección 7.4: Experiencia de percepción divulgativa en la Homepage ("NO TODOS VEMOS LO MISMO.").
 * Estímulo figura-fondo ambiguo clásico adaptado al lenguaje geométrico de SENSIA LABs.
 */
export const PerceptionPreviewExperiment: React.FC = () => {
  const { navigate } = useRouter();
  const [selected, setSelected] = useState<ChoiceKey | null>(null);

  return (
    <section
      aria-labelledby="perception-preview-heading"
      className="py-20 lg:py-28 bg-black text-white"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Interactive Ambiguous Stimulus */}
          <div className="lg:col-span-6">
            <div className="border border-white/20 bg-[#050814] p-6 sm:p-10 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 400 320"
                className="w-full max-w-[380px] h-auto select-none"
                role="img"
                aria-label="Estímulo visual ambiguo figura-fondo: dos perfiles enfrentados o una figura central simétrica"
              >
                {/* Fondo azul rey con perfiles enfrentados en blanco/negro según la lectura */}
                <rect width="400" height="320" fill="#0042FD" />
                {/* Figura central ambigua (copa / perfiles enfrentados geométricos) */}
                <path
                  d="M110 24
                     L290 24
                     C276 58, 250 74, 242 96
                     C236 112, 260 124, 258 138
                     C256 148, 236 154, 238 164
                     C240 172, 254 176, 250 186
                     C246 196, 232 200, 234 214
                     C238 238, 272 260, 294 296
                     L106 296
                     C128 260, 162 238, 166 214
                     C168 200, 154 196, 150 186
                     C146 176, 160 172, 162 164
                     C164 154, 144 148, 142 138
                     C140 124, 164 112, 158 96
                     C150 74, 124 58, 110 24 Z"
                  fill="#FFFFFF"
                />
                {/* Referencias modulares sutiles */}
                <rect x="20" y="20" width="8" height="8" fill="#00D6B6" />
                <rect x="372" y="292" width="8" height="8" fill="#FFD203" />
              </svg>
              <p className="mt-4 text-xs text-white/55 text-center">
                Observa la composición durante dos segundos y selecciona qué percibes primero.
              </p>
            </div>
          </div>

          {/* Right: Question, Selection & Divulgative Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                Experiencia de percepción
              </span>
              <h2
                id="perception-preview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
              >
                NO TODOS VEMOS LO MISMO.
              </h2>
              <p className="text-base text-white/75 leading-relaxed">
                Un mismo estímulo visual puede interpretarse de formas distintas según qué elemento
                asigna el cerebro como figura y cuál relega como fondo.
              </p>
            </div>

            <div className="space-y-3">
              {CHOICES.map((c) => {
                const isActive = selected === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelected(c.key)}
                    className={`w-full text-left px-5 py-4 border transition-colors duration-150 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#0042FD] border-[#0042FD] text-white'
                        : 'bg-transparent border-white/25 text-white/90 hover:border-white'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-medium">{c.label}</span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="p-6 border border-white/20 bg-white/[0.04] space-y-4">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {selected === 'profiles' &&
                    'Al priorizar el contraste azul exterior, tu sistema visual ha organizado los contornos como dos rostros enfrentados.'}
                  {selected === 'vessel' &&
                    'Al fijar el foco en la zona central luminosa, tu cerebro ha interpretado el bloque blanco como objeto principal frente al fondo azul.'}
                  {selected === 'alternating' &&
                    'Tu atención está cambiando activamente la asignación figura-fondo: cada vez que desplazas el foco, cambia el significado sin que cambie la imagen.'}
                </p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  En percepción comercial ocurre algo similar: el contexto, las expectativas y las
                  experiencias previas influyen en qué recuerda o interpreta un consumidor ante tu
                  marca, envase o anuncio. Esta demostración es puramente divulgativa y no constituye
                  ningún test psicológico ni diagnóstico.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Repetir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/laboratorio')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00D6B6] hover:text-white cursor-pointer"
                  >
                    <span>Explorar los 4 experimentos del Laboratorio</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
