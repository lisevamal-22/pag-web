import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

interface Props {
  conceptId: 'atencion' | 'percepcion' | 'emocion' | 'decision' | string;
}

const SHELF_ITEMS = [
  { id: 1, row: 0, col: 0, h: 52, shade: 'bg-white/15', target: false },
  { id: 2, row: 0, col: 1, h: 48, shade: 'bg-white/10', target: false },
  { id: 3, row: 0, col: 2, h: 54, shade: 'bg-white/15', target: false },
  { id: 4, row: 0, col: 3, h: 50, shade: 'bg-white/10', target: false },
  { id: 5, row: 1, col: 0, h: 50, shade: 'bg-white/10', target: false },
  { id: 6, row: 1, col: 1, h: 56, shade: 'bg-white/15', target: false },
  { id: 7, row: 1, col: 2, h: 56, shade: 'bg-[#FFD203]', target: true },
  { id: 8, row: 1, col: 3, h: 48, shade: 'bg-white/15', target: false },
];

const PERCEPTION_CONTEXTS = [
  {
    id: 'masivo',
    label: 'Contexto A · Lineal saturado',
    interpretation: 'El mismo envase se percibe como una opción estándar más.',
    bg: 'bg-[#FE5D0A]/25 border-[#FE5D0A]',
    accent: '#FE5D0A',
    surroundCount: 6,
  },
  {
    id: 'editorial',
    label: 'Contexto B · Entorno de autor',
    interpretation: 'Rodeado de aire y silencio visual, el mismo envase comunica valor artesanal.',
    bg: 'bg-[#0042FD]/25 border-[#0042FD]',
    accent: '#0042FD',
    surroundCount: 0,
  },
  {
    id: 'clinico',
    label: 'Contexto C · Encuadre técnico',
    interpretation: 'Bajo luz fría y retícula precisa, el mismo objeto sugiere eficacia técnica.',
    bg: 'bg-[#00D6B6]/20 border-[#00D6B6]',
    accent: '#00D6B6',
    surroundCount: 2,
  },
];

const EMOTION_SCENES = [
  {
    id: 'frio',
    label: 'Estímulo distante / alta tensión visual',
    feeling: 'Alerta y distancia',
    bgGradient: 'radial-gradient(circle at 25% 30%, rgba(0,66,253,0.45), rgba(5,5,10,0.96) 70%)',
    waveColor: '#0042FD',
    amplitude: 34,
  },
  {
    id: 'calido',
    label: 'Iluminación cálida / ritmo acogedor',
    feeling: 'Cercanía e interés',
    bgGradient: 'radial-gradient(circle at 60% 45%, rgba(254,93,10,0.42), rgba(255,210,3,0.18) 45%, rgba(5,5,10,0.96) 75%)',
    waveColor: '#FFD203',
    amplitude: 16,
  },
  {
    id: 'sereno',
    label: 'Composición equilibrada / claridad',
    feeling: 'Confianza tranquila',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(0,214,182,0.35), rgba(5,5,10,0.96) 72%)',
    waveColor: '#00D6B6',
    amplitude: 10,
  },
];

/**
 * Escenario visual explicativo con motion graphics reales para cada concepto de
 * "INVESTIGAMOS LO QUE NO SE VE": Atención, Percepción, Emoción y Decisión.
 */
