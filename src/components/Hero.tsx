"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-hero bg-cover bg-center flex items-center justify-center">
      {/* Glass‑morphism overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
          Vastukruti Architects
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Crafting inspiring spaces that blend tradition and innovation.
        </p>
        <Link
          href="/projects"
          className="inline-block bg-primary hover:bg-primary/80 text-white font-medium py-3 px-6 rounded-full transition-colors animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          Explore Our Projects
        </Link>
      </div>
    </section>
  );
}
