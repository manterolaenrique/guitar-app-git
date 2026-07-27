import type { Metadata } from 'next';
import CircleOfFifths from '../../components/CircleOfFifths';
import CircleOfFifthsSheet from '../../components/CircleOfFifthsSheet';

export const metadata: Metadata = {
  title: 'Circulo de quintas | GuitarFlow',
  description: 'Explora tonalidades, relativos, armaduras y alteraciones con el circulo de quintas.',
};

export default function CircleOfFifthsPage() {
  return (
    <div className="circle-page-container">
      <CircleOfFifths />
      <CircleOfFifthsSheet />
    </div>
  );
} 
