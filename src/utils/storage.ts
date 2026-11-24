import { DEFAULT_INSTITUTION_CONFIG, InstitutionConfig } from '../config/institutionConfig';
import { DEFAULT_VILLANCICOS, VillancicoItem } from '../data/villancicos';

export interface CustomDayEdit {
  consideracion?: string[];
  reflexion?: string;
  preguntasReflexion?: string[];
  actividadTitulo?: string;
  actividadDescripcion?: string;
  dinamicaGrupal?: string;
  compromisoPropuesto?: string;
}

export interface CustomPrayersEdit {
  oracionTodos?: string[];
  oracionVirgen?: string[];
  oracionSanJose?: string[];
  oracionNino?: string[];
}

export type FamilyMemberRole =
  | 'Mamá / Papá'
  | 'Hijo / Hija'
  | 'Abuelos / Tíos'
  | 'Familiar / Amigo';

export interface CommunityMessage {
  id: string;
  autor: string;
  rol: FamilyMemberRole;
  dia: number;
  valor: 'Amor' | 'Solidaridad' | 'Respeto' | 'Fraternidad' | 'Unión';
  mensaje: string;
  fechaIso: string;
}

export interface NovenaPersistentState {
  completedDays: number[];
  completedActivities: Record<number, boolean>;
  fontSizeScale: number;
  institutionConfig: InstitutionConfig;
  customDayEdits: Record<number, CustomDayEdit>;
  customPrayersEdit: CustomPrayersEdit;
  villancicos: VillancicoItem[];
  communityMessages: CommunityMessage[];
}

const STORAGE_KEY = 'novena_familia_garrido_rocha_v1';

const DEFAULT_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: 'msg-familia-1',
    autor: 'Familia Garrido Rocha',
    rol: 'Mamá / Papá',
    dia: 1,
    valor: 'Amor',
    mensaje:
      'Damos gracias a Dios por reunirnos un año más frente al pesebre. Que la alegría, la paciencia y el cariño reinen siempre en nuestro hogar.',
    fechaIso: '2026-12-16',
  },
  {
    id: 'msg-familia-2',
    autor: 'Los hijos y sobrinos',
    rol: 'Hijo / Hija',
    dia: 5,
    valor: 'Solidaridad',
    mensaje:
      'Nos comprometemos a colaborar con alegría en casa, cuidar de los abuelos y compartir con quienes más lo necesiten esta Navidad.',
    fechaIso: '2026-12-20',
  },
  {
    id: 'msg-familia-3',
    autor: 'Abuelos y tíos de la familia',
    rol: 'Abuelos / Tíos',
    dia: 9,
    valor: 'Unión',
    mensaje:
      'Nuestro mayor regalo es ver a la familia unida, cantando gozos y villancicos con el corazón lleno de paz y gratitud.',
    fechaIso: '2026-12-24',
  },
];

export function getDefaultState(): NovenaPersistentState {
  return {
    completedDays: [],
    completedActivities: {},
    fontSizeScale: 1,
    institutionConfig: DEFAULT_INSTITUTION_CONFIG,
    customDayEdits: {},
    customPrayersEdit: {},
    villancicos: DEFAULT_VILLANCICOS,
    communityMessages: DEFAULT_COMMUNITY_MESSAGES,
  };
}

export function loadNovenaState(): NovenaPersistentState {
  const fallback = getDefaultState();
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<NovenaPersistentState>;

    return {
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : fallback.completedDays,
      completedActivities: parsed.completedActivities ?? fallback.completedActivities,
      fontSizeScale:
        typeof parsed.fontSizeScale === 'number' && parsed.fontSizeScale >= 0.85 && parsed.fontSizeScale <= 1.4
          ? parsed.fontSizeScale
          : fallback.fontSizeScale,
      institutionConfig: {
        ...DEFAULT_INSTITUTION_CONFIG,
        ...(parsed.institutionConfig ?? {}),
      },
      customDayEdits: parsed.customDayEdits ?? {},
      customPrayersEdit: parsed.customPrayersEdit ?? {},
      villancicos:
        Array.isArray(parsed.villancicos) && parsed.villancicos.length > 0
          ? parsed.villancicos
          : DEFAULT_VILLANCICOS,
      communityMessages: Array.isArray(parsed.communityMessages)
        ? parsed.communityMessages
        : DEFAULT_COMMUNITY_MESSAGES,
    };
  } catch {
    return fallback;
  }
}

export function saveNovenaState(state: NovenaPersistentState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Si el almacenamiento excede la cuota, ignorar silenciosamente
  }
}
