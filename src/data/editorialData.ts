export interface CognitiveConcept {
  index: string;
  id: string;
  title: string;
  subtitle: string;
  explanation: string;
  exampleQuestion: string;
  accentHex: string;
}

export const COGNITIVE_CONCEPTS: CognitiveConcept[] = [
  {
    index: '01',
    id: 'atencion',
    title: 'ATENCIÓN',
    subtitle: 'El filtro previo a cualquier mensaje.',
    explanation:
      'Antes de convencer, un estímulo debe superar el umbral selectivo de la atención humana. Investigamos qué capta la mirada, qué distrae y cuánto esfuerzo requiere procesar la información en los primeros segundos.',
    exampleQuestion: '¿Qué ve primero una persona cuando se enfrenta a tu marca o envase?',
    accentHex: '#0042FD',
  },
  {
    index: '02',
    id: 'percepcion',
    title: 'PERCEPCIÓN',
    subtitle: 'No reaccionamos a la realidad, sino a cómo la interpretamos.',
    explanation:
      'El contexto, las expectativas y la memoria moldean lo que creemos estar viendo. Estudiamos el significado espontáneo que generan formas, colores, materiales, espacios y palabras en tu público.',
    exampleQuestion: '¿Coincide la imagen que proyectas con lo que el consumidor interpreta?',
    accentHex: '#00D6B6',
  },
  {
    index: '03',
    id: 'emocion',
    title: 'EMOCIÓN',
    subtitle: 'La señal que orienta la valoración y el recuerdo.',
    explanation:
      'Las respuestas afectivas rápidas —cercanía, confianza, curiosidad o recelo— condicionan la disposición hacia una marca mucho antes de que el consumidor elabore argumentos racionales.',
    exampleQuestion: '¿Qué sensación despierta tu producto o experiencia antes de analizar sus características?',
    accentHex: '#FFD203',
  },
  {
    index: '04',
    id: 'decision',
    title: 'DECISIÓN',
    subtitle: 'Atajos mentales, contexto y elección real.',
    explanation:
      'Decidir implica comparar, reducir incertidumbre y ahorrar esfuerzo cognitivo. Analizamos cómo influyen el entorno, la presentación de opciones y los hábitos en el momento determinante de elegir.',
    exampleQuestion: '¿Qué fricción silenciosa está inclinando la decisión hacia otra alternativa?',
    accentHex: '#FE5D0A',
  },
];

export interface MethodologyPhase {
  index: string;
  id: string;
  title: string;
  objective: string;
  activities: string[];
  questionsAnswered: string[];
  phaseResults: string[];
  accentHex: string;
}

