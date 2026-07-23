"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/projects/residentail interior 1.2.png"
        alt="Vastukruti Architects hero"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4 font-light">
          Architecture &amp; Interior Design
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Spaces That
          <span className="block italic font-light">Inspire</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          Crafting architectural masterpieces that blend timeless tradition with contemporary innovation — every detail, intentional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="inline-block bg-white text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            View Our Projects
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white/60 text-white font-medium py-4 px-8 rounded-full hover:border-white hover:bg-white/10 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}