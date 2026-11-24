import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Square,
  Volume2,
  Music,
  Send,
  Sparkles,
  Users,
  MessageSquareHeart,
} from 'lucide-react';
import {
  DIAS_NOVENA,
  GOZOS_TRADICIONALES,
  ORACION_NINO_JESUS,
  ORACION_SAN_JOSE,
  ORACION_TODOS_LOS_DIAS,
  ORACION_VIRGEN_MARIA,
  SECCIONES_DIA,
} from '../data/novenaTradicional';
import { InstitutionConfig } from '../config/institutionConfig';
import { APP_IMAGES } from '../config/assets';
import {
  CommunityMessage,
  CustomDayEdit,
  CustomPrayersEdit,
} from '../utils/storage';
import {
  holidayAudio,
  speakPrayerText,
  stopPrayerSpeech,
} from '../utils/audioEngine';
import { NativityOrnamentDivider } from './ChristmasDecorations';

interface DayReaderViewProps {
  selectedDay: number;
  onSelectDay: (dia: number) => void;
  completedDays: number[];
  onToggleDayCompleted: (dia: number) => void;
  completedActivities: Record<number, boolean>;
  onToggleActivityCompleted: (dia: number) => void;
  config: InstitutionConfig;
  customDayEdits: Record<number, CustomDayEdit>;
  customPrayersEdit: CustomPrayersEdit;
  onAddCommunityMessage: (
    msg: Omit<CommunityMessage, 'id' | 'fechaIso'>
  ) => void;
}