export const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    index: '01',
    id: 'observar',
    title: 'OBSERVAR',
    objective:
      'Capturar qué ocurre realmente cuando las personas interactúan con estímulos, espacios, productos o mensajes sin interferir en su comportamiento natural.',
    activities: [
      'Definición precisa del problema empresarial y traducción a preguntas observables.',
      'Diseño del protocolo de observación acorde al canal, contexto y público.',
      'Registro de reacciones iniciales, recorridos de atención y conductas espontáneas.',
    ],
    questionsAnswered: [
      '¿Qué sucede en los primeros segundos de contacto?',
      '¿Dónde se detiene o se pierde la atención?',
      '¿Qué diferencia hay entre lo que la marca espera y lo que ocurre?',
    ],
    phaseResults: [
      'Mapa de evidencias observables y puntos críticos de fricción o interés.',
    ],
    accentHex: '#0042FD',
  },
  {
    index: '02',
    id: 'comprender',
    title: 'COMPRENDER',
    objective:
      'Profundizar en el porqué detrás de las conductas observadas, explorando motivaciones, expectativas, barreras y asociaciones implícitas.',
    activities: [
      'Entrevistas cualitativas y pruebas de interpretación perceptual.',
      'Análisis de expectativas previas frente a la experiencia vivida.',
      'Exploración de frenos emocionales, dudas y criterios comparativos.',
    ],
    questionsAnswered: [
      '¿Por qué ese estímulo genera confianza, indiferencia o rechazo?',
      '¿Qué necesidades o miedos condicionan la valoración del producto?',
      '¿Qué lenguaje utiliza realmente el consumidor para describir el problema?',
    ],
    phaseResults: [
      'Comprensión estructurada de motivaciones, barreras y mecanismos cognitivos implicados.',
    ],
    accentHex: '#00D6B6',
  },
  {
    index: '03',
    id: 'interpretar',
    title: 'INTERPRETAR',
    objective:
      'Conectar los hallazgos empíricos y cualitativos para identificar patrones relevantes, evitando conclusiones apresuradas o lecturas superficiales.',
    activities: [
      'Triangulación de observaciones conductuales, perceptuales y discursivas.',
      'Distinción entre síntomas puntuales y patrones estructurales de comportamiento.',
      'Formulación de insights claros, verificables y libres de sesgos internos.',
    ],
    questionsAnswered: [
      '¿Qué patrón explica el comportamiento general frente a anécdotas aisladas?',
      '¿Cuál es la causa raíz del problema perceptual o de decisión?',
      '¿Dónde reside la oportunidad estratégica con mayor recorrido?',
    ],
    phaseResults: [
      'Síntesis de insights clave y diagnóstico fundamentado del fenómeno estudiado.',
    ],
    accentHex: '#FFD203',
  },
  {
    index: '04',
    id: 'transformar',
    title: 'TRANSFORMAR',
    objective:
      'Traducir el conocimiento obtenido en criterios concretos de diseño, comunicación, producto y experiencia para tomar mejores decisiones.',
    activities: [
      'Definición de recomendaciones accionables adaptadas a la realidad de la empresa.',
      'Priorización de cambios según impacto perceptual y viabilidad de implementación.',
      'Alineación de equipos de dirección, marketing y diseño en torno al consumidor.',
    ],
    questionsAnswered: [
      '¿Qué debemos cambiar primero en envase, mensaje, espacio o servicio?',
      '¿Cómo aplicamos estos hallazgos sin perder la identidad de la marca?',
      '¿Qué hipótesis conviene validar tras los ajustes?',
    ],
    phaseResults: [
      'Hoja de ruta estratégica y criterios operativos listos para ejecutar.',
    ],
    accentHex: '#FE5D0A',
  },
];

export type ProjectCategory =
  | 'Todos'
  | 'Investigación'
  | 'Neuromarketing'
  | 'Percepción'
  | 'Experiencia de marca';

export interface ProjectCase {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  isConceptualDemo: boolean;
  demoLabel: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  context: string;
  challenge: string;
  objective: string;
  methodology: string;
  findings: string[];
  strategicApplication: string;
}

