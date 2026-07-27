import type { Metadata } from 'next';
import MetronomeWorkbench from '@/components/MetronomeWorkbench';
import { PlatformHero } from '@/components/ui/PlatformHero';

export const metadata: Metadata = {
  title: 'Metrónomo | GuitarFlow',
  description: 'Metrónomo persistente de GuitarFlow para practicar con pulso mientras navegas por herramientas y lecciones.',
};

export default function MetronomePage() {
  return (
    <div className="platform-page">
      <PlatformHero
        kicker="METRONOMO"
        title="Metrónomo"
        subtitle="Un reproductor de pulso para ensayar y seguir navegando por GuitarFlow sin perder el tempo."
      />
      <MetronomeWorkbench />
    </div>
  );
}
