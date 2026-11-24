/**
 * ============================================================================
 * REPERTORIO DE VILLANCICOS TRADICIONALES
 * ============================================================================
 * Cada villancico incluye su letra completa, una ruta configurable para archivo
 * de audio local (en la carpeta public/audio/) y un identificador de melodía
 * integrada para reproducción inmediata sin depender de internet ni servidores.
 */

export type BuiltinMelodyId =
  | 'noche-de-paz'
  | 'campana-sobre-campana'
  | 'tutaina'
  | 'peces-en-el-rio'
  | 'tamborilero'
  | 'nanita-nana'
  | 'gozos-tradicionales';

export interface VillancicoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  origen: string;
  tempoBpm: number;
  melodyId: BuiltinMelodyId;
  /** Ruta relativa en public/audio/ o DataURL cargado desde el panel */
  audioUrl: string;
  estrofas: string[][];
  coro?: string[];
}

export const DEFAULT_VILLANCICOS: VillancicoItem[] = [
  {
    id: 'tutaina',
    titulo: 'Tutaina Tuturumá',
    subtitulo: 'Villancico tradicional colombiano',
    origen: 'Tradición Andina · Colombia',
    tempoBpm: 112,
    melodyId: 'tutaina',
    audioUrl: './audio/tutaina.mp3',
    coro: [
      'Tutaina tuturumá,',
      'tutaina tuturumaina,',
      'tutaina tuturumá, turumá,',
      'tutaina tuturumaina.',
    ],
    estrofas: [
      [
        'Los pastores de Belén',
        'vienen a adorar al Niño;',
        'la Virgen y San José',
        'los reciben con cariño.',
      ],
      [
        'Tres reyes vienen también',
        'con incienso, mirra y oro,',
        'a ofrendar a Dios su bien',
        'como el más grande tesoro.',
      ],
      [
        'Vamos todos a cantar',
        'con amor y alegría,',
        'porque acaba de llegar',
        'de los cielos el Mesías.',
      ],
    ],
  },
  {
    id: 'campana-sobre-campana',
    titulo: 'Campana sobre Campana',
    subtitulo: 'Anuncio alegre del nacimiento',
    origen: 'Tradición Hispanoamericana',
    tempoBpm: 108,
    melodyId: 'campana-sobre-campana',
    audioUrl: './audio/campana-sobre-campana.mp3',
    coro: [
      'Belén, campanas de Belén,',
      'que los ángeles tocan,',
      '¿qué nuevas me traéis?',
    ],
    estrofas: [
      [
        'Campana sobre campana,',
        'y sobre campana una,',
        'asómate a la ventana,',
        'verás al Niño en la cuna.',
      ],
      [
        'Recogido tu rebaño,',
        '¿a dónde vas pastorcito?',
        'Voy a llevar al portal',
        'requesón, manteca y vino.',
      ],
      [
        'Campana sobre campana,',
        'y sobre campana dos,',
        'asómate a la ventana,',
        'porque está naciendo Dios.',
      ],
    ],
  },
  {
    id: 'peces-en-el-rio',
    titulo: 'Los Peces en el Río',
    subtitulo: 'Villancico popular navideño',
    origen: 'Tradición Popular',
    tempoBpm: 118,
    melodyId: 'peces-en-el-rio',
    audioUrl: './audio/peces-en-el-rio.mp3',
    coro: [
      'Pero mira cómo beben los peces en el río,',
      'pero mira cómo beben por ver al Dios nacido.',
      'Beben y beben y vuelven a beber,',
      'los peces en el río por ver a Dios nacer.',
    ],
    estrofas: [
      [
        'La Virgen se está peinando',
        'entre cortina y cortina;',
        'los cabellos son de oro',
        'y el peine de plata fina.',
      ],
      [
        'La Virgen está lavando',
        'y tendiendo en el romero;',
        'los pajaritos cantando',
        'y el romero floreciendo.',
      ],
      [
        'La Virgen va caminando',
        'por entre aquellas palmeras;',
        'el Niño mira en sus ojos',
        'el color de las estrellas.',
      ],
    ],
  },
  {
    id: 'noche-de-paz',
    titulo: 'Noche de Paz',
    subtitulo: 'Himno universal de Navidad',
    origen: 'Franz Xaver Gruber · Joseph Mohr',
    tempoBpm: 76,
    melodyId: 'noche-de-paz',
    audioUrl: './audio/noche-de-paz.mp3',
    estrofas: [
      [
        'Noche de paz, noche de amor,',
        'todo duerme en derredor.',
        'Entre los astros que esparcen su luz,',
        'bella anunciando al niñito Jesús,',
        'brilla la estrella de paz,',
        'brilla la estrella de paz.',
      ],
      [
        'Noche de paz, noche de amor,',
        'oye humilde el fiel pastor.',
        'Coros celestes que anuncian salud,',
        'gracias y glorias en gran plenitud,',
        'por nuestro buen Redentor,',
        'por nuestro buen Redentor.',
      ],
      [
        'Noche de paz, noche de amor,',
        'ved qué bello resplandor',
        'luce en el rostro del Niño Jesús,',
        'en el pesebre, del mundo la luz,',
        'astro de eterno fulgor,',
        'astro de eterno fulgor.',
      ],
    ],
  },
  {
    id: 'a-la-nanita-nana',
    titulo: 'A la Nanita Nana',
    subtitulo: 'Canción de cuna al Niño Jesús',
    origen: 'Tradición Hispanoamericana',
    tempoBpm: 88,
    melodyId: 'nanita-nana',
    audioUrl: './audio/a-la-nanita-nana.mp3',
    coro: [
      'A la nanita nana, nanita nana, nanita ea,',
      'mi Jesús tiene sueño, bendito sea, bendito sea.',
    ],
    estrofas: [
      [
        'Fuentecilla que corres clara y sonora,',
        'ruiseñor que en la selva cantando lloras,',
        'callad mientras la cuna se balancea,',
        'a la nanita nana, nanita ea.',
      ],
      [
        'Manojito de rosas y de alelíes,',
        '¿qué es lo que estás soñando que te sonríes?',
        'Cuáles son tus sueños, dilo alma mía,',
        'mas ¿qué es lo que murmuras? Eucaristía.',
      ],
    ],
  },
  {
    id: 'el-tamborilero',
    titulo: 'El Tamborilero',
    subtitulo: 'Ofrenda sencilla del corazón',
    origen: 'Adaptación tradicional navideña',
    tempoBpm: 86,
    melodyId: 'tamborilero',
    audioUrl: './audio/el-tamborilero.mp3',
    estrofas: [
      [
        'El camino que lleva a Belén',
        'baja hasta el valle que la nieve cubrió.',
        'Los pastorcillos quieren ver a su Rey,',
        'le traen regalos en su humilde zurrón,',
        'ro po pom pom, ro po pom pom.',
        'Ha nacido en un portal de Belén el Niño Dios.',
      ],
      [
        'Yo quisiera poner a tus pies',
        'algún presente que te agrade, Señor,',
        'mas Tú ya sabes que soy pobre también,',
        'y no poseo más que un viejo tambor,',
        'ro po pom pom, ro po pom pom.',
        'En tu honor frente al portal tocaré con mi tambor.',
      ],
      [
        'El camino que lleva a Belén',
        'yo voy marcando con mi viejo tambor,',
        'nada mejor hay que te pueda ofrecer,',
        'su ronco acento es un canto de amor,',
        'ro po pom pom, ro po pom pom.',
        'Cuando Dios me vio tocando ante Él me sonrió.',
      ],
    ],
  },
];
