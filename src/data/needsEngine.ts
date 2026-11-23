export interface FollowUpOption {
  id: string;
  label: string;
  overridePrimaryServiceId?: string;
  additionalServiceIds?: string[];
  refinedFocus: string;
}

export interface NeedOption {
  id: string;
  label: string;
  shortLabel: string;
  serviceLabel: string;
  primaryServiceId: string;
  secondaryServiceIds: string[];
  recommendedTitle: string;
  description: string;
  whatWeInvestigate: string[];
  questionsAnswered: string[];
  indicativeMethodology: string[];
  businessOutcomes: string[];
  followUpQuestion: string;
  followUpOptions: FollowUpOption[];
}

/**
 * 6 opciones directas en la primera pantalla del asistente,
 * vinculadas una a una con los 6 servicios canónicos de SENSIA LABs.
 */
export const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'conocer-consumidores',
    label: 'Quiero conocer mejor a mis consumidores.',
    shortLabel: 'Consumidor',
    serviceLabel: 'Investigación del consumidor',
    primaryServiceId: 'investigacion-consumidor',
    secondaryServiceIds: ['comportamiento'],
    recommendedTitle: 'INVESTIGACIÓN DEL CONSUMIDOR',
    description:
      'Exploramos motivaciones reales, hábitos cotidianos, expectativas y barreras para entender qué mueve a las personas que eligen o descartan tu categoría.',
    whatWeInvestigate: [
      'Motivaciones profundas y detonantes reales de búsqueda',
      'Barreras de entrada, dudas frecuentes y puntos de abandono',
      'Lenguaje cotidiano con el que describen sus necesidades',
    ],
    questionsAnswered: [
      '¿Qué mueve realmente a quienes ya nos eligen o podrían hacerlo?',
      '¿Qué frena a un cliente potencial antes de comprar?',
      '¿Qué esperan encontrar frente a las alternativas actuales?',
    ],
    indicativeMethodology: [
      'Entrevistas cualitativas semiestructuradas',
      'Estudios exploratorios de hábitos y recorridos de compra',
      'Encuestas conductuales focalizadas',
    ],
    businessOutcomes: [
      'Mapa claro de motivaciones y fricciones del consumidor',
      'Criterios concretos para orientar producto, mensaje y oferta',
    ],
    followUpQuestion: '¿Qué aspecto de tus consumidores necesitas aclarar primero?',
    followUpOptions: [
      {
        id: 'motivaciones-habitos',
        label: 'Sus hábitos, motivaciones y cómo eligen en la categoría',
        refinedFocus: 'Comprensión profunda de rutinas, necesidades y criterios de valoración.',
      },
      {
        id: 'competencia-fuga',
        label: 'Por qué eligen a la competencia o no repiten compra',
        additionalServiceIds: ['comportamiento'],
        refinedFocus: 'Detección de motivos de descarte y señales de confianza comparativa.',
      },
    ],
  },
  {
    id: 'atencion-publicidad',
    label: 'Quiero que mi publicidad capte más atención.',
    shortLabel: 'Atención publicitaria',
    serviceLabel: 'Neuromarketing',
    primaryServiceId: 'neuromarketing',
    secondaryServiceIds: ['percepcion'],
    recommendedTitle: 'NEUROMARKETING',
    description:
      'Analizamos qué elementos de tus anuncios, envases o soportes capturan primero la mirada, qué recorrido visual sigue el espectador y qué respuesta provoca en los primeros segundos.',
    whatWeInvestigate: [
      'Focos de atención visual frente a zonas ignoradas',
      'Recorrido ocular y jerarquía de lectura de marca y mensaje',
      'Carga cognitiva y respuesta emocional inicial ante el estímulo',
    ],
    questionsAnswered: [
      '¿Qué ve primero una persona durante los dos primeros segundos?',
      '¿Se recuerda la marca o solo un recurso decorativo?',
      '¿Qué compite con la llamada a la acción principal?',
    ],
    indicativeMethodology: [
      'Análisis de atención visual y seguimiento ocular según alcance',
      'Pruebas de exposición breve y recuerdo espontáneo',
      'Comparativa perceptual entre piezas o creatividades',
    ],
    businessOutcomes: [
      'Diagnóstico objetivo de jerarquía visual y saliencia',
      'Criterios claros para mejorar anuncios, portadas o envases',
    ],
    followUpQuestion: '¿Dónde necesitas evaluar la atención principalmente?',
    followUpOptions: [
      {
        id: 'campanas-anuncios',
        label: 'Campañas publicitarias, vídeos o soportes digitales',
        refinedFocus: 'Optimización de impacto inicial y foco visual en pantallas o exterior.',
      },
      {
        id: 'packaging-lineal',
        label: 'Envases o visibilidad directa en el punto de venta',
        additionalServiceIds: ['percepcion'],
        refinedFocus: 'Saliencia visual en lineal saturado y legibilidad rápida de marca.',
      },
    ],
  },
  {
    id: 'percepcion-marca-producto',
    label: 'Quiero saber cómo perciben mi marca o producto.',
    shortLabel: 'Percepción',
    serviceLabel: 'Percepción',
    primaryServiceId: 'percepcion',
    secondaryServiceIds: ['experiencia-marca'],
    recommendedTitle: 'PERCEPCIÓN',
    description:
      'Contrastamos lo que tu marca quiere comunicar con lo que el consumidor interpreta realmente al ver tu producto, envase, precio o mensajes.',
    whatWeInvestigate: [
      'Asociaciones espontáneas e impresiones inmediatas de valor',
      'Coherencia entre diseño, tono verbal y promesa comercial',
      'Efecto del contexto visual en cómo se interpreta la oferta',
    ],
    questionsAnswered: [
      '¿Coincide lo que proyectas con lo que el cliente interpreta?',
      '¿Qué nivel de calidad o confianza transmite al primer vistazo?',
      '¿Se entiende en segundos qué hace diferente al producto?',
    ],
    indicativeMethodology: [
      'Pruebas de primera impresión y asociación libre',
      'Experimentos comparativos de contexto y encuadre visual',
      'Entrevistas cualitativas de interpretación perceptual',
    ],
    businessOutcomes: [
      'Diagnóstico de brecha entre identidad interna e imagen percibida',
      'Pautas precisas para alinear diseño, narrativa y valor percibido',
    ],
    followUpQuestion: '¿Sobre qué elemento tienes más dudas de percepción?',
    followUpOptions: [
      {
        id: 'posicionamiento-identidad',
        label: 'La imagen global de marca y su diferenciación',
        overridePrimaryServiceId: 'experiencia-marca',
        additionalServiceIds: ['percepcion'],
        refinedFocus: 'Mapeo de asociaciones y claridad de posicionamiento frente a referentes.',
      },
      {
        id: 'producto-envase',
        label: 'La presentación, envase o valor percibido de un producto',
        refinedFocus: 'Evaluación perceptual de forma, materiales y jerarquía informativa.',
      },
    ],
  },
  {
    id: 'comprender-decisiones',
    label: 'Quiero comprender por qué mis clientes toman determinadas decisiones.',
    shortLabel: 'Toma de decisiones',
    serviceLabel: 'Comportamiento',
    primaryServiceId: 'comportamiento',
    secondaryServiceIds: ['investigacion-consumidor'],
    recommendedTitle: 'COMPORTAMIENTO',
    description:
      'Investigamos los atajos mentales, sesgos cognitivos y condiciones del entorno que inclinan la elección cuando un cliente compara opciones o duda antes de comprar.',
    whatWeInvestigate: [
      'Arquitectura de elección, precios y comparación entre alternativas',
      'Fricciones silenciosas que provocan indecisión o postergación',
      'Factores contextuales que pesan más en el momento decisivo',
    ],
    questionsAnswered: [
      '¿Por qué dudan o abandonan justo antes de decidir?',
      '¿Cómo influye el orden de opciones y tarifas en la elección?',
      '¿Qué señal contextual reduce la percepción de riesgo?',
    ],
    indicativeMethodology: [
      'Análisis cognitivo de arquitectura de elección',
      'Experimentos conductuales de comparación y contexto',
      'Entrevistas centradas en el proceso real de deliberación',
    ],
    businessOutcomes: [
      'Radiografía de bloqueos y atajos decisorios en el proceso real',
      'Recomendaciones para simplificar la elección y aumentar claridad',
    ],
    followUpQuestion: '¿En qué tipo de decisión ocurre el bloqueo?',
    followUpOptions: [
      {
        id: 'comparacion-precio',
        label: 'Comparan planes, precios o alternativas y no deciden',
        refinedFocus: 'Simplificación de opciones, anclaje de valor y reducción de carga cognitiva.',
      },
      {
        id: 'flujo-digital',
        label: 'Dudan durante un proceso digital de reserva o compra',
        additionalServiceIds: ['neuromarketing'],
        refinedFocus: 'Eliminación de fricción cognitiva y refuerzo de señales de confianza.',
      },
    ],
  },
  {
    id: 'experiencia-sensorial-establecimiento',
    label: 'Quiero mejorar la experiencia sensorial de mi establecimiento.',
    shortLabel: 'Experiencia sensorial',
    serviceLabel: 'Marketing sensorial',
    primaryServiceId: 'marketing-sensorial',
    secondaryServiceIds: ['experiencia-marca'],
    recommendedTitle: 'MARKETING SENSORIAL',
    description:
      'Evaluamos cómo interactúan la iluminación, la acústica, los materiales, el recorrido espacial y el contacto físico para generar confort, coherencia y recuerdo.',
    whatWeInvestigate: [
      'Primera impresión ambiental, fluidez de entrada y orientación',
      'Coherencia sensorial entre luz, sonido, tacto, materiales y marca',
      'Puntos de fricción entre atracción exterior y permanencia en sala',
    ],
    questionsAnswered: [
      '¿Qué incomoda o desconecta al visitante en los primeros metros?',
      '¿El ambiente transmite la personalidad que busca la marca?',
      '¿Qué estímulos favorecen una permanencia cómoda y natural?',
    ],
    indicativeMethodology: [
      'Auditoría sensorial y conductual in situ',
      'Observación estructurada de recorridos y zonas de contacto',
      'Entrevistas breves tras la visita al establecimiento',
    ],
    businessOutcomes: [
      'Mapa de fricciones espaciales y sensoriales corregibles',
      'Criterios prácticos de ambiente, recorrido y punto de contacto',
    ],
    followUpQuestion: '¿Qué prioridad tiene ahora tu establecimiento o producto físico?',
    followUpOptions: [
      {
        id: 'recorrido-confort',
        label: 'Mejorar la comodidad, orientación y tiempo de permanencia',
        refinedFocus: 'Optimización de iluminación, acústica, ritmo de recorrido y señalética.',
      },
      {
        id: 'alineacion-marca-espacio',
        label: 'Conectar mejor el espacio físico con la identidad de marca',
        additionalServiceIds: ['experiencia-marca'],
        refinedFocus: 'Coherencia entre materialidad, estímulos ambientales y posicionamiento.',
      },
    ],
  },
  {
    id: 'vivencia-recuerdo-marca',
    label: 'Quiero mejorar cómo se vive y se recuerda mi marca.',
    shortLabel: 'Experiencia de marca',
    serviceLabel: 'Experiencia de marca',
    primaryServiceId: 'experiencia-marca',
    secondaryServiceIds: ['marketing-sensorial', 'percepcion'],
    recommendedTitle: 'EXPERIENCIA DE MARCA',
    description:
      'Analizamos el recorrido completo de contacto con tu marca para alinear identidad, comunicación y vivencia real, reforzando qué momentos permanecen en la memoria.',
    whatWeInvestigate: [
      'Continuidad entre promesa comunicada y experiencia real en puntos de contacto',
      'Momentos pico que construyen recuerdo positivo o desgaste',
      'Oportunidades estratégicas para diferenciar la relación con el cliente',
    ],
    questionsAnswered: [
      '¿Qué recuerda realmente una persona tras interactuar con tu marca?',
      '¿Dónde se rompe la coherencia entre web, producto y trato?',
      '¿Qué territorio propio refuerza la singularidad de la marca?',
    ],
    indicativeMethodology: [
      'Mapeo perceptual del recorrido completo de marca',
      'Técnicas cualitativas de recuerdo e impresión global',
      'Auditoría de coherencia entre canales físicos y digitales',
    ],
    businessOutcomes: [
      'Visión integrada de la experiencia vivida frente a la deseada',
      'Hoja de ruta estratégica para elevar coherencia y recuerdo',
    ],
    followUpQuestion: '¿Qué dimensión quieres transformar prioritariamente?',
    followUpOptions: [
      {
        id: 'coherencia-omnicanal',
        label: 'Alinear identidad visual, comunicación y experiencia de uso',
        refinedFocus: 'Auditoría de coherencia perceptual en todos los puntos de contacto.',
      },
      {
        id: 'momentos-recuerdo',
        label: 'Identificar qué momentos generan diferenciación y recuerdo duradero',
        additionalServiceIds: ['marketing-sensorial'],
        refinedFocus: 'Optimización de momentos pico de experiencia y memoria de marca.',
      },
    ],
  },
];

