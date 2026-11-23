import React from 'react';
import type { ConceptualProject } from '../data/projectsData';

/**
 * Composiciones de «página web» de cada proyecto para la experiencia de /proyectos.
 * Cada una se diseña a un ancho fijo (DESIGN_W) y se escala como una captura, para que la
 * tipografía, los recortes y las proporciones se mantengan idénticos en cualquier pantalla.
 * Cada proyecto tiene su propia maqueta: no se reutiliza una plantilla común.
 */
export const DESIGN_W = 1280;
export const DESIGN_VIEW_H = 800; // ventana visible (16:10)

const IMG = {
  interview: '/src/assets/images/service_consumer_interview_1795194940990.jpg',
  shelf: '/src/assets/images/service_eyetracking_supermarket_1795194942172.jpg',
  pack: '/src/assets/images/project_packaging_perception_1795190451546.jpg',
  retail: '/src/assets/images/project_retail_sensory_1795190451942.jpg',
  prisms: '/src/assets/images/project_visual_attention_1795190451005.jpg',
  glass: '/src/assets/images/insights_perception_cover_1795190451319.jpg',
  m: (n: string) => `/media/proyectos/${n}.jpg`,
};

const Img: React.FC<{ src: string; className?: string; style?: React.CSSProperties; pos?: string }> = ({
  src,
  className = '',
  style,
  pos = 'center',
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    loading="lazy"
    decoding="async"
    className={`block w-full h-full object-cover ${className}`}
    style={{ objectPosition: pos, ...style }}
  />
);

/** Barra de navegación ficticia de la «página» */
const MockNav: React.FC<{ dark?: boolean; label: string; number: string }> = ({ dark, label, number }) => (
  <div
    className={`flex items-center justify-between px-8 h-[44px] font-mono text-[11px] uppercase tracking-[0.12em] border-b ${
      dark ? 'text-white/70 border-white/15' : 'text-black/60 border-black/10'
    }`}
  >
    <span className="flex gap-6">
      <span className={dark ? 'text-white' : 'text-black'}>Índice</span>
      <span>Estudio</span>
      <span>Método</span>
      <span>Hallazgos</span>
    </span>
    <span className={dark ? 'text-white' : 'text-black'}>SENSIA LABs — {label}</span>
    <span>Demo {number}</span>
  </div>
);

const DemoTag: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <span
    className={`inline-block font-mono text-[11px] uppercase tracking-[0.14em] px-2 py-1 border ${
      dark ? 'border-white/40 text-white/80' : 'border-black/30 text-black/70'
    }`}
  >
    Demostración conceptual
  </span>
);