export const PROJECTS: ProjectCase[] = [
  {
    id: 'demo-packaging-lineal',
    title: 'Jerarquía perceptual y legibilidad en envases de gran consumo',
    category: 'Percepción',
    isConceptualDemo: true,
    demoLabel: 'Demostración conceptual de estudio',
    imageUrl: '/src/assets/images/project_packaging_perception_1795190451546.jpg',
    imageAlt: 'Prototipos escultóricos minimalistas de envases en blanco mate y azul cobalto sobre piedra travertino',
    summary:
      'Ejemplo demostrativo de cómo evaluar si un envase comunica su categoría y diferenciación en menos de tres segundos frente a un lineal saturado.',
    context:
      'Caso conceptual diseñado para ilustrar la evaluación de prototipos de packaging antes de su lanzamiento comercial en entornos con alta densidad visual.',
    challenge:
      'Detectar por qué una propuesta con alto valor estético en estudio puede perder claridad cuando compite junto a decenas de referencias similares.',
    objective:
      'Analizar el orden de lectura visual, el reconocimiento de marca y la comprensión inmediata del beneficio diferencial del producto.',
    methodology:
      'Diseño experimental comparativo mediante pruebas de exposición breve, simulación de contexto de lineal y entrevistas de primera impresión.',
    findings: [
      'La saturación de sellos y textos secundarios suele competir directamente con el reconocimiento del nombre de marca.',
      'Un contraste tonal claro en la zona superior del envase facilita la localización periférica antes de la lectura detallada.',
      'La coherencia entre textura, peso visual y promesa reduce la disonancia al sostener el producto.',
    ],
    strategicApplication:
      'Permite depurar la jerarquía gráfica antes de invertir en producción e imprenta, asegurando que forma y mensaje trabajen en la misma dirección.',
  },
  {
    id: 'demo-espacio-sensorial',
    title: 'Fricciones espaciales y ritmo de visita en entorno comercial',
    category: 'Experiencia de marca',
    isConceptualDemo: true,
    demoLabel: 'Demostración conceptual de estudio',
    imageUrl: '/src/assets/images/project_retail_sensory_1795190451942.jpg',
    imageAlt: 'Interior arquitectónico minimalista de establecimiento comercial con hormigón, mesa de roble y luz cenital',
    summary:
      'Modelo demostrativo sobre cómo investigar la distancia entre atracción exterior, recorrido interior y disposición a consultar o comprar.',
    context:
      'Escenario ilustrativo aplicado a un espacio físico contemporáneo donde los visitantes muestran interés inicial pero abandonan antes de interactuar con el producto.',
    challenge:
      'Comprender qué señales ambientales, de distribución o de señalética están generando incomodidad, duda o distancia perceptual.',
    objective:
      'Mapear los puntos de contacto sensoriales del establecimiento y detectar las barreras entre la entrada y la zona de decisión.',
    methodology:
      'Auditoría sensorial estructurada in situ combinada con observación de recorridos y entrevistas breves contextuales tras la visita.',
    findings: [
      'La ausencia de referencias claras de orientación en los primeros metros incrementa la sensación de exposición e incertidumbre.',
      'La transición brusca de iluminación y acústica entre acceso y zona de consulta modifica el tiempo de permanencia.',
      'Los puntos de prueba táctil sin presión comercial directa favorecen la exploración espontánea.',
    ],
    strategicApplication:
      'Orienta intervenciones precisas de diseño espacial, iluminación, señalética y protocolo de bienvenida alineadas con la identidad de marca.',
  },
  {
    id: 'demo-atencion-prismas',
    title: 'Arquitectura de atención y carga cognitiva en comunicación visual',
    category: 'Neuromarketing',
    isConceptualDemo: true,
    demoLabel: 'Demostración conceptual de estudio',
    imageUrl: '/src/assets/images/project_visual_attention_1795190451005.jpg',
    imageAlt: 'Prismas ópticos de vidrio refractando haces de luz azul rey y aguamarina sobre papel de archivo blanco',
    summary:
      'Ejemplo conceptual de análisis de salience visual y fluidez de procesamiento para campañas y piezas editoriales digitales.',
    context:
      'Marco demostrativo centrado en estudiar cómo compiten múltiples estímulos gráficos dentro de una misma pantalla o soporte publicitario.',
    challenge:
      'Evitar que los elementos decorativos absorban la atención destinada al mensaje principal y al identificador de marca.',
    objective:
      'Identificar qué configuraciones geométricas y cromáticas dirigen la mirada con menor esfuerzo cognitivo hacia el foco informativo.',
    methodology:
      'Protocolo de evaluación visual por fases: detección inicial, seguimiento de jerarquía, recuerdo libre y prueba de comprensión.',
    findings: [
      'Reducir el número de puntos focales simultáneos mejora la retención del concepto central frente a composiciones sobrecargadas.',
      'El uso disciplinado de un único color acento de alto contraste guía la lectura con mayor precisión que paletas múltiples.',
      'La separación espacial limpia disminuye el tiempo necesario para identificar qué acción se propone.',
    ],
    strategicApplication:
      'Sirve como base objetiva para equipos creativos y de medios al aprobar creatividades, landing pages y soportes de presentación.',
  },
  {
    id: 'demo-arquitectura-decision',
    title: 'Comprensión de propuesta de valor y comparación entre alternativas',
    category: 'Investigación',
    isConceptualDemo: true,
    demoLabel: 'Demostración conceptual de estudio',
    imageUrl: '/src/assets/images/insights_perception_cover_1795190451319.jpg',
    imageAlt: 'Planos geométricos translúcidos de vidrio y metal negro proyectando refracciones de luz azul sobre fondo oscuro',
    summary:
      'Caso demostrativo sobre cómo investigar por qué los clientes dudan al comparar planes, servicios o soluciones complejas.',
    context:
      'Situación representativa de empresas de servicios o productos técnicos cuya oferta es sólida pero resulta difícil de evaluar para un comprador no especialista.',
    challenge:
      'Descubrir qué términos técnicos, estructuras de precios o pasos intermedios bloquean la decisión de contacto o compra.',
    objective:
      'Traducir la propuesta interna de la empresa al marco mental y al lenguaje cotidiano con el que el cliente evalúa sus opciones.',
    methodology:
      'Entrevistas de proceso decisorio, análisis de comprensión verbal y pruebas comparativas de presentación de oferta.',
    findings: [
      'Obligar al prospecto a elegir entre categorías técnicas desconocidas eleva la postergación de la decisión.',
      'Presentar primero el problema reconocido por el usuario facilita la comprensión posterior de la solución técnica.',
      'La transparencia en los pasos del proceso reduce la percepción de riesgo antes del primer contacto.',
    ],
    strategicApplication:
      'Fundamenta el rediseño de páginas de servicio, argumentarios comerciales y asistentes de orientación previa al contacto.',
  },
];

