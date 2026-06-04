import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-kicker">Technical Excellence in Music Theory</p>
          <h2 className="site-footer-title">GuitarFlow</h2>
          <p className="site-footer-copy">
            Herramientas visuales para estudiar escalas, acordes y el diapasón sin perder precisión técnica.
          </p>
        </div>

        <div className="site-footer-links">
          <Link href="/" className="site-footer-link">
            Inicio
          </Link>
          <Link href="/tuner" className="site-footer-link">
            Afinador
          </Link>
          <Link href="/about" className="site-footer-link">
            Sobre Nosotros
          </Link>
          <a href="mailto:Manterolaenrique@hotmail.com" className="site-footer-link">
            Contacto
          </a>
          <a
            href="https://henrymanterola.dev.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link"
          >
            Portafolio
          </a>
        </div>

        <div className="site-footer-meta">
          <p className="site-footer-meta-text">© 2025 GuitarFlow. Diseñado con Next.js, React y Framer Motion.</p>
          <p className="site-footer-meta-text">Proyecto personal para práctica, estudio y exploración musical.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
