import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import TituloAnimado from "../components/TituloAnimado";
import { MusicNotationProvider } from "../contexts/MusicNotationContext";
import "./globals.css";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guitar App",
  description: "Proyecto desarrollado con Next.js + React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
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

