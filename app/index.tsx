import Head from 'next/head';
import Tuner from '../components/Tuner';
import ScaleViewer from '../components/ScaleViewer';
import ChordInfo from '../components/ChordInfo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <Head>
        <title>Guitar Tools</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Herramientas de Guitarra</h1>
      <div className="grid gap-6">
        <Tuner />
        <ScaleViewer />
        <ChordInfo />
      </div>
    </div>
  );
}