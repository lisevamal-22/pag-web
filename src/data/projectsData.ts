/**
 * Proyectos conceptuales de SENSIA LABs (una demostración por área de investigación).
 * Todos son DEMOSTRACIONES: no representan clientes, encargos ni resultados reales.
 */
export interface ConceptualProject {
  id: string;
  legacyIds: string[];
  number: string;
  title: string;
  category: string;
  methodology: string;
  year: string;
  accentPrimary: string;
  accentSecondary: string;
  sheetBgClass: string;
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  summary: string;
  context: string;
  challenge: string;
  objective: string;
  methodDetail: string;
  findings: string[];
  strategicApplication: string;
}

const LEGACY_PROJECTS: ConceptualProject[] = [
  {
    id: 'el-color-que-convierte',
    legacyIds: ['demo-packaging-lineal'],
    number: '01',
    title: 'EL COLOR QUE CONVIERTE',
    category: 'Percepción',
    methodology: 'Test de color y eye tracking',
    year: '2026',
    accentPrimary: '#FE5D0A',
    accentSecondary: '#00D6B6',
    sheetBgClass: 'bg-white',
    primaryImage: '/src/assets/images/project_packaging_perception_1795190451546.jpg',
    primaryImageAlt:
      'Prototipos de envases de color y volúmenes geométricos analizados en laboratorio perceptual',
    secondaryImage: '/src/assets/images/service_eyetracking_supermarket_1795194942172.jpg',
    secondaryImageAlt: 'Seguimiento ocular ante códigos de color en lineal',
    summary:
      'Demostración conceptual sobre cómo el contraste cromático y la saliencia visual dirigen la primera fijación ocular en envases de gran consumo.',
    context:
      'Caso conceptual diseñado para mostrar cómo evaluar combinaciones de color, jerarquía tipográfica y legibilidad de packaging antes de salir a producción.',
    challenge:
      'Comprobar si una paleta visual llamativa refuerza la identificación de marca o si dispersa la mirada hacia elementos secundarios.',
    objective:
      'Determinar qué bloques cromáticos y relaciones de contraste permiten localizar el producto en menos de dos segundos dentro de un lineal saturado.',
    methodDetail:
      'Protocolo experimental conceptual con pruebas comparativas de color, seguimiento de fijaciones oculares (eye tracking) y test de recuerdo inmediato tras exposición breve.',
    findings: [
      'Un acento cromático dominante en la zona superior acelera la detección periférica frente a paletas fragmentadas.',
      'La relación entre fondo limpio y bloque de color reduce el esfuerzo cognitivo al leer el beneficio principal.',
      'El contraste tonal condiciona la atribución espontánea de frescura, eficacia y categoría.',
    ],
    strategicApplication:
      'Aporta criterio empírico antes de aprobar artes finales, ajustando colores, pesos visuales y jerarquía del frontal.',
  },
  {
    id: 'decision-de-compra',
    legacyIds: ['demo-arquitectura-decision'],
    number: '02',
    title: 'DECISIÓN DE COMPRA',
    category: 'Comportamiento',
    methodology: 'Observación del comportamiento del consumidor',
    year: '2026',
    accentPrimary: '#FFD203',
    accentSecondary: '#0042FD',
    sheetBgClass: 'bg-[#F3F3F1]',
    primaryImage: '/src/assets/images/service_eyetracking_supermarket_1795194942172.jpg',
    primaryImageAlt:
      'Persona eligiendo un producto frente a una estantería comercial durante una sesión de observación',
    secondaryImage: '/src/assets/images/service_consumer_interview_1795194940990.jpg',
    secondaryImageAlt: 'Análisis conductual de criterios de comparación entre alternativas',
    summary:
      'Demostración conceptual de análisis de fricciones, comparaciones silenciosas y atajos mentales frente a una estantería con múltiples opciones.',
    context:
      'Escenario demostrativo centrado en el instante práctico en que una persona duda, toma un producto, lo compara con el contiguo y decide.',
    challenge:
      'Detectar qué factores no verbalizados —exceso de variantes, señalética confusa o riesgo percibido— detienen la elección en tienda.',
    objective:
      'Observar el tiempo de duda, el orden de comparación entre referencias y la influencia real de la disposición en estantería.',
    methodDetail:
      'Observación estructurada de conducta de compra en contexto natural acompañada de entrevistas breves de reconstrucción decisoria inmediatamente posteriores.',
    findings: [
      'Superar cuatro alternativas visualmente similares incrementa el tiempo de comparación y la probabilidad de aplazar la compra.',
      'Las señales claras de diferenciación por uso cotidiano pesan más que las listas extensas de especificaciones.',
      'La altura y agrupación visual en estantería actúan como guía implícita de jerarquía de valor.',
    ],
    strategicApplication:
      'Orienta el ordenamiento de catálogo, la arquitectura de gama y la comunicación en punto de venta para facilitar decisiones seguras.',
  },
  {
    id: 'impacto-sensorial',
    legacyIds: ['demo-atencion-prismas'],
    number: '03',
    title: 'IMPACTO SENSORIAL',
    category: 'Neuromarketing',
    methodology: 'Investigación de atención y respuesta emocional',
    year: '2026',
    accentPrimary: '#0042FD',
    accentSecondary: '#00D6B6',
    sheetBgClass: 'bg-white',
    primaryImage: '/src/assets/images/project_visual_attention_1795190451005.jpg',
    primaryImageAlt:
      'Prismas ópticos proyectando estímulos lumínicos en azul rey y aguamarina para estudio de atención',
    secondaryImage: '/src/assets/images/service_consumer_interview_1795194940990.jpg',
    secondaryImageAlt: 'Participante observando estímulos visuales durante prueba emocional',
    summary:
      'Demostración conceptual sobre cómo distintos estímulos visuales y rítmicos activan la atención temprana y modulan la respuesta emocional.',
    context:
      'Modelo demostrativo orientado a evaluar creatividades, piezas audiovisuales y prototipos de campaña antes de invertir en difusión.',
    challenge:
      'Evitar piezas visualmente impactantes que generan curiosidad estética pero desconectan el recuerdo de marca y del mensaje clave.',
    objective:
      'Medir la captura atencional en los tres primeros segundos, la fluidez de procesamiento y el tono emocional despertado.',
    methodDetail:
      'Evaluación controlada por fases: exposición breve secuencial, registro de respuesta afectiva implícita y análisis de recuerdo libre de marca y concepto.',
    findings: [
      'Un único foco visual dominante multiplica la retención del mensaje respecto a composiciones con tres o más estímulos compitiendo.',
      'El ritmo entre tensión visual y pausa limpia favorece la asimilación emocional sin fatiga cognitiva.',
      'Vincular el estímulo emocional directamente con el código de marca evita la ceguera al anunciante.',
    ],
    strategicApplication:
      'Permite validar y afinar direcciones de arte, openings audiovisuales y soportes clave antes de su lanzamiento.',
  },
  {
    id: 'experiencias-que-se-recuerdan',
    legacyIds: ['demo-espacio-sensorial'],
    number: '04',
    title: 'EXPERIENCIAS QUE SE RECUERDAN',
    category: 'Experiencia de marca',
    methodology: 'Análisis de puntos de contacto y experiencia sensorial',
    year: '2026',
    accentPrimary: '#FE5D0A',
    accentSecondary: '#FFD203',
    sheetBgClass: 'bg-[#F5F5F3]',
    primaryImage: '/src/assets/images/project_retail_sensory_1795190451942.jpg',
    primaryImageAlt:
      'Espacio comercial arquitectónico con iluminación cenital, piedra, hormigón y madera natural',
    secondaryImage: '/src/assets/images/insights_perception_cover_1795190451319.jpg',
    secondaryImageAlt: 'Detalle de materiales, luz y puntos de interacción sensorial',
    summary:
      'Demostración conceptual sobre cómo iluminación, materiales, acústica e interacción física construyen coherencia y memoria de marca.',
    context:
      'Caso ilustrativo aplicado a un establecimiento físico y su secuencia completa desde el umbral de entrada hasta la salida.',
    challenge:
      'Identificar dónde se rompe la continuidad entre la identidad prometida en canales digitales y lo que el visitante siente al recorrer el espacio.',
    objective:
      'Auditar los puntos de contacto sensoriales que determinan la comodidad de permanencia, la exploración táctil y el recuerdo posterior.',
    methodDetail:
      'Auditoría sensorial estructurada in situ combinada con mapeo de recorridos físicos, evaluación de materiales e iluminación y entrevistas contextuales.',
    findings: [
      'La transición lumínica y espacial en los primeros tres metros condiciona la predisposición a explorar el resto del local.',
      'El contraste coherente entre materiales cálidos y superficies limpias refuerza la sensación de cuidado y autenticidad.',
      'Cuidar el punto final de contacto y entrega consolida positivamente toda la valoración retrospectiva de la visita.',
    ],
    strategicApplication:
      'Guía decisiones de arquitectura comercial, iluminación, tacto de producto y rituales de bienvenida en espacios de marca.',
  },
];


