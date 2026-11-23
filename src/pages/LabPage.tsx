import React, { useEffect, useState } from 'react';
import { RotateCcw, ArrowRight, Play } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

type Exp1Choice = 'azul' | 'amarillo' | 'contraste' | 'equilibrio';
type Exp2Choice = 'saturada' | 'jerarquizada';
type Exp4Choice = 'contexto-a-mayor' | 'contexto-b-mayor' | 'iguales';

const MEMORY_TARGET_ITEMS = [
  'Cuadrado azul rey',
  'Palabra: ORIGEN',
  'Círculo aguamarina',
  'Número: 42',
  'Triángulo negro',
  'Palabra: PULSO',
];

const MEMORY_DISTRACTORS = [
  'Estrella naranja',
  'Palabra: FLUJO',
  'Número: 18',
  'Hexágono amarillo',
];

const ALL_MEMORY_OPTIONS = [
  'Cuadrado azul rey',
  'Estrella naranja',
  'Palabra: ORIGEN',
  'Palabra: FLUJO',
  'Círculo aguamarina',
  'Número: 42',
  'Número: 18',
  'Triángulo negro',
  'Hexágono amarillo',
  'Palabra: PULSO',
];

export const LabPage: React.FC = () => {
  const { navigate } = useRouter();

  // Experimento 1: ¿Qué ves primero?
  const [exp1Choice, setExp1Choice] = useState<Exp1Choice | null>(null);

  // Experimento 2: ¿Qué elegirías?
  const [exp2Choice, setExp2Choice] = useState<Exp2Choice | null>(null);

  // Experimento 3: ¿Qué recuerdas? (exposición cronometrada)
  const [exp3Stage, setExp3Stage] = useState<'idle' | 'showing' | 'recall' | 'result'>('idle');
  const [exp3TimerProgress, setExp3TimerProgress] = useState(100);
  const [exp3Selected, setExp3Selected] = useState<string[]>([]);

  useEffect(() => {
    if (exp3Stage !== 'showing') return;
    const duration = 3500;
    const started = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setExp3TimerProgress(remainingPct);
      if (elapsed >= duration) {
        setExp3Stage('recall');
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [exp3Stage]);

  const toggleMemoryOption = (item: string) => {
    setExp3Selected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Experimento 4: ¿Qué cambia cuando cambia el contexto?
  const [exp4Choice, setExp4Choice] = useState<Exp4Choice | null>(null);

  const memoryHits = exp3Selected.filter((i) => MEMORY_TARGET_ITEMS.includes(i)).length;
  const memoryFalseAlarms = exp3Selected.filter((i) => MEMORY_DISTRACTORS.includes(i)).length;

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
            Laboratorio de percepción
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.03]">
            EXPERIMENTA CÓMO INTERPRETA TU MENTE LOS ESTÍMULOS.
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-2xl">
            Cuatro demostraciones divulgativas sobre atención, elección, memoria y contexto.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 space-y-24">
        {/* EXPERIMENTO 1: ¿QUÉ VES PRIMERO? */}
        <section aria-labelledby="exp1-title" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
              Experimento 01 · Atención visual
            </span>
            <h2 id="exp1-title" className="font-display text-3xl sm:text-4xl text-black">
              ¿Qué ves primero?
            </h2>
            <p className="text-sm sm:text-base text-black/75 leading-relaxed">
              Instrucciones: mira la composición geométrica de la derecha durante un instante y
              selecciona qué estímulo ha capturado tu atención antes que los demás.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'azul' as const, label: 'El bloque sólido en azul rey' },
                { id: 'amarillo' as const, label: 'El punto focal aislado en amarillo' },
                { id: 'contraste' as const, label: 'La palabra en contraste blanco sobre negro' },
                { id: 'equilibrio' as const, label: 'La retícula de bloques repetidos' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setExp1Choice(opt.id)}
                  aria-pressed={exp1Choice === opt.id}
                  className={`w-full text-left px-4 py-3.5 border text-sm font-medium transition-colors cursor-pointer ${
                    exp1Choice === opt.id
                      ? 'bg-[#0042FD] text-white border-[#0042FD]'
                      : 'bg-white text-black border-black/20 hover:border-black'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {exp1Choice && (
              <div className="p-5 bg-neutral-50 border border-black/15 space-y-3 mt-4">
                <p className="text-sm font-semibold text-black">
                  {exp1Choice === 'azul' &&
                    'Has respondido primero al volumen y a la saturación cromática dominante.'}
                  {exp1Choice === 'amarillo' &&
                    'Has respondido primero a la saliencia por contraste cromático y aislamiento espacial.'}
                  {exp1Choice === 'contraste' &&
                    'Tu lectura ha priorizado la figura de alto contraste combinada con reconocimiento verbal.'}
                  {exp1Choice === 'equilibrio' &&
                    'Has procesado primero la agrupación estructural (ley de proximidad y repetición).'}
                </p>
                <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                  Explicación: antes de leer un anuncio o envase, el sistema visual detecta
                  automáticamente contrastes de color, tamaño, aislamiento y agrupación. Diseñar
                  una jerarquía clara decide dónde se posará la mirada en el primer segundo.
                </p>
                <button
                  type="button"
                  onClick={() => setExp1Choice(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/70 hover:text-black cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Repetir experimento</span>
                </button>
              </div>
            )}
          </div>

          {/* Stimulus 1 */}
          <div className="lg:col-span-7 border border-black bg-white p-6 sm:p-10">
            <svg
              viewBox="0 0 600 380"
              className="w-full h-auto"
              role="img"
              aria-label="Composición visual con múltiples estímulos geométricos y de contraste"
            >
              <rect width="600" height="380" fill="#FAFAFA" />
              {/* Retícula repetida */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={36 + col * 42}
                    y={44 + row * 42}
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#000000"
                    strokeOpacity="0.22"
                    strokeWidth="1.5"
                  />
                ))
              )}
              {/* Bloque sólido azul rey */}
              <rect x="240" y="54" width="140" height="170" fill="#0042FD" />
              {/* Estímulo verbal blanco sobre negro */}
              <rect x="64" y="256" width="210" height="64" fill="#000000" />
              <text
                x="169"
                y="296"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Montserrat, sans-serif"
                fontWeight="800"
                fontSize="24"
                letterSpacing="2"
              >
                ATENCIÓN
              </text>
              {/* Punto aislado amarillo */}
              <circle cx="494" cy="146" r="34" fill="#FFD203" />
              {/* Acento secundario sutil */}
              <rect x="430" y="256" width="110" height="16" fill="#00D6B6" />
            </svg>
          </div>
        </section>

        <hr className="border-black/15" />

        {/* EXPERIMENTO 2: ¿QUÉ ELEGIRÍAS? */}
        <section aria-labelledby="exp2-title" className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
              Experimento 02 · Fluidez cognitiva y elección
            </span>
            <h2 id="exp2-title" className="font-display text-3xl sm:text-4xl text-black">
              ¿Qué elegirías?
            </h2>
            <p className="text-sm sm:text-base text-black/75 leading-relaxed">
              Instrucciones: imagina que buscas rápidamente un servicio profesional para tu empresa.
              Compara ambas propuestas visuales durante tres segundos y elige la que te transmite
              mayor claridad para dar el primer paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alternativa A: Alta densidad */}
            <button
              type="button"
              onClick={() => setExp2Choice('saturada')}
              aria-pressed={exp2Choice === 'saturada'}
              className={`text-left p-6 sm:p-8 border transition-colors cursor-pointer flex flex-col justify-between gap-6 ${
                exp2Choice === 'saturada'
                  ? 'border-[#0042FD] bg-[#0042FD]/[0.03]'
                  : 'border-black/20 bg-white hover:border-black'
              }`}
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
                  Alternativa A
                </span>
                <div className="p-4 border border-black/15 bg-neutral-100 space-y-2">
                  <p className="font-display text-base text-black">
                    SOLUCIONES INTEGRALES 360° DE ANÁLISIS PREDICTIVO MULTICANAL
                  </p>
                  <p className="text-xs text-black/75 leading-snug">
                    Incluye auditoría biométrica, benchmarking cuantitativo, scoring algorítmico,
                    consultoría transversal, matrices de segmentación y 14 módulos técnicos
                    opcionales bajo demanda inmediata.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1 text-[11px] font-semibold text-[#FE5D0A]">
                    <span>OFERTA LIMITADA</span>
                    <span>·</span>
                    <span>VER 12 PLANES</span>
                    <span>·</span>
                    <span>SOLICITAR DOSSIER</span>
                    <span>·</span>
                    <span>COMPARAR</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                Seleccionar Alternativa A
              </span>
            </button>

            {/* Alternativa B: Clara y jerarquizada */}
            <button
              type="button"
              onClick={() => setExp2Choice('jerarquizada')}
              aria-pressed={exp2Choice === 'jerarquizada'}
              className={`text-left p-6 sm:p-8 border transition-colors cursor-pointer flex flex-col justify-between gap-6 ${
                exp2Choice === 'jerarquizada'
                  ? 'border-[#0042FD] bg-[#0042FD]/[0.03]'
                  : 'border-black/20 bg-white hover:border-black'
              }`}
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
                  Alternativa B
                </span>
                <div className="p-6 border border-black bg-white space-y-3">
                  <p className="font-display text-xl text-black leading-snug">
                    Comprende por qué tus clientes eligen tu marca.
                  </p>
                  <p className="text-sm text-black/75">
                    Investigamos la percepción y decisión de tu público para darte respuestas claras.
                  </p>
                  <span className="inline-block px-3 py-1.5 bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider">
                    Explorar punto de partida
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                Seleccionar Alternativa B
              </span>
            </button>
          </div>

          {exp2Choice && (
            <div className="p-6 bg-neutral-50 border border-black/15 space-y-3 max-w-3xl">
              <p className="text-sm sm:text-base font-semibold text-black">
                {exp2Choice === 'jerarquizada'
                  ? 'Has elegido la opción con mayor fluidez cognitiva.'
                  : 'Has optado por la propuesta con mayor volumen informativo explícito.'}
              </p>
              <p className="text-sm text-black/75 leading-relaxed">
                Explicación: en procesos reales de decisión, las personas tienden a confiar más en lo
                que pueden procesar con claridad y bajo esfuerzo mental (fluidez de procesamiento).
                Acumular demasiados términos técnicos o llamadas simultáneas suele aumentar la
                fricción y retrasar la elección, aunque parezca ofrecer «más información».
              </p>
              <button
                type="button"
                onClick={() => setExp2Choice(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/70 hover:text-black cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Repetir experimento</span>
              </button>
            </div>
          )}
        </section>

        <hr className="border-black/15" />

        {/* EXPERIMENTO 3: ¿QUÉ RECUERDAS? */}
        <section aria-labelledby="exp3-title" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD203] bg-black px-2 py-0.5 inline-block">
              Experimento 03 · Memoria breve
            </span>
            <h2 id="exp3-title" className="font-display text-3xl sm:text-4xl text-black">
              ¿Qué recuerdas?
            </h2>
            <p className="text-sm sm:text-base text-black/75 leading-relaxed">
              Instrucciones: pulsa «Iniciar exposición» para observar seis estímulos durante 3,5
              segundos. Después desaparecerán y podrás comprobar cuáles retuvo tu memoria inmediata.
            </p>

            {exp3Stage === 'idle' && (
              <button
                type="button"
                onClick={() => {
                  setExp3Selected([]);
                  setExp3TimerProgress(100);
                  setExp3Stage('showing');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                <span>Iniciar exposición (3,5 s)</span>
              </button>
            )}

            {(exp3Stage === 'recall' || exp3Stage === 'result') && (
              <button
                type="button"
                onClick={() => {
                  setExp3Selected([]);
                  setExp3Stage('idle');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 border border-black text-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Repetir exposición</span>
              </button>
            )}
          </div>

          <div className="lg:col-span-7 border border-black bg-white p-6 sm:p-8 space-y-6">
            {exp3Stage === 'idle' && (
              <div className="py-16 text-center space-y-2 bg-neutral-50 border border-dashed border-black/20">
                <p className="font-display text-xl text-black">Estímulo preparado</p>
                <p className="text-sm text-black/60">
                  Pulsa «Iniciar exposición» cuando estés listo para mirar durante 3,5 segundos.
                </p>
              </div>
            )}

            {exp3Stage === 'showing' && (
              <div className="space-y-4">
                <div className="w-full h-1.5 bg-black/10 overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full bg-[#0042FD]"
                    style={{ width: `${exp3TimerProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                  <div className="p-6 border border-black/15 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-[#0042FD]" />
                    <span className="text-xs font-medium text-black/70">Azul rey</span>
                  </div>
                  <div className="p-6 border border-black/15 flex items-center justify-center">
                    <span className="font-display text-2xl text-black">ORIGEN</span>
                  </div>
                  <div className="p-6 border border-black/15 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#00D6B6]" />
                    <span className="text-xs font-medium text-black/70">Aguamarina</span>
                  </div>
                  <div className="p-6 border border-black/15 flex items-center justify-center">
                    <span className="font-display text-3xl text-[#FE5D0A] tabular-nums">42</span>
                  </div>
                  <div className="p-6 border border-black/15 flex items-center justify-center">
                    <svg width="48" height="44" viewBox="0 0 48 44" aria-hidden="true">
                      <polygon points="24,2 46,42 2,42" fill="#000000" />
                    </svg>
                  </div>
                  <div className="p-6 border border-black/15 flex items-center justify-center">
                    <span className="font-display text-2xl text-black">PULSO</span>
                  </div>
                </div>
              </div>
            )}

            {exp3Stage === 'recall' && (
              <div className="space-y-5">
                <h3 className="font-display text-xl text-black">
                  Selecciona los elementos que recuerdas haber visto:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALL_MEMORY_OPTIONS.map((item) => {
                    const checked = exp3Selected.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleMemoryOption(item)}
                        aria-pressed={checked}
                        className={`px-4 py-3 text-left border text-sm font-medium transition-colors cursor-pointer ${
                          checked
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/20 hover:border-black'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setExp3Stage('result')}
                  disabled={exp3Selected.length === 0}
                  className="px-6 py-3 bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  Comprobar recuerdo
                </button>
              </div>
            )}

            {exp3Stage === 'result' && (
              <div className="space-y-4">
                <div className="p-5 bg-neutral-50 border border-black/15 space-y-2">
                  <p className="font-display text-lg text-black tabular-nums">
                    Aciertos recordados: {memoryHits} de {MEMORY_TARGET_ITEMS.length} · Elementos no
                    presentes marcados: {memoryFalseAlarms}
                  </p>
                  <p className="text-sm text-black/75 leading-relaxed">
                    Explicación: tras una exposición breve, la memoria de trabajo retiene solo un
                    subconjunto limitado de estímulos —habitualmente los más distintivos o situados
                    al principio y al final—. En comunicación de marca, intentar transmitir diez
                    mensajes simultáneos garantiza que varios queden fuera del recuerdo.
                  </p>
                </div>
                <div className="text-xs text-black/60">
                  Estímulos originales: {MEMORY_TARGET_ITEMS.join(' · ')}.
                </div>
              </div>
            )}
          </div>
        </section>

        <hr className="border-black/15" />

        {/* EXPERIMENTO 4: ¿QUÉ CAMBIA CUANDO CAMBIA EL CONTEXTO? */}
        <section aria-labelledby="exp4-title" className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FE5D0A]">
              Experimento 04 · Efecto de contexto
            </span>
            <h2 id="exp4-title" className="font-display text-3xl sm:text-4xl text-black">
              ¿Qué cambia cuando cambia el contexto?
            </h2>
            <p className="text-sm sm:text-base text-black/75 leading-relaxed">
              Instrucciones: observa ambos cuadrados centrales en azul rey (#0042FD). Aunque tienen
              exactamente las mismas dimensiones físicas y el mismo color, ¿cómo los percibes al
              compararlos?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-black/20 p-6 sm:p-10 bg-white flex flex-col items-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-black/55">
                Contexto A · Entorno amplio oscuro
              </span>
              <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto" aria-label="Contexto A">
                {/* Elementos grandes alrededor */}
                <circle cx="52" cy="54" r="36" fill="#111111" />
                <circle cx="208" cy="54" r="36" fill="#111111" />
                <circle cx="52" cy="166" r="36" fill="#111111" />
                <circle cx="208" cy="166" r="36" fill="#111111" />
                {/* Estímulo central idéntico (52x52) */}
                <rect x="104" y="84" width="52" height="52" fill="#0042FD" />
              </svg>
            </div>

            <div className="border border-black/20 p-6 sm:p-10 bg-neutral-100 flex flex-col items-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-black/55">
                Contexto B · Entorno modular compacto
              </span>
              <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto" aria-label="Contexto B">
                {/* Elementos pequeños alrededor */}
                <circle cx="84" cy="70" r="10" fill="#111111" />
                <circle cx="130" cy="54" r="10" fill="#111111" />
                <circle cx="176" cy="70" r="10" fill="#111111" />
                <circle cx="84" cy="150" r="10" fill="#111111" />
                <circle cx="130" cy="166" r="10" fill="#111111" />
                <circle cx="176" cy="150" r="10" fill="#111111" />
                {/* Estímulo central idéntico (52x52) */}
                <rect x="104" y="84" width="52" height="52" fill="#0042FD" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { id: 'contexto-b-mayor' as const, label: 'El cuadrado azul del Contexto B parece mayor' },
              { id: 'contexto-a-mayor' as const, label: 'El cuadrado azul del Contexto A parece mayor' },
              { id: 'iguales' as const, label: 'Los percibo exactamente iguales' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setExp4Choice(opt.id)}
                aria-pressed={exp4Choice === opt.id}
                className={`px-5 py-3.5 border text-sm font-medium transition-colors cursor-pointer ${
                  exp4Choice === opt.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {exp4Choice && (
            <div className="p-6 bg-neutral-50 border border-black/15 space-y-3 max-w-3xl">
              <p className="text-sm sm:text-base font-semibold text-black">
                {exp4Choice === 'contexto-b-mayor'
                  ? 'Efecto perceptual habitual (ilusión de contraste de tamaño / Ebbinghaus): rodeado de elementos pequeños, el estímulo central parece más grande y dominante.'
                  : 'Incluso sabiendo que miden exactamente 52 × 52 unidades, el entorno modifica el esfuerzo que hace el cerebro para estimar proporciones y contraste.'}
              </p>
              <p className="text-sm text-black/75 leading-relaxed">
                Aplicación al consumidor: un mismo producto, precio o diseño transmite impresiones
                distintas según el entorno en el que aparece (competidores cercanos, escaparate,
                iluminación o arquitectura de tarifas). Por eso investigamos los estímulos dentro de
                su contexto real.
              </p>
              <button
                type="button"
                onClick={() => setExp4Choice(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/70 hover:text-black cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Repetir experimento</span>
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0042FD] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl text-white">
              ¿Quieres descubrir cómo perciben tu marca, envase o web?
            </h2>
            <p className="text-sm sm:text-base text-white/85">
              Cuéntanos qué quieres comprobar y diseñamos una investigación adaptada a tu contexto.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/', { scrollToId: 'asistente' })}
            className="inline-flex items-center gap-2 px-6 py-4 bg-white text-black hover:bg-black hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
          >
            <span>Usar el Traductor de Necesidades</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </section>
      </div>
    </div>
  );
};
