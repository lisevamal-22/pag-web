import React, { useState } from 'react';
import {
  ArrowRight,
  Paperclip,
  Check,
  Download,
  Linkedin,
  Camera,
  X,
} from 'lucide-react';
import { SensiaIsotipo } from '../components/BrandMarks';
import {
  ABOUT_STORY_MILESTONES,
  OFFICE_SPACE_PHOTOS,
  TEAM_DEMO_PROFILES,
  TEAM_GROUP_PHOTO,
  TEAM_MEMBERS,
  TeamMember,
} from '../data/brandConfig';
import { useRouter } from '../context/RouterContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateArea, setCandidateArea] = useState('');
  const [candidatePortfolio, setCandidatePortfolio] = useState('');
  const [candidateFileName, setCandidateFileName] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);

  const hasRealTeamMembers = TEAM_MEMBERS.length > 0;
  const teamProfiles = hasRealTeamMembers ? TEAM_MEMBERS : TEAM_DEMO_PROFILES;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCandidateFileName(file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : null);
  };

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateName.trim().length < 2) {
      setFormError('Introduce tu nombre completo.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateEmail.trim())) {
      setFormError('Introduce un correo electrónico válido.');
      return;
    }
    if (candidateArea.trim().length < 3) {
      setFormError('Indica tu especialidad o área de interés.');
      return;
    }
    setFormError('');

    const summary = [
      'SENSIA LABs — Candidatura espontánea',
      `Nombre: ${candidateName.trim()}`,
      `Correo: ${candidateEmail.trim()}`,
      `Especialidad: ${candidateArea.trim()}`,
      candidatePortfolio.trim() ? `Portfolio / Enlace: ${candidatePortfolio.trim()}` : null,
      candidateFileName ? `Archivo adjunto seleccionado: ${candidateFileName}` : null,
    ]
      .filter((line): line is string => Boolean(line))
      .join('\n');

    setSubmittedBrief(summary);
  };

  const handleDownloadCandidateBrief = () => {
    if (!submittedBrief) return;
    const blob = new Blob([submittedBrief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SENSIA-LABs-Candidatura-${candidateName.trim().toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPortraitCard = (member: TeamMember, extraClass = '') => (
    <button
      key={member.id}
      type="button"
      onClick={() => setSelectedMember(member)}
      className={`group relative overflow-hidden bg-[#EAE3D2] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0042FD] transition-transform duration-300 hover:-translate-y-1 ${extraClass}`}
    >
      {member.photoUrl && (
        <img
          src={member.photoUrl}
          alt={member.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 p-4 sm:p-5 flex flex-col justify-end">
        {member.isDemo && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD203]">
            Imagen de demostración
          </span>
        )}
        <span className="font-display text-base sm:text-lg text-white leading-tight">
          {member.name}
        </span>
        <span className="text-xs text-[#00D6B6] font-semibold mt-0.5">{member.role}</span>
        <span className="text-[11px] text-white/80 mt-0.5">{member.specialty}</span>
      </div>
    </button>
  );

  return (
    <div>
      {/* =====================================================================
          1. HERO — QUIÉNES SOMOS (BLANCO #FFFFFF)
         ===================================================================== */}
      <section className="bg-white text-black py-20 lg:py-28 border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-10">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                  Sobre nosotros · Quiénes somos
                </p>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-[66px] tracking-tight leading-[0.99] text-black text-balance">
                  NO NOS CONFORMAMOS CON LO QUE SE VE.
                </h1>
              </div>

              <div className="space-y-6 max-w-2xl">
                <p className="text-base sm:text-xl text-black/80 leading-relaxed">
                  En SENSIA LABs investigamos lo que ocurre detrás de cada percepción, emoción y
                  decisión para comprender mejor a las personas y ayudar a las marcas a conectar con
                  ellas.
                </p>

                <div className="flex items-center gap-3 pt-2" aria-hidden="true">
                  <span className="w-10 h-2 bg-[#0042FD]" />
                  <span className="w-6 h-2 bg-[#00D6B6]" />
                  <span className="w-4 h-2 bg-[#FFD203]" />
                  <span className="w-4 h-2 bg-[#FE5D0A]" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-12 gap-4 items-stretch">
              <div className="col-span-8 bg-neutral-100 border border-black/15 overflow-hidden min-h-[280px] lg:min-h-[400px]">
                <img
                  src="/src/assets/images/project_visual_attention_1795190451005.jpg"
                  alt="Experimentación visual con prismas ópticos en laboratorio perceptual de SENSIA LABs"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-4 flex flex-col justify-between border border-black/15 bg-[#FAF9F6] p-5">
                <div className="flex justify-center pt-2">
                  <SensiaIsotipo size={76} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-black/60 leading-relaxed">
                  Entender lo que no siempre se ve
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. NUESTRA HISTORIA — TODO EMPIEZA CON UNA PREGUNTA (NEGRO #000000)
         ===================================================================== */}
      <section className="bg-black text-white py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-white/15">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                Nuestra historia
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.03] text-white text-balance">
                TODO EMPIEZA CON UNA PREGUNTA.
              </h2>
            </div>

            <div className="lg:col-span-4 space-y-2">
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Un espacio creado para investigar la percepción, el comportamiento y la experiencia
                del consumidor más allá de la superficie.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#FFD203]">
                Estructura preparada · Textos provisionales editables
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Columna fotográfica editorial izquierda */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              <div className="flex-1 min-h-[280px] border border-white/20 bg-neutral-900 overflow-hidden">
                <img
                  src="/src/assets/images/project_packaging_perception_1795190451546.jpg"
                  alt="Estudio material y perceptual de formas y color en laboratorio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/55">
                Observación, contraste y comprensión humana como punto de partida
              </p>
            </div>

            {/* Línea de hitos editoriales sin fechas ni datos inventados */}
            <div className="lg:col-span-7 divide-y divide-white/15 border-t border-b border-white/15">
              {ABOUT_STORY_MILESTONES.map((step) => (
                <article
                  key={step.index}
                  className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                >
                  <div className="sm:col-span-4 flex items-center gap-3">
                    <span
                      className="w-3 h-3 shrink-0"
                      style={{ backgroundColor: step.accentHex }}
                      aria-hidden="true"
                    />
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs tabular-nums text-white/55 block">
                        {step.index} · {step.area}
                      </span>
                      {step.isProvisional && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFD203] block">
                          Texto provisional
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MISIÓN Y VISIÓN — DOS BLOQUES VISUALES DIFERENCIADOS (BLANCO #FFFFFF)
         ===================================================================== */}
      <section className="bg-white text-black py-20 lg:py-28 border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
              Propósito y dirección
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
              MISIÓN Y VISIÓN
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Bloque 1: Nuestra Misión */}
            <article className="lg:col-span-6 bg-[#0042FD] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-12">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#FFD203] font-semibold">
                  01 · Nuestra Misión
                </span>
                <svg
                  width="56"
                  height="24"
                  viewBox="0 0 56 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="28" cy="12" r="10" fill="#FFD203" />
                  <circle cx="44" cy="12" r="10" fill="#00D6B6" />
                </svg>
              </div>

              <div className="space-y-5">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.12] text-white text-balance">
                  Comprender a las personas para ayudar a las marcas a tomar mejores decisiones.
                </h3>
                <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                  Investigar cómo percibimos, sentimos y actuamos para transformar el conocimiento del
                  consumidor en información útil para las marcas.
                </p>
              </div>
            </article>

            {/* Bloque 2: Nuestra Visión */}
            <article className="lg:col-span-6 bg-black text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-12">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#00D6B6] font-semibold">
                  02 · Nuestra Visión
                </span>
                <svg
                  width="56"
                  height="24"
                  viewBox="0 0 56 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" stroke="#00D6B6" strokeWidth="2" />
                  <rect x="28" y="2" width="26" height="20" fill="#FE5D0A" />
                </svg>
              </div>

              <div className="space-y-5">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.12] text-white text-balance">
                  Convertir el conocimiento del consumidor en una herramienta esencial para construir
                  marcas y experiencias más relevantes.
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  Queremos contribuir a que las decisiones de marketing y comunicación se fundamenten
                  cada vez más en la comprensión real de las personas.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. EL EQUIPO — LAS PERSONAS DETRÁS DE SENSIA (FONDO CLARO #FAF9F6)
         ===================================================================== */}
      <section
        id="equipo"
        className="py-20 lg:py-28 bg-[#FAF9F6] text-black border-b border-black/10 scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                El equipo · Las personas detrás de SENSIA
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.03] text-black text-balance">
                DETRÁS DE CADA INVESTIGACIÓN, HAY PERSONAS.
              </h2>
            </div>

            <p className="lg:col-span-5 text-base sm:text-lg text-black/75 leading-relaxed">
              Somos las personas que observan, investigan, analizan y conectan las señales para
              descubrir lo que no siempre se ve.
            </p>
          </div>

          {/* MOSAICO ASIMÉTRICO CON GRANDES PALABRAS INTERCALADAS ("PERSONAS CURIOSAS. MIRADAS DIFERENTES.") */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/60">
                Pasa el cursor o selecciona cada retrato para ver el detalle
              </span>
              {!hasRealTeamMembers && (
                <span className="text-xs text-black/55">
                  Retratos provisionales de demostración hasta publicar las fotografías reales del
                  equipo.
                </span>
              )}
            </div>

            {/* Fila 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="md:col-span-3 aspect-[4/3]">
                {renderPortraitCard(teamProfiles[0], 'w-full h-full')}
              </div>
              <div className="md:col-span-6 flex items-center justify-center py-2">
                <span className="font-display text-4xl sm:text-6xl lg:text-[74px] tracking-tight text-black leading-none select-none">
                  PERSONAS
                </span>
              </div>
              <div className="md:col-span-3 aspect-[4/3]">
                {renderPortraitCard(teamProfiles[1 % teamProfiles.length], 'w-full h-full')}
              </div>
            </div>

            {/* Fila 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="md:col-span-5 flex items-center md:justify-end py-2">
                <span className="font-display text-4xl sm:text-6xl lg:text-[74px] tracking-tight text-[#0042FD] leading-none select-none">
                  CURIOSAS.
                </span>
              </div>
              <div className="md:col-span-4 aspect-[4/3]">
                {renderPortraitCard(teamProfiles[2 % teamProfiles.length], 'w-full h-full')}
              </div>
              <div className="md:col-span-3 hidden md:flex items-center justify-center">
                <span className="font-display text-3xl lg:text-5xl tracking-tight text-black leading-none select-none">
                  MIRADAS
                </span>
              </div>
            </div>

            {/* Fila 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="md:col-span-3 aspect-[4/3]">
                {renderPortraitCard(teamProfiles[1 % teamProfiles.length], 'w-full h-full')}
              </div>
              <div className="md:col-span-6 flex items-center justify-center py-2">
                <span className="font-display text-4xl sm:text-6xl lg:text-[72px] tracking-tight text-black leading-none select-none">
                  <span className="md:hidden">MIRADAS </span>DIFERENTES.
                </span>
              </div>
              <div className="md:col-span-3 aspect-[4/3]">
                {renderPortraitCard(teamProfiles[0], 'w-full h-full')}
              </div>
            </div>

            {/* Presentación ampliada al seleccionar un retrato del mosaico */}
            {selectedMember && (
              <div className="p-6 sm:p-8 bg-white border border-black flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#0042FD] font-semibold uppercase tracking-wider">
                    <span>{selectedMember.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedMember.specialty}</span>
                  </div>
                  <h3 className="font-display text-2xl text-black">{selectedMember.name}</h3>
                  <p className="text-sm sm:text-base text-black/75 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Cerrar presentación"
                  className="p-2.5 border border-black/20 hover:border-black cursor-pointer self-start sm:self-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* FOTOGRAFÍA GRUPAL REAL DEL EQUIPO EN LA OFICINA (SIN STOCK NI IA) */}
          <figure className="space-y-3">
            {TEAM_GROUP_PHOTO.imageUrl ? (
              <div className="aspect-[16/9] lg:aspect-[21/9] w-full bg-neutral-200 border border-black/15 overflow-hidden">
                <img
                  src={TEAM_GROUP_PHOTO.imageUrl}
                  alt={TEAM_GROUP_PHOTO.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full bg-white border border-black flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
                {/* Retícula arquitectónica limpia con acentos de marca */}
                <div className="flex items-center justify-between gap-4 z-10">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-black/60">
                    FOTOGRAFÍA GRUPAL DEL EQUIPO · OFICINA SENSIA LABs
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#0042FD] font-semibold">
                    <Camera className="w-4 h-4" aria-hidden="true" />
                    <span>Espacio reservado para foto original</span>
                  </span>
                </div>

                {/* Composición geométrica sutil de marca sin simular personas */}
                <div
                  className="my-auto py-8 flex flex-col items-start gap-4 max-w-2xl z-10"
                  aria-hidden="false"
                >
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="w-12 h-3 bg-[#0042FD]" />
                    <span className="w-8 h-3 bg-[#00D6B6]" />
                    <span className="w-6 h-3 bg-[#FFD203]" />
                    <span className="w-6 h-3 bg-[#FE5D0A]" />
                  </div>
                  <p className="font-display text-2xl sm:text-4xl tracking-tight text-black leading-tight">
                    Espacio preparado para la fotografía grupal del equipo de SENSIA LABs en nuestra
                    oficina.
                  </p>
                  <p className="text-sm sm:text-base text-black/65 max-w-xl leading-relaxed">
                    Reservado exclusivamente para la imagen horizontal original del equipo trabajando
                    o reunido, sin utilizar fotografías de stock ni retratos generados por IA.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/15 z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                    Formato panorámico · 16:9 / 21:9
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                    Sustitución directa mediante TEAM_GROUP_PHOTO
                  </span>
                </div>
              </div>
            )}
            <figcaption className="text-xs font-mono uppercase tracking-wider text-black/55">
              {TEAM_GROUP_PHOTO.caption}
            </figcaption>
          </figure>

          {/* FICHAS DE INTEGRANTES DEBAJO DE LA FOTOGRAFÍA */}
          <div className="pt-4 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-black/15 pb-4">
              <h3 className="font-display text-xl sm:text-2xl text-black">
                Personas del laboratorio
              </h3>
              {!hasRealTeamMembers && (
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#FE5D0A]">
                  Módulos preparados para añadir nombres, cargos y LinkedIn reales
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamProfiles.map((member, idx) => {
                const barColor =
                  idx === 0 ? '#0042FD' : idx === 1 ? '#00D6B6' : '#FE5D0A';
                return (
                  <article
                    key={member.id}
                    className="bg-white border border-black/15 p-7 sm:p-8 flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="w-8 h-1.5 block"
                          style={{ backgroundColor: barColor }}
                          aria-hidden="true"
                        />
                        {member.isDemo && (
                          <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                            Pendiente de alta real
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-xl sm:text-2xl text-black">
                          {member.name}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0042FD]">
                          {member.role}
                        </p>
                        <p className="text-xs text-black/55">{member.specialty}</p>
                      </div>

                      <p className="text-sm text-black/75 leading-relaxed">{member.bio}</p>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
                      {member.linkedinUrl ? (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] transition-colors"
                        >
                          <Linkedin className="w-4 h-4" aria-hidden="true" />
                          <span>Perfil de LinkedIn</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black/45">
                          <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>LinkedIn disponible al completar ficha</span>
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. NUESTRO ESPACIO — UN ESPACIO PARA OBSERVAR, EXPERIMENTAR Y DESCUBRIR (NEGRO #000000)
         ===================================================================== */}
      <section className="py-20 lg:py-28 bg-black text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/15">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                Nuestro espacio
              </p>
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight leading-[1.03] text-white text-balance">
                UN ESPACIO PARA OBSERVAR, EXPERIMENTAR Y DESCUBRIR.
              </h2>
            </div>

            <p className="text-sm text-white/65 max-w-sm">
              Galería preparada exclusivamente para fotografías reales de nuestras instalaciones,
              sin recreaciones ficticias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {OFFICE_SPACE_PHOTOS.map((slot, idx) => {
              const colSpanClass =
                idx === 0 ? 'md:col-span-6' : idx === 1 ? 'md:col-span-6' : 'md:col-span-12';
              const aspectClass = idx === 2 ? 'aspect-[21/8]' : 'aspect-[16/10]';

              return (
                <figure key={slot.id} className={`${colSpanClass} space-y-3`}>
                  {slot.imageUrl ? (
                    <div
                      className={`${aspectClass} w-full bg-neutral-900 border border-white/20 overflow-hidden`}
                    >
                      <img
                        src={slot.imageUrl}
                        alt={slot.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`${aspectClass} w-full bg-white/[0.03] border border-white/20 p-6 sm:p-8 flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#00D6B6]">
                          ESPACIO REAL · {String(idx + 1).padStart(2, '0')}
                        </span>
                        <Camera className="w-4 h-4 text-white/40" aria-hidden="true" />
                      </div>
                      <div className="space-y-1.5 max-w-lg">
                        <p className="font-display text-xl sm:text-2xl text-white">
                          {slot.title}
                        </p>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                          {slot.description}
                        </p>
                      </div>
                    </div>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ÚNETE A NOSOTROS (PRESERVANDO ENLACE #unete DEL FOOTER)
         ===================================================================== */}
      <section id="unete" className="py-20 lg:py-24 bg-white text-black scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                Únete a nosotros
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
                ¿TE GUSTARÍA FORMAR PARTE DE SENSIA?
              </h2>
              <p className="text-base text-black/75 max-w-xl leading-relaxed">
                Aunque no tengamos ofertas activas publicadas, valoramos conocer a personas curiosas
                de investigación, diseño UX, análisis conductual y creatividad estratégica.
              </p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              {!showJoinForm && (
                <button
                  type="button"
                  onClick={() => setShowJoinForm(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-black hover:bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>QUIERO UNIRME A SENSIA</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {showJoinForm && (
            <div className="bg-neutral-50 border border-black/15 text-black p-6 sm:p-10 max-w-3xl">
              {!submittedBrief ? (
                <form onSubmit={handleCandidateSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-black/15">
                    <h3 className="font-display text-xl text-black">Candidatura espontánea</h3>
                    <button
                      type="button"
                      onClick={() => setShowJoinForm(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-black/60 hover:text-black underline cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="cand-name" className="block text-xs font-semibold uppercase tracking-wider">
                        Nombre *
                      </label>
                      <input
                        id="cand-name"
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="cand-email" className="block text-xs font-semibold uppercase tracking-wider">
                        Correo electrónico *
                      </label>
                      <input
                        id="cand-email"
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="cand-area" className="block text-xs font-semibold uppercase tracking-wider">
                        Especialidad o enfoque *
                      </label>
                      <input
                        id="cand-area"
                        type="text"
                        value={candidateArea}
                        onChange={(e) => setCandidateArea(e.target.value)}
                        placeholder="Ej. Investigación cualitativa, UX, estrategia..."
                        className="w-full px-3.5 py-2.5 bg-white border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="cand-portfolio" className="block text-xs font-semibold uppercase tracking-wider">
                        Portfolio o LinkedIn
                      </label>
                      <input
                        id="cand-portfolio"
                        type="url"
                        value={candidatePortfolio}
                        onChange={(e) => setCandidatePortfolio(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 bg-white border border-black/25 focus:border-[#0042FD] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="cand-cv" className="block text-xs font-semibold uppercase tracking-wider">
                      Adjuntar CV o portfolio (PDF / DOC)
                    </label>
                    <label
                      htmlFor="cand-cv"
                      className="flex items-center gap-2.5 px-4 py-3 bg-white border border-dashed border-black/30 hover:border-black cursor-pointer text-xs text-black/75"
                    >
                      <Paperclip className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{candidateFileName ?? 'Seleccionar archivo desde tu dispositivo'}</span>
                      <input
                        id="cand-cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[#FE5D0A]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Preparar candidatura
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0042FD]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Resumen de candidatura preparado</span>
                  </div>
                  <p className="text-sm text-black/75">
                    Este entorno no dispone todavía de recepción automática de archivos en servidor,
                    por lo que puedes descargar tu ficha lista para enviar cuando se habilite el
                    canal oficial.
                  </p>
                  <pre className="p-4 bg-white border border-black/15 text-xs whitespace-pre-wrap font-sans">
                    {submittedBrief}
                  </pre>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadCandidateBrief}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#0042FD] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Descargar ficha (.txt)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedBrief(null)}
                      className="text-xs font-semibold uppercase tracking-wider underline cursor-pointer"
                    >
                      Editar datos
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          6. CIERRE Y CTA FINAL (#0042FD)
         ===================================================================== */}
      <section className="py-24 lg:py-32 bg-[#0042FD] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-white max-w-4xl text-balance">
            ¿QUIERES SABER QUÉ PODEMOS DESCUBRIR JUNTOS?
          </h2>
          <p className="text-base sm:text-xl text-white/85 max-w-xl">
            Cada proyecto comienza con una pregunta. Cuéntanos la tuya.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black hover:bg-black hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>HABLEMOS DE TU PROYECTO</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
