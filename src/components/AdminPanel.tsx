import React, { useState } from 'react';
import {
  X,
  Palette,
  FileText,
  Music,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Check,
} from 'lucide-react';
import {
  INSTITUTIONAL_PALETTES,
  InstitutionConfig,
} from '../config/institutionConfig';
import { APP_IMAGES } from '../config/assets';
import { DIAS_NOVENA } from '../data/novenaTradicional';
import { VillancicoItem } from '../data/villancicos';
import {
  CustomDayEdit,
  NovenaPersistentState,
} from '../utils/storage';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  state: NovenaPersistentState;
  onUpdateConfig: (patch: Partial<InstitutionConfig>) => void;
  onUpdateDayEdit: (dia: number, patch: CustomDayEdit) => void;
  onUpdateVillancicos: (list: VillancicoItem[]) => void;
  onImportFullState: (imported: NovenaPersistentState) => void;
  onResetDefaults: () => void;
}

type AdminTab = 'identidad' | 'textos' | 'audios' | 'respaldo';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  open,
  onClose,
  state,
  onUpdateConfig,
  onUpdateDayEdit,
  onUpdateVillancicos,
  onImportFullState,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('identidad');
  const [editingDay, setEditingDay] = useState<number>(1);
  const [statusMsg, setStatusMsg] = useState<string>('');

  // Campos para agregar nuevo villancico
  const [newCarolTitle, setNewCarolTitle] = useState('');
  const [newCarolLyrics, setNewCarolLyrics] = useState('');

  if (!open) return null;

  const { institutionConfig, customDayEdits, villancicos } = state;
  const baseDay = DIAS_NOVENA.find((d) => d.dia === editingDay) ?? DIAS_NOVENA[0];
  const dayEdit = customDayEdits[editingDay] ?? {};

  const showSavedNotice = (msg: string) => {
    setStatusMsg(msg);
    window.setTimeout(() => setStatusMsg(''), 2800);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'escudoUrl' | 'imagenCentralUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateConfig({ [field]: reader.result });
        showSavedNotice('Imagen familiar actualizada');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUploadToConfig = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'musicaFondoUrl' | 'audioGozosUrl' | 'audioOracionesUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateConfig({ [field]: reader.result });
        showSavedNotice('Archivo de audio cargado correctamente');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomCarol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarolTitle.trim() || !newCarolLyrics.trim()) return;
    const stanzas = newCarolLyrics
      .split(/\n\s*\n/)
      .map((block) =>
        block
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
      )
      .filter((arr) => arr.length > 0);

    const newItem: VillancicoItem = {
      id: `custom-${Date.now()}`,
      titulo: newCarolTitle.trim(),
      subtitulo: 'Villancico familiar personalizado',
      origen: institutionConfig.nombreInstitucion,
      tempoBpm: 100,
      melodyId: 'tutaina',
      audioUrl: '',
      estrofas: stanzas.length > 0 ? stanzas : [[newCarolLyrics.trim()]],
    };
    onUpdateVillancicos([...villancicos, newItem]);
    setNewCarolTitle('');
    setNewCarolLyrics('');
    showSavedNotice('Villancico agregado al repertorio');
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'novena-familia-garrido-rocha.json';
    a.click();
    URL.revokeObjectURL(url);
    showSavedNotice('Configuración exportada en JSON');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as NovenaPersistentState;
        if (parsed && parsed.institutionConfig) {
          onImportFullState(parsed);
          showSavedNotice('Configuración importada correctamente');
        }
      } catch {
        showSavedNotice('El archivo JSON no tiene un formato válido');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Panel de Administración y Personalización"
    >
      <div className="w-full max-w-2xl bg-[var(--inst-canvas)] h-full overflow-y-auto border-l border-[var(--inst-border)] flex flex-col">
        {/* Cabecera del panel */}
        <div className="sticky top-0 z-10 bg-[var(--inst-surface)] border-b border-[var(--inst-border)] px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-editorial text-xl font-semibold text-[var(--inst-ink)]">
              Personalización Familiar
            </h2>
            <p className="text-xs text-[var(--inst-muted)]">
              Los cambios se guardan automáticamente en este navegador y pueden exportarse en JSON.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg border border-[var(--inst-border)] hover:bg-[var(--inst-surface-alt)] cursor-pointer"
            aria-label="Cerrar panel de personalización"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas */}
        <div className="bg-[var(--inst-surface)] border-b border-[var(--inst-border)] px-5 py-2 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'identidad' as AdminTab, label: 'Identidad y Colores', icon: Palette },
            { id: 'textos' as AdminTab, label: 'Reflexiones y Días', icon: FileText },
            { id: 'audios' as AdminTab, label: 'Villancicos y Audios', icon: Music },
            { id: 'respaldo' as AdminTab, label: 'Exportar / Importar', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  active
                    ? 'text-white'
                    : 'text-[var(--inst-muted)] hover:text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)]'
                }`}
                style={active ? { backgroundColor: 'var(--inst-primary)' } : undefined}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {statusMsg && (
          <div className="mx-5 mt-4 px-3.5 py-2 rounded-lg bg-[var(--inst-primary)]/10 border border-[var(--inst-primary)]/30 text-xs font-medium text-[var(--inst-primary)] flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Contenido por pestaña */}
        <div className="p-5 space-y-6 flex-1">
          {activeTab === 'identidad' && (
            <div className="space-y-6">
              <div className="space-y-3 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4">
                <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                  Datos de la familia
                </h3>

                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Nombre de la familia o anfitrión
                  </label>
                  <input
                    type="text"
                    value={institutionConfig.nombreInstitucion}
                    onChange={(e) =>
                      onUpdateConfig({ nombreInstitucion: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Lema o dedicatoria familiar
                  </label>
                  <input
                    type="text"
                    value={institutionConfig.lemaInstitucional}
                    onChange={(e) =>
                      onUpdateConfig({ lemaInstitucional: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Mensaje de bienvenida
                  </label>
                  <textarea
                    rows={3}
                    value={institutionConfig.mensajeBienvenida}
                    onChange={(e) =>
                      onUpdateConfig({ mensajeBienvenida: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Día actual de celebración (indicador de portada)
                  </label>
                  <select
                    value={institutionConfig.diaActualManual ?? ''}
                    onChange={(e) =>
                      onUpdateConfig({
                        diaActualManual: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  >
                    <option value="">Automático según fecha (16 al 24 de diciembre)</option>
                    {DIAS_NOVENA.map((d) => (
                      <option key={d.dia} value={d.dia}>
                        Fijar en Día {d.dia} ({d.fecha})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Colores de la Novena */}
              <div className="space-y-4 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4">
                <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                  Colores navideños
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {INSTITUTIONAL_PALETTES.map((pal) => {
                    const active = institutionConfig.paletaId === pal.id;
                    return (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => {
                          onUpdateConfig({
                            paletaId: pal.id,
                            colorPrimario: pal.primary,
                            colorPrimarioOscuro: pal.primaryDark,
                            colorSecundario: pal.secondary,
                            colorAcento: pal.accent,
                          });
                          showSavedNotice(`Paleta "${pal.nombre}" aplicada`);
                        }}
                        className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                          active
                            ? 'border-[var(--inst-primary)] bg-[var(--inst-surface-alt)]/70'
                            : 'border-[var(--inst-border)] bg-[var(--inst-canvas)]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: pal.primary }}
                          />
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: pal.secondary }}
                          />
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: pal.accent }}
                          />
                        </div>
                        <p className="text-xs font-semibold text-[var(--inst-ink)]">
                          {pal.nombre}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--inst-border)]">
                  <div>
                    <label className="block text-xs text-[var(--inst-muted)] mb-1">
                      Color primario
                    </label>
                    <input
                      type="color"
                      value={institutionConfig.colorPrimario}
                      onChange={(e) =>
                        onUpdateConfig({
                          paletaId: 'custom',
                          colorPrimario: e.target.value,
                          colorPrimarioOscuro: e.target.value,
                        })
                      }
                      className="w-full h-9 rounded border border-[var(--inst-border)] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--inst-muted)] mb-1">
                      Color secundario
                    </label>
                    <input
                      type="color"
                      value={institutionConfig.colorSecundario}
                      onChange={(e) =>
                        onUpdateConfig({
                          paletaId: 'custom',
                          colorSecundario: e.target.value,
                        })
                      }
                      className="w-full h-9 rounded border border-[var(--inst-border)] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--inst-muted)] mb-1">
                      Color dorado / acento
                    </label>
                    <input
                      type="color"
                      value={institutionConfig.colorAcento}
                      onChange={(e) =>
                        onUpdateConfig({
                          paletaId: 'custom',
                          colorAcento: e.target.value,
                        })
                      }
                      className="w-full h-9 rounded border border-[var(--inst-border)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Emblema e imagen central */}
              <div className="space-y-4 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4">
                <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                  Foto familiar e ilustración navideña
                </h3>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[var(--inst-muted)]">
                    Foto o emblema de la familia
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs font-medium cursor-pointer hover:bg-[var(--inst-surface-alt)]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir foto o escudo familiar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleImageUpload(e, 'escudoUrl')}
                      />
                    </label>
                    {institutionConfig.escudoUrl && (
                      <button
                        type="button"
                        onClick={() => onUpdateConfig({ escudoUrl: '' })}
                        className="px-3 py-2 rounded-lg border border-[var(--inst-border)] text-xs text-[var(--inst-muted)] cursor-pointer"
                      >
                        Usar emblema SVG navideño
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--inst-border)]">
                  <label className="block text-xs font-medium text-[var(--inst-muted)]">
                    Imagen central de portada
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Pesebre', src: APP_IMAGES.heroNativity },
                      { label: 'Luz de Belén', src: APP_IMAGES.pesebreLuz },
                      { label: 'Villancicos', src: APP_IMAGES.villancicosMusica },
                      { label: 'Árbol en Familia', src: APP_IMAGES.arbolComunidad },
                    ].map((img) => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => onUpdateConfig({ imagenCentralUrl: img.src })}
                        className={`rounded-lg overflow-hidden border text-left cursor-pointer ${
                          institutionConfig.imagenCentralUrl === img.src
                            ? 'border-[var(--inst-primary)] ring-2 ring-[var(--inst-primary)]/30'
                            : 'border-[var(--inst-border)]'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full h-14 object-cover"
                        />
                        <p className="text-[11px] px-1.5 py-1 truncate text-[var(--inst-ink)]">
                          {img.label}
                        </p>
                      </button>
                    ))}
                  </div>

                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs font-medium cursor-pointer hover:bg-[var(--inst-surface-alt)] mt-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir fotografía familiar propia</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleImageUpload(e, 'imagenCentralUrl')}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'textos' && (
            <div className="space-y-5 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--inst-border)]">
                <div>
                  <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                    Editar textos y actividades por día
                  </h3>
                  <p className="text-xs text-[var(--inst-muted)]">
                    Adapta la reflexión, dinámica o consideración tradicional de cada día.
                  </p>
                </div>

                <select
                  value={editingDay}
                  onChange={(e) => setEditingDay(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm font-medium"
                >
                  {DIAS_NOVENA.map((d) => (
                    <option key={d.dia} value={d.dia}>
                      Día {d.dia} · {d.valorDelDia}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Reflexión o mensaje familiar del Día {editingDay}
                </label>
                <textarea
                  rows={4}
                  value={dayEdit.reflexion ?? baseDay.reflexion}
                  onChange={(e) =>
                    onUpdateDayEdit(editingDay, { reflexion: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Título de la actividad participativa
                </label>
                <input
                  type="text"
                  value={
                    dayEdit.actividadTitulo ??
                    baseDay.actividadParticipativa.titulo
                  }
                  onChange={(e) =>
                    onUpdateDayEdit(editingDay, {
                      actividadTitulo: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Descripción de la actividad
                </label>
                <textarea
                  rows={3}
                  value={
                    dayEdit.actividadDescripcion ??
                    baseDay.actividadParticipativa.descripcion
                  }
                  onChange={(e) =>
                    onUpdateDayEdit(editingDay, {
                      actividadDescripcion: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Dinámica grupal
                </label>
                <textarea
                  rows={3}
                  value={
                    dayEdit.dinamicaGrupal ??
                    baseDay.actividadParticipativa.dinamicaGrupal
                  }
                  onChange={(e) =>
                    onUpdateDayEdit(editingDay, { dinamicaGrupal: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Consideración tradicional del día (párrafos separados por línea en blanco)
                </label>
                <textarea
                  rows={5}
                  value={(dayEdit.consideracion ?? baseDay.consideracion).join('\n\n')}
                  onChange={(e) =>
                    onUpdateDayEdit(editingDay, {
                      consideracion: e.target.value
                        .split(/\n\s*\n/)
                        .map((p) => p.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'audios' && (
            <div className="space-y-6">
              <div className="space-y-4 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4">
                <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                  Audios de fondo y oraciones
                </h3>
                <p className="text-xs text-[var(--inst-muted)]">
                  Puedes cargar archivos MP3/WAV desde tu computador o definir rutas en <code className="font-mono-tabular">public/audio/</code>. Si no hay archivo asignado, la aplicación reproduce música navideña integrada.
                </p>

                {[
                  {
                    label: 'Música navideña de fondo',
                    field: 'musicaFondoUrl' as const,
                    value: institutionConfig.musicaFondoUrl,
                  },
                  {
                    label: 'Audio para los Gozos',
                    field: 'audioGozosUrl' as const,
                    value: institutionConfig.audioGozosUrl,
                  },
                  {
                    label: 'Audio para oraciones (opcional)',
                    field: 'audioOracionesUrl' as const,
                    value: institutionConfig.audioOracionesUrl,
                  },
                ].map((item) => (
                  <div key={item.field} className="space-y-1.5">
                    <label className="block text-xs font-medium text-[var(--inst-muted)]">
                      {item.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.value.startsWith('data:') ? '(Audio local cargado)' : item.value}
                        onChange={(e) =>
                          onUpdateConfig({ [item.field]: e.target.value })
                        }
                        placeholder="./audio/archivo.mp3"
                        className="flex-1 px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs font-medium cursor-pointer whitespace-nowrap">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir MP3</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="sr-only"
                          onChange={(e) => handleAudioUploadToConfig(e, item.field)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agregar nuevo villancico */}
              <form
                onSubmit={handleAddCustomCarol}
                className="space-y-3 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-4"
              >
                <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                  Agregar villancico familiar
                </h3>
                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Título del villancico
                  </label>
                  <input
                    type="text"
                    value={newCarolTitle}
                    onChange={(e) => setNewCarolTitle(e.target.value)}
                    placeholder="Ej. Mi Burrito Sabanero"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                    Letra (separa cada estrofa con una línea en blanco)
                  </label>
                  <textarea
                    rows={4}
                    value={newCarolLyrics}
                    onChange={(e) => setNewCarolLyrics(e.target.value)}
                    placeholder="Con mi burrito sabanero voy camino de Belén..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: 'var(--inst-primary)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir villancico al repertorio</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'respaldo' && (
            <div className="space-y-4 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-5">
              <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                Respaldo, traslado entre equipos y GitHub Pages
              </h3>
              <p className="text-sm text-[var(--inst-muted)] leading-relaxed">
                Exporta toda tu configuración familiar (colores, nombre, foto, reflexiones editadas y mensajes) en un archivo JSON para compartirlo con otros familiares o restaurarlo cuando lo necesites. Para cambios permanentes en el repositorio de GitHub, edita el archivo centralizado{' '}
                <code className="font-mono-tabular text-xs bg-[var(--inst-surface-alt)] px-1.5 py-0.5 rounded">
                  src/config/institutionConfig.ts
                </code>
                .
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: 'var(--inst-primary)' }}
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar configuración (.json)</span>
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-xs font-semibold text-[var(--inst-ink)] cursor-pointer hover:bg-[var(--inst-surface-alt)]">
                  <Upload className="w-4 h-4" />
                  <span>Importar configuración (.json)</span>
                  <input
                    type="file"
                    accept="application/json"
                    className="sr-only"
                    onChange={handleImportJson}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    onResetDefaults();
                    showSavedNotice('Valores restaurados a la configuración inicial');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--inst-secondary)]/40 text-xs font-semibold text-[var(--inst-secondary)] hover:bg-[var(--inst-secondary)]/10 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restaurar valores iniciales</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
