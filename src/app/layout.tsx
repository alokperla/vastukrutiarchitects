import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vastukruti Architects – Architecture & Interior Design",
    template: "%s | Vastukruti Architects",
  },
  description: "Vastukruti Architects crafts inspiring residential and commercial spaces that blend timeless tradition with modern innovation. Based in India.",
  keywords: ["architecture", "interior design", "residential", "commercial", "India", "Vastukruti"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vastukruti Architects",
    title: "Vastukruti Architects – Architecture & Interior Design",
    description: "Crafting inspiring spaces that blend tradition and innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased scroll-smooth", playfair.variable, dmSans.variable)}
    >
      <body className="flex flex-col min-h-screen font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <FloatingActions />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}