export type ArticleCategory =
  | 'Todos'
  | 'Investigación'
  | 'Neuromarketing'
  | 'Percepción'
  | 'Comportamiento'
  | 'Curiosidades';

export type ArticleTypology =
  | 'Artículo divulgativo'
  | 'Estudio publicado'
  | 'Experimento demostrativo'
  | 'Opinión editorial';

export interface InsightArticle {
  slug: string;
  title: string;
  category: Exclude<ArticleCategory, 'Todos'>;
  typology: ArticleTypology;
  readTime: string;
  publishedDate: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  coverAlt?: string;
  introduction: string;
  researchQuestion: string;
  phenomenonExplanation: string;
  studyOrEvidence: string;
  methodologyAndSample?: string;
  findings: string[];
  marketingApplication: string;
  sources: string[];
}

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: 'por-que-no-elegimos-solo-con-datos',
    title: 'Por qué las personas no deciden leyendo hojas de especificaciones',
    category: 'Comportamiento',
    typology: 'Artículo divulgativo',
    readTime: '6 min lectura',
    publishedDate: 'Noviembre 2026',
    tags: ['Toma de decisiones', 'Carga cognitiva', 'Heurísticas'],
    featured: true,
    coverImage: '/src/assets/images/insights_perception_cover_1795190451319.jpg',
    coverAlt: 'Planos geométricos de vidrio con refracción de luz azul en fondo oscuro',
    introduction:
      'Muchas marcas asumen que si enumeran más características técnicas que su competidor, el consumidor elegirá de forma lógica. La psicología cognitiva muestra que la mente humana busca reducir esfuerzo antes que maximizar datos.',
    researchQuestion:
      '¿Cómo influye la sobrecarga de opciones y la fluidez de procesamiento en la disposición a elegir un producto o servicio?',
    phenomenonExplanation:
      'Ante decisiones con múltiples atributos, las personas combinan dos modos de procesamiento: respuestas rápidas e intuitivas basadas en señales simples (claridad, familiaridad, coherencia visual) y evaluación deliberada cuando perciben riesgo o relevancia alta. Si el primer contacto exige demasiado esfuerzo interpretativo, la atención se retira antes de llegar al análisis racional.',
    studyOrEvidence:
      'La literatura sobre racionalidad limitada y economía del comportamiento (Simon; Kahneman y Tversky) describe ampliamente cómo los atajos heurísticos y la fluidez cognitiva condicionan los juicios de valor y confianza.',
    methodologyAndSample:
      'Revisión conceptual de marcos publicados sobre fluidez de procesamiento y sobrecarga de elección en contextos comerciales.',
    findings: [
      'Aumentar el número de opciones o argumentos sin jerarquía incrementa la indecisión.',
      'La facilidad con la que se lee y comprende una propuesta suele asociarse intuitivamente con mayor fiabilidad.',
      'El orden de presentación modifica qué atributo percibe el usuario como más importante.',
    ],
    marketingApplication:
      'Antes de ampliar argumentos de venta, conviene investigar qué comprende realmente el cliente en los primeros cinco segundos y qué dudas necesita resolver primero.',
    sources: [
      'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
      'Iyengar, S. S., & Lepper, M. R. (2000). When choice is demotivating. Journal of Personality and Social Psychology.',
    ],
  },
  {
    slug: 'atencion-selectiva-ceguera-al-estimulo',
    title: 'Atención selectiva: lo que ocurre cuando todo intenta destacar a la vez',
    category: 'Neuromarketing',
    typology: 'Experimento demostrativo',
    readTime: '5 min lectura',
    publishedDate: 'Octubre 2026',
    tags: ['Atención visual', 'Salience', 'Diseño editorial'],
    coverImage: '/src/assets/images/project_visual_attention_1795190451005.jpg',
    coverAlt: 'Prismas ópticos refractando haces azules sobre papel blanco',
    introduction:
      'En entornos digitales y lineales físicos saturados, la competencia real no es solo entre marcas, sino entre los elementos visuales que conviven dentro de una misma pieza.',
    researchQuestion:
      '¿Por qué añadir más llamadas visuales reduce la probabilidad de que el mensaje principal sea procesado?',
    phenomenonExplanation:
      'El sistema visual prioriza diferencias claras de contraste, escala, aislamiento espacial y dirección. Cuando cada bloque de un anuncio o envase reclama protagonismo mediante colores saturados, rótulos y múltiples focos, desaparece el gradiente de prioridad que guía el movimiento ocular.',
    studyOrEvidence:
      'Los modelos de saliencia visual y control atencional (Posner; Itti & Koch) explican cómo la atención temprana responde a contrastes locales antes de que intervenga la lectura consciente.',
    findings: [
      'El espacio negativo funciona como un amplificador de atención para el estímulo central.',
      'La presencia de elementos decorativos de alto contraste compite directamente con el logotipo y el mensaje.',
      'Una jerarquía de tres niveles claros facilita el procesamiento rápido frente a composiciones planas.',
    ],
    marketingApplication:
      'Evaluar piezas mediante pruebas de exposición breve permite detectar si el diseño dirige la mirada hacia el objetivo estratégico o hacia detalles secundarios.',
    sources: [
      'Posner, M. I. (1980). Orienting of attention. Quarterly Journal of Experimental Psychology.',
      'Itti, L., & Koch, C. (2001). Computational modelling of visual attention. Nature Reviews Neuroscience.',
    ],
  },
  {
    slug: 'contexto-y-percepcion-de-valor',
    title: 'El mismo estímulo, distinto significado: el poder silencioso del contexto',
    category: 'Percepción',
    typology: 'Estudio publicado',
    readTime: '7 min lectura',
    publishedDate: 'Octubre 2026',
    tags: ['Percepción', 'Contexto', 'Envases', 'Espacios'],
    coverImage: '/src/assets/images/project_packaging_perception_1795190451546.jpg',
    coverAlt: 'Volúmenes geométricos blancos y azules sobre piedra travertino',
    introduction:
      'Ningún producto, precio o mensaje se evalúa en el vacío. El entorno visual, táctil o comparativo que lo rodea transforma de manera medible cómo se percibe su calidad.',
    researchQuestion:
      '¿Hasta qué punto el marco visual y sensorial modifica la interpretación de un mismo producto?',
    phenomenonExplanation:
      'La percepción humana funciona de forma relacional. Tanto en ilusiones ópticas clásicas como en entornos de compra, nuestro cerebro estima tamaño, contraste, valor y cuidado por comparación inmediata con el entorno próximo y con las expectativas activadas previamente.',
    studyOrEvidence:
      'La investigación en psicología ambiental y percepción multisensorial (Mehrabian & Russell; Spence) documenta cómo iluminación, materialidad, orden espacial y sonido alteran la valoración afectiva y conductual.',
    methodologyAndSample:
      'Síntesis de literatura experimental en percepción multisensorial y transferencia sensorial entre envase y contenido.',
    findings: [
      'La congruencia entre estímulos visuales, táctiles y auditivos refuerza la credibilidad de marca.',
      'Un precio o producto idéntico puede percibirse como accesible o elevado según los referentes contiguos.',
      'Las inconsistencias entre promesa verbal y experiencia sensorial reducen la confianza percibida.',
    ],
    marketingApplication:
      'Investigar la percepción siempre exige observar el producto dentro de su contexto real de competencia y uso, no de forma aislada sobre un fondo neutro.',
    sources: [
      'Spence, C. (2012). Managing sensory expectations concerning products and brands. Journal of Consumer Psychology.',
      'Mehrabian, A., & Russell, J. A. (1974). An Approach to Environmental Psychology. MIT Press.',
    ],
  },
  {
    slug: 'lo-que-el-cliente-dice-vs-lo-que-hace',
    title: 'Por qué preguntar directamente “¿por qué compras?” rara vez basta',
    category: 'Investigación',
    typology: 'Opinión editorial',
    readTime: '4 min lectura',
    publishedDate: 'Septiembre 2026',
    tags: ['Metodología', 'Entrevistas', 'Sesgos de respuesta'],
    introduction:
      'Cuando se pregunta de forma directa a un consumidor por qué eligió una marca, suele ofrecer una explicación coherente, socialmente aceptable y posterior al hecho, aunque no refleje el verdadero detonante.',
    researchQuestion:
      '¿Cómo diseñar investigaciones que superen la racionalización posterior del participante?',
    phenomenonExplanation:
      'Las personas no siempre tienen acceso consciente a los pequeños estímulos que inclinaron su preferencia en el momento de actuar. Al responder una encuesta directa, tienden a reconstruir motivos lógicos (“por calidad”, “por precio”) que ocultan fricciones específicas de diseño, confianza o hábito.',
    studyOrEvidence:
      'Nisbett y Wilson señalaron tempranamente los límites de la introspección verbal cuando se pide explicar procesos cognitivos implícitos.',
    findings: [
      'Las preguntas sobre situaciones concretas recientes revelan más que las preguntas hipotéticas futuras.',
      'Combinar observación de conducta o estímulos reales con entrevista evita respuestas genéricas.',
      'Cada pregunta de negocio requiere elegir la técnica adecuada en lugar de aplicar siempre el mismo cuestionario.',
    ],
    marketingApplication:
      'En SENSIA LABs diseñamos investigaciones combinando estímulos, tareas reales y exploración cualitativa para ir más allá de la respuesta automática.',
    sources: [
      'Nisbett, R. E., & Wilson, T. D. (1977). Telling more than we can know. Psychological Review.',
    ],
  },
  {
    slug: 'curiosidad-memoria-y-primeros-segundos',
    title: 'Efecto de primacía y curiosidad: por qué recordamos ciertos detalles y olvidamos otros',
    category: 'Curiosidades',
    typology: 'Artículo divulgativo',
    readTime: '5 min lectura',
    publishedDate: 'Septiembre 2026',
    tags: ['Memoria', 'Curiosidad', 'Distintividad'],
    introduction:
      'Tras visitar una tienda o navegar por una web durante varios minutos, la memoria solo conserva un puñado de impresiones fragmentadas. ¿Qué determina qué sobrevive al olvido?',
    researchQuestion:
      '¿Qué rasgos hacen que un detalle visual o experiencial permanezca en la memoria tras una exposición breve?',
    phenomenonExplanation:
      'La memoria de trabajo tiene una capacidad limitada. Los elementos que rompen suavemente la expectativa dentro de un orden comprensible (efecto de distintividad), junto con el inicio y el cierre de la experiencia, tienen mayor probabilidad de consolidarse que una secuencia uniforme sin contraste.',
    studyOrEvidence:
      'El efecto Von Restorff (aislamiento perceptual) y los estudios sobre la regla pico-final muestran la asimetría con la que codificamos el recuerdo.',
    findings: [
      'La uniformidad excesiva dificulta la diferenciación posterior en el recuerdo.',
      'La curiosidad se activa cuando existe una pequeña brecha comprensible entre lo conocido y lo nuevo.',
      'Un cierre cuidado y sin fricciones mejora la valoración retrospectiva completa de la experiencia.',
    ],
    marketingApplication:
      'Cuidar el primer impacto y el momento final de cualquier interacción —una entrega, una web o una visita física— tiene un retorno perceptual desproporcionado.',
    sources: [
      'Hunt, R. R. (1995). The subtlety of distinctiveness: What von Restorff really did. Psychonomic Bulletin & Review.',
      'Fredrickson, B. L., & Kahneman, D. (1993). Duration neglect in retrospective evaluations. Journal of Personality and Social Psychology.',
    ],
  },
];

