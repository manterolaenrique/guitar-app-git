import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface LinkCardProps {
  href?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  label?: string;
  status?: 'Disponible' | 'Próximamente';
}

export function LinkCard({ href, icon: Icon, title, description, label, status = 'Disponible' }: LinkCardProps) {
  const content = (
    <>
      <div className="platform-card-top">
        <span className="platform-card-icon" aria-hidden="true">
          <Icon />
        </span>
        <StatusBadge tone={status === 'Disponible' ? 'ready' : 'soon'}>{status}</StatusBadge>
      </div>
      <h3 className="platform-card-title">{title}</h3>
      <p className="platform-card-text">{description}</p>
      {label ? (
        <span className="platform-card-link">
          {label}
          <ArrowRight className="platform-card-link-icon" />
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <article className="platform-link-card is-disabled">{content}</article>;
  }

  return (
    <Link href={href} className="platform-link-card">
      {content}
    </Link>
  );
}
