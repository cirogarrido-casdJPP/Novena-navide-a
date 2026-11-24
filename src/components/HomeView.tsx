import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  BookOpen,
  Music,
  Users,
  CalendarDays,
} from 'lucide-react';
import { InstitutionConfig } from '../config/institutionConfig';
import { APP_IMAGES } from '../config/assets';
import { DIAS_NOVENA } from '../data/novenaTradicional';
import { InstitutionShield } from './InstitutionShield';
import {
  ChristmasLightsGarland,
  ChristmasMotifIcon,
  NativityOrnamentDivider,
} from './ChristmasDecorations';
import { AppView } from './Header';

interface HomeViewProps {
  config: InstitutionConfig;
  activeDayNumber: number;
  isAutoDateInSeason: boolean;
  completedDays: number[];
  onSelectDay: (dia: number) => void;
  onNavigate: (view: AppView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  config,
  activeDayNumber,
  isAutoDateInSeason,
  completedDays,
  onSelectDay,
  onNavigate,
}) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const currentDayData = DIAS_NOVENA.find((d) => d.dia === activeDayNumber) ?? DIAS_NOVENA[0];

  return (
    <div>
      {/* Guirnalda navideña superior sutil */}
      <ChristmasLightsGarland />

      {/* Hero Editorial Familiar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Columna de identidad familiar y bienvenida */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                <InstitutionShield
                  escudoUrl={config.escudoUrl}
                  nombreInstitucion={config.nombreInstitucion}
                  size="md"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--inst-primary)]">
                    {config.nombreInstitucion}
                  </p>
                  <p className="text-xs text-[var(--inst-muted)]">
                    {config.lemaInstitucional}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-[var(--inst-muted)] font-medium">
                  Celebración Familiar · 16 al 24 de diciembre
                </p>
                <h1 className="font-editorial text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--inst-ink)] leading-[1.1] text-balance">
                  Novena de Navidad
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[var(--inst-muted)] leading-relaxed max-w-xl">
                {config.mensajeBienvenida}
              </p>
            </div>

            {/* Indicador visual del día actual de celebración y CTA principal */}
            <div className="border border-[var(--inst-border)] bg-[var(--inst-surface)] rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--inst-accent)]">
                    <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {isAutoDateInSeason
                        ? 'Celebración sugerida para hoy'
                        : 'Día activo de celebración'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentDayData.fecha}</span>
                  </div>
                  <h2 className="font-editorial text-xl font-semibold text-[var(--inst-ink)]">
                    Día {currentDayData.dia}: {currentDayData.titulo}
                  </h2>
                  <p className="text-xs text-[var(--inst-muted)]">
                    Valor del día: {currentDayData.valorDelDia}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectDay(currentDayData.dia)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-transform active:scale-[0.99] cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'var(--inst-primary)' }}
                >
                  <span>Iniciar Día {currentDayData.dia}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('villancicos')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Music className="w-4 h-4 shrink-0 text-[var(--inst-secondary)]" aria-hidden="true" />
                  <span>Ir a Villancicos</span>
                </button>
              </div>
            </div>
          </div>

          {/* Columna de ilustración central navideña */}
          <div className="lg:col-span-6 flex flex-col">
            <figure className="relative flex-1 rounded-xl overflow-hidden border border-[var(--inst-border)] bg-[var(--inst-surface-alt)] min-h-[280px]">
              {!heroImgError ? (
                <img
                  src={config.imagenCentralUrl || APP_IMAGES.heroNativity}
                  alt="Ilustración navideña del pesebre bajo la estrella de Belén"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover lg:h-full"
                />
              ) : (
                <div
                  className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 text-center text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--inst-primary) 0%, var(--inst-secondary) 100%)',
                  }}
                >
                  <ChristmasMotifIcon motif="star" className="w-14 h-14 text-amber-200 mb-3" />
                  <p className="font-editorial text-2xl font-semibold">Novena de Navidad</p>
                  <p className="text-sm text-white/80 mt-1">{config.nombreInstitucion}</p>
                </div>
              )}
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-5 py-4 text-white">
                <p className="text-xs font-medium tracking-wide text-amber-200">
                  Pesebre Familiar · {config.nombreInstitucion}
                </p>
                <p className="text-sm text-white/95">
                  Un encuentro de fe, tradición y alegría para compartir en casa con quienes amamos.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Divisor ornamental con Estrella de Belén */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <NativityOrnamentDivider label="Recorrido de los Nueve Días" />
      </div>

      {/* Cuadrícula interactiva de los 9 días */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6" aria-labelledby="titulo-nueve-dias">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="titulo-nueve-dias"
              className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--inst-ink)]"
            >
              Los nueve días de la Novena en familia
            </h2>
            <p className="text-sm text-[var(--inst-muted)] mt-1">
              Elige cualquier día para leer las oraciones tradicionales completas, cantar los gozos y hacer la actividad en casa.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--inst-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <ChristmasMotifIcon motif="manger" className="w-4 h-4 text-[var(--inst-accent)]" />
              Pesebre
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ChristmasMotifIcon motif="tree" className="w-4 h-4 text-[var(--inst-primary)]" />
              Árbol
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ChristmasMotifIcon motif="bells" className="w-4 h-4 text-[var(--inst-secondary)]" />
              Campanas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIAS_NOVENA.map((dia) => {
            const isCompleted = completedDays.includes(dia.dia);
            const isCurrent = dia.dia === activeDayNumber;

            return (
              <button
                key={dia.dia}
                type="button"
                onClick={() => onSelectDay(dia.dia)}
                className={`group text-left rounded-xl border p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--inst-primary)] ${
                  isCurrent
                    ? 'border-[var(--inst-primary)] bg-[var(--inst-surface)] ring-1 ring-[var(--inst-primary)]/25'
                    : 'border-[var(--inst-border)] bg-[var(--inst-surface)] hover:border-[var(--inst-primary)]/60'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--inst-muted)]">
                    <span className="font-mono-tabular font-semibold text-[var(--inst-ink)]">
                      Día {dia.dia} · {dia.fecha}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[var(--inst-primary)]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Realizado
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[var(--inst-accent)]">
                        <Star className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Día actual
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[var(--inst-muted)]">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        Disponible
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)] group-hover:text-[var(--inst-primary)] transition-colors leading-snug">
                    {dia.titulo}
                  </h3>

                  <p className="text-xs text-[var(--inst-muted)]">
                    Valor: <strong className="font-medium text-[var(--inst-ink)]">{dia.valorDelDia}</strong>
                    <span aria-hidden="true"> · </span>
                    {dia.actividadParticipativa.titulo}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--inst-border)] flex items-center justify-between text-xs font-medium text-[var(--inst-primary)]">
                  <span>Abrir celebración completa</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sección secundaria: Villancicos y Participación Familiar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-44 h-44 sm:h-auto shrink-0 bg-[var(--inst-surface-alt)]">
              <img
                src={APP_IMAGES.villancicosMusica}
                alt="Instrumentos navideños y partituras de villancicos"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[var(--inst-secondary)]">
                  Cancionero y reproductor integrado
                </p>
                <h3 className="font-editorial text-xl font-semibold text-[var(--inst-ink)]">
                  Villancicos para Cantar en Casa
                </h3>
                <p className="text-sm text-[var(--inst-muted)] leading-relaxed">
                  Letras completas y música navideña para acompañar cada noche frente al pesebre familiar.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('villancicos')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--inst-primary)] hover:underline cursor-pointer"
                >
                  <span>Abrir repertorio</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-44 h-44 sm:h-auto shrink-0 bg-[var(--inst-surface-alt)]">
              <img
                src={APP_IMAGES.arbolComunidad}
                alt="Árbol de Navidad y familia reunida"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[var(--inst-primary)]">
                  Unión, amor y propósitos de hogar
                </p>
                <h3 className="font-editorial text-xl font-semibold text-[var(--inst-ink)]">
                  Muro Familiar de Navidad
                </h3>
                <p className="text-sm text-[var(--inst-muted)] leading-relaxed">
                  Un espacio para que padres, hijos, abuelos, tíos y amigos dejen sus mensajes y compromisos navideños.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('comunidad')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--inst-primary)] hover:underline cursor-pointer"
                >
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>Ir al muro familiar</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
