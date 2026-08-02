"use client";

import { projects as staticProjects, Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect, use } from "react";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [others, setOthers] = useState<Project[]>([]);

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

      // If not in static, fetch from API
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
            };
            setProject(mapped);
            setOthers(staticProjects.slice(0, 3));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 flex justify-center text-gray-400">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-gray-900">
          <Image
            src={project.gallery[activeImg] || project.src}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="absolute top-6 left-6 flex items-center gap-2 text-white/70 text-sm z-10">
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </div>
          <div className="absolute bottom-6 left-6 z-10">
            <span className="bg-terracotta-600/90 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Thumbnail strip */}
        {project.gallery.length > 1 && (
          <div className="flex gap-3 px-6 py-4 bg-plum-50/40 dark:bg-gray-900 border-b border-plum-100 dark:border-gray-800 overflow-x-auto">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${i === activeImg ? "ring-2 ring-terracotta-500 opacity-100" : "opacity-50 hover:opacity-80"}`}
              >
                <Image src={img} alt={`View ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-plum-900 dark:text-white mb-6">{project.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">{project.desc}</p>

            {project.scope.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">Scope of Work</h3>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((s) => (
                    <span key={s} className="px-4 py-1.5 bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 text-sm rounded-full font-medium border border-terracotta-200/60 dark:border-terracotta-800/40">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-plum-50/40 dark:bg-gray-900 border border-plum-100 dark:border-gray-800 rounded-2xl p-6 divide-y divide-plum-100 dark:divide-gray-800">
              {[
                { label: "Year", value: project.year },
                { label: "Location", value: project.location },
                { label: "Area", value: project.area },
                { label: "Category", value: project.category },
              ].map((m) => (
                <div key={m.label} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-plum-900 dark:text-white font-semibold">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact" className="w-full text-center bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-terracotta-600/20 active:scale-95">
                Enquire About This Project
              </Link>
              <Link href="/projects" className="w-full text-center border border-plum-200 dark:border-gray-700 text-plum-900 dark:text-gray-300 hover:border-plum-900 dark:hover:border-white font-medium py-3 px-6 rounded-xl transition-all active:scale-95">
                Back to Projects
              </Link>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="bg-plum-50/30 dark:bg-gray-900/60 border-t border-plum-100 dark:border-gray-800 py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-plum-900 dark:text-white mb-8">More Projects</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {others.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="group block overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:border-terracotta-400/50 hover:shadow-lg transition-all">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.src} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-terracotta-600 dark:text-terracotta-400 uppercase tracking-widest font-semibold">{p.category}</span>
                      <h3 className="font-semibold text-plum-900 dark:text-white mt-1">{p.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{p.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}