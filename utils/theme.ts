// Configuración de tema centralizada para GuitarFlow
export const theme = {
  colors: {
    // Paleta principal
    primary: '#f59e0b', // Naranja suave
    primaryDark: '#d97706', // Naranja más oscuro
    accent: '#fef3c7', // Crema
    accentDark: '#fde68a', // Crema más oscuro
    
    // Fondos
    background: '#0f172a', // Negro azulado
    backgroundSecondary: '#1e293b',
    backgroundHover: '#334155',
    
    // Texto
    textPrimary: '#fef3c7',
    textSecondary: '#fbbf24',
    
    // Bordes
    borderColor: '#1e293b',
    
    // Gradientes
    gradients: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      backgroundLight: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
      primary: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
      button: 'linear-gradient(135deg, #ef4444, #dc2626)',
      buttonSuccess: 'linear-gradient(135deg, #16a34a, #15803d)',
      fretboard: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
    }
  },
  
  fonts: {
    bebas: 'var(--font-bebas)',
    playfair: 'var(--font-playfair)',
    raleway: 'var(--font-raleway)',
  },
  
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.1)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.2)',
    strong: '0 20px 40px rgba(0, 0, 0, 0.3)',
    glow: '0 0 30px rgba(245, 158, 11, 0.3)',
  },
  
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    round: '50%',
  },
  
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  }
};

export default theme; 