"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { projects as staticProjects, Project } from "@/lib/projects";
import { useState, useCallback, useEffect } from "react";

const categories = ["All", "Interior", "Architecture", "Commercial"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [allProjectsList, setAllProjectsList] = useState<Project[]>(staticProjects);

  // Fetch DB projects & combine with static projects
  useEffect(() => {
    async function loadDbProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const dbProjects = await res.json();
          if (Array.isArray(dbProjects) && dbProjects.length > 0) {
            const mappedDb: Project[] = dbProjects.map((p) => ({
              slug: p.slug,
              src: p.coverImage,
              gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.coverImage],
              title: p.title,
              category: p.category,
              desc: p.description,
              year: p.year,
              location: p.location,
              area: p.area,
              scope: p.scope || [],
            }));
            // Combine DB projects at the top, avoiding duplicate slugs
            const dbSlugs = new Set(mappedDb.map((p) => p.slug));
            const remainingStatic = staticProjects.filter((p) => !dbSlugs.has(p.slug));
            setAllProjectsList([...mappedDb, ...remainingStatic]);
          }
        }
      } catch (err) {
        console.error("Error loading DB projects:", err);
      }
    }
    loadDbProjects();
  }, []);

  const filtered = active === "All" ? allProjectsList : allProjectsList.filter((p) => p.category === active);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const next = useCallback(() => setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null)), [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, prev, next]);

  const lbProject = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* Hero */}
        <div className="relative h-64 md:h-80 flex items-center justify-center bg-gray-950 overflow-hidden">
          <Image src="/projects/residentail interior 1.2.png" alt="Projects" fill priority sizes="100vw" className="object-cover object-center opacity-40" />
          <div className="relative z-10 text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-3">Portfolio</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Our Projects</h1>
            <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">Every space tells a story. Here are some of ours.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Filters */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => { setActive(c); setLightboxIdx(null); }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all border ${active === c ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/20" : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"}`}>
                {c}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${active === c ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`}>
                  {c === "All" ? allProjectsList.length : allProjectsList.filter(p => p.category === c).length}
                </span>
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((p, i) => (
              <div key={`${p.slug}-${i}`} className="break-inside-avoid group relative block overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
                <Link href={`/projects/${p.slug}`}>
                  <Image src={p.src} alt={p.title} width={600} height={450} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs text-blue-300 uppercase tracking-widest font-medium">{p.category}</span>
                    <h3 className="text-white font-semibold text-base mt-1">{p.title}</h3>
                    <p className="text-white/60 text-xs mt-1">{p.location} &bull; {p.year}</p>
                  </div>
                </Link>
                {/* Quick-view button */}
                <button
                  onClick={() => setLightboxIdx(i)}
                  className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Quick view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lbProject && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-5 right-5 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="absolute top-5 left-5 z-10 text-white/60 text-sm font-medium">{(lightboxIdx ?? 0) + 1} / {filtered.length}</div>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white" aria-label="Previous">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative max-w-5xl w-full mx-16 max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lbProject.src} alt={lbProject.title} width={1200} height={900} sizes="90vw" className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
            <div className="mt-4 text-center">
              <span className="text-xs text-blue-400 uppercase tracking-widest font-medium">{lbProject.category}</span>
              <h3 className="text-white font-bold text-xl mt-1">{lbProject.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{lbProject.location} &bull; {lbProject.year}</p>
              <Link href={`/projects/${lbProject.slug}`} onClick={closeLightbox} className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium underline underline-offset-4">
                View Full Project
              </Link>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white" aria-label="Next">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  );
}