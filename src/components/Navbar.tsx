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
            <div className="relative flex items-center justify-center p-2 rounded-xl transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]">
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
            </div>
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

            {/* YouTube Link */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isDarkOverlay
                  ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                  : "text-plum-900 dark:text-gray-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-plum-50 dark:hover:bg-neutral-800"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                />
                <polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
          <div className="relative h-11 w-auto flex items-center justify-start overflow-hidden p-1 rounded-lg transition-transform duration-300 hover:scale-[1.03]">
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
          </div>
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
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                />
                <polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}