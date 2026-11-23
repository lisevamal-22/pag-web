import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  phaseId: 'observar' | 'comprender' | 'interpretar' | 'transformar' | string;
}

/**
 * Historia visual editorial e interactiva de la metodología SENSIA LABs
 * representada mediante el crecimiento conceptual de una planta en cuatro estados:
 * 01. Observar (capullo cerrado)
 * 02. Comprender (interior vascular conceptual: líquidos, savia y clorofila)
 * 03. Interpretar ("FLORECER." + preparación de apertura)
 * 04. Transformar (flor abierta y florecida en composición armónica)
 */
export const MethodologyPlantCanvas: React.FC<Props> = ({ phaseId }) => {
  return (
    <div className="relative h-[340px] sm:h-[400px] bg-[#FAF9F6] border border-black/15 overflow-hidden flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {/* FASE 01. OBSERVAR — Flor cerrada (capullo preparado) */}
        {phaseId === 'observar' && (
          <motion.div
            key="plant-observar"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            <svg viewBox="0 0 320 260" className="w-full max-w-[300px] h-auto" aria-hidden="true">
              {/* Tallo sereno */}
              <motion.path
                d="M 160 245 Q 158 190, 160 128"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7 }}
              />
              {/* Hojas laterales cerradas */}
              <motion.path
                d="M 160 202 Q 124 185, 118 164 Q 145 170, 160 194"
                fill="#00D6B6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
              <motion.path
                d="M 160 184 Q 196 168, 202 146 Q 175 154, 160 176"
                fill="#00D6B6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              {/* Capullo cerrado respirando suavemente */}
              <motion.g
                animate={{ scale: [1, 1.03, 1], y: [0, -2, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '160px', originY: '128px' }}
              >
                <path
                  d="M 160 58 C 134 86, 134 118, 160 132 C 186 118, 186 86, 160 58 Z"
                  fill="#0042FD"
                />
                <path
                  d="M 160 66 C 147 90, 149 114, 160 130 C 171 114, 173 90, 160 66 Z"
                  fill="#00D6B6"
                  opacity="0.45"
                />
              </motion.g>
            </svg>
            <span className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-widest text-black/45">
              Metáfora visual · Capullo cerrado antes de abrirse
            </span>
          </motion.div>
        )}

        {/* FASE 02. COMPRENDER — Zoom conceptual al interior del tallo y las hojas */}
        {phaseId === 'comprender' && (
          <motion.div
            key="plant-comprender"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            <svg viewBox="0 0 360 260" className="w-full max-w-[340px] h-auto" aria-hidden="true">
              {/* Sección ampliada conceptual del interior del tallo y nervadura de hoja */}
              <rect x="136" y="18" width="88" height="224" fill="#00D6B6" fillOpacity="0.14" rx="44" />
              <path
                d="M 148 240 C 148 160, 148 90, 148 22"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
              />
              <path
                d="M 212 240 C 212 160, 212 90, 212 22"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
              />

              {/* Canales internos curvos hacia nervaduras de hoja */}
              <path d="M 168 238 C 168 175, 168 110, 168 24" fill="none" stroke="#0042FD" strokeOpacity="0.35" strokeWidth="2" />
              <path d="M 180 238 C 180 175, 180 110, 180 24" fill="none" stroke="#00D6B6" strokeOpacity="0.55" strokeWidth="2.5" />
              <path d="M 192 238 C 192 175, 192 110, 192 24" fill="none" stroke="#FFD203" strokeOpacity="0.55" strokeWidth="2" />
              <path d="M 180 148 Q 245 128, 300 92" fill="none" stroke="#00D6B6" strokeWidth="2" strokeOpacity="0.45" />
              <path d="M 168 174 Q 112 152, 60 114" fill="none" stroke="#0042FD" strokeWidth="2" strokeOpacity="0.35" />

              {/* Partículas fluidas conceptuales (nutrientes / savia / clorofila) ascendiendo */}
              {[0, 1, 2, 3, 4].map((idx) => (
                <motion.circle
                  key={`up-a-${idx}`}
                  cx={168 + (idx % 3) * 12}
                  r={idx % 2 === 0 ? 5.5 : 4}
                  fill={idx % 3 === 0 ? '#0042FD' : idx % 3 === 1 ? '#00D6B6' : '#FFD203'}
                  initial={{ cy: 235, opacity: 0 }}
                  animate={{ cy: [235, 28], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.6,
                    delay: idx * 0.45,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Flujo hacia las hojas laterales */}
              <motion.circle
                r="4.5"
                fill="#00D6B6"
                animate={{ cx: [180, 295], cy: [148, 94], opacity: [0.2, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                r="4.5"
                fill="#FE5D0A"
                animate={{ cx: [168, 66], cy: [174, 118], opacity: [0.2, 1, 0] }}
                transition={{ duration: 2.4, delay: 0.9, repeat: Infinity, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-widest text-black/45">
              Representación conceptual · Circulación interna bajo la superficie
            </span>
          </motion.div>
        )}

        {/* FASE 03. INTERPRETAR — Palabra FLORECER. y preparación de apertura */}
        {phaseId === 'interpretar' && (
          <motion.div
            key="plant-interpretar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            <svg viewBox="0 0 320 210" className="w-full max-w-[260px] h-auto" aria-hidden="true">
              <path d="M 160 200 L 160 120" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              {/* Sépalos y pétalos separándose suavemente antes de abrirse */}
              <motion.path
                d="M 160 120 C 138 96, 122 68, 134 42 C 150 56, 158 88, 160 120 Z"
                fill="#0042FD"
                animate={{ rotate: [-6, -14, -6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '160px', originY: '120px' }}
              />
              <motion.path
                d="M 160 120 C 182 96, 198 68, 186 42 C 170 56, 162 88, 160 120 Z"
                fill="#00D6B6"
                animate={{ rotate: [6, 14, 6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '160px', originY: '120px' }}
              />
              <motion.ellipse
                cx="160"
                cy="74"
                rx="16"
                ry="34"
                fill="#FFD203"
                animate={{ scaleY: [0.95, 1.06, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ originX: '160px', originY: '120px' }}
              />
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 10, letterSpacing: '0.18em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl text-black tracking-tight mt-1"
            >
              FLORECER.
            </motion.p>

            <span className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-widest text-black/45">
              Metáfora visual · La información adquiere forma e insight
            </span>
          </motion.div>
        )}

        {/* FASE 04. TRANSFORMAR — Flor completamente abierta en composición editorial */}
        {phaseId === 'transformar' && (
          <motion.div
            key="plant-transformar"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            <svg viewBox="0 0 340 260" className="w-full max-w-[300px] h-auto" aria-hidden="true">
              {/* Tallo firme y hojas desplegadas */}
              <path d="M 170 245 L 170 132" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              <path d="M 170 205 Q 130 185, 114 166 Q 145 170, 170 195" fill="#00D6B6" />
              <path d="M 170 192 Q 210 172, 226 154 Q 195 158, 170 182" fill="#00D6B6" />

              {/* Pétalos abiertos en los cuatro colores corporativos */}
              {[
                { angle: -65, fill: '#0042FD', delay: 0.05 },
                { angle: -32, fill: '#00D6B6', delay: 0.1 },
                { angle: 0, fill: '#FFD203', delay: 0.15 },
                { angle: 32, fill: '#FE5D0A', delay: 0.2 },
                { angle: 65, fill: '#0042FD', delay: 0.25 },
              ].map((p, idx) => (
                <motion.path
                  key={idx}
                  d="M 170 132 C 148 92, 152 48, 170 32 C 188 48, 192 92, 170 132 Z"
                  fill={p.fill}
                  fillOpacity="0.92"
                  initial={{ rotate: 0, scale: 0.6 }}
                  animate={{ rotate: p.angle, scale: 1 }}
                  transition={{ duration: 0.7, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: '170px', originY: '132px' }}
                />
              ))}

              {/* Núcleo luminoso */}
              <motion.circle
                cx="170"
                cy="128"
                r="14"
                fill="#000000"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              />
              <motion.circle
                cx="170"
                cy="128"
                r="5"
                fill="#FFFFFF"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, duration: 0.35 }}
              />
            </svg>
            <span className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-widest text-black/45">
              Metáfora visual · Conocimiento transformado en decisiones
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
