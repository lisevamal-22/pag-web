export interface ServiceInvestigationPillar {
  title: string;
  detail: string;
  accentHex: string;
}

export interface ServiceDiscoverExample {
  question: string;
  scenario: string;
  signalLabel: string;
}

export interface ServiceContribution {
  title: string;
  outcome: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  path: string;
  index: string;
  title: string;
  shortTitle: string;
  showcaseSummary: string;
  heroHeadline: string;
  heroUtility: string;
  heroImageUrl: string;
  heroImageAlt: string;
  visualCaption: string;
  tagline: string;
  description: string;
  problemSolved: string;
  whatIntro: string;
  whatWeInvestigate: ServiceInvestigationPillar[];
  discoverIntro: string;
  discoverExamples: ServiceDiscoverExample[];
  howIntro: string;
  possibleTechniques: string[];
  methodologyNote: string;
  brandValueIntro: string;
  brandContributions: ServiceContribution[];
  relatedProjectIds: string[];
  accentHex: string;
  surfaceTheme: 'blue' | 'black' | 'aqua' | 'yellow' | 'orange' | 'white';
  contactNeedCategory: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'investigacion-consumidor',
    slug: 'investigacion-consumidor',
    path: '/servicios/investigacion-consumidor',
    index: '01',
    title: 'Investigación del consumidor',
    shortTitle: 'Consumidor',
    showcaseSummary:
      'Conoce qué motiva, influye y condiciona las decisiones de tus clientes.',
    heroHeadline: 'COMPRENDER A QUIEN DECIDE ANTES DE DISEÑAR QUÉ DECIRLE.',
    heroUtility:
      'Exploramos motivaciones reales, rutinas cotidianas, expectativas y fricciones ocultas para que tu estrategia parta de cómo viven y eligen las personas.',
    heroImageUrl: '/src/assets/images/service_consumer_interview_1795194940990.jpg',
    heroImageAlt:
      'Persona participando en una sesión cualitativa de investigación del consumidor examinando un producto',
    visualCaption: 'Escena visual · Entrevista y exploración contextual del consumidor',
    tagline: 'Motivaciones, hábitos cotidianos, expectativas y barreras reales de compra.',
    description:
      'Analizamos en profundidad quiénes son las personas que interactúan con tu categoría, qué esperan encontrar, qué frenos experimentan y qué factores reales guían su elección.',
    problemSolved:
      'Ayuda a comprender por qué los clientes eligen una alternativa frente a otra, qué necesidades quedan sin resolver y dónde existen fricciones ocultas en su proceso de compra.',
    whatIntro:
      'No nos quedamos en perfiles demográficos genéricos. Estudiamos el contexto vital y las fuerzas que activan o bloquean una compra real.',
    whatWeInvestigate: [
      {
        title: 'Motivaciones reales y detonantes',
        detail: 'Qué necesidad concreta inicia la búsqueda y qué valor busca resolver el comprador.',
        accentHex: '#0042FD',
      },
      {
        title: 'Hábitos y rutinas de uso',
        detail: 'Cuándo, dónde y con quién interactúa realmente el usuario con el producto o servicio.',
        accentHex: '#00D6B6',
      },
      {
        title: 'Barreras y objeciones silenciosas',
        detail: 'Qué dudas, costes percibidos o riesgos detienen la compra sin verbalizarse.',
        accentHex: '#FFD203',
      },
      {
        title: 'Criterios reales de comparación',
        detail: 'Con qué alternativas compara tu marca el cliente y qué pesa más en su balanza.',
        accentHex: '#FE5D0A',
      },
    ],
    discoverIntro:
      'Preguntas concretas que resolvemos observando y escuchando al consumidor en su propio marco de referencia:',
    discoverExamples: [
      {
        question: '¿Por qué dicen valorar un atributo pero en tienda acaban eligiendo otro producto?',
        scenario: 'Ejemplo: diferencia entre discurso declarado en encuesta y hábito real de reposición.',
        signalLabel: 'Brecha discurso / conducta',
      },
      {
        question: '¿Qué freno exacto aparece cuando un cliente potencial llega a la página de precios?',
        scenario: 'Ejemplo: falta de claridad en qué incluye el servicio frente al miedo a equivocarse.',
        signalLabel: 'Barrera de entrada',
      },
      {
        question: '¿Con qué palabras cotidianas describe tu público el problema que tú resuelves?',
        scenario: 'Ejemplo: vocabulario real del usuario frente al lenguaje técnico interno de empresa.',
        signalLabel: 'Lenguaje y encuadre',
      },
      {
        question: '¿Qué expectativa no cubierta provoca que clientes habituales prueben a la competencia?',
        scenario: 'Ejemplo: desgaste por pequeños roces tras la compra o falta de seguimiento.',
        signalLabel: 'Motivo de fuga',
      },
    ],
    howIntro:
      'Combinamos técnicas cualitativas y conductuales seleccionadas según el tipo de público, la sensibilidad del tema y el momento del proyecto.',
    possibleTechniques: [
      'Entrevistas en profundidad semiestructuradas',
      'Diarios de uso y exploración de hábitos cotidianos',
      'Observación contextual en el entorno natural de compra o consumo',
      'Encuestas conductuales focalizadas en decisiones recientes',
    ],
    methodologyNote:
      'No aplicamos todas las técnicas por defecto en cada estudio: diseñamos el protocolo específico necesario para responder a tu pregunta concreta.',
    brandValueIntro:
      'Convierte intuiciones internas en conocimiento compartido y accionable para dirección, marketing y producto:',
    brandContributions: [
      {
        title: 'Mapa de motivaciones y frenos',
        outcome: 'Identifica exactamente qué impulsa a tus compradores y qué objeciones debes despejar primero.',
      },
      {
        title: 'Segmentación basada en conducta',
        outcome: 'Agrupa a tus clientes por cómo deciden y usan la categoría, no solo por edad o código postal.',
      },
      {
        title: 'Criterio directo para oferta y mensaje',
        outcome: 'Ajusta argumentos comerciales, formatos y lanzamientos al lenguaje y necesidad real del mercado.',
      },
    ],
    relatedProjectIds: ['demo-arquitectura-decision'],
    accentHex: '#0042FD',
    surfaceTheme: 'blue',
    contactNeedCategory: 'Comprender mejor a mis consumidores',
  },
  {
    id: 'neuromarketing',
    slug: 'neuromarketing',
    path: '/servicios/neuromarketing',
    index: '02',
    title: 'Neuromarketing',
    shortTitle: 'Neuromarketing',
    showcaseSummary:
      'Descubre cómo reaccionan las personas ante los estímulos de tu marca.',
    heroHeadline: 'LO QUE CAPTA LA MIRADA EN LOS PRIMEROS DOS SEGUNDOS.',
    heroUtility:
      'Medimos y analizamos cómo responde el cerebro en términos de atención visual, esfuerzo cognitivo y activación emocional ante tus piezas, envases o espacios.',
    heroImageUrl: '/src/assets/images/service_eyetracking_supermarket_1795194942172.jpg',
    heroImageAlt:
      'Persona utilizando gafas de seguimiento ocular observando productos en un lineal de supermercado',
    visualCaption: 'Eye tracking · Demostración conceptual de análisis de atención visual',
    tagline: 'Atención visual, recorridos oculares, respuesta emocional y carga cognitiva.',
    description:
      'Estudiamos cómo procesan las personas los estímulos visuales, auditivos y estructurales de una campaña, un envase o una pantalla antes incluso de emitir una opinión consciente.',
    problemSolved:
      'Permite saber qué capta realmente la mirada, qué elementos pasan desapercibidos en los primeros instantes y si tu creatividad genera atención hacia la marca o ruido visual.',
    whatIntro:
      'Evaluamos las respuestas rápidas e involuntarias que filtran qué estímulos sobreviven a la saturación informativa.',
    whatWeInvestigate: [
      {
        title: 'Saliencia y captura visual inicial',
        detail: 'Qué elemento atrae la primera fijación ocular entre decenas de estímulos competidores.',
        accentHex: '#0042FD',
      },
      {
        title: 'Recorrido de lectura y jerarquía',
        detail: 'En qué orden recorre el ojo el envase, el anuncio o la interfaz y dónde abandona.',
        accentHex: '#00D6B6',
      },
      {
        title: 'Respuesta emocional implícita',
        detail: 'Qué activación, interés o rechazo inicial genera el estímulo antes de racionalizarlo.',
        accentHex: '#FE5D0A',
      },
      {
        title: 'Carga cognitiva y saturación',
        detail: 'Cuánto esfuerzo mental exige comprender la pieza en condiciones reales de atención breve.',
        accentHex: '#FFD203',
      },
    ],
    discoverIntro:
      'Casos habituales donde el análisis de atención y respuesta implícita cambia por completo una decisión creativa:',
    discoverExamples: [
      {
        question: '¿Tu anuncio entretiene pero nadie recuerda de qué marca era al terminar?',
        scenario: 'Ejemplo: un elemento visual llamativo absorbe toda la mirada lejos del logotipo y el beneficio.',
        signalLabel: 'Fuga de atención',
      },
      {
        question: '¿Destaca tu envase a dos metros de distancia dentro de un lineal saturado?',
        scenario: 'Ejemplo: evaluación del contraste cromático superior frente a marcas blancas y líderes.',
        signalLabel: 'Visibilidad en lineal',
      },
      {
        question: '¿Dónde se detiene el lector antes de ignorar tu página de destino o folleto?',
        scenario: 'Ejemplo: bloques densos sin foco visual claro que disparan la fatiga en 3 segundos.',
        signalLabel: 'Fluidez visual',
      },
      {
        question: '¿Qué versión creativa A o B genera mayor recuerdo espontáneo tras exposición breve?',
        scenario: 'Ejemplo: validación previa de campañas antes de invertir en compra de medios.',
        signalLabel: 'Eficacia pre-campaña',
      },
    ],
    howIntro:
      'Cada estímulo exige su propio entorno de prueba: elegimos las herramientas más proporcionadas al soporte y objetivo.',
    possibleTechniques: [
      'Análisis de atención visual y seguimiento ocular (eye-tracking según alcance)',
      'Pruebas de exposición breve (segundos iniciales) y recuerdo libre',
      'Evaluación comparativa de carga cognitiva y jerarquía visual',
      'Test controlado A/B de creatividades, cartelería y prototipos de packaging',
    ],
    methodologyNote:
      'No utilizamos instrumentación compleja cuando un protocolo experimental breve ofrece respuestas más rápidas y fiables, ni aplicamos todas las técnicas a la vez.',
    brandValueIntro:
      'Aporta evidencia objetiva para invertir presupuesto de medios y producción creativa con mucha menor incertidumbre:',
    brandContributions: [
      {
        title: 'Optimización antes de producir o pautar',
        outcome: 'Corrige puntos ciegos en envases, vídeos y creatividades antes de imprimir o lanzar campaña.',
      },
      {
        title: 'Mayor eficacia por segundo de atención',
        outcome: 'Asegura que marca, mensaje clave y llamada a la acción trabajen en la secuencia correcta.',
      },
      {
        title: 'Criterio objetivo frente a gustos subjetivos',
        outcome: 'Desbloquea debates internos entre diseños apoyando las decisiones en cómo mira realmente la gente.',
      },
    ],
    relatedProjectIds: ['demo-atencion-prismas', 'demo-packaging-lineal'],
    accentHex: '#000000',
    surfaceTheme: 'black',
    contactNeedCategory: 'Evaluar una campaña',
  },
  {
    id: 'percepcion',
    slug: 'percepcion',
    path: '/servicios/percepcion',
    index: '03',
    title: 'Percepción',
    shortTitle: 'Percepción',
    showcaseSummary:
      'Comprende cómo interpretan los consumidores tu marca, productos y mensajes.',
    heroHeadline: 'NO VENDES LO QUE PROYECTAS, SINO LO QUE EL CONSUMIDOR INTERPRETA.',
    heroUtility:
      'Analizamos cómo la mente decodifica colores, formas, materiales, precios y palabras para atribuir calidad, confianza y significado a tu oferta.',
    heroImageUrl: '/src/assets/images/project_packaging_perception_1795190451546.jpg',
    heroImageAlt:
      'Prototipos escultóricos minimalistas de envases en blanco mate y azul cobalto sobre piedra travertino',
    visualCaption: 'Demostración perceptual · Forma, textura y valor atribuido por el contexto',
    tagline: 'Interpretación de mensajes, calidad percibida, códigos visuales y contexto.',
    description:
      'Contrastamos la intención de tu marca con la lectura espontánea que construyen las personas al observar un producto, leer un titular o valorar un precio.',
    problemSolved:
      'Resuelve desajustes silenciosos en los que un producto de gran calidad técnica transmite poca confianza, resulta confuso o se percibe fuera de su categoría real.',
    whatIntro:
      'La percepción no es pasiva: el cerebro interpreta cada señal a partir de referentes previos y del contexto que la rodea.',
    whatWeInvestigate: [
      {
        title: 'Primera impresión de calidad y valor',
        detail: 'Qué nivel de cuidado, eficacia o precio justo atribuyen en menos de cinco segundos.',
        accentHex: '#00D6B6',
      },
      {
        title: 'Efecto del contexto y contraste',
        detail: 'Cómo cambia el significado de un mismo producto al variar su entorno o sus referentes vecinos.',
        accentHex: '#0042FD',
      },
      {
        title: 'Comprensión inmediata del mensaje',
        detail: 'Si el público entiende exactamente qué ofreces y para quién es sin explicaciones largas.',
        accentHex: '#FFD203',
      },
      {
        title: 'Asociaciones simbólicas espontáneas',
        detail: 'Qué atributos emocionales o funcionales despiertan los materiales, tipografías y nombres.',
        accentHex: '#FE5D0A',
      },
    ],
    discoverIntro:
      'Ejemplos de preguntas perceptuales que definen el éxito de un producto, naming o mensaje:',
    discoverExamples: [
      {
        question: '¿Qué cambia en la mente del comprador cuando ve el mismo envase en blanco mate frente a brillo?',
        scenario: 'Ejemplo: evaluación de acabados que modifican percepción de naturalidad o eficacia clínica.',
        signalLabel: 'Código sensorial / material',
      },
      {
        question: '¿Se entiende qué hace tu servicio con solo leer el titular principal cinco segundos?',
        scenario: 'Ejemplo: frases creativas ambiguas que suenan bien internamente pero desorientan fuera.',
        signalLabel: 'Claridad de promesa',
      },
      {
        question: '¿Tu precio actual transmite posicionamiento premium o simplemente resulta difícil de justificar?',
        scenario: 'Ejemplo: coherencia entre señales de valor visibles y expectativa económica.',
        signalLabel: 'Anclaje de valor',
      },
      {
        question: '¿A qué competidor o categoría te asocia el usuario al ver tu identidad sin contexto?',
        scenario: 'Ejemplo: detección de códigos visuales que recuerdan accidentalmente a otra industria.',
        signalLabel: 'Códigos de categoría',
      },
    ],
    howIntro:
      'Diseñamos pruebas controladas de interpretación y contexto adaptadas a envases, propuestas digitales o conceptos de comunicación.',
    possibleTechniques: [
      'Pruebas de primera impresión y comprensión en exposición breve',
      'Experimentos de encuadre visual y cambio de contexto comparativo',
      'Test de asociación espontánea y diferencial semántico',
      'Entrevistas cualitativas sobre interpretación de producto y mensaje',
    ],
    methodologyNote:
      'Cada protocolo de percepción se calibra según el grado de madurez de la pieza (boceto, prototipo o producto ya en mercado).',
    brandValueIntro:
      'Te da control real sobre los significados que construye tu marca en la mente del cliente:',
    brandContributions: [
      {
        title: 'Coherencia entre producto y promesa',
        outcome: 'Evita que un buen producto pierda ventas por parecer complejo, genérico o mal categorizado.',
      },
      {
        title: 'Mensajes que se entienden al instante',
        outcome: 'Simplifica titulares, claims y jerarquía visual para reducir la duda inicial.',
      },
      {
        title: 'Validación perceptual de diseño y naming',
        outcome: 'Comprueba cómo se interpretan nuevas identidades o envases antes de salir al mercado.',
      },
    ],
    relatedProjectIds: ['demo-packaging-lineal'],
    accentHex: '#00D6B6',
    surfaceTheme: 'aqua',
    contactNeedCategory: 'Investigar un producto',
  },
  {
    id: 'comportamiento',
    slug: 'comportamiento',
    path: '/servicios/comportamiento',
    index: '04',
    title: 'Comportamiento',
    shortTitle: 'Comportamiento',
    showcaseSummary:
      'Investiga qué hay detrás de las elecciones y decisiones de compra.',
    heroHeadline: 'POR QUÉ DUDAN, COMPARAN O POSTERGAN JUSTO ANTES DE ELEGIR.',
    heroUtility:
      'Desentrañamos los atajos mentales, sesgos cognitivos y condiciones de contexto que inclinan la elección real entre alternativas.',
    heroImageUrl: '/src/assets/images/insights_perception_cover_1795190451319.jpg',
    heroImageAlt:
      'Planos geométricos translúcidos proyectando distintas trayectorias de luz como metáfora de arquitectura de decisión',
    visualCaption: 'Demostración conceptual · Arquitectura de elección y comparación entre opciones',
    tagline: 'Sesgos cognitivos, arquitectura de decisión, hábitos y elecciones de compra.',
    description:
      'Investigamos cómo simplifican las personas decisiones complejas, qué efecto tiene el orden en que comparan planes o precios y qué fricciones provocan el abandono.',
    problemSolved:
      'Explica por qué una oferta objetivamente superior puede quedar bloqueada por parálisis de elección, riesgo percibido o una mala arquitectura comparativa.',
    whatIntro:
      'Elegir no es calcular fríamente: observamos las reglas mentales y contextuales que gobiernan la decisión práctica.',
    whatWeInvestigate: [
      {
        title: 'Arquitectura de opciones y tarifas',
        detail: 'Cómo afecta el número, orden y formato de alternativas a la facilidad para elegir.',
        accentHex: '#FFD203',
      },
      {
        title: 'Sesgos cognitivos en contexto',
        detail: 'Anclaje de precios, aversión a la pérdida, prueba social y efecto de opción por defecto.',
        accentHex: '#0042FD',
      },
      {
        title: 'Parálisis y postergación',
        detail: 'En qué paso exacto del proceso digital o comercial decide el usuario «dejarlo para luego».',
        accentHex: '#FE5D0A',
      },
      {
        title: 'Señales de confianza decisorias',
        detail: 'Qué evidencia reduce la sensación de riesgo en productos técnicos o de ticket medio-alto.',
        accentHex: '#00D6B6',
      },
    ],
    discoverIntro:
      'Preguntas prácticas que aclaran por qué un cliente interesado termina no actuando:',
    discoverExamples: [
      {
        question: '¿Ofrecer cinco planes o variantes está frenando la decisión en vez de ayudar?',
        scenario: 'Ejemplo: sobrecarga cognitiva al comparar demasiadas diferencias pequeñas entre tarifas.',
        signalLabel: 'Parálisis por elección',
      },
      {
        question: '¿Qué cambia en la elección del cliente al presentar primero el valor que la cuota?',
        scenario: 'Ejemplo: efectos de encuadre y anclaje en propuestas B2B o suscripciones.',
        signalLabel: 'Efecto encuadre / anclaje',
      },
      {
        question: '¿Por qué abandonan formularios o carritos justo cuando parecía decidido?',
        scenario: 'Ejemplo: preguntas percibidas como invasivas o falta de transparencia sobre el siguiente paso.',
        signalLabel: 'Fricción en último paso',
      },
      {
        question: '¿Qué atajo mental usa el comprador no experto para decidir quién le inspira más confianza?',
        scenario: 'Ejemplo: señales externas rápidas cuando no sabe evaluar la calidad técnica real.',
        signalLabel: 'Heurística de confianza',
      },
    ],
    howIntro:
      'Adaptamos experimentos de elección y observación conductual al canal real donde decide tu cliente (web, tienda o propuesta comercial).',
    possibleTechniques: [
      'Experimentos conductuales comparativos de elección y precios',
      'Auditoría cognitiva de flujos digitales, catálogos o presupuestos',
      'Observación estructurada de tareas reales de comparación y compra',
      'Entrevistas de reconstrucción de decisión reciente',
    ],
    methodologyNote:
      'Cada estudio experimental reproduce condiciones realistas de elección sin forzar comportamientos artificiales ni aplicar técnicas redundantes.',
    brandValueIntro:
      'Te permite rediseñar cómo presentas tus opciones para facilitar una decisión segura y natural:',
    brandContributions: [
      {
        title: 'Arquitectura de oferta más comprensible',
        outcome: 'Ordena planes, productos y comparativas reduciendo la duda y el esfuerzo mental.',
      },
      {
        title: 'Menos fricción en puntos críticos',
        outcome: 'Suprime pasos innecesarios y aporta la información precisa justo cuando surge la objeción.',
      },
      {
        title: 'Mayor claridad comercial sin agresividad',
        outcome: 'Ayuda al cliente a decidir mejor entendiendo de forma transparente qué opción encaja con él.',
      },
    ],
    relatedProjectIds: ['demo-arquitectura-decision'],
    accentHex: '#FFD203',
    surfaceTheme: 'yellow',
    contactNeedCategory: 'Investigar un producto',
  },
  {
    id: 'marketing-sensorial',
    slug: 'marketing-sensorial',
    path: '/servicios/marketing-sensorial',
    index: '05',
    title: 'Marketing sensorial',
    shortTitle: 'Sensorial',
    showcaseSummary:
      'Diseña experiencias que conecten con los sentidos de tus consumidores.',
    heroHeadline: 'EL ESPACIO TAMBIÉN COMUNICA ANTES DE QUE ALGUIEN HABLE.',
    heroUtility:
      'Evaluamos cómo la luz, el sonido, los materiales, el aroma y el recorrido físico construyen confort, coherencia y recuerdo alrededor de tu marca.',
    heroImageUrl: '/src/assets/images/project_retail_sensory_1795190451942.jpg',
    heroImageAlt:
      'Interior arquitectónico minimalista de establecimiento comercial con hormigón, madera y luz cenital',
    visualCaption: 'Escena visual · Iluminación, materialidad, acústica y ritmo espacial',
    tagline: 'Estímulos sensoriales, atmósfera física, tacto y coherencia ambiental.',
    description:
      'Investigamos cómo interactúan todos los estímulos sensoriales de un establecimiento, un espacio de atención o un producto físico para provocar bienestar, interés y coherencia.',
    problemSolved:
      'Descubre por qué un local o experiencia física atrae miradas desde fuera pero genera frialdad, desorientación o salida rápida nada más cruzar la puerta.',
    whatIntro:
      'Estudiamos la experiencia corporal y ambiental completa: lo que el cliente ve, oye, toca, huele y recorre.',
    whatWeInvestigate: [
      {
        title: 'Atmósfera visual y lumínica',
        detail: 'Cómo dirigen la luz, el contraste y los tonos la atención hacia el producto o generan fatiga.',
        accentHex: '#00D6B6',
      },
      {
        title: 'Entorno acústico y ritmo',
        detail: 'Si el sonido, el eco o el silencio acompañan la calma de decisión o aceleran la salida.',
        accentHex: '#0042FD',
      },
      {
        title: 'Tacto, peso y materialidad',
        detail: 'Qué sensación transmite sostener el envase, abrir la caja o tocar mobiliario y muestras.',
        accentHex: '#FFD203',
      },
      {
        title: 'Recorrido y comodidad física',
        detail: 'Zonas frías, cuellos de botella, señalética confusa o distancia incómoda en los primeros metros.',
        accentHex: '#FE5D0A',
      },
    ],
    discoverIntro:
      'Hallazgos habituales cuando auditamos tiendas, clínicas, showrooms, hoteles o experiencias táctiles de producto:',
    discoverExamples: [
      {
        question: '¿Por qué la mayoría de visitantes se detienen y giran antes de llegar al fondo del local?',
        scenario: 'Ejemplo: cambios bruscos de iluminación y falta de pistas visuales en la zona de transición.',
        signalLabel: 'Zona de descompresión',
      },
      {
        question: '¿Qué sensación genera el peso y textura de tu producto frente a la promesa de la web?',
        scenario: 'Ejemplo: disonancia táctil en el momento de unboxing o prueba directa en tienda.',
        signalLabel: 'Coherencia táctil',
      },
      {
        question: '¿Está provocando la acústica o música actual prisa inconsciente en lugar de exploración?',
        scenario: 'Ejemplo: volumen o tempo desalineados con el tiempo necesario para consultar y elegir.',
        signalLabel: 'Ritmo ambiental',
      },
      {
        question: '¿Cómo orientarse de forma intuitiva sin llenar el espacio de carteles invasivos?',
        scenario: 'Ejemplo: señalización integrada en mobiliario, luz y jerarquía espacial natural.',
        signalLabel: 'Orientación fluida',
      },
    ],
    howIntro:
      'Combinamos auditoría perceptual in situ con observación de recorridos reales y percepción directa de usuarios.',
    possibleTechniques: [
      'Auditoría sensorial estructurada en establecimiento o showroom',
      'Mapeo de recorridos físicos y mapas de fricción espacial',
      'Evaluación sensorial de producto, envase y experiencia unboxing',
      'Entrevistas breves contextuales inmediatamente tras la visita o prueba',
    ],
    methodologyNote:
      'Adaptamos las dimensiones sensoriales analizadas al sector específico (retail, restauración, salud, hostelería o gran consumo).',
    brandValueIntro:
      'Convierte tus puntos físicos y tangibles en una ventaja emocional difícil de imitar online:',
    brandContributions: [
      {
        title: 'Espacios más cómodos y memorables',
        outcome: 'Reduce sensaciones de frialdad, incomodidad o prisa para favorecer una exploración natural.',
      },
      {
        title: 'Coherencia entre marca y entorno físico',
        outcome: 'Alinea luz, materiales, sonido y trato con los valores que comunicas en tus canales digitales.',
      },
      {
        title: 'Mejora de experiencia de producto tangible',
        outcome: 'Cuida los detalles de contacto y presentación que refuerzan el valor percibido al instante.',
      },
    ],
    relatedProjectIds: ['demo-espacio-sensorial'],
    accentHex: '#00D6B6',
    surfaceTheme: 'aqua',
    contactNeedCategory: 'Mejorar una experiencia',
  },
  {
    id: 'experiencia-marca',
    slug: 'experiencia-marca',
    path: '/servicios/experiencia-marca',
    index: '06',
    title: 'Experiencia de marca',
    shortTitle: 'Experiencia de marca',
    showcaseSummary:
      'Comprende cómo viven, perciben y recuerdan tu marca tus clientes.',
    heroHeadline: 'LA MARCA ES EL RECUERDO QUE PERMANECE DESPUÉS DE CADA CONTACTO.',
    heroUtility:
      'Evaluamos el recorrido completo entre tu identidad, tus puntos de contacto y la huella real que dejas en la memoria de tus clientes.',
    heroImageUrl: '/src/assets/images/project_visual_attention_1795190451005.jpg',
    heroImageAlt:
      'Prismas ópticos refractando haces de luz sobre papel de archivo representando coherencia de marca',
    visualCaption: 'Demostración conceptual · Coherencia y recuerdo entre puntos de contacto',
    tagline: 'Posicionamiento vivido, coherencia omnicanal, recuerdo e identidad percibida.',
    description:
      'Analizamos cómo conecta lo que dices ser como marca con lo que el cliente experimenta antes, durante y después de interactuar con tus canales, productos y equipos.',
    problemSolved:
      'Identifica grietas entre estrategia de branding y experiencia cotidiana, clarifica qué territorio propio recuerda la audiencia y orienta procesos de reposicionamiento.',
    whatIntro:
      'Una marca no se construye solo en su logotipo: se consolida o debilita en la suma coherente de sus momentos clave.',
    whatWeInvestigate: [
      {
        title: 'Brecha identidad vs vivencia real',
        detail: 'Qué diferencias percibe el cliente entre lo que promete la campaña y lo que ocurre al comprar.',
        accentHex: '#FE5D0A',
      },
      {
        title: 'Momentos pico y recuerdo residual',
        detail: 'Qué instante específico marca la impresión global días después de la interacción.',
        accentHex: '#0042FD',
      },
      {
        title: 'Continuidad entre canales',
        detail: 'Si web, redes, envase, punto físico y atención al cliente hablan con una sola voz reconocible.',
        accentHex: '#00D6B6',
      },
      {
        title: 'Territorio de diferenciación propio',
        detail: 'Qué asociaciones espontáneas distinguen a tu marca frente a competidores directos.',
        accentHex: '#FFD203',
      },
    ],
    discoverIntro:
      'Preguntas estratégicas que responden al reto de consolidar, diferenciar o reposicionar una marca:',
    discoverExamples: [
      {
        question: '¿Si tapamos el logotipo, reconocería tu cliente que esta pieza o experiencia es tuya?',
        scenario: 'Ejemplo: auditoría de códigos distintivos propios frente a estéticas intercambiables del sector.',
        signalLabel: 'Distintividad de marca',
      },
      {
        question: '¿Qué momento del proceso está arruinando el recuerdo de una compra que empezó muy bien?',
        scenario: 'Ejemplo: fricción en entrega, posventa o instrucciones que borran una gran primera impresión.',
        signalLabel: 'Regla pico-final',
      },
      {
        question: '¿Cómo te describen realmente tus clientes cuando recomiendan tu marca a otra persona?',
        scenario: 'Ejemplo: contraste entre el posicionamiento interno deseado y el resumen espontáneo real.',
        signalLabel: 'Posicionamiento vivido',
      },
      {
        question: '¿Qué oportunidades claras quedan libres en el mapa perceptual de tu categoría?',
        scenario: 'Ejemplo: territorios poco explotados antes de abordar un rebranding o nueva línea.',
        signalLabel: 'Oportunidad estratégica',
      },
    ],
    howIntro:
      'Unimos investigación de marca, auditoría de puntos de contacto y síntesis estratégica según la fase de tu proyecto.',
    possibleTechniques: [
      'Mapeo perceptual completo del recorrido de experiencia (antes, durante, después)',
      'Técnicas proyectivas y de recuerdo espontáneo de marca',
      'Auditoría de coherencia verbal, visual y experiencial entre canales',
      'Análisis comparativo de posicionamiento frente a referentes del mercado',
    ],
    methodologyNote:
      'Diseñamos cada investigación de marca a medida, tanto para marcas consolidadas en evolución como para lanzamientos o rebrandings.',
    brandValueIntro:
      'Te da una hoja de ruta clara para alinear equipos, identidad y experiencia en torno a lo que de verdad genera recuerdo:',
    brandContributions: [
      {
        title: 'Alineación total entre promesa y vivencia',
        outcome: 'Detecta y corrige los puntos donde la experiencia real contradice el posicionamiento deseado.',
      },
      {
        title: 'Base sólida antes de un rebranding o campaña',
        outcome: 'Evita cambios estéticos arbitrarios apoyando la dirección creativa en percepción contrastada.',
      },
      {
        title: 'Priorización de momentos memorables',
        outcome: 'Concentra esfuerzo e inversión en los puntos de contacto que mayor huella dejan en el cliente.',
      },
    ],
    relatedProjectIds: ['demo-espacio-sensorial', 'demo-atencion-prismas'],
    accentHex: '#FE5D0A',
    surfaceTheme: 'orange',
    contactNeedCategory: 'Investigar mi marca',
  },
];

export function getServiceBySlug(slug: string | null | undefined): ServiceItem | undefined {
  if (!slug) return undefined;
  return SERVICES.find((s) => s.slug === slug || s.id === slug);
}
