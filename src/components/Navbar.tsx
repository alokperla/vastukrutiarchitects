"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ];

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? "bg-transparent" : "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100/50 dark:border-gray-800/50"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/brand/vastukruti%20logo.jpeg" alt="Vastukruti Architects" width={38} height={38} className="rounded-full ring-2 ring-white/20 group-hover:ring-blue-400/40 transition-all" />
          <span className={`font-bold text-base tracking-tight transition-colors ${transparent ? "text-white" : "text-gray-900 dark:text-white"}`}>
            Vastukruti Architects
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-all relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-current ${
                pathname === l.href
                  ? transparent ? "text-white after:w-full" : "text-blue-600 dark:text-blue-400 after:w-full"
                  : transparent ? "text-white/80 hover:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 rounded-full transition-all hover:scale-110 ${transparent ? "text-white hover:bg-white/10" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link href="/contact" className="ml-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all hover:scale-105 shadow-sm">
            Get a Quote
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${transparent ? "text-white" : "text-gray-700 dark:text-gray-300"}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-5 flex flex-col gap-4 shadow-xl">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className={`text-base font-medium py-1 border-b border-gray-50 dark:border-gray-900 ${pathname === l.href ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-2 bg-blue-600 text-white text-sm font-semibold py-3 px-5 rounded-full text-center">
            Get a Quote
          </Link>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            {theme === "light" ? <><Moon className="w-4 h-4" /> Dark Mode</> : <><Sun className="w-4 h-4" /> Light Mode</>}
          </button>
        </div>
      )}
    </nav>
  );
}