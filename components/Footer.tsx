const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 Manterola Enrique. Proyecto desarrollado con Next.js + React.
          </p>
          <p className="footer-text mt-1">
            Contacto:
            <a href="mailto:Manterolaenrique@hotmail.com" className="footer-link">
              Manterolaenrique@hotmail.com
            </a>
            ·
            <a
              href="https://www.linkedin.com/in/enrique-manterola-8bb572189/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  