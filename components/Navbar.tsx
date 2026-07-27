'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Circle,
  Guitar,
  Home,
  Info,
  Languages,
  Menu,
  Moon,
  Music2,
  Music4,
  PanelLeft,
  Route,
  Sun,
  Target,
  Timer,
  X,
} from 'lucide-react';
import { useMusicNotation } from '../contexts/MusicNotationContext';
import { useTheme } from './ThemeProvider';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/learn', label: 'Aprender', icon: BookOpen },
  { href: '/method', label: 'Método', icon: Target },
  { href: '/about', label: 'Sobre GuitarFlow', icon: Info },
];

const toolNavItems = [
  { href: '/tools', label: 'Todas las herramientas', description: 'Índice general', icon: PanelLeft },
  { href: '/fretboard', label: 'Escalas y diapasón', description: 'Mástil, tónicas e intervalos', icon: Guitar },
  { href: '/tuner', label: 'Afinador', description: 'Afinación cromática', icon: Guitar },
  { href: '/chords', label: 'Triadas y acordes', description: 'Grados, notas y estructuras', icon: Music2 },
  { href: '/progressions', label: 'Progresiones', description: 'Funciones y secuencias', icon: Route },
  { href: '/circle-of-fifths', label: 'Círculo de quintas', description: 'Tonalidades y relativos', icon: Circle },
  { href: '/metronome', label: 'Metrónomo', description: 'Pulso persistente', icon: Timer },
];

const isCurrentPath = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

const isToolsPath = (pathname: string) => toolNavItems.some(({ href }) => isCurrentPath(pathname, href));

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notation, toggleNotation } = useMusicNotation();
  const { theme, mounted, toggleTheme } = useTheme();
  const toolsActive = isToolsPath(pathname);

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
            <span className="nav-brand-subtitle">Herramientas + Aprender + Práctica</span>
          </span>
        </Link>

        <div className="nav-links" role="list">
          <div className={`nav-tools-menu ${toolsActive ? 'is-active' : ''}`} role="listitem">
            <Link
              href="/tools"
              className={`nav-link nav-tools-trigger ${toolsActive ? 'is-active' : ''}`}
              aria-current={isCurrentPath(pathname, '/tools') ? 'page' : undefined}
              aria-haspopup="true"
            >
              <PanelLeft className="nav-link-icon" />
              <span>Herramientas</span>
            </Link>

            <div className="nav-tools-dropdown" aria-label="Herramientas de GuitarFlow">
              {toolNavItems.map(({ href, label, description, icon: Icon }) => {
                const isActive = isCurrentPath(pathname, href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`nav-tool-item ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="nav-tool-icon" />
                    <span>
                      <strong>{label}</strong>
                      <small>{description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = isCurrentPath(pathname, href);

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

      <div id="mobile-navigation" className={`nav-mobile-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="nav-mobile-links" role="list">
          <div className="nav-mobile-tools-group" role="listitem">
            <Link
              href="/tools"
              className={`nav-mobile-link ${toolsActive ? 'is-active' : ''}`}
              aria-current={isCurrentPath(pathname, '/tools') ? 'page' : undefined}
            >
              <PanelLeft className="nav-link-icon" />
              <span>Herramientas</span>
            </Link>

            <div className="nav-mobile-tools-list">
              {toolNavItems.slice(1).map(({ href, label, icon: Icon }) => {
                const isActive = isCurrentPath(pathname, href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`nav-mobile-tool-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="nav-link-icon" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = isCurrentPath(pathname, href);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-mobile-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
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
