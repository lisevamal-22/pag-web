import React from 'react';

/**
 * Ilustración editorial arquitectónica de ojo humano en primer plano con códigos cromáticos de
 * test de color y eye tracking (#FE5D0A naranja y #00D6B6 aguamarina). Cero texto incrustado.
 */
export const EyePerceptionArtwork: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-full h-full bg-[#0E0E0E] overflow-hidden flex items-center justify-center">
    {/* Bloques gráficos en naranja y aguamarina */}
    <div
      className="absolute top-0 left-0 w-1/3 h-3"
      style={{ backgroundColor: '#FE5D0A' }}
      aria-hidden="true"
    />
    <div
      className="absolute bottom-0 right-0 w-2/5 h-3"
      style={{ backgroundColor: '#00D6B6' }}
      aria-hidden="true"
    />
    <div
      className="absolute top-5 right-5 w-8 h-8 border border-[#00D6B6]/70"
      aria-hidden="true"
    />

    <svg
      viewBox="0 0 400 280"
      className={`w-full h-full object-cover transition-transform duration-500 ${
        isActive ? 'scale-[1.02]' : 'scale-100'
      }`}
      role="img"
      aria-label="Primer plano gráfico de ojo humano analizando contrastes de color naranja y aguamarina"
    >
      <defs>
        <radialGradient id="sensiaIrisGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="32%" stopColor="#0042FD" />
          <stop offset="68%" stopColor="#00D6B6" />
          <stop offset="100%" stopColor="#0A1A1A" />
        </radialGradient>
        <radialGradient id="sensiaWarmGlow" cx="65%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#FE5D0A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FE5D0A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="280" fill="#0B0B0B" />

      {/* Campos cromáticos de fondo */}
      <rect x="0" y="0" width="112" height="280" fill="#FE5D0A" opacity="0.14" />
      <rect x="288" y="0" width="112" height="280" fill="#00D6B6" opacity="0.14" />

      {/* Retícula mínima de medición ocular */}
      <line x1="200" y1="24" x2="200" y2="256" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />
      <line x1="32" y1="140" x2="368" y2="140" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />

      {/* Contorno anatómico del ojo (esclerótica blanca editorial) */}
      <path
        d="M36 140 C95 66, 305 66, 364 140 C305 214, 95 214, 36 140 Z"
        fill="#F4F4F2"
        stroke="#FFFFFF"
        strokeWidth="2"
      />

      {/* Sombras sutiles internas */}
      <path
        d="M38 140 C96 74, 304 74, 362 140 C304 92, 96 92, 38 140 Z"
        fill="#000000"
        fillOpacity="0.12"
      />

      {/* Iris compuesto */}
      <circle cx="200" cy="140" r="62" fill="url(#sensiaIrisGrad)" stroke="#000000" strokeWidth="2.5" />
      <circle cx="200" cy="140" r="62" fill="url(#sensiaWarmGlow)" />

      {/* Fibras radiales del iris */}
      <g stroke="#FFFFFF" strokeOpacity="0.24" strokeWidth="1">
        <line x1="200" y1="82" x2="200" y2="104" />
        <line x1="200" y1="176" x2="200" y2="198" />
        <line x1="142" y1="140" x2="164" y2="140" />
        <line x1="236" y1="140" x2="258" y2="140" />
        <line x1="159" y1="99" x2="175" y2="115" />
        <line x1="225" y1="165" x2="241" y2="181" />
        <line x1="241" y1="99" x2="225" y2="115" />
        <line x1="175" y1="165" x2="159" y2="181" />
      </g>

      {/* Anillo de fijación cromática */}
      <circle
        cx="200"
        cy="140"
        r="46"
        fill="none"
        stroke="#FE5D0A"
        strokeWidth="2"
        strokeDasharray="10 6"
      />
      <circle cx="200" cy="140" r="54" fill="none" stroke="#00D6B6" strokeWidth="1.2" />

      {/* Pupila */}
      <circle cx="200" cy="140" r="24" fill="#000000" />

      {/* Reflejos especulares de estímulo */}
      <rect x="184" y="122" width="11" height="11" fill="#FFFFFF" />
      <circle cx="216" cy="152" r="4" fill="#00D6B6" />
      <circle cx="176" cy="150" r="3" fill="#FE5D0A" />

      {/* Marcador de punto de fijación */}
      <path d="M192 140 H208 M200 132 V148" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1.2" />
    </svg>
  </div>
);
