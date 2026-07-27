import type { Metadata } from "next";
import {
  Bebas_Neue,
  Inter,
  Playfair_Display,
  Raleway,
  Space_Mono,
} from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalMetronomePlayer from "../components/GlobalMetronomePlayer";
import { ThemeProvider } from "../components/ThemeProvider";
import { MetronomeProvider } from "../contexts/MetronomeContext";
import { MusicNotationProvider } from "../contexts/MusicNotationContext";
import "./globals.css";
import "../styles/globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GuitarFlow | Plataforma de estudio de guitarra",
    template: "%s",
  },
  description: "Herramientas, lecciones, metodo de estudio y practica interactiva para aprender guitarra con claridad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${playfairDisplay.variable} ${raleway.variable} ${inter.variable} ${spaceMono.variable} app-body antialiased`}
        data-theme="dark"
      >
        <ThemeProvider>
          <MusicNotationProvider>
            <MetronomeProvider>
              <div className="app-shell">
                <Navbar />
                <div className="app-frame">
                  <main className="app-main">
                    <div className="page-shell">{children}</div>
                  </main>
                </div>
                <Footer />
                <GlobalMetronomePlayer />
              </div>
            </MetronomeProvider>
          </MusicNotationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
