"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { projects as staticProjects, Project } from "@/lib/projects";
import { useState, useCallback, useEffect } from "react";

const categories = ["All", "Interior", "Architecture", "Commercial", "3D Visualization"];

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

  const filtered =
    active === "All"
      ? allProjectsList
      : allProjectsList.filter(
          (p) => p.category?.toLowerCase() === active.toLowerCase()
        );

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i - 1 + filtered.length) % filtered.length : null
      ),
    [filtered.length]
  );
  const next = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i + 1) % filtered.length : null
      ),
    [filtered.length]
  );

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
      <main className="min-h-screen bg-stone-50/50 dark:bg-gray-950 pt-20 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 flex items-center justify-center bg-plum-950 overflow-hidden">
          <Image
            src="/projects/residentail interior 1.2.png"
            alt="Projects"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="relative z-10 text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta-400 font-semibold mb-3">
              Portfolio
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-normal text-white tracking-tight">
              Our Projects
            </h1>
            <p className="text-gray-300 mt-3 max-w-md mx-auto text-sm leading-relaxed font-light">
              Every space tells a story. Discover our curated portfolio of residential, commercial, and architectural works.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
          {/* Category Filter Bar */}
          <div className="flex gap-2.5 sm:gap-3 justify-center mb-10 md:mb-16 flex-wrap">
            {categories.map((c) => {
              const count =
                c === "All"
                  ? allProjectsList.length
                  : allProjectsList.filter(
                      (p) => p.category?.toLowerCase() === c.toLowerCase()
                    ).length;

              const isSelected = active === c;

              return (
                <button
                  key={c}
                  onClick={() => {
                    setActive(c);
                    setLightboxIdx(null);
                  }}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border ${
                    isSelected
                      ? "bg-plum-950 text-white border-plum-950 shadow-md shadow-plum-950/20 dark:bg-stone-100 dark:text-plum-950 dark:border-stone-100"
                      : "text-plum-950/70 dark:text-stone-300 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-terracotta-400 hover:text-terracotta-600 dark:hover:border-terracotta-400 dark:hover:text-terracotta-400"
                  }`}
                >
                  {c}
                  <span
                    className={`ml-2 text-[11px] px-1.5 py-0.5 rounded-full transition-colors ${
                      isSelected
                        ? "bg-white/20 text-white dark:bg-plum-950/20 dark:text-plum-950"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Project List (Essajees Atelier Inspired) */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-stone-500 dark:text-stone-400 text-lg font-light">
                No projects found in this category.
              </p>
              <button
                onClick={() => setActive("All")}
                className="mt-4 text-xs font-semibold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 underline underline-offset-4 hover:opacity-80"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-200/90 dark:divide-stone-800/80">
              {filtered.map((p, i) => (
                <article
                  key={`${p.slug}-${i}`}
                  className="py-12 sm:py-16 md:py-20 lg:py-24 first:pt-4 last:pb-8 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
                    {/* Left Side: Text Content (Mobile: underneath / order-2, Desktop: Left / order-1) */}
                    <div className="order-2 md:order-1 md:col-span-5 flex flex-col justify-center">
                      {/* Project Title */}
                      <Link href={`/projects/${p.slug}`} className="block group/title">
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-3xl lg:text-[40px] font-normal text-plum-950 dark:text-stone-100 tracking-tight leading-[1.2] group-hover/title:text-terracotta-600 dark:group-hover/title:text-terracotta-400 transition-colors duration-300">
                          {p.title}
                        </h2>
                      </Link>

                      {/* Category (Subtle uppercase text directly under title) */}
                      <p className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] tracking-[0.22em] uppercase font-semibold text-terracotta-600 dark:text-terracotta-400">
                        {p.category}
                      </p>

                      {/* Short Description (Concise 2–3 line summary paragraph) */}
                      <p className="mt-4 sm:mt-6 text-stone-600 dark:text-stone-300 text-sm sm:text-base font-light leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Call to Action (CTA Outline / Ghost button) */}
                      <div className="mt-6 sm:mt-8">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 border border-plum-950/40 dark:border-stone-400/40 text-plum-950 dark:text-stone-100 hover:bg-plum-950 hover:text-white dark:hover:bg-stone-100 dark:hover:text-plum-950 text-xs font-semibold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 group/btn"
                        >
                          <span>EXPLORE PROJECT</span>
                          <svg
                            className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Right Side: Featured Image (Mobile: top / order-1, Desktop: Right / order-2) */}
                    <div className="order-1 md:order-2 md:col-span-7">
                      <div className="group/img relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[10px] overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-sm transition-all duration-500 hover:shadow-xl">
                        <Link href={`/projects/${p.slug}`} className="block w-full h-full relative">
                          <Image
                            src={p.src}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-plum-950/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        </Link>

                        {/* Quick View Button Overlay */}
                        <button
                          onClick={() => setLightboxIdx(i)}
                          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-plum-950/70 hover:bg-terracotta-600 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-all duration-300 shadow-lg cursor-pointer"
                          aria-label={`Quick view ${p.title}`}
                          title="Quick view photo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lbProject && (
        <div
          className="fixed inset-0 z-50 bg-plum-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 bg-white/10 hover:bg-terracotta-600 rounded-full p-3 text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute top-5 left-5 z-10 text-white/70 text-sm font-medium">
            {(lightboxIdx ?? 0) + 1} / {filtered.length}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-terracotta-600 rounded-full p-3 text-white transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full mx-auto max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] max-h-[70vh]">
              <Image
                src={lbProject.src}
                alt={lbProject.title}
                fill
                sizes="90vw"
                className="object-contain rounded-xl shadow-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-terracotta-400 uppercase tracking-widest font-semibold">
                {lbProject.category}
              </span>
              <h3 className="font-heading text-white font-normal text-2xl mt-1">
                {lbProject.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {lbProject.year}
              </p>
              <Link
                href={`/projects/${lbProject.slug}`}
                onClick={closeLightbox}
                className="inline-block mt-4 text-terracotta-400 hover:text-terracotta-300 text-xs font-semibold uppercase tracking-widest underline underline-offset-4"
              >
                View Full Project
              </Link>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}