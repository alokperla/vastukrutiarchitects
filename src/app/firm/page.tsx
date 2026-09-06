"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { TeamMember, fallbackTeamMembers } from "@/lib/team";

export default function FirmPage() {
  const [members, setMembers] = useState<TeamMember[]>(fallbackTeamMembers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMembers(data);
          }
        }
      } catch (err) {
        console.error("Error fetching firm members:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* Hero Section */}
        <section className="relative h-72 md:h-96 flex items-center justify-center bg-plum-950 overflow-hidden">
          <Image
            src="/projects/residentail project 2.jpg"
            alt="Vastukruti Architects Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-plum-950/80 via-plum-950/60 to-plum-950/90" />
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-terracotta-400 font-semibold mb-3 px-3 py-1 rounded-full bg-terracotta-900/40 border border-terracotta-700/50">
              The Firm & Leadership
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Our People & Practice
            </h1>
            <p className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
              A collaborative studio of architects, interior visionaries, and project directors dedicated to architecture that resonates with history and modern living.
            </p>
          </div>
        </section>

        {/* Philosophy Intro */}
        <section className="py-14 px-6 border-b border-plum-100/60 dark:border-gray-900 bg-plum-50/20 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
              Studio Ethos
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-plum-900 dark:text-white leading-snug">
              Every detail is considered, every material intentional, and every space shaped by human connection.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-4 leading-relaxed max-w-2xl mx-auto font-light">
              Click on any team member below to view their dedicated profile, background, and architectural vision.
            </p>
          </div>
        </section>

        {/* Team Members List - Stacked horizontally (Left photo, Right description) */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                Studio Leadership & Architects
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-plum-900 dark:text-white mt-1">
                Meet Our Team
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Passionate practitioners shaping transformative spaces with rigor, empathy, and regional craftsmanship.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">Loading team members...</div>
          ) : (
            <div className="flex flex-col gap-10">
              {members.map((member) => (
                <Link
                  key={member.id}
                  href={`/firm/${member.id}`}
                  className="group block bg-white dark:bg-gray-900/60 rounded-3xl border border-plum-100/80 dark:border-gray-800 p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-terracotta-400/60 dark:hover:border-terracotta-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
                    {/* Left side: Photo of the team member (auto-adjusting according to the natural size of the photo) */}
                    <div className="w-full md:w-80 lg:w-96 shrink-0 flex items-center justify-center bg-plum-50/50 dark:bg-gray-950 rounded-2xl p-4 border border-plum-100/60 dark:border-gray-800/80 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-auto h-auto max-h-[380px] max-w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    {/* Right side: Description of the team member */}
                    <div className="flex-1 flex flex-col justify-between py-1 w-full">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-950/40 px-3.5 py-1 rounded-full border border-terracotta-200/50 dark:border-terracotta-800/50">
                            {member.role}
                          </span>
                          <span className="text-xs text-gray-400">Vastukruti Architects</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 dark:text-white mt-2 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                          {member.name}
                        </h3>

                        <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                          {member.bio}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-plum-100/70 dark:border-gray-800/70 flex items-center justify-between text-sm">
                        <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-2">
                          View Full Profile & Architectural Bio &rarr;
                        </span>
                        <span className="text-xs text-gray-400">Click to read details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Studio Culture & CTA */}
        <section className="bg-plum-50/40 dark:bg-gray-900/60 border-t border-plum-100 dark:border-gray-800 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-2 block">
              Collaborate With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-plum-900 dark:text-white mb-6">
              Have a vision for your next space?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed font-light">
              Our team is ready to collaborate with you to create tailored, inspiring architecture and interior environments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-md shadow-terracotta-600/20 active:scale-95 text-sm"
              >
                Start a Conversation
              </Link>
              <Link
                href="/projects"
                className="border border-plum-200 dark:border-gray-700 text-plum-900 dark:text-gray-300 hover:border-plum-900 dark:hover:border-white font-medium py-3.5 px-8 rounded-full transition-all active:scale-95 text-sm"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
