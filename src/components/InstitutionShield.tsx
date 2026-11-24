import React from 'react';

interface InstitutionShieldProps {
  escudoUrl?: string;
  nombreInstitucion: string;
  size?: 'sm' | 'md' | 'lg';
}

export const InstitutionShield: React.FC<InstitutionShieldProps> = ({
  escudoUrl,
  nombreInstitucion,
  size = 'md',
}) => {
  const dimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';

  if (escudoUrl && escudoUrl.trim().length > 0) {
    return (
      <div
        className={`${dimensions} rounded-lg overflow-hidden border border-[var(--inst-border)] bg-white flex items-center justify-center shrink-0`}
      >
        <img
          src={escudoUrl}
          alt={`Emblema de ${nombreInstitucion}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-1"
        />
      </div>
    );
  }

  // Emblema familiar navideño SVG (hogar bajo la estrella de Belén) adaptable a los colores elegidos
  return (
    <div
      className={`${dimensions} shrink-0 flex items-center justify-center`}
      aria-label={`Emblema familiar de ${nombreInstitucion}`}
    >
      <svg
        viewBox="0 0 64 72"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10H56V37C56 53 32 65 32 65C32 65 8 53 8 37V10Z"
          fill="var(--inst-primary)"
          stroke="var(--inst-accent)"
          strokeWidth="3"
        />
        <path
          d="M14 16H50V36C50 48 32 57.5 32 57.5C32 57.5 14 48 14 36V16Z"
          stroke="#FBF9F5"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* Estrella de Belén */}
        <path
          d="M32 19L34.4 25.4L41 27.8L34.4 30.2L32 36.6L29.6 30.2L23 27.8L29.6 25.4L32 19Z"
          fill="#FDE68A"
        />
        {/* Techo de hogar navideño */}
        <path
          d="M20 44L32 35L44 44M24 42.5V51.5H40V42.5"
          stroke="#FBF9F5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 45.5C32 45.5 28.5 47.5 28.5 49.5C28.5 50.8 29.6 51.5 30.8 51.5C31.5 51.5 32 51.1 32 51.1C32 51.1 32.5 51.5 33.2 51.5C34.4 51.5 35.5 50.8 35.5 49.5C35.5 47.5 32 45.5 32 45.5Z"
          fill="#FCA5A5"
        />
      </svg>
    </div>
  );
};
