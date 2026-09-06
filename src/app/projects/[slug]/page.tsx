"use client";

import { projects as staticProjects, Project, getYouTubeEmbedUrl } from "@/lib/projects";
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
      // Check static projects first
      const staticMatch = staticProjects.find((p) => p.slug === slug);
      if (staticMatch) {
        setProject(staticMatch);
        setOthers(staticProjects.filter((p) => p.slug !== slug).slice(0, 3));
        setLoading(false);
        return;
      }

      // If not in static, fetch from DB API
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const dbProjects = await res.json();
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
            };
            setProject(mapped);
            setOthers(staticProjects.slice(0, 3));
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
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-terracotta-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-terracotta-600 transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-plum-900 dark:text-gray-200 font-semibold truncate max-w-xs">{project.title}</span>
          </nav>

          {/* ========================================================================= */}
          {/* 1. TOP: PROJECT DESCRIPTION / OVERVIEW                                    */}
          {/* ========================================================================= */}
          <section className="mb-14 pb-12 border-b border-plum-100/70 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-terracotta-50 dark:bg-terracotta-950/50 text-terracotta-700 dark:text-terracotta-300 text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full font-semibold border border-terracotta-200/60 dark:border-terracotta-800/40">
                {project.category}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {project.location} &bull; {project.year}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-plum-900 dark:text-white tracking-tight mb-6">
              {project.title}
            </h1>

            <div className="max-w-4xl">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light mb-8">
                {project.desc}
              </p>

              {project.scope && project.scope.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
                    Scope of Architectural Work
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((item) => (
                      <span
                        key={item}
                        className="px-3.5 py-1.5 bg-plum-50/70 dark:bg-gray-900 text-plum-900 dark:text-gray-200 text-xs sm:text-sm rounded-full font-medium border border-plum-100 dark:border-gray-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. COVER PHOTO SECTION                                                    */}
          {/* Primary cover photo with accompanying caption directly underneath          */}
          {/* ========================================================================= */}
          <section className="mb-16">
            <div className="group relative w-full overflow-hidden rounded-3xl bg-gray-950 shadow-2xl border border-plum-100/60 dark:border-gray-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.005]"
              />
            </div>

            {/* Accompanying Cover Photo Caption / Short Description placed directly underneath */}
            <div className="mt-4 px-2 sm:px-4 flex items-start gap-3">
              <div className="w-1 h-5 bg-terracotta-500 rounded-full shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light italic leading-relaxed">
                {project.coverCaption
                  ? project.coverCaption
                  : `Primary architectural visual of ${project.title} (${project.location}).`}
              </p>
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
          {/* 5. FOOTER DETAILS                                                         */}
          {/* Specifications, Metadata, Enquiry CTA, and Related Projects                */}
          {/* ========================================================================= */}
          <section className="pt-10 border-t border-plum-100 dark:border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* Left 2 Cols: Project Specs */}
              <div className="lg:col-span-2">
                <h3 className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-4">
                  Project Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Year Completed", value: project.year },
                    { label: "Location", value: project.location },
                    { label: "Built Area", value: project.area },
                    { label: "Discipline", value: project.category },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-5 rounded-2xl bg-plum-50/40 dark:bg-gray-900/60 border border-plum-100/70 dark:border-gray-800"
                    >
                      <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-base font-bold text-plum-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Consultation Action */}
              <div className="bg-plum-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-terracotta-400 font-semibold">
                    Inquire
                  </span>
                  <h4 className="text-xl font-bold mt-1 text-white">
                    Start a Project Like This
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Have an upcoming residential or commercial commission? Speak directly with our architectural leadership.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="w-full text-center bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-terracotta-600/30"
                  >
                    Enquire About This Project
                  </Link>
                  <Link
                    href="/projects"
                    className="w-full text-center border border-white/20 hover:border-white text-white text-sm font-medium py-3 px-6 rounded-xl transition-all"
                  >
                    View All Projects
                  </Link>
                </div>
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
                          {p.location} &bull; {p.year}
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