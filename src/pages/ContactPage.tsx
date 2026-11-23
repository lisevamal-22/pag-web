import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Copy, Download, Mail, RotateCcw } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { BRAND_CONTACT_CONFIG } from '../data/brandConfig';
import { useNeeds } from '../context/NeedsContext';
import { useRouter } from '../context/RouterContext';

const NEED_SELECTOR_OPTIONS = [
  'Comprender mejor a mis consumidores',
  'Investigar mi marca',
  'Evaluar una campaña',
  'Mejorar una experiencia',
  'Investigar un producto',
  'Otro reto',
];

const BUDGET_OPTIONS = [
  'Prefiero comentarlo en una primera conversación',
  'Estudio exploratorio puntual (< 4.000 €)',
  'Proyecto de investigación estándar (4.000 € – 10.000 €)',
  'Programa integral multietapa (> 10.000 €)',
];

function mapServiceToNeedCategory(serviceId: string): string {
  const service = SERVICES.find((s) => s.id === serviceId);
  return service?.contactNeedCategory ?? 'Otro reto';
}

export interface ContactSubmissionPayload {
  submittedAt: string;
  name: string;
  company: string;
  email: string;
  serviceOfInterest: string;
  identifiedNeed: string;
  challengeDescription: string;
  orientativeBudget: string;
  assistantContext?: {
    recommendedTitle: string;
    selectedNeedLabel: string;
    followUpFocus?: string;
  };
  privacyAccepted: boolean;
}

