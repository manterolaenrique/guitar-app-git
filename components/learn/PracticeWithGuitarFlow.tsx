import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PracticeWithGuitarFlowProps {
  title: string;
  description: string;
  tool: string;
  href: string;
  buttonLabel: string;
}

export function PracticeWithGuitarFlow({
  title,
  description,
  tool,
  href,
  buttonLabel,
}: PracticeWithGuitarFlowProps) {
  return (
    <aside className="practice-with-guitarflow">
      <div className="practice-with-icon" aria-hidden="true">
        <Sparkles />
      </div>
      <div className="practice-with-copy">
        <span className="practice-with-tool">{tool}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={href} className="platform-button primary">
        <span>{buttonLabel}</span>
        <ArrowRight className="platform-button-icon" />
      </Link>
    </aside>
  );
}