/* 01 · INVESTIGACIÓN DEL CONSUMIDOR — editorial blanco, titular gigante, gran fotografía */
const ConsumidorPage: React.FC<{ p: ConceptualProject }> = ({ p }) => (
  <div className="bg-white text-black" style={{ height: 1760 }}>
    <MockNav label="Investigación del consumidor" number={p.number} />
    <div className="grid grid-cols-12 gap-6 px-8 pt-10">
      <h3 className="col-span-9 font-display leading-[0.86] tracking-[-0.03em] text-[150px]">
        LO QUE
        <br />
        NO SE DICE
      </h3>
      <div className="col-span-3 pt-4 space-y-5">
        <DemoTag />
        <p className="font-mono text-[12px] leading-[1.55] uppercase text-black/70">{p.summary}</p>
        <span className="block w-10 h-10" style={{ background: '#00D6B6' }} />
      </div>
    </div>
    <div className="mt-10 mx-8 h-[620px] overflow-hidden">
      <Img src={IMG.interview} pos="50% 40%" />
    </div>
    <div className="grid grid-cols-12 gap-6 px-8 mt-6">
      <div className="col-span-5 h-[420px] overflow-hidden">
        <Img src={IMG.m('consumidor-producto')} />
      </div>
      <div className="col-span-4 h-[420px] p-8 flex flex-col justify-between" style={{ background: '#00D6B6' }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Señales observadas</span>
        <ul className="font-display text-[44px] leading-[1.02]">
          <li>MOTIVACIÓN</li>
          <li>HÁBITO</li>
          <li>BARRERA</li>
        </ul>
      </div>
      <div className="col-span-3 h-[420px] overflow-hidden">
        <Img src={IMG.m('consumidor-escucha')} pos="30% 50%" />
      </div>
    </div>
    <div className="px-8 mt-10 grid grid-cols-12 gap-6 font-mono text-[11px] uppercase text-black/60">
      <span className="col-span-3">{p.methodology}</span>
      <span className="col-span-6 normal-case text-[13px] text-black/75 leading-relaxed">{p.challenge}</span>
      <span className="col-span-3 text-right">Y{p.year.slice(2)} · Demo {p.number}</span>
    </div>
  </div>
);

/* 02 · NEUROMARKETING — fondo negro, texto monoespaciado grande, mapa de atención */
const NeuroPage: React.FC<{ p: ConceptualProject }> = ({ p }) => (
  <div className="bg-black text-white" style={{ height: 1820 }}>
    <MockNav dark label="Neuromarketing" number={p.number} />
    <div className="grid grid-cols-12">
      <div className="col-span-6 h-[756px] overflow-hidden">
        <Img src={IMG.m('eyetracking-gafas')} pos="65% 40%" />
      </div>
      <div className="col-span-6 p-10 flex flex-col justify-between">
        <p className="font-mono uppercase text-[30px] leading-[1.12] tracking-[-0.01em]">
          Impacto sensorial: qué captura la mirada en los tres primeros segundos y qué se queda en la memoria.
        </p>
        <div className="space-y-4">
          <DemoTag dark />
          <p className="font-mono text-[12px] text-white/60 uppercase leading-relaxed">{p.methodDetail}</p>
        </div>
      </div>
    </div>
    <div className="h-[560px] overflow-hidden">
      <Img src={IMG.m('eyetracking-heatmap')} />
    </div>
    <div className="grid grid-cols-12 gap-[2px] mt-[2px]">
      <div className="col-span-4 h-[300px] p-8 flex flex-col justify-between" style={{ background: '#0042FD' }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">Atención temprana</span>
        <span className="font-display text-[110px] leading-none">3s</span>
      </div>
      <div className="col-span-4 h-[300px] overflow-hidden">
        <Img src={IMG.prisms} />
      </div>
      <div className="col-span-4 h-[300px] overflow-hidden">
        <Img src={IMG.m('eyetracking-recorrido')} pos="30% 50%" />
      </div>
    </div>
    <div className="px-10 pt-8 font-mono text-[11px] uppercase text-white/50 flex justify-between">
      <span>{p.title}</span>
      <span>{p.category}</span>
      <span>Y{p.year.slice(2)}</span>
    </div>
  </div>
);

/* 03 · PERCEPCIÓN — mosaico asimétrico de contextos de color sobre gris */
const PercepcionPage: React.FC<{ p: ConceptualProject }> = ({ p }) => (
  <div className="text-black" style={{ height: 1700, background: '#ECECEA' }}>
    <MockNav label="Percepción" number={p.number} />
    <div className="px-8 pt-8 flex items-end justify-between">
      <h3 className="font-mono uppercase text-[64px] leading-[0.95] tracking-[-0.02em]">
        El color
        <br />
        que convierte
      </h3>
      <div className="w-[300px] space-y-3 pb-2">
        <DemoTag />
        <p className="text-[13px] leading-relaxed text-black/70">{p.context}</p>
      </div>
    </div>
    <div className="grid grid-cols-12 gap-4 px-8 mt-8">
      <figure className="col-span-7 h-[520px] overflow-hidden relative">
        <Img src={IMG.m('pack-naranja')} />
        <figcaption className="absolute left-4 bottom-4 font-mono text-[11px] uppercase text-white">Contexto A · cálido</figcaption>
      </figure>
      <div className="col-span-5 grid grid-rows-2 gap-4 h-[520px]">
        <figure className="overflow-hidden relative">
          <Img src={IMG.m('pack-noche')} />
          <figcaption className="absolute left-4 bottom-4 font-mono text-[11px] uppercase text-white">Contexto B · nocturno</figcaption>
        </figure>
        <div className="p-6 flex flex-col justify-between" style={{ background: '#FE5D0A' }}>
          <span className="font-mono text-[11px] uppercase text-white/85">Misma forma · otro significado</span>
          <span className="font-display text-[54px] leading-none text-white">+ CONTEXTO</span>
        </div>
      </div>
      <figure className="col-span-4 h-[420px] overflow-hidden relative">
        <Img src={IMG.m('pack-aguamarina')} />
        <figcaption className="absolute left-4 bottom-4 font-mono text-[11px] uppercase">Contexto C · fresco</figcaption>
      </figure>
      <figure className="col-span-8 h-[420px] overflow-hidden relative">
        <Img src={IMG.m('pack-amarillo')} pos="50% 60%" />
        <figcaption className="absolute left-4 bottom-4 font-mono text-[11px] uppercase">Contexto D · energía</figcaption>
      </figure>
    </div>
    <div className="px-8 mt-8 grid grid-cols-3 gap-6 font-mono text-[11px] uppercase text-black/60">
      {p.findings.map((f, i) => (
        <span key={f} className="normal-case text-[12px] leading-relaxed">
          <span className="block uppercase text-black mb-1">0{i + 1}</span>
          {f}
        </span>
      ))}
    </div>
  </div>
);

/* 04 · COMPORTAMIENTO — banda amarilla, índice tipo tabla, fila destacada */
const ComportamientoPage: React.FC<{ p: ConceptualProject }> = ({ p }) => {
  const rows = [
    ['01', 'Explorar el lineal', 'Recorrido', '0–4 s'],
    ['02', 'Comparar alternativas', 'Duda', '4–11 s'],
    ['03', 'Tomar un producto', 'Contacto', '11–14 s'],
    ['04', 'Elegir o aplazar', 'Decisión', '14–18 s'],
    ['05', 'Reconstruir la elección', 'Entrevista', 'Posterior'],
  ];
  return (
    <div className="bg-white text-black" style={{ height: 1680 }}>
      <div style={{ background: '#FFD203' }}>
        <MockNav label="Comportamiento" number={p.number} />
        <h3 className="px-8 pt-6 pb-8 font-display text-[132px] leading-[0.86] tracking-[-0.03em]">
          DECISIÓN
          <br />
          DE COMPRA
        </h3>
      </div>
      <div className="grid grid-cols-12 gap-6 px-8 pt-8">
        <div className="col-span-7">
          <div className="flex justify-between font-mono text-[11px] uppercase text-black/50 pb-2 border-b border-black">
            <span>Momento</span>
            <span>Señal · Tiempo</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r[0]}
              className={`flex justify-between items-center font-mono text-[14px] uppercase py-3 border-b border-black/15 ${
                i === 3 ? 'bg-black text-white px-3 -mx-3' : ''
              }`}
            >
              <span>
                {r[0]} · {r[1]}
              </span>
              <span className={i === 3 ? 'text-white/80' : 'text-black/55'}>
                {r[2]} · {r[3]}
              </span>
            </div>
          ))}
          <div className="pt-6 flex items-start gap-4">
            <DemoTag />
            <p className="text-[13px] leading-relaxed text-black/70 max-w-[420px]">{p.objective}</p>
          </div>
        </div>
        <div className="col-span-5 h-[520px] overflow-hidden bg-neutral-200">
          <Img src={IMG.m('decision-eleccion')} pos="60% 50%" />
        </div>
      </div>
      <div className="mx-8 mt-8 h-[520px] overflow-hidden">
        <Img src={IMG.m('decision-lineal')} />
      </div>
    </div>
  );
};

