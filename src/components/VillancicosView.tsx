import React, { useEffect, useState } from 'react';
import { Play, Square, Volume2, Music, Upload } from 'lucide-react';
import { VillancicoItem } from '../data/villancicos';
import { APP_IMAGES } from '../config/assets';
import { holidayAudio } from '../utils/audioEngine';

interface VillancicosViewProps {
  villancicos: VillancicoItem[];
  onAttachAudio: (villancicoId: string, audioDataUrl: string) => void;
}

export const VillancicosView: React.FC<VillancicosViewProps> = ({
  villancicos,
  onAttachAudio,
}) => {
  const [selectedId, setSelectedId] = useState<string>(villancicos[0]?.id ?? '');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [sourceNote, setSourceNote] = useState('');

  const selected =
    villancicos.find((v) => v.id === selectedId) ?? villancicos[0];

  useEffect(() => {
    return () => {
      holidayAudio.stopTrack();
    };
  }, []);

  const handlePlayToggle = async (item: VillancicoItem) => {
    if (playingId === item.id) {
      holidayAudio.stopTrack();
      setPlayingId(null);
      setProgress(0);
      setSourceNote('');
      return;
    }

    setSelectedId(item.id);
    setPlayingId(item.id);
    setProgress(0);
    holidayAudio.setTrackVolume(volume);

    const res = await holidayAudio.playTrack(
      item.audioUrl,
      item.melodyId,
      (pct, usingSynth) => {
        setProgress(pct);
        setSourceNote(
          usingSynth
            ? 'Reproduciendo melodía navideña integrada'
            : 'Reproduciendo archivo de audio local'
        );
      },
      () => {
        setPlayingId(null);
        setProgress(0);
      }
    );

    setSourceNote(
      res.usingSynth
        ? 'Reproduciendo melodía navideña integrada'
        : 'Reproduciendo archivo de audio local'
    );
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    holidayAudio.setTrackVolume(val);
  };

  const handleLocalAudioFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    villancicoId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAttachAudio(villancicoId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!selected) return null;

  const isSelectedPlaying = playingId === selected.id;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Encabezado de sección */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-[var(--inst-secondary)] font-semibold">
            Cancionero Navideño Familiar
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--inst-ink)] text-balance">
            Villancicos para cantar en casa
          </h1>
          <p className="text-base text-[var(--inst-muted)] leading-relaxed max-w-xl">
            Reproduce cada villancico con acompañamiento musical integrado o carga tus propios archivos de audio (<code className="text-xs font-mono-tabular">.mp3</code> / <code className="text-xs font-mono-tabular">.wav</code>) para cantar en familia alrededor del pesebre.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden border border-[var(--inst-border)] h-52 lg:h-full">
            <img
              src={APP_IMAGES.villancicosMusica}
              alt="Campanas, guitarra, maracas y partituras de villancicos navideños"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Selector de repertorio y letra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-2.5">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--inst-muted)] px-1">
            Repertorio disponible ({villancicos.length})
          </h2>
          <div className="space-y-2">
            {villancicos.map((item) => {
              const active = item.id === selected.id;
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3.5 transition-colors flex items-center justify-between gap-3 ${
                    active
                      ? 'border-[var(--inst-primary)] bg-[var(--inst-surface)]'
                      : 'border-[var(--inst-border)] bg-[var(--inst-surface)] hover:border-[var(--inst-primary)]/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className="text-left flex-1 min-w-0 cursor-pointer"
                  >
                    <p
                      className={`font-editorial text-base font-semibold truncate ${
                        active ? 'text-[var(--inst-primary)]' : 'text-[var(--inst-ink)]'
                      }`}
                    >
                      {item.titulo}
                    </p>
                    <p className="text-xs text-[var(--inst-muted)] truncate">
                      {item.subtitulo}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => void handlePlayToggle(item)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 cursor-pointer"
                    style={{
                      backgroundColor: isPlaying
                        ? 'var(--inst-secondary)'
                        : 'var(--inst-primary)',
                    }}
                    aria-label={isPlaying ? `Detener ${item.titulo}` : `Reproducir ${item.titulo}`}
                  >
                    {isPlaying ? (
                      <Square className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="lg:col-span-8 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--inst-border)]">
            <div>
              <p className="text-xs text-[var(--inst-muted)]">{selected.origen}</p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--inst-ink)] mt-0.5">
                {selected.titulo}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => void handlePlayToggle(selected)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: isSelectedPlaying
                    ? 'var(--inst-secondary)'
                    : 'var(--inst-primary)',
                }}
              >
                {isSelectedPlaying ? (
                  <>
                    <Square className="w-4 h-4" aria-hidden="true" />
                    <span>Detener</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>Reproducir</span>
                  </>
                )}
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs font-medium text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] cursor-pointer whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Cargar MP3</span>
                <input
                  type="file"
                  accept="audio/*"
                  className="sr-only"
                  onChange={(e) => handleLocalAudioFile(e, selected.id)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-canvas)] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[var(--inst-muted)]">
                <Music className="w-4 h-4 text-[var(--inst-primary)]" aria-hidden="true" />
                <span>
                  {isSelectedPlaying
                    ? sourceNote || 'Reproduciendo...'
                    : 'Listo para reproducir (audio local o melodía integrada)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[var(--inst-muted)]" aria-hidden="true" />
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  aria-label="Volumen del villancico"
                  className="w-24 accent-[var(--inst-primary)] cursor-pointer"
                />
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-[var(--inst-surface-alt)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${isSelectedPlaying ? progress : 0}%`,
                  backgroundColor: 'var(--inst-primary)',
                }}
              />
            </div>
          </div>

          <div className="max-w-prose space-y-6">
            {selected.coro && selected.coro.length > 0 && (
              <div className="rounded-xl border border-[var(--inst-accent)]/40 bg-[var(--inst-surface-alt)]/60 p-4 sm:p-5 space-y-1">
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--inst-accent)] mb-2">
                  Coro
                </p>
                {selected.coro.map((line, i) => (
                  <p
                    key={i}
                    className="reading-prose font-editorial italic font-medium text-[var(--inst-ink)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-5">
              {selected.estrofas.map((estrofa, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs font-mono-tabular font-semibold text-[var(--inst-muted)]">
                    Estrofa {idx + 1}
                  </p>
                  {estrofa.map((linea, j) => (
                    <p key={j} className="reading-prose text-[var(--inst-ink)]">
                      {linea}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
