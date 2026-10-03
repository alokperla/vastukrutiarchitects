"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useState, useEffect } from "react";

interface ProjectsPreviewProps {
  initialProjects?: Project[];
}

export default function ProjectsPreview({ initialProjects }: ProjectsPreviewProps) {
  const [featured, setFeatured] = useState<Project[]>(initialProjects || []);

  useEffect(() => {
    if (initialProjects) {
      setFeatured(initialProjects);
    }
  }, [initialProjects]);

  useEffect(() => {
    let isMounted = true;
    async function loadFeaturedProjects() {
      try {
        const res = await fetch("/api/projects?featured=true");
        if (res.ok) {
          const dbProjects = await res.json();
          if (Array.isArray(dbProjects) && isMounted) {
            let filtered = dbProjects.filter((p: any) => p.published !== false);
            // If none marked featured, fetch any published DB projects
            if (filtered.length === 0) {
              const allRes = await fetch("/api/projects");
              if (allRes.ok) {
                const allDb = await allRes.json();
                if (Array.isArray(allDb)) {
                  filtered = allDb.filter((p: any) => p.published !== false).slice(0, 6);
                }
              }
            }
            const mapped: Project[] = filtered.map((p: any) => ({
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
            if (isMounted && mapped.length > 0) {
              setFeatured(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      }
    }

    loadFeaturedProjects();
    return () => {
      isMounted = false;
    };
  }, []);

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

        {featured.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-base font-light">
              No featured projects available at the moment.
            </p>
          </div>
        ) : (
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
        )}


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