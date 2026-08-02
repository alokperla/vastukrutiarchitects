"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/projects/front%20page%20image.jpg"
        alt="Vastukruti Architects hero"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-400 font-semibold mb-4 drop-shadow-sm">
          Architecture &amp; Interior Design
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Spaces That{" "}
          <span className="text-terracotta-400 italic font-light">Inspire</span>
        </h1>
        <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          Crafting architectural masterpieces that blend timeless tradition with contemporary innovation — every detail, intentional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="inline-block bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl shadow-terracotta-600/30 active:scale-95"
          >
            View Our Projects
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white/70 text-white font-medium py-4 px-8 rounded-full hover:border-white hover:bg-white/10 transition-all active:scale-95"
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