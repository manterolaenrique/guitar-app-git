import Link from 'next/link';
import {
  ArrowRight,
  Gauge,
  Guitar,
  Layers3,
  Music2,
  Route,
} from 'lucide-react';
import ScaleViewer from '@/components/ScaleViewer';

const workflowCards = [
  {
    eyebrow: 'Fundamental',
    title: 'Mapeá el tono',
    description: 'Seleccioná la tónica, el tipo de escala y el instrumento para llevar la teoría al diapasón real.',
    accent: 'accent-primary',
  },
  {
    eyebrow: 'Precisión',
    title: 'Visualizá el patrón',
    description: 'Trabajá con una vista clara del mástil para entender la distribución de notas con foco técnico.',
    accent: 'accent-secondary',
  },
  {
    eyebrow: 'Práctica',
    title: 'Estudiá con contexto',
    description: 'Usá la app como estación de práctica para relacionar escalas, acordes y afinación desde un mismo flujo.',
    accent: 'accent-tertiary',
  },
  {
    eyebrow: 'Interfaz',
    title: 'Alterná notación y tema',
    description: 'La experiencia visual acompaña el estudio sin romper el cambio claro/oscuro ni la notación actual.',
    accent: 'accent-primary-soft',
  },
];

const toolCards = [
  {
    href: '/tuner',
    icon: Guitar,
    title: 'Afinador',
    description: 'Afinación rápida con visualización clara para sesiones de práctica o grabación.',
  },
  {
    href: '/chords',
    icon: Music2,
    title: 'Triadas',
    description: 'Explorá estructuras armónicas y entendé cómo se construyen los acordes sobre la guitarra.',
  },
  {
    href: '/circle-of-fifths',
    icon: Layers3,
    title: 'Círculo de Quintas',
    description: 'Conectá tonalidades, armaduras y relaciones entre acordes desde una vista unificada.',
  },
  {
    href: '/progressions',
    icon: Route,
    title: 'Progresiones',
    description: 'Construí secuencias diatónicas, analizá su función y transponelas dentro del centro tonal.',
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-panel">
          <div className="home-hero-copy">
            <span className="section-kicker">TECHNICAL EXCELLENCE</span>
            <h1 className="home-hero-title">
              Explorá escalas, acordes y <span>teoría musical</span> desde el mástil
            </h1>
            <p className="home-hero-text">
              GuitarFlow transforma el estudio diario en un workspace visual: elegís el tono,
              entendés la estructura y recorrés el diapasón con una interfaz inspirada en Stitch,
              pero montada sobre la lógica real de tu app.
            </p>
          </div>

          <div className="home-hero-actions">
            <a href="#scale-workbench" className="home-cta home-cta-primary">
              <span>Comenzar Ahora</span>
              <ArrowRight className="home-cta-icon" />
            </a>
            <Link href="/about" className="home-cta home-cta-secondary">
              Sobre el Proyecto
            </Link>
          </div>

          <div className="home-hero-metrics">
            <div className="home-metric-card">
              <Gauge className="home-metric-icon" />
              <div>
                <span className="home-metric-label">Workspace activo</span>
                <strong className="home-metric-value">Escalas + Diapasón</strong>
              </div>
            </div>
            <div className="home-metric-card">
              <Layers3 className="home-metric-icon" />
              <div>
                <span className="home-metric-label">Diseño aplicado</span>
                <strong className="home-metric-value">Stitch adaptado a la app real</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-workflow-grid">
        {workflowCards.map((card) => (
          <article key={card.title} className={`home-info-card ${card.accent}`}>
            <span className="home-card-kicker">{card.eyebrow}</span>
            <h2 className="home-card-title">{card.title}</h2>
            <p className="home-card-text">{card.description}</p>
          </article>
        ))}
      </section>

      <section id="scale-workbench" className="home-workbench">
        <div className="home-workbench-header">
          <div>
            <span className="section-kicker">VISUALIZADOR PRINCIPAL</span>
            <h2 className="home-section-title">Diapasón dinámico para estudiar con intención</h2>
          </div>
          <p className="home-section-text">
            El módulo real de escalas se mantiene intacto. En esta etapa solo cambiamos el contexto
            visual para que el flujo se sienta más sólido, legible y alineado con Stitch.
          </p>
        </div>

        <div className="home-workbench-shell">
          <ScaleViewer />
        </div>
      </section>

      <section className="home-tools">
        <div className="home-tools-header">
          <span className="section-kicker">ECOSISTEMA DE PRÁCTICA</span>
          <h2 className="home-section-title">Herramientas conectadas para seguir explorando</h2>
        </div>

        <div className="home-tools-grid">
          {toolCards.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="home-tool-card">
              <div className="home-tool-icon-wrap">
                <Icon className="home-tool-icon" />
              </div>
              <h3 className="home-tool-title">{title}</h3>
              <p className="home-tool-text">{description}</p>
              <span className="home-tool-link">
                Abrir módulo
                <ArrowRight className="home-tool-link-icon" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
