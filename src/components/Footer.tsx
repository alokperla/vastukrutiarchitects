"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { label: "HOME", href: "/" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SERVICES", href: "/services" },
    { label: "FIRM", href: "/firm" },
    { label: "CONTACT", href: "/contact" },
  ];

  const categoryLinks = [
    { label: "ARCHITECTURE", href: "/projects" },
    { label: "INTERIORS", href: "/projects" },
    { label: "3D VISUALIZATION", href: "/projects" },
    { label: "COMMERCIAL", href: "/projects" },
  ];

  return (
    <footer className="bg-plum-950 text-gray-400 border-t border-plum-900/80 transition-colors">
      {/* Main Structural Grid: 2 Primary Sections on Desktop with Vertical Divider */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        {/* Left Column: Branding, Office Address & Minimalist Socials */}
        <div className="md:col-span-5 lg:col-span-5 md:pr-10 lg:pr-14 md:border-r border-plum-900/80 pb-10 md:pb-0 border-b md:border-b-0 border-plum-900/60 flex flex-col items-center text-center">
          {/* Centered Logo */}
          <Link href="/" className="inline-flex items-center group mb-6 focus:outline-none">
            <Image
              src="/brand/vastukruti_logo_light.png"
              alt="VastuKruti Architects"
              width={220}
              height={56}
              style={{ width: "auto" }}
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Address & Details */}
          <div className="space-y-2 text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm">
            <p className="font-medium text-gray-200 tracking-wide">
              VastuKruti Architects &amp; Interior Studio
            </p>
            <p className="text-gray-400">
              Pune &bull; Mumbai &bull; Ahmedabad, India
            </p>
            <p>
              <a
                href="mailto:vastukrutiarchitects@gmail.com"
                className="hover:text-terracotta-400 transition-colors duration-200"
              >
                vastukrutiarchitects@gmail.com
              </a>
            </p>
            <p>
              <a
                href="tel:+919100010573"
                className="hover:text-terracotta-400 transition-colors duration-200"
              >
                +91 91000 10573
              </a>
            </p>
          </div>

          {/* Minimalist Social Links */}
          <div className="flex items-center justify-center gap-4 mt-7 text-gray-400">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/vastu_kruti24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-terracotta-400 border border-white/10 hover:border-terracotta-500/50 transition-all hover:scale-110 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-terracotta-400 border border-white/10 hover:border-terracotta-500/50 transition-all hover:scale-110 flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.69 1.68 1.69s1.69-.76 1.69-1.69c0-.93-.76-1.68-1.69-1.68Z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:vastukrutiarchitects@gmail.com"
              aria-label="Email"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-terracotta-400 border border-white/10 hover:border-terracotta-500/50 transition-all hover:scale-110 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Pages & Categories Grid */}
        <div className="md:col-span-7 lg:col-span-7 md:pl-8 lg:pl-12 flex flex-col justify-center">
          {/* Section Heading */}
          <h3 className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-semibold mb-8">
            Pages
          </h3>

          {/* Sub-columns Layout */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            {/* Sub-column 1: Main Navigation Links */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-4">
                Navigation
              </p>
              <ul className="flex flex-col gap-3.5">
                {mainLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium tracking-widest text-gray-300 hover:text-terracotta-400 transition-colors uppercase inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-column 2: Project Categories / Highlights */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-4">
                Portfolio
              </p>
              <ul className="flex flex-col gap-3.5">
                {categoryLinks.map((cat) => (
                  <li key={cat.label}>
                    <Link
                      href={cat.href}
                      className="text-xs sm:text-sm font-medium tracking-widest text-gray-300 hover:text-terracotta-400 transition-colors uppercase inline-block"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer (Bottom Bar): Separated by full-width thin border */}
      <div className="border-t border-plum-900/60 px-6 py-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <span>&copy; VastuKruti Architects {currentYear}. All Rights Reserved.</span>
        <span>Designed with care in India</span>
      </div>
    </footer>
  );
}