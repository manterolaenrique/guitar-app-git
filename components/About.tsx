import Image from 'next/image';
import {
  BookOpen,
  Code2,
  Gauge,
  Layers3,
  Link2,
  Mail,
  Music4,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react';

const timeline = [
  {
    label: 'Primera etapa',
    title: 'Herramientas de guitarra',
    description: 'Escalas, afinador, triadas, círculo de quintas y progresiones como módulos útiles e independientes.',
  },
  {
    label: 'Segunda etapa',
    title: 'Plataforma GuitarFlow',
    description: 'Identidad visual, navegación, secciones principales y una estructura preparada para crecer.',
  },
  {
    label: 'Tercera etapa',
    title: 'Aprendizaje guiado',
    description: 'Lecciones de técnica, teoría, improvisación y rutinas conectadas con herramientas reales.',
  },
  {
    label: 'Cuarta etapa',
    title: 'Práctica con pulso',
    description: 'Metrónomo completo, reproductor persistente y rutas de práctica para estudiar con más foco.',
  },
  {
    label: 'Próxima etapa',
    title: 'Rutinas y seguimiento',
    description: 'Ejercicios más interactivos, progreso, historial y una experiencia más personalizada.',
  },
];

const improvements = [
  {
    icon: BookOpen,
    title: 'Aprender',
    description: 'Lecciones reales para técnica, teoría, improvisación y práctica.',
  },
  {
    icon: Target,
    title: 'Método',
    description: 'Base del futuro GuitarFlow Method como ebook y guía de estudio.',
  },
  {
    icon: Layers3,
    title: 'Práctica',
    description: 'Un índice con rutas reales para entrenar sin perderse.',
  },
  {
    icon: Timer,
    title: 'Metrónomo',
    description: 'Pulso persistente para seguir practicando al cambiar de herramienta.',
  },
  {
    icon: Link2,
    title: 'Enlaces compartibles',
    description: 'Herramientas preparadas para abrirse configuradas desde lecciones o PDFs.',
  },
  {
    icon: Sparkles,
    title: 'Diseño unificado',
    description: 'Una identidad más consistente para que se sienta como plataforma.',
  },
];

const stack = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-panel about-hero-split">
          <div>
            <span className="section-kicker">PROPÓSITO & VISIÓN</span>
            <h1 className="about-hero-title">Sobre GuitarFlow</h1>
            <p className="about-hero-text">
              GuitarFlow nace de unir programación y música. Empezó como un proyecto para mostrar habilidades como
              desarrollador, pero fue tomando otro camino: compartir lo aprendido y construir una forma más clara de
              estudiar guitarra.
            </p>
          </div>
          <Image
            src="/images/guitarflow-study.png"
            alt="Guitarra, cuaderno y laptop preparados para estudiar con GuitarFlow"
            width={1536}
            height={512}
            sizes="(max-width: 768px) 100vw, 520px"
            className="about-hero-image"
            priority
          />
        </div>
      </section>

      <section className="about-flow-layout">
        <div className="about-flow-main">
          <article className="about-story-card">
            <span className="about-story-kicker">Cómo empezó</span>
            <h2 className="about-section-title">Un proyecto técnico con una excusa musical</h2>
            <div className="about-story-copy">
              <p>
                Al principio la idea era construir algo real para mostrar criterio de producto, frontend, arquitectura
                y experiencia de usuario. La guitarra fue el terreno perfecto: herramientas visuales, interacción y
                mucho espacio para resolver problemas concretos.
              </p>
              <p>
                Esa primera versión se enfocó en piezas puntuales: escalas sobre el mástil, afinación, acordes,
                círculo de quintas y progresiones armónicas.
              </p>
            </div>
          </article>

          <article className="about-story-card">
            <span className="about-story-kicker">En qué se convirtió</span>
            <h2 className="about-section-title">Una plataforma para ordenar y compartir aprendizaje</h2>
            <div className="about-story-copy">
              <p>
                Con el tiempo GuitarFlow dejó de sentirse solo como una colección de herramientas. Ahora apunta a algo
                más completo: aprender conceptos, practicarlos con intención y llevarlos a la guitarra de forma clara.
              </p>
              <p>
                El objetivo es que cada idea termine en una acción: ver una escala, practicar con metrónomo, entender
                una progresión, armar una rutina o conectar una lección con una herramienta.
              </p>
            </div>
          </article>

          <article className="about-story-card about-personal-card">
            <div className="about-personal-icon" aria-hidden="true">
              <Code2 />
              <Music4 />
            </div>
            <div>
              <span className="about-story-kicker">La parte personal</span>
              <h2 className="about-section-title">Código y guitarra en el mismo lugar</h2>
              <p className="about-meta-text">
                Hay algo muy lindo en poder cruzar dos pasiones: construir software y estudiar música. GuitarFlow vive
                justo en ese cruce: una app que muestra oficio técnico, pero también ganas reales de entender y
                compartir el instrumento.
              </p>
            </div>
          </article>
        </div>

        <aside className="about-timeline-panel" aria-label="Evolución de GuitarFlow">
          <span className="section-kicker">EVOLUCIÓN</span>
          <h2>Mejoras por etapas</h2>
          <div className="about-timeline-list">
            {timeline.map((item) => (
              <article key={item.title} className="about-timeline-item">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="about-values-section">
        <div className="about-values-header">
          <span className="section-kicker">NOVEDADES</span>
          <h2 className="about-section-title">Lo nuevo que se fue sumando</h2>
        </div>

        <div className="about-updates-grid">
          {improvements.map(({ icon: Icon, title, description }) => (
            <article key={title} className="about-value-card">
              <div className="about-value-icon">
                <Icon className="about-value-icon-svg" />
              </div>
              <h3 className="about-value-title">{title}</h3>
              <p className="about-value-text">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-meta-grid">
        <article className="about-meta-card">
          <div className="about-meta-heading">
            <Gauge className="about-meta-icon" />
            <div>
              <span className="about-story-kicker">Tecnología</span>
              <h2 className="about-section-title">Base técnica para seguir creciendo</h2>
            </div>
          </div>
          <p className="about-meta-text">
            GuitarFlow está construida con tecnologías modernas para mantener rendimiento, accesibilidad y una
            experiencia visual consistente mientras evoluciona hacia ejercicios, rutinas y seguimiento.
          </p>
          <div className="about-stack">
            {stack.map((item) => (
              <span key={item} className="about-stack-pill">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="about-contact-card">
          <span className="about-story-kicker">Conexión</span>
          <h2 className="about-section-title">Música, producto y aprendizaje</h2>
          <p className="about-meta-text">
            La idea es seguir haciendo crecer GuitarFlow de forma incremental: herramientas sólidas, contenido claro,
            práctica con sentido y una experiencia cada vez más útil para guitarristas.
          </p>
          <div className="about-contact-actions">
            <a href="mailto:Manterolaenrique@hotmail.com" className="about-contact-button primary">
              <Mail className="about-contact-icon" />
              <span>Manterolaenrique@hotmail.com</span>
            </a>
            <a
              href="https://henrymanterola.dev.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-button secondary"
            >
              <Sparkles className="about-contact-icon" />
              <span>Ver portafolio</span>
            </a>
          </div>
        </article>
      </section>
    </div>
  );
};

export default About;
