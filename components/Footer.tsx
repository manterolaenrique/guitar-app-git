const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 GuitarFlow - Herramientas de Guitarra Modernas
          </p>
          <p className="footer-text mt-1">
            Desarrollado con Next.js + React + Framer Motion
          </p>
          <p className="footer-text mt-1">
            Contacto:
            <a href="mailto:Manterolaenrique@hotmail.com" className="footer-link">
              Manterolaenrique@hotmail.com
            </a>
            ·
            <a
              href="https://porfolio-lilac-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Portafolio
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  