/* 05 · MARKETING SENSORIAL — mucho blanco, imagen centrada, texto vertical y acentos */
const SensorialPage: React.FC<{ p: ConceptualProject }> = ({ p }) => (
  <div className="text-black" style={{ height: 1780, background: '#F6F5F2' }}>
    <MockNav label="Marketing sensorial" number={p.number} />
    <div className="relative px-8 pt-16">
      <span
        className="absolute left-8 top-24 font-mono text-[12px] uppercase tracking-[0.3em] text-black/60"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        Luz · Material · Atmósfera
      </span>
      <div className="mx-auto w-[820px] h-[560px] overflow-hidden">
        <Img src={IMG.m('sensorial-luz')} />
      </div>
      <span className="absolute right-[150px] top-[520px] w-[110px] h-[110px]" style={{ background: '#00D6B6' }} />
      <h3 className="mx-auto w-[820px] mt-8 font-display text-[88px] leading-[0.9] tracking-[-0.02em]">
        LA LUZ
        <br />
        TAMBIÉN HABLA
      </h3>
    </div>
    <div className="grid grid-cols-12 gap-6 px-8 mt-12">
      <div className="col-span-4 space-y-4">
        <DemoTag />
        <p className="font-mono text-[12px] uppercase leading-[1.6] text-black/65">{p.summary}</p>
      </div>
      <div className="col-span-8 h-[440px] overflow-hidden">
        <Img src={IMG.m('sensorial-materiales')} />
      </div>
    </div>
    <div className="mt-10 h-[10px]" style={{ background: '#FE5D0A' }} />
  </div>
);

