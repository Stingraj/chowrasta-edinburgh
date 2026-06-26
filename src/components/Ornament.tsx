export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="44" height="14" viewBox="0 0 44 14" fill="none" className="text-gold">
        <path d="M1 7 H14" stroke="currentColor" strokeWidth="0.8" />
        <path d="M30 7 H43" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="22" cy="7" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="22" cy="7" r="1" fill="currentColor" />
        <path d="M17 7 L19 5 L19 9 Z" fill="currentColor" />
        <path d="M27 7 L25 5 L25 9 Z" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="text-xs tracking-[0.4em] text-spice uppercase font-sans mb-3">{eyebrow}</p>
      )}
      <h2 className="text-4xl md:text-5xl text-heritage-deep mb-4">{title}</h2>
      <Ornament className="mb-4" />
      {subtitle && (
        <p className="max-w-xl mx-auto font-sans text-base md:text-lg font-normal text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
