import { APP_IMAGES } from './assets';

/**
 * ============================================================================
 * ARCHIVO CENTRALIZADO DE CONFIGURACIÓN FAMILIAR
 * ============================================================================
 * Modifica este archivo para adaptar los datos, colores o audios de la
 * Novena de Navidad de la familia Garrido Rocha.
 * También puedes personalizar todo en vivo desde el botón "Personalizar".
 */

export interface InstitutionalPalette {
  id: string;
  nombre: string;
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
}

export interface InstitutionConfig {
  /** Nombre de la familia o anfitrión */
  nombreInstitucion: string;
  /** Subtítulo o dedicatoria familiar mostrada debajo del título */
  lemaInstitucional: string;
  /** Mensaje de bienvenida de la pantalla principal */
  mensajeBienvenida: string;
  /** Nombre de la paleta seleccionada o 'custom' */
  paletaId: string;
  /** Color principal (botones primarios, enlaces activos, encabezados) */
  colorPrimario: string;
  /** Tono oscuro del color principal para contraste y hover */
  colorPrimarioOscuro: string;
  /** Color secundario navideño */
  colorSecundario: string;
  /** Color dorado o de acento festivo */
  colorAcento: string;
  /** URL o DataURL de foto o emblema familiar (vacío usa el emblema navideño SVG) */
  escudoUrl: string;
  /** URL o DataURL de la imagen navideña central */
  imagenCentralUrl: string;
  /** Día activo manual (1-9) o null para calcularlo automáticamente entre el 16 y 24 de diciembre */
  diaActualManual: number | null;
  /** Ruta de archivo de audio local para música navideña de fondo (ej. './audio/musica-fondo.mp3') */
  musicaFondoUrl: string;
  /** Ruta de archivo de audio local para los Gozos (ej. './audio/gozos.mp3') */
  audioGozosUrl: string;
  /** Ruta de archivo de audio local para oraciones generales (opcional) */
  audioOracionesUrl: string;
}

export const INSTITUTIONAL_PALETTES: InstitutionalPalette[] = [
  {
    id: 'pino-navideno',
    nombre: 'Pino & Carmesí Navideño',
    primary: '#14532D',
    primaryDark: '#0F3F22',
    secondary: '#991B1B',
    accent: '#B45309',
  },
  {
    id: 'nochebuena-dorada',
    nombre: 'Nochebuena & Oro Cálido',
    primary: '#7F1D1D',
    primaryDark: '#5C1313',
    secondary: '#14532D',
    accent: '#A16207',
  },
  {
    id: 'estrella-belen',
    nombre: 'Azul Noche & Estrella',
    primary: '#1E3A8A',
    primaryDark: '#172554',
    secondary: '#991B1B',
    accent: '#B45309',
  },
  {
    id: 'hogar-terracota',
    nombre: 'Hogar Verde & Terracota',
    primary: '#065F46',
    primaryDark: '#064E3B',
    secondary: '#9A3412',
    accent: '#CA8A04',
  },
];

export const DEFAULT_INSTITUTION_CONFIG: InstitutionConfig = {
  nombreInstitucion: 'Familia Garrido Rocha',
  lemaInstitucional: 'Hecho por la familia Garrido Rocha · Unidos en fe, amor y alegría',
  mensajeBienvenida:
    'Con todo el cariño de nuestro hogar, la familia Garrido Rocha te da la bienvenida a nuestra Novena de Navidad. Reunámonos alrededor del pesebre para vivir nueve días de oración tradicional, gozos, villancicos y propósitos en familia.',
  paletaId: 'pino-navideno',
  colorPrimario: '#14532D',
  colorPrimarioOscuro: '#0F3F22',
  colorSecundario: '#991B1B',
  colorAcento: '#B45309',
  escudoUrl: '',
  imagenCentralUrl: APP_IMAGES.heroNativity,
  diaActualManual: null,
  musicaFondoUrl: './audio/musica-fondo.mp3',
  audioGozosUrl: './audio/gozos.mp3',
  audioOracionesUrl: '',
};

/**
 * Calcula el día sugerido de la Novena (1 al 9) según la fecha actual (16 al 24 de diciembre).
 * Fuera de esas fechas, sugiere el Día 1 como punto de partida si no hay ajuste manual.
 */
export function getActiveNovenaDay(config: InstitutionConfig): {
  day: number;
  isAutoDateInSeason: boolean;
} {
  if (config.diaActualManual && config.diaActualManual >= 1 && config.diaActualManual <= 9) {
    return { day: config.diaActualManual, isAutoDateInSeason: false };
  }

  const now = new Date();
  const month = now.getMonth(); // 11 = diciembre
  const date = now.getDate();

  if (month === 11 && date >= 16 && date <= 24) {
    return { day: date - 15, isAutoDateInSeason: true };
  }

  return { day: 1, isAutoDateInSeason: false };
}
