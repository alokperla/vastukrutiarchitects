"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4 group">
            <Image src="/brand/vastukruti%20logo.jpeg" alt="Vastukruti Architects" width={44} height={44} className="rounded-full ring-1 ring-gray-700" />
            <span className="text-white font-bold text-lg">Vastukruti Architects</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Crafting inspiring spaces that blend timeless tradition with contemporary innovation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Navigation</h3>
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Connect</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href="mailto:vastukrutiarchitects@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              vastukrutiarchitects@gmail.com
            </a>
            <a href="https://www.instagram.com/vastu_kruti24" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5}/>
                <circle cx="12" cy="12" r="4" strokeWidth={1.5}/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @vastu_kruti24
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/60 px-6 py-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
        <span>Copyright {year} Vastukruti Architects. All rights reserved.</span>
        <span>Designed with care in India</span>
      </div>
    </footer>
  );
}