export const CognitiveConceptsStage: React.FC<Props> = ({ conceptId }) => {
  const [cycle, setCycle] = useState(0);
  const [attentionStep, setAttentionStep] = useState<'scan' | 'focus'>('scan');
  const [perceptionIdx, setPerceptionIdx] = useState(0);
  const [emotionIdx, setEmotionIdx] = useState(0);
  const [decisionPhase, setDecisionPhase] = useState<'compare' | 'filter' | 'chosen'>('compare');

  // Reinicia y ejecuta la secuencia visual cada vez que cambia el concepto
  useEffect(() => {
    setAttentionStep('scan');
    setPerceptionIdx(0);
    setEmotionIdx(0);
    setDecisionPhase('compare');

    if (conceptId === 'atencion') {
      const t1 = window.setTimeout(() => setAttentionStep('focus'), 900);
      const loop = window.setInterval(() => {
        setAttentionStep((prev) => (prev === 'scan' ? 'focus' : 'scan'));
      }, 3600);
      return () => {
        clearTimeout(t1);
        clearInterval(loop);
      };
    }

    if (conceptId === 'percepcion') {
      const loop = window.setInterval(() => {
        setPerceptionIdx((prev) => (prev + 1) % PERCEPTION_CONTEXTS.length);
      }, 2800);
      return () => clearInterval(loop);
    }

    if (conceptId === 'emocion') {
      const loop = window.setInterval(() => {
        setEmotionIdx((prev) => (prev + 1) % EMOTION_SCENES.length);
      }, 2800);
      return () => clearInterval(loop);
    }

    if (conceptId === 'decision') {
      const t1 = window.setTimeout(() => setDecisionPhase('filter'), 1000);
      const t2 = window.setTimeout(() => setDecisionPhase('chosen'), 2200);
      const loop = window.setInterval(() => {
        setDecisionPhase('compare');
        window.setTimeout(() => setDecisionPhase('filter'), 900);
        window.setTimeout(() => setDecisionPhase('chosen'), 2000);
      }, 4600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearInterval(loop);
      };
    }
  }, [conceptId, cycle]);

  const currentPerception = PERCEPTION_CONTEXTS[perceptionIdx];
  const currentEmotion = EMOTION_SCENES[emotionIdx];

  return (
    <div className="space-y-4">
      <div className="relative h-[280px] sm:h-[320px] bg-[#090B10] border border-white/15 overflow-hidden p-5 sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 z-10">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/55">
            {conceptId === 'atencion' && 'Escena · Lineal saturado'}
            {conceptId === 'percepcion' && currentPerception.label}
            {conceptId === 'emocion' && currentEmotion.label}
            {conceptId === 'decision' && 'Escena · Comparación entre alternativas'}
          </span>
          <button
            type="button"
            onClick={() => setCycle((c) => c + 1)}
            aria-label="Reiniciar animación explicativa"
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            <span>Repetir</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* 01. ATENCIÓN: Lineal de supermercado donde un envase captura el foco */}
          {conceptId === 'atencion' && (
            <motion.div
              key="stage-atencion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col justify-center py-4"
            >
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto w-full relative">
                {SHELF_ITEMS.map((item) => {
                  const isFocused = attentionStep === 'focus' && item.target;
                  const isDimmed = attentionStep === 'focus' && !item.target;
                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        opacity: isDimmed ? 0.22 : 1,
                        scale: isFocused ? 1.12 : 1,
                        y: isFocused ? -4 : 0,
                      }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative flex items-end justify-center pb-2 border ${
                        item.target
                          ? 'border-[#FFD203] bg-[#FFD203]'
                          : 'border-white/15 ' + item.shade
                      }`}
                      style={{ height: `${item.h}px` }}
                    >
                      <span
                        className={`w-6 h-1.5 ${
                          item.target ? 'bg-black' : 'bg-white/30'
                        }`}
                      />
                      {isFocused && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.25, opacity: [0.9, 0.35, 0.9] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          className="absolute -inset-2 border-2 border-[#00D6B6] pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/75">
                <span className="w-2 h-2 bg-[#FFD203]" aria-hidden="true" />
                <span>
                  {attentionStep === 'scan'
                    ? 'Decenas de estímulos compiten a la vez en el lineal...'
                    : 'Solo uno supera el umbral visual y atrae la mirada.'}
                </span>
              </div>
            </motion.div>
          )}

          {/* 02. PERCEPCIÓN: El mismo envase idéntico cambia de significado según el contexto */}
          {conceptId === 'percepcion' && (
            <motion.div
              key="stage-percepcion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col justify-center items-center gap-4"
            >
              <motion.div
                layout
                className={`relative w-full max-w-md h-36 border flex items-center justify-center gap-3 px-6 transition-colors duration-500 ${currentPerception.bg}`}
              >
                {Array.from({ length: currentPerception.surroundCount }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.45, scale: 1 }}
                    className="w-7 h-16 bg-white/25 border border-white/20"
                  />
                ))}

                {/* Mismo objeto central inalterado */}
                <div className="relative z-10 w-12 h-24 bg-white flex flex-col items-center justify-between py-2.5 shadow-lg">
                  <span className="w-4 h-2 bg-black" />
                  <span
                    className="w-7 h-5 transition-colors duration-500"
                    style={{ backgroundColor: currentPerception.accent }}
                  />
                  <span className="w-6 h-0.5 bg-black/30" />
                </div>
              </motion.div>

              <p className="text-xs sm:text-sm text-white/85 text-center max-w-md">
                {currentPerception.interpretation}
              </p>
            </motion.div>
          )}

          {/* 03. EMOCIÓN: Cambio de iluminación, clima y respuesta afectiva */}
          {conceptId === 'emocion' && (
            <motion.div
              key="stage-emocion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col justify-between pt-3"
            >
              <motion.div
                animate={{ background: currentEmotion.bgGradient }}
                transition={{ duration: 0.8 }}
                className="flex-1 border border-white/15 flex flex-col items-center justify-center p-4 relative overflow-hidden"
              >
                <svg viewBox="0 0 360 90" className="w-full max-w-sm h-20" aria-hidden="true">
                  <motion.path
                    d={`M 0 45 Q 45 ${45 - currentEmotion.amplitude}, 90 45 T 180 45 T 270 45 T 360 45`}
                    fill="none"
                    stroke={currentEmotion.waveColor}
                    strokeWidth="3"
                    animate={{
                      d: [
                        `M 0 45 Q 45 ${45 - currentEmotion.amplitude}, 90 45 T 180 45 T 270 45 T 360 45`,
                        `M 0 45 Q 45 ${45 + currentEmotion.amplitude}, 90 45 T 180 45 T 270 45 T 360 45`,
                        `M 0 45 Q 45 ${45 - currentEmotion.amplitude}, 90 45 T 180 45 T 270 45 T 360 45`,
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>

                <span className="font-display text-lg sm:text-xl text-white">
                  {currentEmotion.feeling}
                </span>
              </motion.div>

              <div className="flex items-center justify-center gap-2 pt-3">
                {EMOTION_SCENES.map((scene, i) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setEmotionIdx(i)}
                    aria-label={scene.label}
                    className={`h-1.5 transition-all cursor-pointer ${
                      i === emotionIdx ? 'w-8 bg-white' : 'w-3 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* 04. DECISIÓN: Comparación de alternativas hasta elegir una */}
          {conceptId === 'decision' && (
            <motion.div
              key="stage-decision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col justify-center gap-4"
            >
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto w-full">
                {[
                  { id: 'A', label: 'Opción A', note: 'Duda en precio', winner: false },
                  { id: 'B', label: 'Opción B', note: 'Claridad y confianza', winner: true },
                  { id: 'C', label: 'Opción C', note: 'Exceso de información', winner: false },
                ].map((opt) => {
                  const isWinner = decisionPhase === 'chosen' && opt.winner;
                  const isDiscarded =
                    (decisionPhase === 'filter' || decisionPhase === 'chosen') && !opt.winner;
                  return (
                    <motion.div
                      key={opt.id}
                      animate={{
                        opacity: isDiscarded ? 0.3 : 1,
                        scale: isWinner ? 1.05 : 1,
                        borderColor: isWinner ? '#00D6B6' : 'rgba(255,255,255,0.2)',
                        backgroundColor: isWinner ? 'rgba(0,214,182,0.14)' : 'rgba(255,255,255,0.03)',
                      }}
                      transition={{ duration: 0.45 }}
                      className="border p-3 sm:p-4 flex flex-col justify-between min-h-[112px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm text-white">{opt.label}</span>
                        {isWinner && <span className="w-2.5 h-2.5 bg-[#00D6B6]" />}
                      </div>
                      <span className="text-[11px] text-white/70 leading-snug">{opt.note}</span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-xs text-white/75 text-center">
                {decisionPhase === 'compare' && 'El consumidor compara varias alternativas...'}
                {decisionPhase === 'filter' && 'Descarta las opciones con fricción o duda...'}
                {decisionPhase === 'chosen' && 'Elige la opción percibida con menor incertidumbre.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
