import React, { useState } from 'react';
import { Menu, X, SlidersHorizontal } from 'lucide-react';

export type AppView = 'inicio' | 'dia' | 'villancicos' | 'comunidad';

interface HeaderProps {
  nombreInstitucion: string;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAdmin: () => void;
}

/**
 * Barra de navegación superior de tres zonas:
 * [Título institucional en 1 línea] — [4 enlaces limpios] — [1 acción principal: Personalizar]
 */
export const Header: React.FC<HeaderProps> = ({
  nombreInstitucion,
  activeView,
  onNavigate,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppView; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'dia', label: 'Los 9 Días' },
    { id: 'villancicos', label: 'Villancicos' },
    { id: 'comunidad', label: 'En Familia' },
  ];

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--inst-canvas)]/95 backdrop-blur-sm border-b border-[var(--inst-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Título de marca en una línea */}
        <button
          type="button"
          onClick={() => handleNavClick('inicio')}
          className="font-editorial text-lg font-semibold tracking-tight text-[var(--inst-ink)] hover:text-[var(--inst-primary)] transition-colors whitespace-nowrap shrink-0 truncate max-w-[210px] sm:max-w-xs text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--inst-primary)] rounded"
          title={nombreInstitucion}
        >
          {nombreInstitucion}
        </button>

        {/* Zona 2: Enlaces de navegación de una sola línea */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--inst-primary)] ${
                  isActive
                    ? 'border-[var(--inst-primary)] text-[var(--inst-primary)] font-semibold'
                    : 'border-transparent text-[var(--inst-muted)] hover:text-[var(--inst-ink)] hover:border-[var(--inst-border)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zona 3: Acción principal única + menú móvil */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--inst-primary)]"
            style={{ backgroundColor: 'var(--inst-primary)' }}
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Personalizar</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-[var(--inst-border)] text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--inst-border)] bg-[var(--inst-surface)] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--inst-surface-alt)] text-[var(--inst-primary)] font-semibold'
                    : 'text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