/** Dos demostraciones nuevas para cubrir las seis áreas de investigación (sin clientes ni resultados reales). */
const NEW_PROJECTS: ConceptualProject[] = [
  {
    id: 'lo-que-no-se-dice',
    legacyIds: [],
    number: '01',
    title: 'LO QUE NO SE DICE',
    category: 'Investigación del consumidor',
    methodology: 'Entrevistas en profundidad y observación de uso',
    year: '2026',
    accentPrimary: '#00D6B6',
    accentSecondary: '#0042FD',
    sheetBgClass: 'bg-white',
    primaryImage: '/src/assets/images/service_consumer_interview_1795194940990.jpg',
    primaryImageAlt:
      'Sesión cualitativa: una participante sostiene un prototipo de producto mientras conversa con un investigador',
    secondaryImage: '/media/proyectos/consumidor-producto.jpg',
    secondaryImageAlt: 'Detalle de las manos de la participante explorando el prototipo durante la entrevista',
    summary:
      'Demostración conceptual sobre cómo combinar conversación y observación para descubrir motivaciones, hábitos y barreras que las personas no verbalizan espontáneamente.',
    context:
      'Escenario demostrativo de entrevista individual en la que la persona participante manipula un prototipo mientras explica cómo lo usaría en su día a día.',
    challenge:
      'Distinguir entre lo que la persona dice que valora y lo que revelan sus gestos, dudas y forma de interactuar con el producto.',
    objective:
      'Identificar motivaciones de fondo, rituales de uso y barreras implícitas que expliquen la aceptación o el rechazo de una propuesta.',
    methodDetail:
      'Protocolo conceptual de entrevista semiestructurada con tareas de manipulación, registro de comportamiento no verbal y análisis temático posterior.',
    findings: [
      'Las pausas y correcciones al manipular un producto suelen señalar fricciones que no aparecen en el discurso.',
      'Pedir que la persona reconstruya una situación concreta aporta más matices que preguntar por preferencias generales.',
      'Contrastar discurso y conducta ayuda a separar la opinión socialmente deseable de la motivación real.',
    ],
    strategicApplication:
      'Sirve para orientar conceptos de producto, mensajes y prioridades de desarrollo con una comprensión más fiel de las personas.',
  },
  {
    id: 'la-luz-tambien-habla',
    legacyIds: [],
    number: '05',
    title: 'LA LUZ TAMBIÉN HABLA',
    category: 'Marketing sensorial',
    methodology: 'Auditoría sensorial de luz, materiales y atmósfera',
    year: '2026',
    accentPrimary: '#00D6B6',
    accentSecondary: '#FE5D0A',
    sheetBgClass: 'bg-[#F5F5F3]',
    primaryImage: '/media/proyectos/sensorial-cenital.jpg',
    primaryImageAlt: 'Luz cenital natural bañando un espacio comercial de hormigón y madera',
    secondaryImage: '/media/proyectos/sensorial-materiales.jpg',
    secondaryImageAlt: 'Detalle de mesa de madera con objetos cerámicos bajo luz cálida',
    summary:
      'Demostración conceptual sobre cómo la temperatura de la luz, los materiales y el tacto modifican la percepción de calidad y el tiempo de permanencia.',
    context:
      'Caso ilustrativo aplicado a un expositor dentro de un espacio comercial, donde se comparan distintas combinaciones de iluminación y superficies.',
    challenge:
      'Entender qué estímulos sensoriales refuerzan la identidad de la marca y cuáles generan ruido o fatiga sin que el visitante sea consciente.',
    objective:
      'Comparar cómo cambian la valoración del producto, la exploración táctil y la permanencia frente al expositor en diferentes atmósferas.',
    methodDetail:
      'Diseño experimental conceptual con variaciones controladas de luz y materiales, observación del recorrido y breves entrevistas de salida.',
    findings: [
      'La coherencia entre la temperatura de la luz y los materiales influye en la sensación de cuidado del espacio.',
      'Las superficies que invitan al tacto prolongan la exploración cuando están en el recorrido natural del visitante.',
      'Un exceso de estímulos simultáneos reduce la atención disponible para el producto protagonista.',
    ],
    strategicApplication:
      'Ayuda a definir criterios de iluminación, materiales y composición de expositores alineados con la identidad sensorial de la marca.',
  },
];

/** Orden por área de investigación: consumidor, neuromarketing, percepción, comportamiento, sensorial, experiencia. */
const ORDER = [
  'lo-que-no-se-dice',
  'impacto-sensorial',
  'el-color-que-convierte',
  'decision-de-compra',
  'la-luz-tambien-habla',
  'experiencias-que-se-recuerdan',
];

export const CONCEPTUAL_PROJECTS: ConceptualProject[] = ORDER.map((id, i) => {
  const p = [...NEW_PROJECTS, ...LEGACY_PROJECTS].find((x) => x.id === id)!;
  return { ...p, number: String(i + 1).padStart(2, '0') };
});

export function resolveProjectId(rawId: string | null | undefined): ConceptualProject | null {
  if (!rawId) return null;
  return CONCEPTUAL_PROJECTS.find((p) => p.id === rawId || p.legacyIds.includes(rawId)) ?? null;
}

export function projectPath(project: ConceptualProject): string {
  return `/proyectos/${project.id}`;
}
