import { Code2, Gauge, Mail, Sparkles, Waves } from 'lucide-react';

const values = [
  {
    icon: Gauge,
    title: 'Precisión Técnica',
    description:
      'Cada herramienta está pensada para representar la teoría musical con claridad, consistencia visual y foco práctico.',
  },
  {
    icon: Sparkles,
    title: 'Aprendizaje Accesible',
    description:
      'La meta es traducir conceptos complejos del estudio de guitarra a una experiencia visual intuitiva y amigable.',
  },
  {
    icon: Waves,
    title: 'Evolución Constante',
    description:
      'GuitarFlow sigue creciendo como laboratorio personal: diseño, teoría musical y producto conviven en una misma app.',
  },
];

const stack = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-panel">
          <span className="section-kicker">PROPÓSITO & VISIÓN</span>
          <h1 className="about-hero-title">Sobre GuitarFlow</h1>
          <p className="about-hero-text">
            GuitarFlow es un proyecto personal que nace de mi pasión por la música y la programación.
            Como desarrollador y guitarrista, construí esta app para ayudar a otros músicos a estudiar,
            practicar y entender mejor lo que ocurre en el instrumento.
          </p>
        </div>
      </section>

      <section className="about-story-grid">
        <article className="about-story-card about-story-main">
          <span className="about-story-kicker">Nuestra Historia</span>
          <h2 className="about-section-title">Código y armonía en el mismo workspace</h2>
          <div className="about-story-copy">
            <p>
              GuitarFlow nace en la intersección entre desarrollo web y práctica musical. La idea fue
              construir herramientas útiles para el estudio diario, pero con una interfaz clara y una
              base técnica que permita seguir iterando sin perder consistencia.
            </p>
            <p>
              Este proyecto también forma parte de mi portafolio personal y refleja una manera de
              trabajar: tomar un problema real, diseñar una experiencia mejor y luego refinarla
              progresivamente sin romper la funcionalidad ya resuelta.
            </p>
          </div>
        </article>

        <article className="about-story-card about-story-side">
          <span className="about-story-kicker">Características Principales</span>
          <ul className="about-feature-list">
            <li>Visualizador de escalas para aprender y practicar sobre el diapasón.</li>
            <li>Afinador digital para mantener la guitarra afinada con feedback visual.</li>
            <li>Información detallada sobre triadas, acordes y relaciones armónicas.</li>
          </ul>
        </article>
      </section>

      <section className="about-values-section">
        <div className="about-values-header">
          <span className="section-kicker">VALORES FUNDAMENTALES</span>
          <h2 className="about-section-title">La app crece con una lógica simple: claridad, estudio y evolución</h2>
        </div>

        <div className="about-values-grid">
          {values.map(({ icon: Icon, title, description }) => (
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
            <Code2 className="about-meta-icon" />
            <div>
              <span className="about-story-kicker">Tecnología</span>
              <h2 className="about-section-title">Ingeniería web para una práctica fluida</h2>
            </div>
          </div>
          <p className="about-meta-text">
            La aplicación está construida con tecnologías modernas como Next.js, TypeScript y Tailwind CSS.
            El objetivo es seguir mejorándola y expandiéndola sin sacrificar rendimiento ni mantenibilidad.
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
          <h2 className="about-section-title">¿Hablamos de música y producto?</h2>
          <p className="about-meta-text">
            Mi objetivo es continuar mejorando GuitarFlow, agregando nuevas herramientas y refinando la
            experiencia del usuario. Si querés ver más trabajo o contactarme, te dejo ambos accesos.
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
              Ver Portafolio
            </a>
          </div>
        </article>
      </section>
    </div>
  );
};

export default About;
