import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import TituloAnimado from "../components/TituloAnimado";
import "./globals.css";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-theme="dark"
      >
        <Navbar />
        <TituloAnimado />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

