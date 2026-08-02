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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent py-1"
          : "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100/50 dark:border-gray-800/50 py-0.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded-lg transition-transform hover:scale-[1.02]"
        >
          <div className="relative h-10 sm:h-11 md:h-12 w-auto flex items-center justify-start">
            <Image
              src="/brand/newvastukrutilogo.png"
              alt="Vastukruti Architects - Architecture & Interiors"
              width={180}
              height={48}
              priority
              style={{ width: "auto" }}
              className={`h-full w-auto object-contain transition-all duration-300 ${
                transparent
                  ? "brightness-0 invert drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
                  : "dark:brightness-0 dark:invert drop-shadow-sm"
              }`}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-all relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-current ${
                  pathname === l.href
                    ? transparent
                      ? "text-white after:w-full font-semibold"
                      : "text-terracotta-600 dark:text-terracotta-400 after:w-full font-semibold"
                    : transparent
                    ? "text-white/80 hover:text-white"
                    : "text-plum-900/80 dark:text-gray-300 hover:text-plum-900 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200/40 dark:border-gray-800/60">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-plum-900/80 dark:text-gray-300 hover:bg-plum-50 dark:hover:bg-gray-800"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <Link
              href="/contact"
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all hover:scale-105 shadow-md shadow-terracotta-600/20 active:scale-95 shrink-0"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 rounded-full transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "text-plum-900 dark:text-gray-300 hover:bg-plum-50 dark:hover:bg-gray-800"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-full transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "text-plum-900 dark:text-gray-300 hover:bg-plum-50 dark:hover:bg-gray-800"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-gray-950/98 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-6 py-5 flex flex-col gap-4 shadow-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === l.href
                  ? "bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-600 dark:text-terracotta-400 font-semibold"
                  : "text-plum-900/80 dark:text-gray-300 hover:bg-plum-50 dark:hover:bg-gray-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-semibold py-3 px-5 rounded-full text-center shadow-md active:scale-98 transition-all"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}