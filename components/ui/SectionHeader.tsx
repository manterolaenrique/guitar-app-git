interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ kicker, title, description }: SectionHeaderProps) {
  return (
    <header className="platform-section-header">
      <div>
        {kicker ? <span className="section-kicker">{kicker}</span> : null}
        <h2 className="platform-section-title">{title}</h2>
      </div>
      {description ? <p className="platform-section-text">{description}</p> : null}
    </header>
  );
}