export const DayReaderView: React.FC<DayReaderViewProps> = ({
  selectedDay,
  onSelectDay,
  completedDays,
  onToggleDayCompleted,
  completedActivities,
  onToggleActivityCompleted,
  config,
  customDayEdits,
  customPrayersEdit,
  onAddCommunityMessage,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); // 0..7
  const [activeGozoIndex, setActiveGozoIndex] = useState(0); // 0..11
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlayingGozosMusic, setIsPlayingGozosMusic] = useState(false);
  const [gozosProgress, setGozosProgress] = useState(0);
  const [gozosSourceLabel, setGozosSourceLabel] = useState('');

  // Formulario rápido de compromiso dentro del Día
  const [autor, setAutor] = useState('');
  const [rol, setRol] = useState<CommunityMessage['rol']>('Mamá / Papá');
  const [compromisoTexto, setCompromisoTexto] = useState('');
  const [compromisoEnviado, setCompromisoEnviado] = useState(false);

  const baseDay = DIAS_NOVENA.find((d) => d.dia === selectedDay) ?? DIAS_NOVENA[0];
  const dayEdit = customDayEdits[selectedDay];

  // Combinar textos base tradicionales con posibles ediciones institucionales
  const resolvedDay = useMemo(
    () => ({
      ...baseDay,
      consideracion:
        dayEdit?.consideracion && dayEdit.consideracion.length > 0
          ? dayEdit.consideracion
          : baseDay.consideracion,
      reflexion: dayEdit?.reflexion || baseDay.reflexion,
      preguntasReflexion:
        dayEdit?.preguntasReflexion && dayEdit.preguntasReflexion.length > 0
          ? dayEdit.preguntasReflexion
          : baseDay.preguntasReflexion,
      actividadParticipativa: {
        titulo:
          dayEdit?.actividadTitulo || baseDay.actividadParticipativa.titulo,
        descripcion:
          dayEdit?.actividadDescripcion ||
          baseDay.actividadParticipativa.descripcion,
        dinamicaGrupal:
          dayEdit?.dinamicaGrupal ||
          baseDay.actividadParticipativa.dinamicaGrupal,
        compromisoPropuesto:
          dayEdit?.compromisoPropuesto ||
          baseDay.actividadParticipativa.compromisoPropuesto,
      },
    }),
    [baseDay, dayEdit]
  );

  const oracionTodosParrafos =
    customPrayersEdit.oracionTodos && customPrayersEdit.oracionTodos.length > 0
      ? customPrayersEdit.oracionTodos
      : ORACION_TODOS_LOS_DIAS.parrafos;

  const oracionVirgenParrafos =
    customPrayersEdit.oracionVirgen && customPrayersEdit.oracionVirgen.length > 0
      ? customPrayersEdit.oracionVirgen
      : ORACION_VIRGEN_MARIA.parrafos;

  const oracionSanJoseParrafos =
    customPrayersEdit.oracionSanJose && customPrayersEdit.oracionSanJose.length > 0
      ? customPrayersEdit.oracionSanJose
      : ORACION_SAN_JOSE.parrafos;

  const oracionNinoParrafos =
    customPrayersEdit.oracionNino && customPrayersEdit.oracionNino.length > 0
      ? customPrayersEdit.oracionNino
      : ORACION_NINO_JESUS.parrafos;

  // Detener audio al cambiar de día o sección
  useEffect(() => {
    stopPrayerSpeech();
    setIsSpeaking(false);
    holidayAudio.stopTrack();
    setIsPlayingGozosMusic(false);
    setGozosProgress(0);
    setCompromisoEnviado(false);
  }, [selectedDay, activeSectionIndex]);

  useEffect(() => {
    return () => {
      stopPrayerSpeech();
      holidayAudio.stopTrack();
    };
  }, []);

  const isDayDone = completedDays.includes(selectedDay);
  const isActivityDone = Boolean(completedActivities[selectedDay]);
  const currentSection = SECCIONES_DIA[activeSectionIndex];

  const getCurrentReadingText = (): string => {
    switch (activeSectionIndex) {
      case 0:
        return `${ORACION_TODOS_LOS_DIAS.titulo}. ${oracionTodosParrafos.join(' ')}`;
      case 1:
        return `Consideración del Día ${selectedDay}. ${resolvedDay.consideracion.join(' ')}`;
      case 2:
        return `${ORACION_VIRGEN_MARIA.titulo}. ${oracionVirgenParrafos.join(' ')}`;
      case 3:
        return `${ORACION_SAN_JOSE.titulo}. ${oracionSanJoseParrafos.join(' ')}`;
      case 4: {
        const estrofa = GOZOS_TRADICIONALES.estrofas[activeGozoIndex];
        return `${estrofa.versos.join(' ')}. ${GOZOS_TRADICIONALES.coro}`;
      }
      case 5:
        return `${ORACION_NINO_JESUS.titulo}. ${oracionNinoParrafos.join(' ')}`;
      case 6:
        return `Reflexión del día. ${resolvedDay.reflexion}`;
      case 7:
        return `${resolvedDay.actividadParticipativa.titulo}. ${resolvedDay.actividadParticipativa.descripcion}. Dinámica grupal: ${resolvedDay.actividadParticipativa.dinamicaGrupal}`;
      default:
        return '';
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopPrayerSpeech();
      setIsSpeaking(false);
      return;
    }

    // Si hay un archivo de audio general para oraciones y no estamos en Gozos, intentar reproducirlo primero
    if (activeSectionIndex !== 4 && config.audioOracionesUrl && config.audioOracionesUrl.trim().length > 0) {
      void holidayAudio.playTrack(
        config.audioOracionesUrl,
        'noche-de-paz',
        undefined,
        () => setIsSpeaking(false)
      );
      setIsSpeaking(true);
      return;
    }

    const ok = speakPrayerText(
      getCurrentReadingText(),
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
    if (!ok) {
      setIsSpeaking(false);
    }
  };

  const handleToggleGozosAudio = async () => {
    if (isPlayingGozosMusic) {
      holidayAudio.stopTrack();
      setIsPlayingGozosMusic(false);
      setGozosProgress(0);
      return;
    }
    setIsPlayingGozosMusic(true);
    const result = await holidayAudio.playTrack(
      config.audioGozosUrl,
      'gozos-tradicionales',
      (pct, usingSynth) => {
        setGozosProgress(pct);
        setGozosSourceLabel(
          usingSynth ? 'Melodía tradicional integrada' : 'Audio local de Gozos'
        );
      },
      () => {
        setIsPlayingGozosMusic(false);
        setGozosProgress(0);
      }
    );
    setGozosSourceLabel(
      result.usingSynth ? 'Melodía tradicional integrada' : 'Audio local de Gozos'
    );
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextSection = () => {
    if (activeSectionIndex < SECCIONES_DIA.length - 1) {
      setActiveSectionIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitCompromiso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !compromisoTexto.trim()) return;

    const valorMapped: CommunityMessage['valor'] =
      resolvedDay.valorDelDia === 'Amor' ||
      resolvedDay.valorDelDia === 'Solidaridad' ||
      resolvedDay.valorDelDia === 'Respeto' ||
      resolvedDay.valorDelDia === 'Fraternidad' ||
      resolvedDay.valorDelDia === 'Unión'
        ? resolvedDay.valorDelDia
        : 'Fraternidad';

    onAddCommunityMessage({
      autor: autor.trim(),
      rol,
      dia: selectedDay,
      valor: valorMapped,
      mensaje: compromisoTexto.trim(),
    });
    setCompromisoTexto('');
    setCompromisoEnviado(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Selector superior de los 9 días */}
      <div className="bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-3 sm:p-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)] font-medium">
              Navegación por días · {resolvedDay.fecha}
            </p>
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--inst-ink)] mt-0.5">
              Día {resolvedDay.dia}: {resolvedDay.titulo}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => onToggleDayCompleted(selectedDay)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[42px] ${
              isDayDone
                ? 'bg-[var(--inst-primary)] text-white'
                : 'border border-[var(--inst-primary)] text-[var(--inst-primary)] bg-[var(--inst-canvas)] hover:bg-[var(--inst-primary)] hover:text-white'
            }`}
          >
            {isDayDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Día {selectedDay} Realizado</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Marcar Día {selectedDay} como realizado</span>
              </>
            )}
          </button>
        </div>

        {/* Botonera horizontal de los 9 días */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5" role="tablist" aria-label="Días de la Novena">
          {DIAS_NOVENA.map((d) => {
            const active = d.dia === selectedDay;
            const done = completedDays.includes(d.dia);
            return (
              <button
                key={d.dia}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  onSelectDay(d.dia);
                  setActiveSectionIndex(0);
                }}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[38px] ${
                  active
                    ? 'text-white font-semibold'
                    : done
                    ? 'bg-[var(--inst-primary)]/10 text-[var(--inst-primary)] border border-[var(--inst-primary)]/30 hover:bg-[var(--inst-primary)]/15'
                    : 'bg-[var(--inst-canvas)] text-[var(--inst-muted)] border border-[var(--inst-border)] hover:text-[var(--inst-ink)]'
                }`}
                style={active ? { backgroundColor: 'var(--inst-primary)' } : undefined}
              >
                <span className="font-mono-tabular">Día {d.dia}</span>
                {done && !active && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estructura principal: Menú lateral de las 8 secciones + Área de lectura */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navegación de las 8 secciones del día */}
        <aside className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--inst-border)]">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--inst-muted)]">
                Orden del día
              </h2>
              <span className="text-xs font-mono-tabular text-[var(--inst-muted)]">
                Paso {activeSectionIndex + 1}/8
              </span>
            </div>

            <nav className="space-y-1" aria-label="Secciones del día">
              {SECCIONES_DIA.map((sec, idx) => {
                const isCurrent = idx === activeSectionIndex;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSectionIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isCurrent
                        ? 'text-white font-semibold'
                        : 'text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)]'
                    }`}
                    style={
                      isCurrent ? { backgroundColor: 'var(--inst-primary)' } : undefined
                    }
                  >
                    <span className="truncate">{sec.titulo}</span>
                    {isCurrent && <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tarjeta visual de apoyo del pesebre */}
          <figure className="hidden lg:block rounded-xl overflow-hidden border border-[var(--inst-border)] bg-[var(--inst-surface)]">
            <img
              src={APP_IMAGES.pesebreLuz}
              alt="Pesebre iluminado con luz cálida de Navidad"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover"
            />
            <figcaption className="p-3.5 text-xs text-[var(--inst-muted)] leading-relaxed">
              Valor del Día {resolvedDay.dia}:{' '}
              <strong className="text-[var(--inst-ink)]">{resolvedDay.valorDelDia}</strong>.
              Comparte este momento en calma y unión con toda la familia.
            </figcaption>
          </figure>
        </aside>

        {/* Área central de lectura y participación */}
        <main className="lg:col-span-8 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-5 sm:p-8 space-y-6">
          {/* Cabecera de la sección activa + Reproductor de audio/voz */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--inst-border)]">
            <div>
              <p className="text-xs font-medium text-[var(--inst-accent)]">
                Día {resolvedDay.dia} · {resolvedDay.fecha} · Valor: {resolvedDay.valorDelDia}
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--inst-ink)] mt-1">
                {currentSection.titulo}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0 no-print">
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                  isSpeaking
                    ? 'border-[var(--inst-secondary)] bg-[var(--inst-secondary)] text-white'
                    : 'border-[var(--inst-border)] bg-[var(--inst-canvas)] text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Detener lectura</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 shrink-0 text-[var(--inst-primary)]" aria-hidden="true" />
                    <span>Escuchar texto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contenido dinámico de cada una de las 8 secciones */}
          <article className="max-w-prose space-y-5">
            {activeSectionIndex === 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                  {ORACION_TODOS_LOS_DIAS.subtitulo}
                </p>
                {oracionTodosParrafos.map((p, idx) => (
                  <p
                    key={idx}
                    className={`reading-prose text-[var(--inst-ink)] ${
                      idx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
                <p className="text-sm italic text-[var(--inst-muted)] pt-2 border-t border-[var(--inst-border)]">
                  {ORACION_TODOS_LOS_DIAS.jaculatoriaFinal}
                </p>
              </div>
            )}

            {activeSectionIndex === 1 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                  Consideración tradicional del {resolvedDay.fecha}
                </p>
                {resolvedDay.consideracion.map((p, idx) => (
                  <p
                    key={idx}
                    className={`reading-prose text-[var(--inst-ink)] ${
                      idx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {activeSectionIndex === 2 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                  {ORACION_VIRGEN_MARIA.subtitulo}
                </p>
                {oracionVirgenParrafos.map((p, idx) => (
                  <p
                    key={idx}
                    className={`reading-prose text-[var(--inst-ink)] ${
                      idx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
                <p className="text-sm italic text-[var(--inst-muted)] pt-2 border-t border-[var(--inst-border)]">
                  {ORACION_VIRGEN_MARIA.jaculatoriaFinal}
                </p>
              </div>
            )}

            {activeSectionIndex === 3 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                  {ORACION_SAN_JOSE.subtitulo}
                </p>
                {oracionSanJoseParrafos.map((p, idx) => (
                  <p
                    key={idx}
                    className={`reading-prose text-[var(--inst-ink)] ${
                      idx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
                <p className="text-sm italic text-[var(--inst-muted)] pt-2 border-t border-[var(--inst-border)]">
                  {ORACION_SAN_JOSE.jaculatoriaFinal}
                </p>
              </div>
            )}

            {activeSectionIndex === 4 && (
              <div className="space-y-6">
                {/* Reproductor musical dedicado para los Gozos */}
                <div className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-canvas)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: 'var(--inst-secondary)' }}
                    >
                      <Music className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--inst-ink)]">
                        Acompañamiento musical para los Gozos
                      </p>
                      <p className="text-xs text-[var(--inst-muted)]">
                        {isPlayingGozosMusic
                          ? `${gozosSourceLabel} · ${gozosProgress}%`
                          : 'Reproduce el tono tradicional de «Dulce Jesús mío»'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleGozosAudio}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer whitespace-nowrap min-h-[38px]"
                    style={{
                      backgroundColor: isPlayingGozosMusic
                        ? 'var(--inst-secondary)'
                        : 'var(--inst-primary)',
                    }}
                  >
                    {isPlayingGozosMusic ? (
                      <>
                        <Square className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Detener música</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Tocar melodía de Gozos</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Coro destacado */}
                <div className="rounded-xl border border-[var(--inst-accent)]/40 bg-[var(--inst-surface-alt)]/70 p-5 text-center space-y-1">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[var(--inst-accent)]">
                    Coro (se canta después de cada estrofa)
                  </p>
                  <p className="font-editorial text-xl sm:text-2xl italic font-medium text-[var(--inst-ink)]">
                    {GOZOS_TRADICIONALES.coro}
                  </p>
                </div>

                {/* Selector interactivo de estrofa (1 a 12) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs font-semibold text-[var(--inst-muted)] uppercase tracking-wider">
                      Estrofas tradicionales (1 a 12)
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {GOZOS_TRADICIONALES.estrofas.map((e, idx) => (
                        <button
                          key={e.numero}
                          type="button"
                          onClick={() => setActiveGozoIndex(idx)}
                          className={`w-7 h-7 rounded text-xs font-mono-tabular font-medium transition-colors cursor-pointer ${
                            idx === activeGozoIndex
                              ? 'text-white'
                              : 'bg-[var(--inst-canvas)] border border-[var(--inst-border)] text-[var(--inst-muted)] hover:text-[var(--inst-ink)]'
                          }`}
                          style={
                            idx === activeGozoIndex
                              ? { backgroundColor: 'var(--inst-primary)' }
                              : undefined
                          }
                          aria-label={`Ver estrofa ${e.numero}`}
                        >
                          {e.numero}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estrofa destacada actual */}
                  <div className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-canvas)] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tabular font-semibold text-[var(--inst-primary)]">
                        Estrofa {GOZOS_TRADICIONALES.estrofas[activeGozoIndex].numero} de 12
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={activeGozoIndex === 0}
                          onClick={() => setActiveGozoIndex((i) => Math.max(0, i - 1))}
                          className="px-2.5 py-1 text-xs rounded border border-[var(--inst-border)] disabled:opacity-40 cursor-pointer"
                        >
                          Anterior
                        </button>
                        <button
                          type="button"
                          disabled={activeGozoIndex === GOZOS_TRADICIONALES.estrofas.length - 1}
                          onClick={() =>
                            setActiveGozoIndex((i) =>
                              Math.min(GOZOS_TRADICIONALES.estrofas.length - 1, i + 1)
                            )
                          }
                          className="px-2.5 py-1 text-xs rounded border border-[var(--inst-border)] disabled:opacity-40 cursor-pointer"
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>

                    <div className="reading-prose-lg font-editorial text-[var(--inst-ink)] space-y-1">
                      {GOZOS_TRADICIONALES.estrofas[activeGozoIndex].versos.map((linea, i) => (
                        <p key={i}>{linea}</p>
                      ))}
                    </div>
                  </div>

                  {/* Lista completa de los 12 gozos para lectura continua */}
                  <details className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-canvas)]/50 p-4">
                    <summary className="text-sm font-semibold text-[var(--inst-primary)] cursor-pointer select-none">
                      Ver las 12 estrofas completas en lista continua
                    </summary>
                    <div className="mt-4 space-y-5">
                      {GOZOS_TRADICIONALES.estrofas.map((estrofa) => (
                        <div
                          key={estrofa.numero}
                          className="pb-4 border-b border-[var(--inst-border)] last:border-b-0 space-y-1"
                        >
                          <p className="text-xs font-mono-tabular font-semibold text-[var(--inst-muted)]">
                            {estrofa.numero}.
                          </p>
                          <div className="reading-prose text-[var(--inst-ink)]">
                            {estrofa.versos.map((v, k) => (
                              <p key={k}>{v}</p>
                            ))}
                          </div>
                          <p className="text-sm italic text-[var(--inst-secondary)] pt-1">
                            Coro: {GOZOS_TRADICIONALES.coro}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            )}

            {activeSectionIndex === 5 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                  {ORACION_NINO_JESUS.subtitulo}
                </p>
                {oracionNinoParrafos.map((p, idx) => (
                  <p
                    key={idx}
                    className={`reading-prose text-[var(--inst-ink)] ${
                      idx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {activeSectionIndex === 6 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)]">
                    Mensaje para nuestra familia · Valor: {resolvedDay.valorDelDia}
                  </p>
                  <p className="reading-prose-lg text-[var(--inst-ink)] drop-cap">
                    {resolvedDay.reflexion}
                  </p>
                </div>

                <NativityOrnamentDivider label="Preguntas para dialogar en casa" />

                <div className="space-y-3">
                  <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                    Preguntas de reflexión en familia
                  </h3>
                  <ol className="space-y-2.5 list-decimal pl-5 reading-prose text-[var(--inst-ink)]">
                    {resolvedDay.preguntasReflexion.map((preg, i) => (
                      <li key={i} className="pl-1">
                        {preg}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeSectionIndex === 7 && (
              <div className="space-y-6">
                {/* Actividad participativa y dinámica grupal */}
                <div className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-canvas)] p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[var(--inst-accent)] font-semibold">
                        Actividad para hacer en familia
                      </p>
                      <h3 className="font-editorial text-xl font-semibold text-[var(--inst-ink)] mt-1">
                        {resolvedDay.actividadParticipativa.titulo}
                      </h3>
                    </div>
                    <Users className="w-5 h-5 text-[var(--inst-primary)] shrink-0" aria-hidden="true" />
                  </div>

                  <p className="reading-prose text-[var(--inst-ink)]">
                    {resolvedDay.actividadParticipativa.descripcion}
                  </p>

                  <div className="pt-3 border-t border-[var(--inst-border)] space-y-1.5">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--inst-muted)]">
                      Dinámica familiar sugerida
                    </h4>
                    <p className="text-sm sm:text-base text-[var(--inst-ink)] leading-relaxed">
                      {resolvedDay.actividadParticipativa.dinamicaGrupal}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--inst-border)] space-y-1.5">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--inst-muted)]">
                      Compromiso navideño propuesto
                    </h4>
                    <p className="text-sm sm:text-base font-medium text-[var(--inst-primary)] leading-relaxed">
                      {resolvedDay.actividadParticipativa.compromisoPropuesto}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onToggleActivityCompleted(selectedDay)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isActivityDone
                          ? 'bg-[var(--inst-primary)] text-white'
                          : 'border border-[var(--inst-border)] bg-[var(--inst-surface)] text-[var(--inst-ink)] hover:border-[var(--inst-primary)]'
                      }`}
                    >
                      {isActivityDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>Actividad familiar completada</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" aria-hidden="true" />
                          <span>Marcar actividad como realizada</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Formulario para dejar compromiso en el Muro Familiar */}
                <form
                  onSubmit={handleSubmitCompromiso}
                  className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] p-5 space-y-4 no-print"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquareHeart
                      className="w-5 h-5 text-[var(--inst-secondary)] shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                      Comparte tu compromiso o mensaje de Navidad
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                        Nombre o integrante
                      </label>
                      <input
                        type="text"
                        required
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        placeholder="Ej. Ciro, Tía Martha o Primos Garrido"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)] focus:outline-none focus:border-[var(--inst-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                        En casa soy...
                      </label>
                      <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value as CommunityMessage['rol'])}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)] focus:outline-none focus:border-[var(--inst-primary)]"
                      >
                        <option value="Mamá / Papá">Mamá / Papá</option>
                        <option value="Hijo / Hija">Hijo / Hija</option>
                        <option value="Abuelos / Tíos">Abuelos / Tíos</option>
                        <option value="Familiar / Amigo">Familiar / Amigo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                      Mensaje de {resolvedDay.valorDelDia.toLowerCase()} o compromiso personal
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={compromisoTexto}
                      onChange={(e) => setCompromisoTexto(e.target.value)}
                      placeholder="Escribe un propósito navideño o mensaje de cariño para la familia Garrido Rocha..."
                      className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)] focus:outline-none focus:border-[var(--inst-primary)]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                      style={{ backgroundColor: 'var(--inst-primary)' }}
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Publicar en el Muro Familiar</span>
                    </button>

                    {compromisoEnviado && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--inst-primary)]">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        ¡Compromiso guardado en el muro familiar!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}
          </article>

          {/* Navegación inferior entre secciones y días */}
          <div className="pt-6 border-t border-[var(--inst-border)] flex flex-wrap items-center justify-between gap-3 no-print">
            <button
              type="button"
              onClick={handlePrevSection}
              disabled={activeSectionIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--inst-border)] text-sm font-medium text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>Sección anterior</span>
            </button>

            <div className="flex items-center gap-2">
              {activeSectionIndex < SECCIONES_DIA.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextSection}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'var(--inst-primary)' }}
                >
                  <span>Siguiente sección</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onToggleDayCompleted(selectedDay)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer whitespace-nowrap"
                  style={{
                    backgroundColor: isDayDone ? 'var(--inst-accent)' : 'var(--inst-primary)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isDayDone
                      ? `Día ${selectedDay} completado`
                      : `Finalizar y marcar Día ${selectedDay}`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