export interface DownloadableResource {
  id: string;
  kind: 'Guía' | 'Checklist' | 'Plantilla';
  title: string;
  description: string;
  formatLabel: string;
  filename: string;
  content: string;
}

export const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  {
    id: 'guia-preguntas-investigacion',
    kind: 'Guía',
    title: 'Guía práctica: Cómo formular preguntas de investigación antes de lanzar un producto',
    description:
      'Material divulgativo con 12 preguntas para traducir un reto comercial en objetivos observables.',
    formatLabel: 'Guía divulgativa (.txt)',
    filename: 'SENSIA-LABs-Guia-Preguntas-Investigacion.txt',
    content: `SENSIA LABs — Guía práctica de preparación de investigación
Concepto: Entender lo que no siempre se ve.

1. DEFINE EL PROBLEMA DE NEGOCIO ANTES QUE LA TÉCNICA
- ¿Qué decisión concreta necesitas tomar con la información obtenida?
- ¿Qué parte del comportamiento del cliente no entiendes hoy con tus métricas actuales?

2. DISTINGUE QUÉ QUIERES OBSERVAR
- Atención: ¿El público repara en el estímulo en los primeros segundos?
- Percepción: ¿Interpreta el mensaje y el valor como la marca pretende?
- Emoción: ¿Qué sensación espontánea genera el primer contacto?
- Decisión: ¿Qué duda o fricción frena el paso final?

3. CHECKLIST DE CONTEXTO
- ¿Dónde ve el consumidor este producto o mensaje en la vida real?
- ¿Contra qué alternativas reales se compara en ese instante?
- ¿Qué suposiciones internas de tu equipo no han sido contrastadas con usuarios externos?

Más información y orientación personalizada en SENSIA LABs (/contacto).
`,
  },
  {
    id: 'checklist-auditoria-perceptual',
    kind: 'Checklist',
    title: 'Checklist de primera impresión perceptual para envases, espacios y web',
    description:
      'Puntos clave de atención, carga cognitiva y coherencia sensorial para una revisión preliminar.',
    formatLabel: 'Checklist operativo (.txt)',
    filename: 'SENSIA-LABs-Checklist-Primera-Impresion.txt',
    content: `SENSIA LABs — Checklist de primera impresión perceptual

A. JERARQUÍA Y ATENCIÓN (0–3 SEGUNDOS)
[ ] Existe un único foco visual dominante por pantalla o cara principal.
[ ] La marca y la categoría se identifican sin necesidad de leer texto pequeño.
[ ] El espacio en blanco separa bloques en lugar de encerrarlo todo en marcos.

B. CLARIDAD COGNITIVA
[ ] El mensaje principal responde a la necesidad del visitante en lenguaje cotidiano.
[ ] No se obliga a elegir entre categorías técnicas desconocidas.
[ ] Las opciones presentadas simultáneamente están agrupadas y acotadas.

C. COHERENCIA SENSORIAL Y DE MARCA
[ ] Colores, tipografía y tono verbal transmiten la misma personalidad.
[ ] No hay contradicción entre la promesa externa y el contacto real con el servicio o producto.

Nota: Este material es divulgativo y orientativo. Para diseñar un protocolo adaptado a tu caso, contacta con SENSIA LABs.
`,
  },
  {
    id: 'plantilla-mapa-fricciones',
    kind: 'Plantilla',
    title: 'Plantilla de mapa de fricciones en el recorrido de decisión del cliente',
    description:
      'Estructura conceptual para documentar dudas, estímulos y momentos críticos antes de investigar.',
    formatLabel: 'Plantilla de ejemplo (.txt)',
    filename: 'SENSIA-LABs-Plantilla-Mapa-Fricciones.txt',
    content: `SENSIA LABs — Plantilla de ejemplo: Mapa de fricciones de decisión

1. PRIMER IMPACTO
- Estímulo observado: __________________________
- ¿Qué capta la mirada primero?: ________________
- Duda o fricción inmediata: ____________________

2. COMPARACIÓN DE ALTERNATIVAS
- ¿Contra qué compara el cliente?: ______________
- Término o dato que cuesta entender: ____________

3. CIERRE O ABANDONO
- Señal de confianza que falta: _________________
- Hipótesis para contrastar en investigación: ____

Recurso divulgativo de demostración · SENSIA LABs.
`,
  },
];