export const ContactPage: React.FC = () => {
  const { payload, clearPayload } = useNeeds();
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState<string>(SERVICES[0].id);
  const [identifiedNeed, setIdentifiedNeed] = useState<string>(NEED_SELECTOR_OPTIONS[0]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedPayload, setPreparedPayload] = useState<ContactSubmissionPayload | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  // Hydrate automatically from NeedsTranslator or direct ServiceDetailPage preselection
  useEffect(() => {
    if (!payload.recommendation) return;
    const rec = payload.recommendation;
    setServiceId(rec.primaryServiceId);
    setIdentifiedNeed(mapServiceToNeedCategory(rec.primaryServiceId));

    if (payload.needId !== null) {
      const parts: string[] = [];
      if (rec.isCustomChallenge && rec.customChallengeText) {
        parts.push(`Reto inicial descrito: ${rec.customChallengeText}`);
      } else {
        parts.push(`Necesidad seleccionada: ${rec.needLabel}`);
      }
      if (rec.selectedFollowUp) {
        parts.push(`Enfoque priorizado: ${rec.selectedFollowUp.label}`);
      }
      if (payload.additionalNotes) {
        parts.push(`Detalles adicionales: ${payload.additionalNotes}`);
      }
      setDescription(parts.join('\n\n'));
    }
  }, [payload]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Introduce tu nombre para saber a quién dirigirnos.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Introduce un correo electrónico válido.';
    }
    if (description.trim().length < 15) {
      nextErrors.description =
        'Cuéntanos brevemente qué quieres descubrir o mejorar (mínimo 15 caracteres).';
    }
    if (!privacyAccepted) {
      nextErrors.privacy =
        'Necesitamos tu consentimiento explícito de privacidad para procesar la consulta.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedService = SERVICES.find((s) => s.id === serviceId);
    const submission: ContactSubmissionPayload = {
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      company: company.trim() || 'No especificada',
      email: email.trim(),
      serviceOfInterest: selectedService?.title ?? serviceId,
      identifiedNeed,
      challengeDescription: description.trim(),
      orientativeBudget: budget,
      assistantContext: payload.recommendation
        ? {
            recommendedTitle: payload.recommendation.recommendedTitle,
            selectedNeedLabel: payload.recommendation.needLabel,
            followUpFocus: payload.recommendation.selectedFollowUp?.label,
          }
        : undefined,
      privacyAccepted,
    };

    setPreparedPayload(submission);
  };

  const buildBriefText = (data: ContactSubmissionPayload) => {
    return [
      'SENSIA LABs — Resumen de consulta de investigación',
      `Fecha: ${data.submittedAt}`,
      `Nombre: ${data.name}`,
      `Empresa: ${data.company}`,
      `Correo: ${data.email}`,
      `Servicio de interés: ${data.serviceOfInterest}`,
      `Necesidad identificada: ${data.identifiedNeed}`,
      `Presupuesto orientativo: ${data.orientativeBudget}`,
      data.assistantContext
        ? `Recomendación del Asistente: ${data.assistantContext.recommendedTitle}`
        : null,
      '',
      'Descripción del reto:',
      data.challengeDescription,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');
  };

  const handleCopyBrief = async () => {
    if (!preparedPayload) return;
    try {
      await navigator.clipboard.writeText(buildBriefText(preparedPayload));
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2400);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleDownloadBrief = () => {
    if (!preparedPayload) return;
    const blob = new Blob([buildBriefText(preparedPayload)], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SENSIA-LABs-Brief-${preparedPayload.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleMailto = () => {
    if (!preparedPayload) return;
    const subject = encodeURIComponent(
      `Consulta de investigación — ${preparedPayload.serviceOfInterest}`
    );
    const body = encodeURIComponent(buildBriefText(preparedPayload));
    const recipient = BRAND_CONTACT_CONFIG.email ?? '';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
            Contacto y propuesta a medida
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.03]">
            ¿QUÉ TE GUSTARÍA DESCUBRIR DE TUS CLIENTES?
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-xl">
            Cuéntanos tu reto y planteamos cómo investigarlo.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white text-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 4 cols: Assistant Context Summary OR Quick Assistant Link */}
          <aside className="lg:col-span-4 space-y-6">
            {payload.recommendation ? (
              <div className="p-6 sm:p-8 bg-[#0042FD]/[0.04] border border-[#0042FD] space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                    {payload.needId !== null
                      ? 'Datos del Asistente cargados'
                      : 'Servicio preseleccionado'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      clearPayload();
                      setDescription('');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-black/60 hover:text-black cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    <span>Limpiar</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-black/60">
                    {payload.needId !== null ? 'Servicio recomendado:' : 'Especialidad consultada:'}
                  </p>
                  <p className="font-display text-lg text-black">
                    {payload.recommendation.recommendedTitle}
                  </p>
                </div>

                {payload.needId !== null && (
                  <div className="space-y-1 text-xs text-black/75 pt-3 border-t border-black/10">
                    <p>
                      <strong>Necesidad:</strong>{' '}
                      {payload.recommendation.customChallengeText ||
                        payload.recommendation.needLabel}
                    </p>
                    {payload.recommendation.selectedFollowUp && (
                      <p>
                        <strong>Enfoque:</strong> {payload.recommendation.selectedFollowUp.label}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 sm:p-8 bg-neutral-50 border border-black/15 space-y-4">
                <h2 className="font-display text-xl text-black">
                  ¿Prefieres orientarte antes de escribir?
                </h2>
                <p className="text-sm text-black/75 leading-relaxed">
                  Si no tienes claro qué área encaja mejor con tu problema, nuestro Traductor de
                  Necesidades traslada automáticamente tus respuestas a este formulario.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/', { scrollToId: 'asistente' })}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0042FD] hover:underline cursor-pointer"
                >
                  <span>Ir al Traductor de Necesidades</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 border border-black/15 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-black/55">
                Qué ocurre tras tu consulta
              </h2>
              <ul className="space-y-3 text-sm text-black/75">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#0042FD] tabular-nums">01.</span>
                  <span>Revisamos el contexto de tu reto y el público implicado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#0042FD] tabular-nums">02.</span>
                  <span>Planteamos las preguntas clave que merece la pena investigar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#0042FD] tabular-nums">03.</span>
                  <span>Proponemos una metodología proporcionada a tus objetivos y plazos.</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right 8 cols: Validated Form or Prepared Brief Output */}
          <div className="lg:col-span-8">
            {!preparedPayload ? (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-black p-6 sm:p-10 space-y-6 bg-white"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Nombre completo *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black"
                    />
                    {errors.name && (
                      <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-company" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Empresa o marca
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Correo electrónico *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black"
                    />
                    {errors.email && (
                      <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-need" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Necesidad identificada
                    </label>
                    <select
                      id="contact-need"
                      value={identifiedNeed}
                      onChange={(e) => setIdentifiedNeed(e.target.value)}
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black bg-white"
                    >
                      {NEED_SELECTOR_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Servicio de interés
                    </label>
                    <select
                      id="contact-service"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black bg-white"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-budget" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      Presupuesto orientativo (opcional)
                    </label>
                    <select
                      id="contact-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black bg-white"
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-description" className="block text-xs font-semibold uppercase tracking-wider text-black">
                    Descripción del reto *
                  </label>
                  <textarea
                    id="contact-description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    placeholder="Cuéntanos qué situación quieres comprender, qué producto o marca está implicada y qué decisión te gustaría tomar..."
                    className="w-full p-4 border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm text-black"
                  />
                  {errors.description && (
                    <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-3 text-xs sm:text-sm text-black/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 accent-[#0042FD]"
                    />
                    <span>
                      Consiento el tratamiento de estos datos con el único fin de valorar mi
                      consulta de investigación con SENSIA LABs. *
                    </span>
                  </label>
                  {errors.privacy && (
                    <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-black/55">
                    Campos con * obligatorios · Arquitectura preparada para conexión CRM.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0042FD] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Preparar solicitud de proyecto</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : (
              /* Honest Confirmation & CRM-ready Export / Mailto */
              <div className="border border-black bg-white p-8 sm:p-10 space-y-6">
                <div className="space-y-2 pb-4 border-b border-black/15">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Solicitud validada y estructurada</span>
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-black">
                    Tu brief de investigación está listo, {preparedPayload.name}.
                  </h2>
                  <p className="text-sm text-black/75 leading-relaxed">
                    Este entorno web no tiene configurado todavía un envío automático a servidor o
                    CRM externo, por lo que no simulamos una recepción remota. Puedes enviarnos
                    directamente este resumen por correo o descargarlo para conservar tu consulta.
                  </p>
                </div>

                <pre className="p-5 bg-neutral-50 border border-black/15 text-xs text-black/80 whitespace-pre-wrap font-sans leading-relaxed">
                  {buildBriefText(preparedPayload)}
                </pre>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleMailto}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#0042FD] text-white hover:bg-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Abrir en mi cliente de correo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBrief}
                    className="inline-flex items-center gap-2 px-5 py-3.5 border border-black text-black hover:bg-black hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Descargar resumen (.txt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-2 px-4 py-3.5 border border-black/25 text-black hover:border-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{copiedBrief ? 'Copiado' : 'Copiar texto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreparedPayload(null)}
                    className="text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black underline ml-auto cursor-pointer"
                  >
                    Editar formulario
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
