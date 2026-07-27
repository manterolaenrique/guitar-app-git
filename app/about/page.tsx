import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'Sobre GuitarFlow | GuitarFlow',
  description:
    'Conoce GuitarFlow: un proyecto que une programacion, guitarra, aprendizaje musical, herramientas interactivas y practica guiada.',
};

export default function AboutPage() {
  return <About />;
} 
