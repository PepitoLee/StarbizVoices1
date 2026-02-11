const primaryItems = [
  'Audios creados por expertos',
  'Escucha antes de hablar',
  'Conecta con tu adolescente',
  '3 minutos que transforman',
  'Más de 50 audios disponibles',
  'Para padres que quieren entender',
];

const secondaryItems = [
  'Psicólogos especializados',
  'Acceso inmediato',
  'Emociones · Límites · Digital',
  'Pago único de por vida',
  'Cualquier dispositivo',
  'Nuevos audios cada semana',
];

function Diamond() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="inline-block mx-6 align-middle flex-shrink-0 opacity-50"
      aria-hidden="true"
    >
      <path d="M5 0L10 5L5 10L0 5Z" fill="#C8963E" />
    </svg>
  );
}

export function MarqueeStrip() {
  const repeatedPrimary = [...primaryItems, ...primaryItems];
  const repeatedSecondary = [...secondaryItems, ...secondaryItems];

  return (
    <div className="marquee-band relative overflow-hidden select-none">
      {/* Top decorative border */}
      <div className="marquee-band-border-top" />

      {/* Primary row — large serif, left to right */}
      <div className="marquee-band-row-primary">
        <div className="marquee-track" style={{ animationDuration: '35s' }}>
          {repeatedPrimary.map((text, i) => (
            <span key={i} className="marquee-band-item-primary">
              {text}
              <Diamond />
            </span>
          ))}
        </div>
      </div>

      {/* Secondary row — smaller, right to left (reverse) */}
      <div className="marquee-band-row-secondary">
        <div className="marquee-track-reverse" style={{ animationDuration: '45s' }}>
          {repeatedSecondary.map((text, i) => (
            <span key={i} className="marquee-band-item-secondary">
              {text}
              <span className="inline-block mx-6 w-1 h-1 rounded-full bg-primary/40 align-middle flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="marquee-band-border-bottom" />

      {/* Edge fade masks */}
      <div className="marquee-band-fade-left" />
      <div className="marquee-band-fade-right" />
    </div>
  );
}
