import React from 'react';
import { AppView } from './Header';

interface FooterProps {
  nombreInstitucion: string;
  lemaInstitucional: string;
  onNavigate: (view: AppView) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  nombreInstitucion,
  lemaInstitucional,
  onNavigate,
  onOpenAdmin,
}) => {
  return (
    <footer className="border-t border-[var(--inst-border)] bg-[var(--inst-surface-alt)]/60 mt-16 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-md">
          <p className="font-editorial text-base font-semibold text-[var(--inst-ink)]">
            Novena de Navidad · {nombreInstitucion}
          </p>
          <p className="text-sm text-[var(--inst-muted)]">{lemaInstitucional}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--inst-muted)]">
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="hover:text-[var(--inst-ink)] transition-colors whitespace-nowrap"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => onNavigate('dia')}
            className="hover:text-[var(--inst-ink)] transition-colors whitespace-nowrap"
          >
            Novena (9 Días)
          </button>
          <button
            type="button"
            onClick={() => onNavigate('villancicos')}
            className="hover:text-[var(--inst-ink)] transition-colors whitespace-nowrap"
          >
            Villancicos
          </button>
          <button
            type="button"
            onClick={() => onNavigate('comunidad')}
            className="hover:text-[var(--inst-ink)] transition-colors whitespace-nowrap"
          >
            En Familia
          </button>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="hover:text-[var(--inst-ink)] transition-colors whitespace-nowrap"
          >
            Personalización
          </button>
        </nav>
      </div>
    </footer>
  );
};
