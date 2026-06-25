interface LogoProps {
  light?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function Logo({ light = false, size = "md", showText = true, className = "" }: LogoProps) {
  const logoSrc = "/images/logo/chowrasta-logo.png";

  const sizeClasses = {
    sm: "h-10 w-10 md:h-12 md:w-12",
    md: "h-14 w-14 md:h-16 md:w-16",
    lg: "h-20 w-20 md:h-24 md:w-24",
    xl: "h-28 w-28 md:h-32 md:w-32",
  };

  const textClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl",
  };

  const main = light ? "text-cream" : "text-heritage-deep";
  const sub = light ? "text-gold-soft" : "text-spice";

  return (
    <div className={`flex items-center gap-3.5 leading-none ${className}`}>
      <img
        src={logoSrc}
        alt="Chowrasta Logo"
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gold/60 shadow-lg bg-heritage-deep`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display tracking-[0.18em] ${textClasses[size]} ${main}`}>
            CHOWRASTA
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-px w-4 bg-gold" />
            <span className={`text-[0.6rem] tracking-[0.35em] uppercase ${sub}`}>Edinburgh</span>
            <span className="h-px w-4 bg-gold" />
          </div>
        </div>
      )}
    </div>
  );
}
