import type { ReactNode } from 'react';

interface PlatformHeroProps {
  kicker?: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function PlatformHero({ kicker, title, subtitle, children }: PlatformHeroProps) {
  return (
    <section className="platform-hero">
      <div className="platform-hero-copy">
        {kicker ? <span className="section-kicker">{kicker}</span> : null}
        <h1 className="platform-hero-title">{title}</h1>
        <p className="platform-hero-text">{subtitle}</p>
      </div>
      {children ? <div className="platform-hero-actions">{children}</div> : null}
    </section>
  );
}
