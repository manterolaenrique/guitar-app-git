import type { Metadata } from 'next';
import { Circle, Guitar, Layers3, Music2, Route, Timer } from 'lucide-react';
import { LinkCard } from '@/components/ui/LinkCard';
import { PlatformHero } from '@/components/ui/PlatformHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { guitarFlowTools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Herramientas | GuitarFlow',
  description: 'Herramientas interactivas de GuitarFlow para estudiar escalas, afinacion, acordes, progresiones y teoria.',
};

const toolIcons = {
  fretboard: Guitar,
  tuner: Guitar,
  harmony: Music2,
  theory: Circle,
  rhythm: Timer,
};

export default function ToolsPage() {
  return (
    <div className="platform-page">
      <PlatformHero
        kicker="HERRAMIENTAS"
        title="Herramientas de estudio"
        subtitle="Explora el diapason, afina, construye acordes, practica con metronomo y conecta teoria con practica desde una misma plataforma."
      />

      <section className="platform-section">
        <SectionHeader
          kicker="ÁREA DE PRÁCTICA"
          title="Modulos disponibles"
          description="Cada herramienta conserva su funcionamiento actual y queda preparada para integrarse con lecciones, rutinas y futuros deep links desde el metodo."
        />

        <div className="platform-card-grid">
          {guitarFlowTools.map((tool) => {
            const Icon = tool.href === '/progressions' ? Route : toolIcons[tool.area] || Layers3;

            return (
              <LinkCard
                key={tool.href}
                href={tool.href}
                icon={Icon}
                title={tool.title}
                description={tool.description}
                label="Abrir herramienta"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
