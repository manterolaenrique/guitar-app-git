import Link from 'next/link';

const footerLinks = [
  { href: '/tools', label: 'Herramientas' },
  { href: '/learn', label: 'Aprender' },
  { href: '/practice', label: 'Práctica' },
  { href: '/challenge', label: 'Desafío' },
  { href: '/method', label: 'Método' },
  { href: '/about', label: 'Sobre el proyecto' },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-kicker">Herramientas + Aprender + Práctica</p>
          <h2 className="site-footer-title">GuitarFlow</h2>
          <p className="site-footer-copy">
            Una plataforma de estudio para conectar teoría, técnica y práctica sobre la guitarra.
          </p>
        </div>

        <div className="site-footer-links" aria-label="Enlaces de GuitarFlow">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-footer-link">
              {link.label}
            </Link>
          ))}
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
          <p className="site-footer-meta-text">© 2026 GuitarFlow. Construido con Next.js, React y TypeScript.</p>
          <p className="site-footer-meta-text">
            Proyecto personal para estudiar, practicar y comprender mejor el instrumento.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
