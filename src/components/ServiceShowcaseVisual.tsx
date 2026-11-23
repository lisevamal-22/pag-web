import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceVideo } from './ServiceVideo';

export interface ServiceDisciplineItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  style: 'blue' | 'black' | 'white' | 'aqua' | 'orange';
}

interface StageProps {
  serviceId: string;
  className?: string;
  showLabelBadge?: boolean;
}

/**
 * Escenario visual y motion graphic específico para cada uno de los 6 servicios.
 * Reutilizado en Home ("Qué hacemos"), en el escaparate `/servicios` y en el Hero de cada servicio individual.
 */
export const ServiceVisualStage: React.FC<StageProps> = ({
  serviceId,
  className = '',
  showLabelBadge = true,
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0A0C12] ${className}`}>
      {/* 01. INVESTIGACIÓN DEL CONSUMIDOR */}
      {serviceId === 'investigacion-consumidor' && (
        <>
          <ServiceVideo
            serviceId="investigacion-consumidor"
            label="Vídeo: persona participando en una entrevista de investigación mientras examina un producto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {['Motivación', 'Hábito', 'Barrera'].map((cue, idx) => (
              <motion.span
                key={cue}
                animate={{ opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 2.8, delay: idx * 0.45, repeat: Infinity }}
                className="px-2.5 py-1 bg-black/75 border border-white/25 text-[11px] font-medium text-white"
              >
                {cue}
              </motion.span>
            ))}
          </div>
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-[11px] font-semibold uppercase tracking-wider">
              Escena visual · Entrevista y exploración real
            </div>
          )}
        </>
      )}

      {/* 02. NEUROMARKETING */}
      {serviceId === 'neuromarketing' && (
        <>
          <ServiceVideo
            serviceId="neuromarketing"
            label="Vídeo: persona con gafas de eye tracking observando un lineal, con su recorrido visual y mapa de atención"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          {/* El recorrido de la mirada y el mapa de atención van integrados en el vídeo */}
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#0042FD] text-white text-[11px] font-semibold uppercase tracking-wider">
              Eye tracking · Demostración conceptual
            </div>
          )}
        </>
      )}

      {/* 03. PERCEPCIÓN */}
      {serviceId === 'percepcion' && (
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-[#0042FD]">
          <ServiceVideo
            serviceId="percepcion"
            className="opacity-60"
            label="Vídeo: los mismos envases presentados sobre fondos y luces distintos, cambiando su interpretación"
          />
          <motion.div
            animate={{
              backgroundColor: [
                'rgba(0,66,253,0.45)',
                'rgba(0,214,182,0.35)',
                'rgba(254,93,10,0.35)',
              ],
            }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="relative z-10 border border-white/50 px-5 py-3.5 bg-black/70 backdrop-blur-xs text-center max-w-xs"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#FFD203]">
              Demostración perceptual
            </span>
            <span className="block font-display text-base sm:text-lg text-white mt-1">
              El contexto redefine el valor percibido
            </span>
          </motion.div>
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-[11px] font-semibold uppercase tracking-wider">
              Escena visual · Significado y encuadre
            </div>
          )}
        </div>
      )}

      {/* 04. COMPORTAMIENTO */}
      {serviceId === 'comportamiento' && (
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-black">
          <ServiceVideo
            serviceId="comportamiento"
            className="opacity-50"
            label="Vídeo: persona explorando una estantería, comparando productos y eligiendo uno"
          />
          <div className="relative z-10 grid grid-cols-3 gap-2.5 w-full max-w-xs">
            {['A', 'B', 'C'].map((opt, idx) => (
              <motion.div
                key={opt}
                animate={{
                  y: idx === 1 ? [-4, 0, -4] : 0,
                  borderColor: idx === 1 ? '#FFD203' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="border bg-black/80 p-3 text-center"
              >
                <span className="font-display text-lg text-white block">{opt}</span>
                <span className="text-[10px] text-white/70">
                  {idx === 1 ? 'Elegida' : 'Descartada'}
                </span>
              </motion.div>
            ))}
          </div>
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-[11px] font-semibold uppercase tracking-wider">
              Demostración conceptual · Arquitectura de elección
            </div>
          )}
        </div>
      )}

      {/* 05. MARKETING SENSORIAL */}
      {serviceId === 'marketing-sensorial' && (
        <>
          <ServiceVideo
            serviceId="marketing-sensorial"
            label="Vídeo: recorrido por un espacio comercial con luz cenital, madera y hormigón"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <svg
            viewBox="0 0 400 120"
            className="absolute bottom-0 inset-x-0 w-full h-24 pointer-events-none opacity-80"
            aria-hidden="true"
          >
            <motion.path
              d="M 0 70 Q 100 35 200 70 T 400 70"
              fill="none"
              stroke="#00D6B6"
              strokeWidth="2"
              animate={{
                d: [
                  'M 0 70 Q 100 35 200 70 T 400 70',
                  'M 0 70 Q 100 95 200 70 T 400 70',
                  'M 0 70 Q 100 35 200 70 T 400 70',
                ],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#00D6B6] text-black text-[11px] font-semibold uppercase tracking-wider">
              Escena visual · Luz, materiales y atmósfera
            </div>
          )}
        </>
      )}

      {/* 06. EXPERIENCIA DE MARCA */}
      {serviceId === 'experiencia-marca' && (
        <>
          <ServiceVideo
            serviceId="experiencia-marca"
            label="Vídeo: montaje de puntos de contacto de una marca — producto, tienda, espacio, conversación y recuerdo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 z-10">
            {['Producto', 'Espacio', 'Mensaje', 'Recuerdo'].map((tp, i) => (
              <motion.span
                key={tp}
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity }}
                className="px-2.5 py-1 bg-black/80 border border-white/25 text-[11px] text-white font-medium"
              >
                {tp}
              </motion.span>
            ))}
          </div>
          {showLabelBadge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#FE5D0A] text-white text-[11px] font-semibold uppercase tracking-wider">
              Demostración conceptual · Puntos de contacto
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface Props {
  discipline: ServiceDisciplineItem;
  onExplore: (serviceSlug: string) => void;
}

/**
 * Escenario visual protagonista para la sección "QUÉ HACEMOS" en la página de inicio.
 */
export const ServiceShowcaseVisual: React.FC<Props> = ({ discipline, onExplore }) => {
  return (
    <div className="bg-black text-white flex flex-col justify-between overflow-hidden border border-black h-full min-h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={discipline.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative flex-1 min-h-[250px] overflow-hidden"
        >
          <ServiceVisualStage serviceId={discipline.slug} />
        </motion.div>
      </AnimatePresence>

      {/* Pie informativo compacto: nombre, 1 única frase y CTA a URL canónica */}
      <div className="p-6 sm:p-8 space-y-4 bg-black text-white">
        <div className="space-y-1.5">
          <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
            {discipline.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80">{discipline.summary}</p>
        </div>

        <button
          type="button"
          onClick={() => onExplore(discipline.slug)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>Descubrir {discipline.title}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
