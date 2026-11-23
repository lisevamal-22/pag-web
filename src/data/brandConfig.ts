export interface BrandContactConfig {
  email: string | null;
  phone: string | null;
  location: string | null;
  socials: {
    linkedin: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}

/**
 * Configuración centralizada de datos corporativos reales.
 * Permanecen en null hasta disponer de los canales oficiales confirmados,
 * evitando inventar correos, teléfonos, direcciones o perfiles sociales.
 */
export const BRAND_CONTACT_CONFIG: BrandContactConfig = {
  email: null,
  phone: null,
  location: null,
  socials: {
    linkedin: null,
    instagram: null,
    youtube: null,
  },
};

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  sector?: string;
  collaborationType?: string;
  photoUrl?: string;
  photoAlt?: string;
  companyLogoLabel?: string;
  isDemo?: boolean;
  demoBadge?: string;
}

/**
 * Testimonios de muestra solicitados para diseñar y probar el carrusel editorial.
 * Claramente identificados como recursos provisionales / DEMO hasta incorporar citas y fotografías reales autorizadas.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'demo-testimonio-01',
    quote:
      'Ahora entendemos mejor qué elementos de nuestra marca conectan realmente con nuestros clientes.',
    name: 'Perfil provisional 01 (DEMO)',
    role: 'Dirección de Marca y Estrategia',
    company: 'Empresa colaboradora DEMO',
    sector: 'Gran consumo · Identidad de marca',
    collaborationType: 'Estudio de percepción',
    photoUrl: '/src/assets/images/team_portrait_a_1795194941720.jpg',
    photoAlt: 'Retrato fotográfico provisional de demostración para testimonio 01',
    companyLogoLabel: 'MARCA DEMO 01',
    isDemo: true,
    demoBadge: 'Recurso provisional · DEMO 01',
  },
  {
    id: 'demo-testimonio-02',
    quote:
      'La investigación nos ayudó a mirar nuestro producto desde una perspectiva diferente.',
    name: 'Perfil provisional 02 (DEMO)',
    role: 'Responsable de Producto y Packaging',
    company: 'Marca colaboradora DEMO',
    sector: 'Retail y producto · Envases',
    collaborationType: 'Test perceptual y eye tracking',
    photoUrl: '/src/assets/images/team_portrait_b_1795194942830.jpg',
    photoAlt: 'Retrato fotográfico provisional de demostración para testimonio 02',
    companyLogoLabel: 'MARCA DEMO 02',
    isDemo: true,
    demoBadge: 'Recurso provisional · DEMO 02',
  },
  {
    id: 'demo-testimonio-03',
    quote:
      'Descubrir cómo perciben los consumidores nuestra experiencia nos permitió identificar aspectos que antes pasaban desapercibidos.',
    name: 'Perfil provisional 03 (DEMO)',
    role: 'Dirección de Experiencia de Cliente',
    company: 'Organización colaboradora DEMO',
    sector: 'Espacio comercial · Servicios',
    collaborationType: 'Auditoría sensorial y recorrido',
    photoUrl: '/src/assets/images/team_portrait_c_1795194942540.jpg',
    photoAlt: 'Retrato fotográfico provisional de demostración para testimonio 03',
    companyLogoLabel: 'MARCA DEMO 03',
    isDemo: true,
    demoBadge: 'Recurso provisional · DEMO 03',
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  photoUrl?: string;
  linkedinUrl?: string | null;
  isDemo?: boolean;
}

export interface TeamGroupPhotoConfig {
  imageUrl: string | null;
  alt: string;
  caption: string;
}

/**
 * Espacio preparado para incorporar la fotografía grupal real del equipo en oficina.
 * Permanece en null hasta disponer de la imagen original (sin stock ni IA de personas).
 */
export const TEAM_GROUP_PHOTO: TeamGroupPhotoConfig = {
  imageUrl: null,
  alt: 'Equipo de SENSIA LABs reunido en la oficina de investigación',
  caption: 'Las personas detrás de cada estudio, observación e insight.',
};

export interface StoryMilestone {
  index: string;
  area: string;
  title: string;
  description: string;
  isProvisional: boolean;
  accentHex: string;
}

/**
 * Estructura editorial provisional para "Nuestra historia".
 * Sin fechas, fundadores ni hitos inventados; lista para sustituir con la historia real.
 */