export interface PodcastEpisode {
  id: string;
  number: string;
  title: string;
  summary: string;
  duration: string;
  audioUrl?: string;
}

export interface PodcastInfo {
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  platforms: { label: string; url: string | null }[];
  episodes: PodcastEpisode[];
}

export const PODCAST_INFO: PodcastInfo = {
  title: 'DETRÁS DE LA DECISIÓN',
  subtitle: 'El podcast de SENSIA LABs',
  description:
    'Conversaciones claras y divulgativas sobre cómo la atención, la percepción y los estímulos cotidianos influyen en lo que sentimos y elegimos.',
  coverImage: '/src/assets/images/podcast_sensia_cover_1795194942485.jpg',
  coverAlt: 'Portada artística de DETRÁS DE LA DECISIÓN, podcast de SENSIA LABs',
  platforms: [
    { label: 'Spotify', url: null },
    { label: 'Apple Podcasts', url: null },
    { label: 'YouTube', url: null },
  ],
  episodes: [],
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué es el neuromarketing y cómo puede ayudar a mi empresa?',
    answer:
      'El neuromarketing aplica conocimientos de la neurociencia, la psicología cognitiva y el estudio de la percepción para comprender cómo atienden, sienten, recuerdan y deciden las personas frente a marcas, productos y mensajes. Ayuda a tu empresa a tomar decisiones basadas en cómo funciona realmente el consumidor, en lugar de depender solo de suposiciones internas o encuestas superficiales.',
  },
  {
    id: 'faq-2',
    question: '¿En qué se diferencia SENSIA LABs de una agencia de marketing tradicional?',
    answer:
      'Una agencia tradicional suele partir directamente de la ejecución creativa o de la gestión de medios. En SENSIA LABs nos centramos primero en investigar y comprender qué hay detrás de la percepción y la decisión de tus consumidores. Generamos criterio estratégico y conocimiento aplicado que luego orienta tanto tus decisiones internas como el trabajo de tus equipos creativos o de producto.',
  },
  {
    id: 'faq-3',
    question: '¿Qué tipo de empresas pueden trabajar con vosotros?',
    answer:
      'Trabajamos con pymes, marcas en crecimiento, departamentos de marketing, comercios físicos, empresas de servicios y negocios B2B o de gran consumo que necesitan entender mejor a sus clientes, validar un lanzamiento, reposicionar su marca o resolver un bloqueo en la experiencia de compra.',
  },
  {
    id: 'faq-4',
    question: '¿Qué servicios ofrecéis?',
    answer:
      'Agrupamos nuestro trabajo en seis áreas: Investigación del consumidor, Neuromarketing y percepción, Comportamiento y toma de decisiones, Marketing sensorial y experiencias, Investigación de marca, e Insights y estrategia. Si no sabes cuál encaja con tu caso, puedes utilizar nuestro Asistente de Necesidades para orientarte desde tu problema concreto.',
  },
  {
    id: 'faq-5',
    question: '¿Cómo es el proceso de investigación?',
    answer:
      'Seguimos una metodología estructurada en cuatro fases: Observar (recoger evidencias reales de atención, conducta y respuesta), Comprender (profundizar en motivaciones y barreras), Interpretar (detectar patrones y formular insights) y Transformar (traducir los hallazgos en recomendaciones prácticas para tu negocio).',
  },
  {
    id: 'faq-6',
    question: '¿Qué información podemos obtener de nuestros consumidores?',
    answer:
      'Dependiendo del objetivo del proyecto, podemos descubrir qué capta su atención en los primeros segundos, qué imagen real asocian a tu marca, qué frenos detienen la compra, por qué prefieren a un competidor, qué mensaje entienden mejor o qué elementos de tu producto o espacio generan fricción.',
  },
  {
    id: 'faq-7',
    question: '¿Qué técnicas y metodologías utilizáis?',
    answer:
      'No aplicamos una fórmula única ni todas las técnicas a todos los proyectos. Seleccionamos y combinamos metodologías cualitativas, pruebas de percepción visual y atención, experimentos conductuales de elección, análisis sensorial de espacios y estudios de marca según la pregunta concreta que necesitemos responder.',
  },
  {
    id: 'faq-8',
    question: '¿Cuánto dura un proyecto?',
    answer:
      'La duración depende del alcance, la complejidad del público objetivo y las técnicas requeridas. Un estudio focalizado de percepción o mensaje puede desarrollarse en pocas semanas, mientras que investigaciones exploratorias amplias o multisensoriales requieren plazos mayores que definimos con total claridad en la propuesta inicial.',
  },
  {
    id: 'faq-9',
    question: '¿Cómo se presentan los resultados?',
    answer:
      'Entregamos documentación visual y ejecutiva comprensible para perfiles directivos y de marketing —sin jerga académica innecesaria— junto con una sesión de trabajo para explicar hallazgos, responder dudas y priorizar las acciones estratégicas recomendadas.',
  },
  {
    id: 'faq-10',
    question: '¿Cómo puedo solicitar una propuesta?',
    answer:
      'Puedes pulsar en "Hablemos de tu proyecto" en cualquier página o empezar por nuestro Traductor de Necesidades para identificar el enfoque adecuado. En el formulario de contacto solo necesitamos conocer tu reto y contexto; revisaremos tu caso para plantear una propuesta metodológica a medida.',
  },
];
