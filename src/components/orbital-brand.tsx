import Image from "next/image";

type OrbitalBrandProps = {
  compact?: boolean;
};

export function OrbitalBrand({ compact = false }: OrbitalBrandProps) {
  return (
    <div className={`orbital-brand ${compact ? "orbital-brand--compact" : ""}`}>
      <div className="orbital-brand__mark" aria-hidden="true">
        <Image
          alt=""
          className="orbital-brand__image"
          height={54}
          src="/brand/header-logo.png"
          width={54}
        />
      </div>
      <div className="orbital-brand__copy">
        <span className="orbital-brand__wordmark">AlphaForge</span>
        <span className="orbital-brand__tag">Investment Intelligence</span>
      </div>
    </div>
  );
}
