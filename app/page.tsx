import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Guitar, ListChecks, Target, Timer, Trophy } from 'lucide-react';
import ScaleViewer from '@/components/ScaleViewer';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'GuitarFlow | Plataforma de estudio de guitarra',
  description:
    'Herramientas, lecciones, metrónomo, método de estudio y práctica interactiva para aprender guitarra con claridad.',
};

const platformAreas = [
  {
    href: '/tools',
    icon: Guitar,
    title: 'Herramientas',
    description: 'Mástil, acordes, progresiones, afinador y teoría aplicada.',
  },
  {
    href: '/learn',
    icon: BookOpen,
    title: 'Aprender',
    description: 'Lecciones cortas para técnica, teoría, improvisación y práctica.',
  },
  {
    href: '/metronome',
    icon: Timer,
    title: 'Metrónomo',
    description: 'Pulso persistente para ensayar mientras navegás por la app.',
  },
  {
    href: '/method',
    icon: Target,
    title: 'Método',
    description: 'El futuro ebook para ordenar estudio y aplicarlo musicalmente.',
  },
];

export default function Home() {
  return (
    <div className="platform-page home-v2">
      <section className="home-compact-hero">
        <div className="home-compact-copy">
          <span className="section-kicker">GUITARFLOW</span>
          <h1>Estudiá guitarra con herramientas y práctica guiada</h1>
          <p>
            GuitarFlow conecta mástil, teoría, acordes, progresiones, afinación, metrónomo y método para que
            practiques con contexto en vez de saltar entre ejercicios sueltos.
          </p>
          <div className="home-compact-actions">
            <Link href="/tools" className="platform-button primary">
              <span>Explorar herramientas</span>
              <ArrowRight className="platform-button-icon" />
            </Link>
            <Link href="/learn" className="platform-button secondary">
              Aprender guitarra
            </Link>
          </div>
        </div>

        <div className="home-compact-grid" aria-label="Áreas principales de GuitarFlow">
          {platformAreas.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="home-compact-card">
              <Icon />
              <strong>{title}</strong>
              <span>{description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="platform-image-band">
        <Image
          src="/images/guitarflow-study.png"
          alt="Guitarra, cuaderno y herramientas digitales para estudiar con GuitarFlow"
          width={1536}
          height={512}
          sizes="(max-width: 768px) 100vw, 1280px"
          className="platform-image-band-media"
          priority
        />
      </section>

      <section id="scale-workbench" className="platform-section">
        <SectionHeader
          kicker="ÁREA DE PRÁCTICA"
          title="Diapasón dinámico para estudiar con intención"
          description="Visualizá escalas, tónicas e intervalos sobre el mástil y compartí configuraciones con URL."
        />
        <div className="home-workbench-shell">
          <ScaleViewer />
        </div>
      </section>

      <section className="home-next-steps">
        <Link href="/challenge" className="home-next-step">
          <Trophy />
          <div>
            <strong>Jugar GuitarFlow Challenge</strong>
            <span>Probá teoría, mástil y armonía en partidas rápidas.</span>
          </div>
        </Link>
        <Link href="/practice" className="home-next-step">
          <ListChecks />
          <div>
            <strong>Armar una rutina</strong>
            <span>Usá Práctica para ordenar bloques de estudio.</span>
          </div>
        </Link>
        <Link href="/method" className="home-next-step">
          <Target />
          <div>
            <strong>Conocer GuitarFlow Method</strong>
            <span>El ebook futuro para pasar de ejercicios a música.</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