export const ABOUT_STORY_MILESTONES: StoryMilestone[] = [
  {
    index: '01',
    area: 'Origen del proyecto',
    title: 'La inquietud de mirar más allá de lo declarado.',
    description:
      'Espacio provisional para narrar cómo surgió la iniciativa de crear SENSIA LABs y qué punto de partida impulsó el proyecto.',
    isProvisional: true,
    accentHex: '#0042FD',
  },
  {
    index: '02',
    area: 'Motivación inicial',
    title: 'La distancia entre lo que la gente dice y cómo elige.',
    description:
      'Espacio provisional para detallar la necesidad detectada en marcas y empresas: tomar decisiones comprendiendo percepción, emoción y conducta real.',
    isProvisional: true,
    accentHex: '#00D6B6',
  },
  {
    index: '03',
    area: 'Evolución de SENSIA LABs',
    title: 'De la curiosidad metodológica a la investigación aplicada.',
    description:
      'Espacio provisional para describir cómo ha ido tomando forma el enfoque de trabajo combinando investigación del consumidor, percepción y experiencia sensorial.',
    isProvisional: true,
    accentHex: '#FFD203',
  },
  {
    index: '04',
    area: 'Qué nos diferencia',
    title: 'Rigor experimental traducido a decisiones claras.',
    description:
      'Diseñamos cada investigación desde la pregunta real de la marca, evitando recetas cerradas y convirtiendo hallazgos complejos en criterios accionables.',
    isProvisional: false,
    accentHex: '#FE5D0A',
  },
];

export interface OfficeSpacePhoto {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  alt: string;
}

/**
 * Galería preparada para fotografías reales de las oficinas o laboratorio de SENSIA LABs.
 * Las imágenes permanecen en null hasta recibir material fotográfico auténtico.
 */
export const OFFICE_SPACE_PHOTOS: OfficeSpacePhoto[] = [
  {
    id: 'espacio-observacion',
    title: 'Zona de observación y entrevistas',
    description: 'Espacio preparado para fotografía real del entorno de diálogo y escucha.',
    imageUrl: null,
    alt: 'Zona de observación y entrevistas de SENSIA LABs',
  },
  {
    id: 'espacio-laboratorio',
    title: 'Mesa de estímulos y percepción',
    description: 'Espacio preparado para fotografía real de pruebas de envases, materiales y luz.',
    imageUrl: null,
    alt: 'Laboratorio de estímulos perceptuales de SENSIA LABs',
  },
  {
    id: 'espacio-analisis',
    title: 'Estudio de análisis y síntesis',
    description: 'Espacio preparado para fotografía real de trabajo en equipo e interpretación.',
    imageUrl: null,
    alt: 'Área de análisis y trabajo colaborativo en SENSIA LABs',
  },
];

/**
 * Lista preparada para incorporar integrantes reales del equipo de SENSIA LABs
 * (nombre, cargo o especialidad, breve descripción profesional y enlace opcional a LinkedIn).
 */
export const TEAM_MEMBERS: TeamMember[] = [];

export const TEAM_DEMO_PROFILES: TeamMember[] = [
  {
    id: 'demo-perfil-investigacion',
    name: 'Módulo 01 · Perfil provisional',
    role: 'Investigación del consumidor',
    specialty: 'Entrevistas cualitativas y hábitos',
    bio: 'Espacio editorial preparado para presentar al integrante real especializado en investigación cualitativa, motivaciones y estudio del comportamiento de compra.',
    photoUrl: '/src/assets/images/team_portrait_a_1795194941720.jpg',
    linkedinUrl: null,
    isDemo: true,
  },
  {
    id: 'demo-perfil-percepcion',
    name: 'Módulo 02 · Perfil provisional',
    role: 'Percepción y neuromarketing',
    specialty: 'Atención visual y arquitectura cognitiva',
    bio: 'Espacio editorial preparado para presentar al integrante real centrado en análisis de atención visual, fluidez cognitiva y diseño experimental.',
    photoUrl: '/src/assets/images/team_portrait_b_1795194942830.jpg',
    linkedinUrl: null,
    isDemo: true,
  },
  {
    id: 'demo-perfil-estrategia',
    name: 'Módulo 03 · Perfil provisional',
    role: 'Experiencia de marca y sensorial',
    specialty: 'Puntos de contacto y coherencia de marca',
    bio: 'Espacio editorial preparado para presentar al integrante real dedicado a traducir insights de percepción en decisiones de marca, producto y espacio.',
    photoUrl: '/src/assets/images/team_portrait_c_1795194942540.jpg',
    linkedinUrl: null,
    isDemo: true,
  },
];
