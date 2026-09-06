"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { TeamMember, fallbackTeamMembers } from "@/lib/team";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";

export default function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [otherMembers, setOtherMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMember() {
      setLoading(true);
      const memberId = parseInt(id);

      // Check fallback first for fast loading
      const localMatch = fallbackTeamMembers.find((m) => m.id === memberId);
      if (localMatch) {
        setMember(localMatch);
        setOtherMembers(fallbackTeamMembers.filter((m) => m.id !== memberId));
      }

      // Fetch from API
      try {
        const res = await fetch(`/api/team/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && !data.error) {
            setMember(data);
          }
        }

        // Also fetch all members for the bottom suggestions
        const allRes = await fetch("/api/team");
        if (allRes.ok) {
          const allData = await allRes.json();
          if (Array.isArray(allData)) {
            setOtherMembers(allData.filter((m: TeamMember) => m.id !== memberId));
          }
        }
      } catch (err) {
        console.error("Failed to load team member:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMember();
  }, [id]);

  if (loading && !member) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 flex justify-center items-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading team member profile...</span>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-32 text-center px-6">
        <h1 className="text-3xl font-bold text-plum-900 dark:text-white mb-4">Team Member Not Found</h1>
        <p className="text-gray-500 mb-6">The requested team member profile does not exist or has been updated.</p>
        <Link
          href="/firm"
          className="inline-flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-3 px-6 rounded-full transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Firm Leadership
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb & Return Link */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/firm"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Firm & Team
            </Link>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Vastukruti Architects Studio Profile
            </span>
          </div>

          {/* Member Profile Main Section */}
          <section className="bg-white dark:bg-gray-900/40 rounded-3xl border border-plum-100/80 dark:border-gray-800 p-6 sm:p-10 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Photo auto-adjusting according to the size of the photo */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full bg-plum-50/50 dark:bg-gray-950 rounded-3xl p-4 sm:p-6 border border-plum-100/70 dark:border-gray-800/80 flex items-center justify-center shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-auto h-auto max-h-[550px] max-w-full object-contain rounded-2xl shadow-sm"
                  />
                </div>

                <div className="w-full mt-6 p-4 rounded-2xl bg-plum-50/40 dark:bg-gray-900/60 border border-plum-100/60 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Leadership Profile</span>
                  <span className="text-terracotta-600 dark:text-terracotta-400 font-medium">Vastukruti Studio</span>
                </div>
              </div>

              {/* Right Column: Name, Role, Biography, and Architectural Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-950/50 px-4 py-1.5 rounded-full border border-terracotta-200/60 dark:border-terracotta-800/50 mb-3">
                    {member.role}
                  </span>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-plum-900 dark:text-white tracking-tight mb-2">
                    {member.name}
                  </h1>

                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                    Practicing Architect & Interior Design Contributor
                  </p>

                  <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-light text-base sm:text-lg mb-8">
                    <p className="whitespace-pre-line">{member.bio}</p>
                  </div>

                  {/* Focus & Practice Areas */}
                  <div className="border-t border-plum-100/80 dark:border-gray-800 pt-6 mb-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
                      Core Studio Focus
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Contextual Architecture",
                        "Spatial Planning",
                        "Materiality & Detailing",
                        "Interior Curation",
                        "Sensory Living",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 bg-plum-50/60 dark:bg-gray-800 text-plum-900 dark:text-gray-200 text-xs sm:text-sm rounded-full border border-plum-100 dark:border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation Card */}
                <div className="bg-plum-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-terracotta-400 font-semibold">
                      Consultation
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold mt-1 text-white">
                      Work with {member.name}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-md">
                      Discuss your upcoming architectural, interior, or spatial vision with our studio.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-md shadow-terracotta-600/30 text-center"
                  >
                    Start Project Discussion
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Other Team Members Section */}
          {otherMembers.length > 0 && (
            <section className="pt-8 border-t border-plum-100/80 dark:border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                    Studio Colleagues
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 dark:text-white mt-1">
                    Other Team Members
                  </h3>
                </div>
                <Link
                  href="/firm"
                  className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 hover:underline uppercase tracking-wider"
                >
                  View All Team &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherMembers.slice(0, 3).map((colleague) => (
                  <Link
                    key={colleague.id}
                    href={`/firm/${colleague.id}`}
                    className="group block bg-white dark:bg-gray-900/50 rounded-2xl border border-plum-100/70 dark:border-gray-800 p-5 hover:border-terracotta-400/50 hover:shadow-lg transition-all"
                  >
                    <div className="w-full h-48 bg-plum-50/50 dark:bg-gray-950 rounded-xl p-3 flex items-center justify-center border border-plum-100/60 dark:border-gray-800/60 mb-4 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={colleague.photo}
                        alt={colleague.name}
                        className="w-auto h-auto max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[11px] text-terracotta-600 dark:text-terracotta-400 uppercase tracking-widest font-semibold block">
                      {colleague.role}
                    </span>
                    <h4 className="font-bold text-plum-900 dark:text-white text-base mt-1 group-hover:text-terracotta-600 transition-colors">
                      {colleague.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-2">
                      {colleague.bio}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
