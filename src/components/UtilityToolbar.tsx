import React from 'react';
import { Volume2, VolumeX, Type, Minus, Plus } from 'lucide-react';

interface UtilityToolbarProps {
  completedCount: number;
  bgMusicPlaying: boolean;
  onToggleBgMusic: () => void;
  fontSizeScale: number;
  onChangeFontScale: (delta: number) => void;
}

/**
 * Barra operativa unificada debajo del encabezado:
 * Progreso de la Novena, música navideña de fondo y control de tamaño de lectura.
 */
export const UtilityToolbar: React.FC<UtilityToolbarProps> = ({
  completedCount,
  bgMusicPlaying,
  onToggleBgMusic,
  fontSizeScale,
  onChangeFontScale,
}) => {
  const progressPct = Math.round((completedCount / 9) * 100);
  const scalePct = Math.round(fontSizeScale * 100);

  return (
    <div className="bg-[var(--inst-surface)] border-b border-[var(--inst-border)] no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Progreso general de los 9 días */}
        <div className="flex items-center gap-3 min-w-[220px] flex-1 max-w-md">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-[var(--inst-muted)] mb-1">
              <span className="font-medium text-[var(--inst-ink)]">Progreso de la Novena</span>
              <span className="font-mono-tabular">
                {completedCount}/9 días ({progressPct}%)
              </span>
            </div>
            <div
              className="h-2 w-full rounded-full bg-[var(--inst-surface-alt)] overflow-hidden"
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={9}
              aria-label="Progreso de los nueve días de la Novena"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: 'var(--inst-primary)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Controles de audio ambiental y accesibilidad de texto */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={onToggleBgMusic}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
              bgMusicPlaying
                ? 'border-[var(--inst-primary)] bg-[var(--inst-primary)]/10 text-[var(--inst-primary)]'
                : 'border-[var(--inst-border)] bg-[var(--inst-canvas)] text-[var(--inst-muted)] hover:text-[var(--inst-ink)]'
            }`}
            aria-pressed={bgMusicPlaying}
          >
            {bgMusicPlaying ? (
              <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{bgMusicPlaying ? 'Música de fondo: Activa' : 'Música navideña'}</span>
          </button>

          <div
            className="inline-flex items-center border border-[var(--inst-border)] rounded-lg bg-[var(--inst-canvas)] overflow-hidden"
            role="group"
            aria-label="Tamaño de lectura del texto"
          >
            <span className="px-2.5 text-xs text-[var(--inst-muted)] hidden sm:inline-flex items-center gap-1 border-r border-[var(--inst-border)] py-1.5">
              <Type className="w-3.5 h-3.5" aria-hidden="true" />
              Texto
            </span>
            <button
              type="button"
              onClick={() => onChangeFontScale(-0.1)}
              disabled={fontSizeScale <= 0.85}
              className="px-2.5 py-1.5 text-xs font-semibold text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] disabled:opacity-40 cursor-pointer min-h-[36px] flex items-center"
              aria-label="Disminuir tamaño del texto"
              title="Disminuir texto"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono-tabular text-[var(--inst-muted)] min-w-[42px] text-center">
              {scalePct}%
            </span>
            <button
              type="button"
              onClick={() => onChangeFontScale(0.1)}
              disabled={fontSizeScale >= 1.35}
              className="px-2.5 py-1.5 text-xs font-semibold text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] disabled:opacity-40 cursor-pointer min-h-[36px] flex items-center"
              aria-label="Aumentar tamaño del texto"
              title="Aumentar texto"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
