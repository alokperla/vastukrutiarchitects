"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  const isHome = pathname === "/";
  // Dark overlay only applies to the Home page hero before user scrolls
  const isDarkOverlay = isHome && !scrolled;

  const leftLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
  ];

  const rightLinks = [
    { href: "/firm", label: "Firm" },
    { href: "/contact", label: "Contact Us" },
  ];

  const allMobileLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/firm", label: "Firm" },
    { href: "/contact", label: "Contact Us" },
  ];

  // Dynamic border dividers matching route & background state
  const dividerBorder = isDarkOverlay
    ? "border-white/15"
    : "border-black/10 dark:border-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isDarkOverlay
          ? "bg-transparent border-b border-white/15"
          : "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-black/10 dark:border-white/10"
      }`}
    >
      {/* ========================================================================= */}
      {/* DESKTOP SPLIT HEADER (UNIFORM BALANCED HEIGHT WITH LARGER ANIMATED LOGO)   */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex items-stretch w-full max-w-[1440px] mx-auto h-[80px]">
        {/* 1. LEFT NAVIGATION BLOCK */}
        <div className="flex-1 flex items-stretch">
          {leftLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-1 flex items-center justify-center text-center px-4 h-full border-r ${dividerBorder} group relative transition-colors duration-200 ${
                  isActive
                    ? isDarkOverlay
                      ? "text-terracotta-400 font-semibold"
                      : "text-terracotta-600 dark:text-terracotta-400 font-semibold"
                    : isDarkOverlay
                    ? "text-white/90 hover:text-white"
                    : "text-plum-900/85 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400"
                }`}
              >
                <span
                  className={`text-xs sm:text-[13px] font-medium tracking-[0.18em] uppercase transition-transform group-hover:scale-105 ${
                    isDarkOverlay
                      ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                      : ""
                  }`}
                >
                  {link.label}
                </span>

                {/* Subtle active/hover bottom accent line */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "bg-terracotta-500 opacity-100"
                      : isDarkOverlay
                      ? "bg-terracotta-400/80 opacity-0 group-hover:opacity-100"
                      : "bg-terracotta-500 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* 2. CENTER BLOCK (PROMINENT ANIMATED BRAND LOGO) */}
        <div
          className={`shrink-0 flex items-center justify-center px-8 lg:px-10 xl:px-14 h-full border-r ${dividerBorder}`}
        >
          <Link
            href="/"
            className="flex items-center justify-center group/logo focus:outline-none"
          >
            {/* Framer Motion Entry Reveal & Tactile Hover State */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                scale: { type: "spring", stiffness: 350, damping: 25 },
              }}
              style={{ willChange: "transform" }}
              className="relative flex items-center justify-center p-2 rounded-xl"
            >
              <div className="relative h-12 sm:h-14 lg:h-[54px] xl:h-[58px] w-auto flex items-center justify-center">
                <Image
                  src="/brand/vastukruti_logo_transparent.png"
                  alt="VastuKruti Architects"
                  width={240}
                  height={60}
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className={`max-h-12 sm:max-h-14 lg:max-h-[54px] xl:max-h-[58px] w-auto object-contain transition-all duration-500 ${
                    isDarkOverlay
                      ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover/logo:drop-shadow-[0_0_24px_rgba(255,255,255,0.42)]"
                      : "dark:brightness-0 dark:invert drop-shadow-sm group-hover/logo:drop-shadow-[0_6px_22px_rgba(202,93,54,0.38)]"
                  }`}
                />

                {/* Luxury Sheen / Shimmer Beam Sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                  <motion.div
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/45 dark:via-white/55 to-transparent skew-x-[-25deg] mix-blend-overlay opacity-60 group-hover/logo:opacity-100 transition-opacity duration-300"
                    animate={{
                      x: ["-200%", "280%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      duration: 1.6,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* 3. RIGHT NAVIGATION BLOCK */}
        <div className="flex-1 flex items-stretch">
          {/* Firm & About Link Cells */}
          {rightLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-1 flex items-center justify-center text-center px-4 h-full border-r ${dividerBorder} group relative transition-colors duration-200 ${
                  isActive
                    ? isDarkOverlay
                      ? "text-terracotta-400 font-semibold"
                      : "text-terracotta-600 dark:text-terracotta-400 font-semibold"
                    : isDarkOverlay
                    ? "text-white/90 hover:text-white"
                    : "text-plum-900/85 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400"
                }`}
              >
                <span
                  className={`text-xs sm:text-[13px] font-medium tracking-[0.18em] uppercase transition-transform group-hover:scale-105 ${
                    isDarkOverlay
                      ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                      : ""
                  }`}
                >
                  {link.label}
                </span>

                {/* Subtle active/hover bottom accent line */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "bg-terracotta-500 opacity-100"
                      : isDarkOverlay
                      ? "bg-terracotta-400/80 opacity-0 group-hover:opacity-100"
                      : "bg-terracotta-500 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}

          {/* Controls & Social Icons Cell */}
          <div className="flex items-center justify-center px-5 xl:px-8 gap-3 sm:gap-4 h-full">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isDarkOverlay
                  ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                  : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/vastu_kruti24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isDarkOverlay
                  ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                  : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isDarkOverlay
                  ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                  : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.69 1.68 1.69s1.69-.76 1.69-1.69c0-.93-.76-1.68-1.69-1.68Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET HEADER (< lg)                                             */}
      {/* ========================================================================= */}
      <div
        className={`flex lg:hidden items-center justify-between px-4 sm:px-6 h-[72px] ${
          isDarkOverlay ? "bg-transparent" : "bg-transparent"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 group/mobile focus:outline-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            className="relative h-11 w-auto flex items-center justify-start overflow-hidden p-1 rounded-lg"
          >
            <Image
              src="/brand/vastukruti_logo_transparent.png"
              alt="VastuKruti Architects"
              width={180}
              height={46}
              priority
              style={{ width: "auto", height: "auto" }}
              className={`max-h-11 w-auto object-contain transition-all duration-300 ${
                isDarkOverlay
                  ? "brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  : "dark:brightness-0 dark:invert drop-shadow-sm"
              }`}
            />
          </motion.div>
        </Link>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 rounded-full transition-colors ${
              isDarkOverlay
                ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-full transition-colors ${
              isDarkOverlay
                ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
            }`}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className={`lg:hidden px-6 py-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-2 duration-200 border-t ${
            isDarkOverlay
              ? "bg-plum-950/98 dark:bg-gray-950/98 border-white/15"
              : "bg-white/98 dark:bg-gray-950/98 border-black/10 dark:border-neutral-800"
          }`}
        >
          {allMobileLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-2.5 px-3.5 rounded-xl transition-colors ${
                pathname === l.href
                  ? "bg-terracotta-50 dark:bg-terracotta-950/50 text-terracotta-600 dark:text-terracotta-400 font-semibold"
                  : isDarkOverlay
                  ? "text-white/85 hover:text-white hover:bg-white/10"
                  : "text-plum-900/80 dark:text-gray-300 hover:bg-plum-50 dark:hover:bg-neutral-900"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile Social Links Row */}
          <div className="flex items-center gap-3 pt-4 mt-2 border-t border-black/10 dark:border-white/10">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium mr-1">Follow Us:</span>
            <a
              href="https://www.instagram.com/vastu_kruti24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.69 1.68 1.69s1.69-.76 1.69-1.69c0-.93-.76-1.68-1.69-1.68Z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}