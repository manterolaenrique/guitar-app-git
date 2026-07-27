import type { Metadata } from 'next';
import Tuner from '@/components/Tuner';

export const metadata: Metadata = {
  title: 'Afinador | GuitarFlow',
  description: 'Afinador cromatico para guitarra con feedback visual y lectura por microfono.',
};

export default function TunerPage() {
  return <Tuner />;
} 
