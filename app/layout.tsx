import type { Metadata } from "next";
import { Bebas_Neue, Playfair_Display, Raleway } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import TituloAnimado from "../components/TituloAnimado";
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

export const metadata: Metadata = {
  title: "GuitarFlow - Herramientas de Guitarra",
  description: "Aplicación moderna para músicos con afinador, escalas, acordes y más herramientas de guitarra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
     <body
        className={`${bebasNeue.variable} ${playfairDisplay.variable} ${raleway.variable} antialiased`}
        data-theme="dark"
      >
        <MusicNotationProvider>
          <Navbar />
          <TituloAnimado />
          <main>{children}</main>
          <Footer />
        </MusicNotationProvider>
      </body>
    </html>
  );
}

