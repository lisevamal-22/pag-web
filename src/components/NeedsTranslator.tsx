import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, RotateCcw, Compass } from 'lucide-react';
import {
  NEED_OPTIONS,
  NeedOption,
  RecommendationResult,
  buildRecommendationFromNeed,
  classifyCustomChallenge,
} from '../data/needsEngine';
import { SERVICES } from '../data/servicesData';
import { useNeeds } from '../context/NeedsContext';
import { useRouter } from '../context/RouterContext';

interface NeedsTranslatorProps {
  variant?: 'light' | 'editorial';
}

export const NeedsTranslator: React.FC<NeedsTranslatorProps> = ({ variant = 'light' }) => {
  const { setPayload } = useNeeds();
  const { navigate } = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNeed, setSelectedNeed] = useState<NeedOption | null>(null);
  const [selectedFollowUpId, setSelectedFollowUpId] = useState<string | null>(null);
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customError, setCustomError] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  const handleSelectNeed = (need: NeedOption) => {
    setCustomMode(false);
    setCustomError('');
    setSelectedNeed(need);
    setSelectedFollowUpId(null);
    setRecommendation(buildRecommendationFromNeed(need));
    setStep(2);
  };

  const handleSelectCustomMode = () => {
    setSelectedNeed(null);
    setSelectedFollowUpId(null);
    setCustomMode(true);
    setCustomError('');
  };

  const handleAnalyzeCustomChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim().length < 12) {
      setCustomError(
        'Describe brevemente qué ocurre o qué te gustaría comprender para orientar mejor la recomendación.'
      );
      return;
    }
    setCustomError('');
    const result = classifyCustomChallenge(customText);
    setRecommendation(result);
    setStep(3);
  };

  const handleSelectFollowUp = (followUpId: string) => {
    if (!selectedNeed) return;
    setSelectedFollowUpId(followUpId);
    const updated = buildRecommendationFromNeed(selectedNeed, followUpId);
    setRecommendation(updated);
    setStep(3);
  };

  const handleSkipFollowUp = () => {
    if (!selectedNeed) return;
    setRecommendation(buildRecommendationFromNeed(selectedNeed));
    setStep(3);
  };

  const handleAdjustPrimaryService = (serviceId: string) => {
    if (!recommendation) return;
    const targetService = SERVICES.find((s) => s.id === serviceId);
    if (!targetService) return;
    const prevPrimary = recommendation.primaryServiceId;
    const updatedSecondary = Array.from(
      new Set([
        ...recommendation.secondaryServiceIds.filter((id) => id !== serviceId),
        ...(prevPrimary !== serviceId ? [prevPrimary] : []),
      ])
    ).slice(0, 2);

    setRecommendation({
      ...recommendation,
      primaryServiceId: serviceId,
      secondaryServiceIds: updatedSecondary,
      recommendedTitle: targetService.title.toUpperCase(),
    });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedNeed(null);
    setSelectedFollowUpId(null);
    setCustomMode(false);
    setCustomError('');
    setAdditionalNotes('');
    setRecommendation(null);
  };

  const persistAssistantPayload = () => {
    if (!recommendation) return;
    setPayload({
      needId: selectedNeed?.id ?? 'custom',
      followUpId: selectedFollowUpId,
      customChallengeText: customMode ? customText.trim() : '',
      additionalNotes: additionalNotes.trim(),
      recommendation,
    });
  };

  const handleGoToContact = () => {
    if (!recommendation) return;
    persistAssistantPayload();
    navigate('/contacto');
  };

  const handleGoToService = (servicePath: string) => {
    if (!recommendation) return;
    persistAssistantPayload();
    navigate(servicePath);
  };

  const primaryService = recommendation
    ? SERVICES.find((s) => s.id === recommendation.primaryServiceId)
    : undefined;

  const secondaryServices = recommendation
    ? recommendation.secondaryServiceIds
        .map((id) => SERVICES.find((s) => s.id === id))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
    : [];

  return (
    <section
      id="asistente"
      aria-labelledby="asistente-heading"
      className={`py-20 lg:py-28 border-y border-black/10 ${
        variant === 'editorial' ? 'bg-neutral-50' : 'bg-white'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Intro Header & Discreet Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-black/15">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
              Asistente de necesidades
            </p>
            <h2
              id="asistente-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black"
            >
              ¿QUÉ QUIERES MEJORAR DE TU MARCA?
            </h2>
            <p className="text-base sm:text-lg text-black/75 max-w-xl">
              Elige tu reto cotidiano y te mostramos qué podemos investigar.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:items-end gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/55 tabular-nums">
              Paso {step} de 3
            </span>
            <div className="w-full lg:w-64 h-1.5 bg-black/10 overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-[#0042FD] transition-transform duration-300 origin-left"
                style={{ transform: `scaleX(${step / 3})` }}
              />
            </div>
          </div>
        </div>

        {/* STEP 1: NEED SELECTION OR CUSTOM CHALLENGE */}
        {step === 1 && (
          <div className="pt-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-display text-xl sm:text-2xl text-black">
                ¿Qué quieres descubrir de tus consumidores?
              </h3>
              <span className="text-xs text-black/60">
                Elige la situación más cercana a tu reto actual
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEED_OPTIONS.map((need, idx) => (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => handleSelectNeed(need)}
                  className="group text-left p-6 bg-white border border-black/15 hover:border-[#0042FD] hover:bg-[#0042FD]/[0.03] transition-colors duration-150 flex flex-col justify-between gap-6 min-h-[148px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0042FD]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0042FD] tabular-nums">
                      {String(idx + 1).padStart(2, '0')} · {need.serviceLabel}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-black/35 group-hover:text-[#0042FD] group-hover:translate-x-0.5 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-base font-medium text-black leading-snug">
                    {need.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Challenge Trigger */}
            <div className="pt-2">
              {!customMode ? (
                <button
                  type="button"
                  onClick={handleSelectCustomMode}
                  className="w-full p-5 sm:p-6 bg-black text-white hover:bg-[#0042FD] transition-colors duration-200 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0042FD]"
                >
                  <div className="text-left">
                    <span className="block font-display text-base sm:text-lg">
                      No encuentro exactamente lo que necesito — escribir mi caso
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <form
                  onSubmit={handleAnalyzeCustomChallenge}
                  className="bg-white border border-black p-6 sm:p-8 space-y-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-display text-lg sm:text-xl text-black">
                        Cuéntanos qué ocurre en tu negocio o marca
                      </h4>
                      <p className="text-sm text-black/65">
                        Ejemplo: «Tengo una tienda de alimentación y quiero entender por qué la
                        gente entra, mira los productos y finalmente compra en otro establecimiento».
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomMode(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black underline cursor-pointer shrink-0"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="custom-challenge-input" className="sr-only">
                      Describe tu reto empresarial
                    </label>
                    <textarea
                      id="custom-challenge-input"
                      rows={4}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Describe qué has observado en tus clientes o qué te gustaría comprender..."
                      className="w-full p-4 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm sm:text-base text-black bg-white"
                    />
                    {customError && (
                      <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                        {customError}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-black/55">
                      Esta orientación inicial se procesa localmente sin enviar datos personales.
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0042FD] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
                    >
                      <span>Obtener recomendación orientativa</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: FOLLOW-UP REFINEMENT QUESTION */}
        {step === 2 && selectedNeed && (
          <div className="pt-10 max-w-4xl space-y-8">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/10">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
                  Necesidad seleccionada
                </span>
                <p className="text-base font-medium text-black">{selectedNeed.label}</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/65 hover:text-black cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Cambiar necesidad</span>
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl text-black">
                {selectedNeed.followUpQuestion}
              </h3>
              <p className="text-sm text-black/65">
                Esta respuesta nos permite afinar la recomendación hacia el enfoque más útil para tu caso.
              </p>
            </div>

            <div className="space-y-3">
              {selectedNeed.followUpOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectFollowUp(opt.id)}
                  className="w-full text-left p-5 bg-white border border-black/15 hover:border-[#0042FD] hover:bg-[#0042FD]/[0.03] transition-colors flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0042FD]"
                >
                  <span className="text-sm sm:text-base font-medium text-black">{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#0042FD] shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={handleSkipFollowUp}
                className="text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black underline cursor-pointer"
              >
                Ver recomendación general directamente
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PERSONALIZED RESULT + FOLLOW-UP NOTES + DIRECT CONTACT CTA */}
        {step === 3 && recommendation && (
          <div className="pt-10 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left 7 cols: Recommendation Details */}
              <div className="lg:col-span-7 bg-white border border-black p-6 sm:p-8 lg:p-10 space-y-8">
                <div className="space-y-3 pb-6 border-b border-black/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                      TU PUNTO DE PARTIDA
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>CAMBIAR MI RESPUESTA</span>
                    </button>
                  </div>

                  <p className="text-xs text-black/60">
                    Servicio recomendado para:{' '}
                    <span className="font-semibold text-black">
                      {recommendation.isCustomChallenge
                        ? `«${recommendation.customChallengeText}»`
                        : recommendation.needLabel}
                    </span>
                  </p>

                  <h3 className="font-display text-2xl sm:text-3xl text-black tracking-tight">
                    {recommendation.recommendedTitle}
                  </h3>

                  <p className="text-base text-black/80 leading-relaxed">
                    {recommendation.description}
                  </p>

                  {recommendation.orientativeDisclaimer && (
                    <p className="text-xs text-black/65 bg-neutral-100 p-3 border border-black/10">
                      {recommendation.orientativeDisclaimer}
                    </p>
                  )}
                </div>

                {/* Complementary Areas when a challenge spans multiple areas */}
                {secondaryServices.length > 0 && (
                  <div className="space-y-3 pb-6 border-b border-black/10">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black/55">
                      Áreas complementarias que conviene combinar
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {secondaryServices.map((sec) => (
                        <div
                          key={sec.id}
                          className="p-4 border border-black/15 bg-neutral-50 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-black">{sec.title}</span>
                            {recommendation.isCustomChallenge && (
                              <button
                                type="button"
                                onClick={() => handleAdjustPrimaryService(sec.id)}
                                className="text-[11px] font-semibold text-[#0042FD] underline cursor-pointer shrink-0"
                              >
                                Priorizar
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-black/65 leading-relaxed">{sec.tagline}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manual override selector if user arrived via custom text */}
                {recommendation.isCustomChallenge && (
                  <div className="space-y-2 pb-6 border-b border-black/10">
                    <label
                      htmlFor="adjust-service-select"
                      className="block text-xs font-semibold uppercase tracking-widest text-black/55"
                    >
                      ¿Prefieres ajustar la clasificación orientativa?
                    </label>
                    <select
                      id="adjust-service-select"
                      value={recommendation.primaryServiceId}
                      onChange={(e) => handleAdjustPrimaryService(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 border border-black/25 bg-white text-sm text-black focus:border-[#0042FD] focus:outline-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 4 Structured Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black">
                      Qué podemos investigar
                    </h4>
                    <ul className="space-y-2 text-sm text-black/75">
                      {recommendation.whatWeInvestigate.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#0042FD] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black">
                      Qué preguntas podemos responder
                    </h4>
                    <ul className="space-y-2 text-sm text-black/75">
                      {recommendation.questionsAnswered.map((q) => (
                        <li key={q} className="flex items-start gap-2">
                          <span className="text-[#0042FD] font-bold shrink-0" aria-hidden="true">
                            ·
                          </span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black">
                      Qué tipo de metodología podría utilizarse
                    </h4>
                    <ul className="space-y-2 text-sm text-black/75">
                      {recommendation.indicativeMethodology.map((m) => (
                        <li key={m} className="flex items-start gap-2">
                          <span className="text-black/40 font-bold shrink-0" aria-hidden="true">
                            —
                          </span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-black">
                      Qué información obtiene tu empresa
                    </h4>
                    <ul className="space-y-2 text-sm text-black/75">
                      {recommendation.businessOutcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#00D6B6] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Links: Descubrir servicio específico + Hablar de mi proyecto + Todos */}
                <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-black/10">
                  {primaryService && (
                    <button
                      type="button"
                      onClick={() => handleGoToService(primaryService.path)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      <span>DESCUBRIR {primaryService.title.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleGoToContact}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0042FD] text-white hover:bg-[#00D6B6] hover:text-black text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>HABLAR DE MI PROYECTO</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/servicios')}
                    className="px-4 py-3 border border-black/25 text-black/80 text-xs font-semibold tracking-wider uppercase hover:border-black hover:text-black transition-colors cursor-pointer"
                  >
                    VER TODOS LOS SERVICIOS
                  </button>
                </div>
              </div>

              {/* Right 5 cols: Follow-up Notes + Personalized Contact CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-black text-white p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                    <Compass className="w-4 h-4" aria-hidden="true" />
                    <span>Siguiente paso</span>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="additional-brand-notes"
                      className="block font-display text-lg sm:text-xl text-white"
                    >
                      ¿Qué te gustaría cambiar o comprender de tu marca?
                    </label>
                    <p className="text-xs text-white/65">
                      Campo opcional. Si lo deseas, añade contexto adicional; lo trasladaremos
                      directamente al formulario para que no tengas que repetirlo.
                    </p>
                    <textarea
                      id="additional-brand-notes"
                      rows={4}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Ejemplo: Queremos lanzar una nueva línea en seis meses y dudamos si nuestro envase actual transmite el valor adecuado..."
                      className="w-full mt-2 p-3.5 bg-white/10 border border-white/25 focus:border-[#00D6B6] focus:outline-none text-sm text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/15 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl sm:text-3xl tracking-tight text-white">
                      ¿LO INVESTIGAMOS JUNTOS?
                    </h4>
                    <p className="text-sm text-white/75 leading-relaxed">
                      Cuéntanos un poco más sobre tu reto y estudiaremos cómo abordarlo. Conservaremos
                      tu necesidad y la recomendación generada.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoToContact}
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span>HABLEMOS DE TU PROYECTO</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
