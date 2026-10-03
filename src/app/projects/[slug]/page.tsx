"use client";

import { Project, getYouTubeEmbedUrl } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect, use, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [others, setOthers] = useState<Project[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const dbProjects = await res.json();
          if (Array.isArray(dbProjects)) {
            const dbMatch = dbProjects.find((p: any) => p.slug === slug);
            if (dbMatch) {
              const mapped: Project = {
                slug: dbMatch.slug,
                src: dbMatch.coverImage,
                gallery: dbMatch.gallery && dbMatch.gallery.length > 0 ? dbMatch.gallery : [dbMatch.coverImage],
                title: dbMatch.title,
                category: dbMatch.category,
                desc: dbMatch.description,
                year: dbMatch.year,
                location: dbMatch.location,
                area: dbMatch.area,
                scope: dbMatch.scope || [],
                coverCaption: dbMatch.coverCaption || "",
                videoUrl: dbMatch.videoUrl || (dbMatch.youtubeUrls && dbMatch.youtubeUrls[0]) || "",
                isFeatured: dbMatch.isFeatured,
              };
              setProject(mapped);

              const otherDbProjects: Project[] = dbProjects
                .filter((p: any) => p.slug !== slug && p.published !== false)
                .slice(0, 3)
                .map((p: any) => ({
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
                  coverCaption: p.coverCaption || "",
                  videoUrl: p.videoUrl || "",
                  isFeatured: p.isFeatured,
                }));
              setOthers(otherDbProjects);
            } else {
              setProject(null);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load project details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  // Gallery calculation: Remaining project photos (or all gallery photos if distinct)
  const remainingGallery = project
    ? project.gallery.filter((img) => img !== project.src && Boolean(img))
    : [];
  // If all images match cover or gallery had 1 image, provide whatever gallery has
  const displayGallery = remainingGallery.length > 0 ? remainingGallery : (project?.gallery || []);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevLightbox = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i - 1 + displayGallery.length) % displayGallery.length : null
      ),
    [displayGallery.length]
  );
  const nextLightbox = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i + 1) % displayGallery.length : null
      ),
    [displayGallery.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, prevLightbox, nextLightbox]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 flex justify-center items-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading project narrative...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-32 text-center px-6">
        <h1 className="text-3xl font-bold text-plum-900 dark:text-white mb-4">Project Not Found</h1>
        <p className="text-gray-500 mb-6">The architectural project you are looking for does not exist or has been moved.</p>
        <Link
          href="/projects"
          className="inline-block bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-3 px-6 rounded-full transition-all"
        >
          ← Return to Portfolio
        </Link>
      </main>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);

  return (
    <>
      <main className="min-h-screen bg-stone-50/40 dark:bg-gray-950 pt-24 pb-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-8 sm:mb-12 font-medium tracking-wide">
            <Link href="/" className="hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors uppercase">
              Home
            </Link>
            <span className="text-stone-400 dark:text-stone-600 text-[10px]">&gt;</span>
            <Link href="/projects" className="hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors uppercase">
              Projects
            </Link>
            <span className="text-stone-400 dark:text-stone-600 text-[10px]">&gt;</span>
            <span className="text-plum-950 dark:text-stone-200 font-semibold truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </nav>

          {/* ========================================================================= */}
          {/* 1. 2-COLUMN SPLIT HEADER LAYOUT (Essajees Atelier Inspired)               */}
          {/* ========================================================================= */}
          <header className="mb-14 sm:mb-16 md:mb-20 pb-12 sm:pb-16 border-b border-stone-200/80 dark:border-stone-800/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Primary Info & Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                {/* Project Title: Large, elegant serif heading */}
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal text-plum-950 dark:text-stone-100 tracking-tight leading-[1.12]">
                  {project.title}
                </h1>

                {/* Subtitle / Tagline: Clean sans-serif descriptive sentence directly under title */}
                <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                  {project.area
                    ? `Exploring scale, light, and bespoke material craftsmanship across ${project.area}.`
                    : `A considered study in spatial balance and contemporary architectural design.`}
                </p>

                {/* Narrative Summary Paragraph */}
                <p className="mt-5 sm:mt-6 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed font-light">
                  {project.desc}
                </p>
              </div>

              {/* Right Column: Metadata Sidebar Block with Desktop Vertical Divider */}
              <div className="lg:col-span-5 lg:border-l lg:border-stone-200/80 dark:lg:border-stone-800/80 lg:pl-12 flex flex-col justify-start">
                <div className="space-y-5 sm:space-y-6">
                  {/* CATEGORY */}
                  <div className="pb-4 sm:pb-5 border-b border-stone-200/60 dark:border-stone-800/60">
                    <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                      Category
                    </span>
                    <span className="text-sm sm:text-base font-medium text-plum-950 dark:text-stone-100 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>

                  {/* YEAR */}
                  <div className="pb-4 sm:pb-5 border-b border-stone-200/60 dark:border-stone-800/60">
                    <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                      Year
                    </span>
                    <span className="text-sm sm:text-base font-medium text-plum-950 dark:text-stone-100 tracking-wide">
                      {project.year}
                    </span>
                  </div>

                  {/* BUILT AREA (if present) */}
                  {project.area && (
                    <div className="pb-4 sm:pb-5 border-b border-stone-200/60 dark:border-stone-800/60 last:border-b-0">
                      <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                        Built Area
                      </span>
                      <span className="text-sm sm:text-base font-medium text-plum-950 dark:text-stone-100 tracking-wide">
                        {project.area}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* 2. COVER PHOTO SECTION                                                    */}
          {/* ========================================================================= */}
          <section className="mb-14 sm:mb-18">
            <div className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-stone-950 shadow-2xl border border-stone-200/60 dark:border-stone-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.005]"
              />
            </div>

            {/* Accompanying Cover Photo Caption */}
            <div className="mt-4 px-2 sm:px-4 flex items-start gap-3">
              <div className="w-1 h-5 bg-terracotta-500 rounded-full shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light italic leading-relaxed">
                {project.coverCaption
                  ? project.coverCaption
                  : `Primary architectural visual of ${project.title}.`}
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. DETAILED PROJECT WRITE-UP / NARRATIVE                                  */}
          {/* ========================================================================= */}
          <section className="mb-16 sm:mb-20 py-10 sm:py-12 border-y border-stone-200/80 dark:border-stone-800/80">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold block mb-3">
                Architectural Narrative
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-plum-950 dark:text-stone-100 font-normal leading-snug mb-6">
                &ldquo;Every spatial choice was guided by an appreciation for light, refined proportions, and tactile craftsmanship.&rdquo;
              </h3>
              <div className="text-stone-600 dark:text-stone-300 font-light text-base sm:text-lg leading-relaxed space-y-4">
                <p>{project.desc}</p>
                <p>
                  From concept ideation to handcrafted finishes, each surface and threshold was curated to balance everyday functionality with quiet architectural poetry.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. PHOTO GALLERY                                                          */}
          {/* All remaining project images in auto-adjusting responsive grid            */}
          {/* ========================================================================= */}
          {displayGallery.length > 0 && (
            <section className="mb-16 pt-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                    Visual Exploration
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 dark:text-white mt-1">
                    Project Gallery
                  </h2>
                </div>
                <span className="text-xs text-gray-400">
                  {displayGallery.length} {displayGallery.length === 1 ? "Photograph" : "Photographs"}
                </span>
              </div>

              {/* Auto-adjusting responsive masonry grid where cards flex and tile cleanly based on native photo aspect ratios */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {displayGallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIdx(idx)}
                    className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-plum-100/70 dark:border-gray-800 cursor-pointer shadow-sm hover:shadow-xl hover:border-terracotta-400/60 transition-all duration-300"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery detail ${idx + 1}`}
                      className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="text-xs text-white/90 font-medium">View Image #{idx + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 4. EMBEDDED VIDEO                                                         */}
          {/* Responsive YouTube video player embedding URL provided via admin          */}
          {/* ========================================================================= */}
          {embedUrl && (
            <section className="mb-16 pt-6">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                  Cinematic Walkthrough
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 dark:text-white mt-1">
                  Video Feature
                </h2>
              </div>

              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-plum-100/60 dark:border-gray-800">
                <iframe
                  src={embedUrl}
                  title={`${project.title} Video Feature`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 5. CONSULTATION CTA & RELATED PROJECTS                                     */}
          {/* ========================================================================= */}
          <section className="pt-10 border-t border-stone-200/80 dark:border-stone-800/80">
            {/* Consultation Action Banner */}
            <div className="bg-plum-950 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-semibold">
                  Inquire
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl font-normal mt-2 text-white">
                  Start a Project Like This
                </h4>
                <p className="text-stone-300 text-sm sm:text-base mt-2 font-light leading-relaxed">
                  Have an upcoming residential or commercial commission? Speak directly with our architectural leadership to discuss your vision.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="text-center bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold tracking-[0.2em] uppercase py-3.5 px-7 rounded-sm transition-all hover:scale-[1.02] shadow-md shadow-terracotta-600/30"
                >
                  Enquire About This Project
                </Link>
                <Link
                  href="/projects"
                  className="text-center border border-white/20 hover:border-white text-white text-xs font-medium tracking-[0.2em] uppercase py-3.5 px-7 rounded-sm transition-all"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            {/* Related Projects Carousel/Grid */}
            {others.length > 0 && (
              <div className="mt-20 pt-16 border-t border-plum-100/70 dark:border-gray-800">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                      Curated Works
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 dark:text-white mt-1">
                      Explore More Projects
                    </h3>
                  </div>
                  <Link
                    href="/projects"
                    className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 hover:underline uppercase tracking-wider"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {others.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group block overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-plum-100/80 dark:border-gray-800 hover:border-terracotta-400/50 hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={p.src}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] text-terracotta-600 dark:text-terracotta-400 uppercase tracking-widest font-semibold">
                          {p.category}
                        </span>
                        <h4 className="font-bold text-plum-900 dark:text-white text-base mt-1 group-hover:text-terracotta-600 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {p.year}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {displayGallery.length > 1 && (
            <>
              <button
                onClick={prevLightbox}
                className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh]">
              <Image
                src={displayGallery[lightboxIdx]}
                alt={`${project.title} visual ${lightboxIdx + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center text-xs text-white/70">
              Photo {lightboxIdx + 1} of {displayGallery.length} &bull; {project.title}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}