/* 06 · EXPERIENCIA DE MARCA — portada naranja y tira de puntos de contacto */
const ExperienciaPage: React.FC<{ p: ConceptualProject }> = ({ p }) => {
  const touchpoints: [string, string][] = [
    [IMG.m('pack-aguamarina'), 'Producto'],
    [IMG.m('decision-lineal'), 'Lineal'],
    [IMG.retail, 'Espacio'],
    [IMG.m('consumidor-sesion'), 'Conversación'],
    [IMG.prisms, 'Recuerdo'],
  ];
  return (
    <div className="bg-white text-black" style={{ height: 1720 }}>
      <div className="text-white" style={{ background: '#FE5D0A' }}>
        <MockNav dark label="Experiencia de marca" number={p.number} />
        <div className="grid grid-cols-12 gap-6 px-8 pt-10 pb-12">
          <h3 className="col-span-8 font-display text-[104px] leading-[0.88] tracking-[-0.03em]">
            EXPERIENCIAS
            <br />
            QUE SE
            <br />
            RECUERDAN
          </h3>
          <div className="col-span-4 flex flex-col justify-end gap-4">
            <DemoTag dark />
            <p className="font-mono text-[12px] uppercase leading-[1.6] text-white/85">{p.context}</p>
          </div>
        </div>
      </div>
      <div className="h-[600px] overflow-hidden relative">
        <Img src={IMG.retail} pos="50% 60%" />
        <span className="absolute right-8 bottom-8 font-mono text-[12px] uppercase text-white bg-black px-3 py-2">
          Del umbral a la salida
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3 px-8 mt-6">
        {touchpoints.map(([src, label], i) => (
          <figure key={label}>
            <div className="h-[200px] overflow-hidden">
              <Img src={src} />
            </div>
            <figcaption className="font-mono text-[11px] uppercase pt-2 flex justify-between">
              <span>0{i + 1}</span>
              <span>{label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="px-8 mt-10 grid grid-cols-12 gap-6">
        <p className="col-span-7 font-mono uppercase text-[28px] leading-[1.15]">Puntos de contacto que construyen memoria de marca.</p>
        <p className="col-span-5 text-[13px] leading-relaxed text-black/70">{p.strategicApplication}</p>
      </div>
    </div>
  );
};

const PAGES: Record<string, React.FC<{ p: ConceptualProject }>> = {
  'lo-que-no-se-dice': ConsumidorPage,
  'impacto-sensorial': NeuroPage,
  'el-color-que-convierte': PercepcionPage,
  'decision-de-compra': ComportamientoPage,
  'la-luz-tambien-habla': SensorialPage,
  'experiencias-que-se-recuerdan': ExperienciaPage,
};

/** Alto total de diseño de cada composición (para el desplazamiento interior) */
export const DESIGN_HEIGHTS: Record<string, number> = {
  'lo-que-no-se-dice': 1760,
  'impacto-sensorial': 1820,
  'el-color-que-convierte': 1700,
  'decision-de-compra': 1680,
  'la-luz-tambien-habla': 1780,
  'experiencias-que-se-recuerdan': 1720,
};

export const ProjectComposition: React.FC<{ project: ConceptualProject }> = ({ project }) => {
  const Page = PAGES[project.id];
  return Page ? <Page p={project} /> : null;
};