export interface RecommendationResult {
  isCustomChallenge: boolean;
  needLabel: string;
  customChallengeText?: string;
  primaryServiceId: string;
  secondaryServiceIds: string[];
  recommendedTitle: string;
  description: string;
  whatWeInvestigate: string[];
  questionsAnswered: string[];
  indicativeMethodology: string[];
  businessOutcomes: string[];
  followUpQuestion?: string;
  followUpOptions?: FollowUpOption[];
  selectedFollowUp?: FollowUpOption;
  orientativeDisclaimer?: string;
}

export function buildRecommendationFromNeed(
  need: NeedOption,
  followUpId?: string
): RecommendationResult {
  const selectedFollowUp = need.followUpOptions.find((f) => f.id === followUpId);
  const primaryServiceId = selectedFollowUp?.overridePrimaryServiceId ?? need.primaryServiceId;

  const secondarySet = new Set<string>(need.secondaryServiceIds);
  if (selectedFollowUp?.additionalServiceIds) {
    selectedFollowUp.additionalServiceIds.forEach((id) => secondarySet.add(id));
  }
  secondarySet.delete(primaryServiceId);

  return {
    isCustomChallenge: false,
    needLabel: need.label,
    primaryServiceId,
    secondaryServiceIds: Array.from(secondarySet),
    recommendedTitle: need.recommendedTitle,
    description: selectedFollowUp
      ? `${need.description} Enfoque priorizado: ${selectedFollowUp.refinedFocus}`
      : need.description,
    whatWeInvestigate: need.whatWeInvestigate,
    questionsAnswered: need.questionsAnswered,
    indicativeMethodology: need.indicativeMethodology,
    businessOutcomes: need.businessOutcomes,
    followUpQuestion: need.followUpQuestion,
    followUpOptions: need.followUpOptions,
    selectedFollowUp,
  };
}

