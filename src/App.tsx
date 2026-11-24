import { useEffect, useMemo, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import {
  getActiveNovenaDay,
  InstitutionConfig,
} from './config/institutionConfig';
import { VillancicoItem } from './data/villancicos';
import {
  CommunityMessage,
  CustomDayEdit,
  getDefaultState,
  loadNovenaState,
  NovenaPersistentState,
  saveNovenaState,
} from './utils/storage';
import { holidayAudio } from './utils/audioEngine';
import { AppView, Header } from './components/Header';
import { UtilityToolbar } from './components/UtilityToolbar';
import { HomeView } from './components/HomeView';
import { DayReaderView } from './components/DayReaderView';
import { VillancicosView } from './components/VillancicosView';
import { CommunityView } from './components/CommunityView';
import { AdminPanel } from './components/AdminPanel';
import { CelebrationBurst } from './components/CelebrationBurst';
import { Footer } from './components/Footer';

export default function App() {
  const [state, setState] = useState<NovenaPersistentState>(() => loadNovenaState());
  const [activeView, setActiveView] = useState<AppView>('inicio');
  const [adminOpen, setAdminOpen] = useState(false);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(false);
  const [celebratingDay, setCelebratingDay] = useState<number | null>(null);
  const [celebrationBurstActive, setCelebrationBurstActive] = useState(false);

  const activeDayInfo = useMemo(
    () => getActiveNovenaDay(state.institutionConfig),
    [state.institutionConfig]
  );

  const [selectedDay, setSelectedDay] = useState<number>(() => activeDayInfo.day);

  // Persistir automáticamente cada cambio en LocalStorage
  useEffect(() => {
    saveNovenaState(state);
  }, [state]);

  // Aplicar colores institucionales y tamaño de texto como variables CSS en :root
  useEffect(() => {
    const root = document.documentElement;
    const cfg = state.institutionConfig;
    root.style.setProperty('--inst-primary', cfg.colorPrimario);
    root.style.setProperty('--inst-primary-dark', cfg.colorPrimarioOscuro);
    root.style.setProperty('--inst-secondary', cfg.colorSecundario);
    root.style.setProperty('--inst-accent', cfg.colorAcento);
    root.style.setProperty('--reading-scale', String(state.fontSizeScale));
    document.title = `Novena de Navidad · ${cfg.nombreInstitucion}`;
  }, [state.institutionConfig, state.fontSizeScale]);

  useEffect(() => {
    return () => {
      holidayAudio.stopBackgroundMusic();
      holidayAudio.stopTrack();
    };
  }, []);

  const handleSelectDay = (dia: number) => {
    setSelectedDay(dia);
    setActiveView('dia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleDayCompleted = (dia: number) => {
    const alreadyDone = state.completedDays.includes(dia);
    setState((prev) => {
      const nextDays = alreadyDone
        ? prev.completedDays.filter((d) => d !== dia)
        : [...prev.completedDays, dia].sort((a, b) => a - b);
      return { ...prev, completedDays: nextDays };
    });

    if (!alreadyDone) {
      setCelebratingDay(dia);
      setCelebrationBurstActive(true);
      holidayAudio.playCelebrationChime();
    }
  };

  const handleToggleActivityCompleted = (dia: number) => {
    setState((prev) => ({
      ...prev,
      completedActivities: {
        ...prev.completedActivities,
        [dia]: !prev.completedActivities[dia],
      },
    }));
  };

  const handleChangeFontScale = (delta: number) => {
    setState((prev) => {
      const next = Math.round((prev.fontSizeScale + delta) * 100) / 100;
      return {
        ...prev,
        fontSizeScale: Math.max(0.85, Math.min(1.35, next)),
      };
    });
  };

  const handleToggleBgMusic = async () => {
    const next = !bgMusicPlaying;
    setBgMusicPlaying(next);
    await holidayAudio.toggleBackgroundMusic(next, state.institutionConfig.musicaFondoUrl);
  };

  const handleUpdateConfig = (patch: Partial<InstitutionConfig>) => {
    setState((prev) => ({
      ...prev,
      institutionConfig: { ...prev.institutionConfig, ...patch },
    }));
  };

  const handleUpdateDayEdit = (dia: number, patch: CustomDayEdit) => {
    setState((prev) => ({
      ...prev,
      customDayEdits: {
        ...prev.customDayEdits,
        [dia]: { ...(prev.customDayEdits[dia] ?? {}), ...patch },
      },
    }));
  };

  const handleUpdateVillancicos = (list: VillancicoItem[]) => {
    setState((prev) => ({ ...prev, villancicos: list }));
  };

  const handleAttachVillancicoAudio = (id: string, audioDataUrl: string) => {
    setState((prev) => ({
      ...prev,
      villancicos: prev.villancicos.map((v) =>
        v.id === id ? { ...v, audioUrl: audioDataUrl } : v
      ),
    }));
  };

  const handleAddCommunityMessage = (
    msg: Omit<CommunityMessage, 'id' | 'fechaIso'>
  ) => {
    const newMsg: CommunityMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      fechaIso: new Date().toISOString().slice(0, 10),
    };
    setState((prev) => ({
      ...prev,
      communityMessages: [newMsg, ...prev.communityMessages],
    }));
  };

  const handleDeleteCommunityMessage = (id: string) => {
    setState((prev) => ({
      ...prev,
      communityMessages: prev.communityMessages.filter((m) => m.id !== id),
    }));
  };

  const handleImportFullState = (imported: NovenaPersistentState) => {
    setState(imported);
  };

  const handleResetDefaults = () => {
    const def = getDefaultState();
    setState(def);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--inst-canvas)] text-[var(--inst-ink)]">
      {/* Efecto visual de celebración al completar un día */}
      <CelebrationBurst
        active={celebrationBurstActive}
        onComplete={() => setCelebrationBurstActive(false)}
      />

      {/* Aviso celebratorio accesible */}
      {celebratingDay !== null && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-40 max-w-sm rounded-xl border border-[var(--inst-accent)] bg-[var(--inst-surface)] shadow-lg p-4 flex items-start gap-3 no-print"
        >
          <Sparkles className="w-5 h-5 text-[var(--inst-accent)] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 text-sm">
            <p className="font-semibold text-[var(--inst-ink)]">
              ¡Día {celebratingDay} completado!
            </p>
            <p className="text-xs text-[var(--inst-muted)] mt-0.5">
              Has avanzado en la Novena de Navidad ({state.completedDays.length}/9 días realizados).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCelebratingDay(null)}
            className="p-1 text-[var(--inst-muted)] hover:text-[var(--inst-ink)] cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Encabezado principal */}
      <Header
        nombreInstitucion={state.institutionConfig.nombreInstitucion}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Barra operativa: Progreso, Música de fondo y Tamaño de texto */}
      <UtilityToolbar
        completedCount={state.completedDays.length}
        bgMusicPlaying={bgMusicPlaying}
        onToggleBgMusic={() => void handleToggleBgMusic()}
        fontSizeScale={state.fontSizeScale}
        onChangeFontScale={handleChangeFontScale}
      />

      {/* Vistas principales */}
      <div className="flex-1">
        {activeView === 'inicio' && (
          <HomeView
            config={state.institutionConfig}
            activeDayNumber={activeDayInfo.day}
            isAutoDateInSeason={activeDayInfo.isAutoDateInSeason}
            completedDays={state.completedDays}
            onSelectDay={handleSelectDay}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'dia' && (
          <DayReaderView
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            completedDays={state.completedDays}
            onToggleDayCompleted={handleToggleDayCompleted}
            completedActivities={state.completedActivities}
            onToggleActivityCompleted={handleToggleActivityCompleted}
            config={state.institutionConfig}
            customDayEdits={state.customDayEdits}
            customPrayersEdit={state.customPrayersEdit}
            onAddCommunityMessage={handleAddCommunityMessage}
          />
        )}

        {activeView === 'villancicos' && (
          <VillancicosView
            villancicos={state.villancicos}
            onAttachAudio={handleAttachVillancicoAudio}
          />
        )}

        {activeView === 'comunidad' && (
          <CommunityView
            messages={state.communityMessages}
            onAddMessage={handleAddCommunityMessage}
            onDeleteMessage={handleDeleteCommunityMessage}
            customDayEdits={state.customDayEdits}
            onSelectDay={handleSelectDay}
          />
        )}
      </div>

      {/* Pie institucional */}
      <Footer
        nombreInstitucion={state.institutionConfig.nombreInstitucion}
        lemaInstitucional={state.institutionConfig.lemaInstitucional}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Panel de Administración y Personalización */}
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        state={state}
        onUpdateConfig={handleUpdateConfig}
        onUpdateDayEdit={handleUpdateDayEdit}
        onUpdateVillancicos={handleUpdateVillancicos}
        onImportFullState={handleImportFullState}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
