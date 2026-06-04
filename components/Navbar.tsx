'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Circle,
  Guitar,
  Home,
  Info,
  Languages,
  Menu,
  Moon,
  Music2,
  Music4,
  Route,
  Sun,
  X,
} from 'lucide-react';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { useTheme } from './ThemeProvider';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/tuner', label: 'Afinador', icon: Guitar },
  { href: '/progressions', label: 'Progresiones', icon: Route },
  { href: '/circle-of-fifths', label: 'Círculo de Quintas', icon: Circle },
  { href: '/chords', label: 'Triadas', icon: Music2 },
  { href: '/about', label: 'Sobre Nosotros', icon: Info },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notation, toggleNotation } = useMusicNotation();
  const { theme, mounted, toggleTheme } = useTheme();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Principal">
        <Link href="/" className="nav-brand" aria-label="Ir al inicio de GuitarFlow">
          <span className="nav-brand-mark" aria-hidden="true">
            <Music4 className="nav-brand-icon" />
          </span>
          <span className="nav-brand-copy">
            <span className="nav-brand-title">GuitarFlow</span>
            <span className="nav-brand-subtitle">Technical Excellence</span>
          </span>
        </Link>

        <div className="nav-links" role="list">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="nav-link-icon" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <button type="button" className="nav-action" onClick={toggleNotation}>
            <Languages className="nav-action-icon" />
            <span>{notation === 'spanish' ? 'Español' : 'Americano'}</span>
          </button>

          <button type="button" className="nav-action" onClick={toggleTheme}>
            {mounted && theme === 'light' ? (
              <Moon className="nav-action-icon" />
            ) : (
              <Sun className="nav-action-icon" />
            )}
            <span>{mounted && theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
          </button>

          <button
            type="button"
            className="nav-mobile-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen((currentState) => !currentState)}
          >
            {mobileMenuOpen ? <X className="nav-action-icon" /> : <Menu className="nav-action-icon" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`nav-mobile-panel ${mobileMenuOpen ? 'is-open' : ''}`}
      >
        <div className="nav-mobile-links" role="list">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`nav-mobile-link ${isActive ? 'is-active' : ''}`}
              >
                <Icon className="nav-link-icon" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="nav-mobile-actions">
          <button type="button" className="nav-mobile-action" onClick={toggleNotation}>
            <Languages className="nav-action-icon" />
            <span>Notación: {notation === 'spanish' ? 'Español' : 'Americano'}</span>
          </button>

          <button type="button" className="nav-mobile-action" onClick={toggleTheme}>
            {mounted && theme === 'light' ? (
              <Moon className="nav-action-icon" />
            ) : (
              <Sun className="nav-action-icon" />
            )}
            <span>Tema: {mounted && theme === 'light' ? 'Oscuro' : 'Claro'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
