import React from 'react';

/**
 * Guirnalda sutil de luces navideñas para encabezar la portada sin recargar la lectura.
 */
export const ChristmasLightsGarland: React.FC = () => {
  const bulbs = [
    { x: 40, y: 17, color: '#D97706', delay: false },
    { x: 110, y: 22, color: 'var(--inst-secondary)', delay: true },
    { x: 180, y: 18, color: 'var(--inst-primary)', delay: false },
    { x: 250, y: 22, color: '#D97706', delay: true },
    { x: 320, y: 17, color: 'var(--inst-secondary)', delay: false },
    { x: 390, y: 22, color: 'var(--inst-primary)', delay: true },
    { x: 460, y: 18, color: '#D97706', delay: false },
    { x: 530, y: 22, color: 'var(--inst-secondary)', delay: true },
    { x: 600, y: 17, color: 'var(--inst-primary)', delay: false },
    { x: 670, y: 22, color: '#D97706', delay: true },
    { x: 740, y: 18, color: 'var(--inst-secondary)', delay: false },
    { x: 810, y: 22, color: 'var(--inst-primary)', delay: true },
    { x: 880, y: 17, color: '#D97706', delay: false },
    { x: 950, y: 22, color: 'var(--inst-secondary)', delay: true },
    { x: 1020, y: 18, color: 'var(--inst-primary)', delay: false },
    { x: 1090, y: 22, color: '#D97706', delay: true },
    { x: 1160, y: 17, color: 'var(--inst-secondary)', delay: false },
  ];

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 34"
        className="w-full h-7 text-[var(--inst-border)]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 10 Q 75 26 150 12 T 300 12 T 450 12 T 600 12 T 750 12 T 900 12 T 1050 12 T 1200 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {bulbs.map((bulb, i) => (
          <g key={i} className={bulb.delay ? 'animate-twinkle-delay' : 'animate-twinkle'}>
            <rect x={bulb.x - 2} y={bulb.y - 6} width="4" height="4" rx="1" fill="#78716C" />
            <ellipse cx={bulb.x} cy={bulb.y + 1} rx="4.5" ry="6" fill={bulb.color} />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Motivos navideños ilustrativos en SVG limpio (Estrella de Belén, Campanas, Árbol y Pesebre).
 */
export const NativityOrnamentDivider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex items-center gap-4 my-6" aria-hidden={!label}>
    <div className="h-px flex-1 bg-[var(--inst-border)]" />
    <div className="flex items-center gap-2.5 text-[var(--inst-accent)]">
      <svg className="w-5 h-5 animate-star-glow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" />
      </svg>
      {label && (
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--inst-muted)]">
          {label}
        </span>
      )}
    </div>
    <div className="h-px flex-1 bg-[var(--inst-border)]" />
  </div>
);

export const ChristmasMotifIcon: React.FC<{
  motif: 'star' | 'tree' | 'bells' | 'manger';
  className?: string;
}> = ({ motif, className = 'w-6 h-6' }) => {
  if (motif === 'star') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2L14.4 9.2L21.5 11.5L14.4 13.8L12 21L9.6 13.8L2.5 11.5L9.6 9.2L12 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (motif === 'tree') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 3L6 11H9.5L5 17H19L14.5 11H18L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 17V21M9.5 21H14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (motif === 'bells') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M10 4C7.5 4.8 6 7 6 10V14L4 16H16L14 14V10C14 7 12.5 4.8 10 4Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 5.5C17.2 6.5 18.2 8.2 18.2 10.5V14L20 16H17.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.5 16.5C8.8 17.5 9.5 18 10.2 18C11 18 11.7 17.5 12 16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  // Pesebre
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 10L12 4L21 10M5 10V20H19V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 15.5C9.5 17 14.5 17 15.5 15.5M12 12.5A1.5 1.5 0 1 0 12 9.5A1.5 1.5 0 0 0 12 12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};