interface ClassificationRule {
  keywords: string[];
  needId: string;
  weight: number;
}

const CLASSIFICATION_RULES: ClassificationRule[] = [
  {
    keywords: [
      'tienda',
      'local',
      'establecimiento',
      'espacio',
      'escaparate',
      'sensorial',
      'aroma',
      'iluminacion',
      'acustica',
      'restaurante',
      'hotel',
      'clinica',
    ],
    needId: 'experiencia-sensorial-establecimiento',
    weight: 3,
  },
  {
    keywords: [
      'anuncio',
      'publicidad',
      'campana',
      'cartel',
      'atencion',
      'mirada',
      'eye',
      'redes',
      'video',
      'impacto',
      'banner',
    ],
    needId: 'atencion-publicidad',
    weight: 2.8,
  },
  {
    keywords: [
      'envase',
      'packaging',
      'etiqueta',
      'perciben',
      'percepcion',
      'imagen',
      'posicionamiento',
      'producto',
      'valor',
      'calidad',
    ],
    needId: 'percepcion-marca-producto',
    weight: 2.6,
  },
  {
    keywords: [
      'precio',
      'compra',
      'compran',
      'deciden',
      'decision',
      'dudan',
      'conversion',
      'elegir',
      'alternativas',
      'convence',
      'comportamiento',
    ],
    needId: 'comprender-decisiones',
    weight: 2.7,
  },
  {
    keywords: [
      'publico',
      'consumidor',
      'consumidores',
      'audiencia',
      'cliente',
      'habitos',
      'motivaciones',
      'competencia',
      'segmento',
    ],
    needId: 'conocer-consumidores',
    weight: 2.5,
  },
  {
    keywords: [
      'experiencia',
      'recuerdo',
      'recuerda',
      'marca',
      'recorrido',
      'fidelizacion',
      'oportunidad',
      'identidad',
      'vive',
    ],
    needId: 'vivencia-recuerdo-marca',
    weight: 2.4,
  },
];

