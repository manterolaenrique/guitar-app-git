import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CircleDot,
  Dumbbell,
  Gauge,
  Guitar,
  ListChecks,
  Mail,
  Music4,
  Route,
  Sparkles,
  Target,
  Timer,
  Waves,
} from 'lucide-react';
import { PlatformHero } from '@/components/ui/PlatformHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const metadata: Metadata = {
  title: 'GuitarFlow Method | GuitarFlow',
  description:
    'GuitarFlow Method: futuro ebook PDF para ordenar tu práctica, mejorar técnica y llevar teoría al instrumento.',
};

const contactHref = 'mailto:Manterolaenrique@hotmail.com?subject=GuitarFlow%20Method';

const audienceItems = [
  {
    icon: Guitar,
    title: 'Estas empezando',
    description: 'Necesitas una ruta simple para no perderte entre escalas, acordes, videos y ejercicios sueltos.',
  },
  {
    icon: Gauge,
    title: 'Ya tocas, pero estas trabado',
    description: 'Tenes recursos, pero te falta orden para convertirlos en frases, riffs y practica real.',
  },
  {
    icon: Music4,
    title: 'Conoces escalas, pero no las usas',
    description: 'El metodo baja la teoria al mastil para que deje de ser un dibujo y empiece a sonar a musica.',
  },
  {
    icon: Timer,
    title: 'Queres practicar mejor',
    description: 'La idea no es practicar mas por culpa: es practicar con foco, medir avances y sostener el habito.',
  },
];

const problemItems = [
  'Practicar sin estructura y saltar de ejercicio en ejercicio.',
  'Buscar velocidad antes de limpieza, control y precision.',
  'Memorizar escalas sin saber donde resolver una frase.',
  'Tocar acordes sin entender que notas los forman.',
  'No saber que hacer cuando tenes 15, 30 o 60 minutos.',
];

const methodSteps = [
  { title: 'Concepto', description: 'Primero entendemos que se esta trabajando y para que sirve.' },
  { title: 'Ejercicio', description: 'Despues lo bajamos a una accion concreta sobre la guitarra.' },
  { title: 'GuitarFlow', description: 'Abrimos una herramienta configurada para ver el mapa y practicar con contexto.' },
  { title: 'Aplicacion musical', description: 'Lo convertimos en frase, riff, progresion o rutina.' },
  { title: 'Seguimiento', description: 'Cerramos con una referencia simple para saber que mejorar despues.' },
];

const ebookIncludes = [
  { icon: Dumbbell, title: 'Tecnica limpia', description: 'Alternate picking, legato, bends, vibrato, muting y control.' },
  { icon: BookOpen, title: 'Teoria aplicada', description: 'Intervalos, escalas, triadas, acordes y tonalidades sobre el mastil.' },
  { icon: Music4, title: 'Improvisacion', description: 'Pentatonica, fraseo, notas objetivo, posiciones y ritmo.' },
  { icon: Route, title: 'Progresiones', description: 'Como entender movimiento armonico y tocar sobre cambios reales.' },
  { icon: Guitar, title: 'Riffs y recursos', description: 'Ideas pequenas para pasar del ejercicio a algo que se pueda tocar.' },
  { icon: ListChecks, title: 'Rutinas', description: 'Bloques de 15, 30 y 60 minutos para practicar sin improvisar la practica.' },
];

const chapters = [
  'Parte 1: ordenar la practica y preparar el instrumento',
  'Parte 2: tecnica con limpieza antes que velocidad',
  'Parte 3: teoria que realmente se ve en el diapason',
  'Parte 4: pentatonica, fraseo e improvisacion',
  'Parte 5: acordes, progresiones y aplicacion musical',
  'Parte 6: GuitarFlow 30 Day Challenge',
];

const integrationLinks = [
  {
    href: '/tools',
    title: 'Herramientas',
    description: 'El hub para abrir cada modulo interactivo.',
  },
  {
    href: '/fretboard?root=A&scale=minor-pentatonic&instrument=guitar&view=scale',
    title: 'Diapason',
    description: 'Escalas listas para practicar desde una leccion o capitulo.',
  },
  {
    href: '/progressions?root=C&scale=ionian&degrees=1-5-6-4',
    title: 'Progresiones',
    description: 'Armonia aplicada para improvisar con cambios reales.',
  },
];

const philosophy = ['Limpieza', 'Control', 'Precision', 'Velocidad', 'Aplicacion musical'];

