import type { Metadata } from 'next';
import Image from 'next/image';
import { Gauge, Guitar, ListChecks, Music4, Timer } from 'lucide-react';
import { LinkCard } from '@/components/ui/LinkCard';
import { PlatformHero } from '@/components/ui/PlatformHero';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Práctica | GuitarFlow',
  description:
    'Un espacio para transformar conocimiento en práctica con técnica, metrónomo, escalas, improvisación y rutinas conectadas a GuitarFlow.',
};

const practiceAreas = [
  {
    icon: Gauge,
    title: 'Técnica',
    description: 'Alternate picking como punto de partida para trabajar limpieza, sincronización y control.',
    href: '/learn/alternate-picking',
  },
  {
    icon: Timer,
    title: 'Metrónomo',
    description: 'Practicá con pulso, subdivisión, compás y objetivos de tempo mantenibles.',
    href: '/metronome',
  },
  {
    icon: Guitar,
    title: 'Escalas',
    description: 'Aplicá el material teórico directamente sobre el diapasón.',
    href: '/fretboard',
  },
  {
    icon: Music4,
    title: 'Improvisación',
    description: 'Usá la pentatónica para convertir patrones en frases y decisiones musicales.',
    href: '/learn/pentatonic',
  },
  {
    icon: ListChecks,
    title: 'Rutinas',
    description: 'Empezá con una estructura de 15 minutos para estudiar con dirección.',
    href: '/learn/15-minute-routine',
  },
];

export default function PracticePage() {
  return (
    <div className="platform-page">
      <PlatformHero
        kicker="PRÁCTICA"
        title="Práctica"
        subtitle="Un espacio para transformar conocimiento en práctica concreta."
      />

      <section className="practice-visual-section">
        <div className="practice-visual-copy">
          <span className="section-kicker">SIN SEGUIMIENTO TODAVÍA</span>
          <h2>Material listo para practicar, sin usuarios ni progreso persistente</h2>
          <p>
            Esta sección todavía no guarda historial ni BPM máximo, pero ya reúne rutas reales para estudiar técnica,
            metrónomo, escalas, improvisación y rutinas desde un mismo lugar.
          </p>
        </div>
        <Image
          src="/images/guitarflow-practice.png"
          alt="Metrónomo, cuaderno y guitarra preparados para una sesión de práctica"
          width={1536}
          height={512}
          sizes="(max-width: 768px) 100vw, 560px"
          className="practice-visual-image"
        />
      </section>

      <section className="platform-section">
        <SectionHeader
          kicker="RUTAS DE PRÁCTICA"
          title="Elegí qué entrenar ahora"
          description="Cada tarjeta abre una lección o herramienta real. La parte interactiva con usuarios y seguimiento queda para una etapa posterior."
        />

        <div className="platform-card-grid">
          {practiceAreas.map((area) => (
            <LinkCard
              key={area.title}
              href={area.href}
              icon={area.icon}
              title={area.title}
              description={area.description}
              label="Empezar"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