export function classifyCustomChallenge(text: string): RecommendationResult {
  const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const scores: Record<string, number> = {};
  for (const rule of CLASSIFICATION_RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      const normalizedKw = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalized.includes(normalizedKw)) {
        score += rule.weight;
      }
    }
    if (score > 0) {
      scores[rule.needId] = (scores[rule.needId] ?? 0) + score;
    }
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryNeedId = ranked[0]?.[0] ?? 'vivencia-recuerdo-marca';
  const secondaryNeedId = ranked[1]?.[0];

  const primaryNeed = NEED_OPTIONS.find((n) => n.id === primaryNeedId) ?? NEED_OPTIONS[0];
  const secondaryNeed = secondaryNeedId
    ? NEED_OPTIONS.find((n) => n.id === secondaryNeedId)
    : undefined;

  const secondaryServices = new Set<string>(primaryNeed.secondaryServiceIds);
  if (secondaryNeed && secondaryNeed.primaryServiceId !== primaryNeed.primaryServiceId) {
    secondaryServices.add(secondaryNeed.primaryServiceId);
  }
  secondaryServices.delete(primaryNeed.primaryServiceId);

  const combinedTitle = secondaryNeed
    ? `${primaryNeed.recommendedTitle} + ${secondaryNeed.shortLabel.toUpperCase()}`
    : primaryNeed.recommendedTitle;

  return {
    isCustomChallenge: true,
    needLabel: 'Necesidad personalizada descrita por el visitante',
    customChallengeText: text.trim(),
    primaryServiceId: primaryNeed.primaryServiceId,
    secondaryServiceIds: Array.from(secondaryServices).slice(0, 2),
    recommendedTitle: combinedTitle,
    description:
      secondaryNeed
        ? `A partir de tu descripción, tu reto combina dos frentes complementarios: ${primaryNeed.description} Además, conviene incorporar perspectivas de ${secondaryNeed.serviceLabel.toLowerCase()}.`
        : primaryNeed.description,
    whatWeInvestigate: [
      ...primaryNeed.whatWeInvestigate.slice(0, 2),
      ...(secondaryNeed ? [secondaryNeed.whatWeInvestigate[0]] : [primaryNeed.whatWeInvestigate[2]]),
    ],
    questionsAnswered: primaryNeed.questionsAnswered,
    indicativeMethodology: primaryNeed.indicativeMethodology,
    businessOutcomes: primaryNeed.businessOutcomes,
    orientativeDisclaimer:
      'Recomendación orientativa generada mediante correspondencia de retos empresariales y áreas de investigación. Puedes ajustar el enfoque o explicarnos más detalles en el siguiente paso.',
  };
}