export default function MethodPage() {
  return (
    <div className="platform-page method-page">
      <PlatformHero
        kicker="GUITARFLOW METHOD"
        title="GuitarFlow Method"
        subtitle="De practicar ejercicios a tocar musica."
      >
        <p className="method-hero-note">
          Un futuro ebook PDF para ordenar la practica, entender el instrumento y dejar de juntar ejercicios
          sueltos como si eso solo alcanzara. La idea es simple: estudiar mejor, tocar mas claro y aplicar lo
          aprendido en musica real.
        </p>
        <div className="method-hero-actions">
          <a href="#method-includes" className="platform-button primary">
            <span>Ver que incluye</span>
            <ArrowRight className="platform-button-icon" />
          </a>
          <a href={contactHref} className="platform-button secondary">
            <Mail className="platform-button-icon" />
            <span>Avisame cuando salga</span>
          </a>
          <StatusBadge tone="method">Próximamente · PDF</StatusBadge>
        </div>
      </PlatformHero>

      <section className="method-intro-panel method-intro-visual">
        <div>
          <span className="section-kicker">LA IDEA</span>
          <h2>Una guía para practicar con cabeza, no solo con ganas</h2>
          <p>
            GuitarFlow Method busca ser ese compañero de estudio que te dice: “bien, hoy trabajemos esto, de esta
            forma, y después usemos GuitarFlow para verlo en el mástil”. Nada de promesas mágicas. Práctica ordenada,
            criterio musical y ejercicios que tengan una razón.
          </p>
        </div>
        <Image
          src="/images/guitarflow-method.png"
          alt="Cuaderno y material de estudio para el futuro GuitarFlow Method"
          width={1536}
          height={512}
          sizes="(max-width: 768px) 100vw, 520px"
          className="method-intro-image"
        />
      </section>

      <section className="platform-section">
        <SectionHeader
          kicker="PARA QUIEN ES"
          title="Si algo de esto te pasa, estas en casa"
          description="La propuesta apunta a principiantes e intermedios: gente que quiere tocar mejor sin perderse en teoria infinita ni rutinas imposibles."
        />
        <div className="platform-card-grid">
          {audienceItems.map(({ icon: Icon, title, description }) => (
            <article key={title} className="platform-info-card">
              <span className="platform-card-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method-split-section">
        <article className="method-panel">
          <SectionHeader kicker="EL PROBLEMA" title="Practicar mucho no siempre es practicar bien" />
          <ul className="method-check-list">
            {problemItems.map((item) => (
              <li key={item}>
                <CircleDot />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="method-panel">
          <SectionHeader
            kicker="FILOSOFIA GUITARFLOW"
            title="El orden importa"
            description="La velocidad llega mejor cuando antes hay sonido, control y precision. Si no, solo estamos corriendo arriba de una tecnica floja."
          />
          <div className="method-flow-list">
            {philosophy.map((item) => (
              <div key={item} className="method-flow-step">
                <CircleDot />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="platform-section">
        <SectionHeader
          kicker="COMO FUNCIONA"
          title="Del concepto a la guitarra"
          description="Cada capitulo del ebook deberia terminar en algo tocable: un ejercicio, una frase, una progresion o una rutina."
        />
        <div className="method-process-grid">
          {methodSteps.map((step, index) => (
            <article key={step.title} className="method-process-card">
              <span className="method-step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="method-includes" className="platform-section">
        <SectionHeader
          kicker="CONTENIDO"
          title="Que incluira el ebook"
          description="La idea es que sea un PDF claro, practico y conectado a las herramientas web de GuitarFlow."
        />
        <div className="platform-card-grid">
          {ebookIncludes.map(({ icon: Icon, title, description }) => (
            <article key={title} className="platform-info-card">
              <span className="platform-card-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method-split-section">
        <article className="method-panel">
          <SectionHeader
            kicker="INDICE TENTATIVO"
            title="Una posible estructura del PDF"
            description="Todavia puede cambiar, pero este seria el esqueleto natural del metodo."
          />
          <ol className="method-chapter-list">
            {chapters.map((chapter) => (
              <li key={chapter}>{chapter}</li>
            ))}
          </ol>
        </article>

        <article className="method-panel method-sample-panel">
          <div className="method-sample-icon" aria-hidden="true">
            <Sparkles />
          </div>
          <span className="section-kicker">MUESTRA</span>
          <h2>Proba el enfoque con una leccion real</h2>
          <p>
            Si queres ver hacia donde va el metodo, empeza por una leccion gratis: poco humo, ejercicio claro y
            conexion directa con una herramienta.
          </p>
          <div className="method-sample-actions">
            <Link href="/learn/alternate-picking" className="platform-button primary">
              Alternate Picking
            </Link>
            <Link href="/learn/pentatonic" className="platform-button secondary">
              Pentatonica
            </Link>
          </div>
        </article>
      </section>

      <section className="platform-section">
        <SectionHeader
          kicker="30 DAY CHALLENGE"
          title="Un mes de practica con direccion"
          description="El challenge seria una parte del ebook: 30 dias con consignas chicas, acumulables y medibles. Sin usuarios ni tracking todavia, solo una guia para seguir con la guitarra en la mano."
        />
        <div className="method-challenge-grid">
          {['Dia a dia', 'Tecnica + teoria', 'Aplicacion musical', 'Revision semanal'].map((item) => (
            <div key={item} className="method-chain-node">
              <Target />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="platform-section">
        <SectionHeader
          kicker="INTEGRACION"
          title="El PDF no vive separado de GuitarFlow"
          description="La gracia es que cada parte pueda mandar a una herramienta real: ver la escala, armar una progresion o revisar acordes sin salir del flujo de estudio."
        />
        <div className="method-integration-grid">
          {integrationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="method-integration-card">
              <Waves />
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <span>
                Abrir
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="method-final-cta">
        <div>
          <span className="section-kicker">PRE-LANZAMIENTO</span>
          <h2>Cuando el PDF este listo, te aviso</h2>
          <p>
            Por ahora no hay compra, descarga ni promesa rara. Si te interesa GuitarFlow Method, el boton abre un
            mail para dejarme un mensaje y seguir el proyecto de cerca.
          </p>
        </div>
        <a href={contactHref} className="platform-button primary">
          <Mail className="platform-button-icon" />
          <span>Avisame cuando salga</span>
        </a>
      </section>
    </div>
  );
}
