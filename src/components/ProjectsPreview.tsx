"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

const featured = projects.slice(0, 6);

export default function ProjectsPreview() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-plum-900 dark:text-white">Featured Projects</h2>
          </div>
          <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 font-semibold text-sm transition-colors group">
            View All Projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Link key={i} href={`/projects/${p.slug}`} className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-terracotta-500/50 transition-all">
              <Image src={p.src} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs text-terracotta-300 uppercase tracking-widest font-semibold">{p.category}</span>
                <h3 className="text-white font-semibold text-base mt-1">{p.title}</h3>
                <p className="text-white/70 text-xs mt-1">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/projects" className="inline-flex items-center gap-2 text-terracotta-600 dark:text-terracotta-400 font-semibold text-sm">
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}