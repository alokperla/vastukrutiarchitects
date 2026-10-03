"use client";

import { useReveal } from "@/lib/useReveal";
import { useCountUp } from "@/lib/useCountUp";

function StatItem({
  target,
  suffix = "",
  label,
  icon,
}: {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const { count, ref } = useCountUp(target, 2000);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative text-center p-8 sm:p-10 bg-plum-50/50 dark:bg-gray-900/80 rounded-3xl border border-plum-100 dark:border-gray-800 hover:border-terracotta-400/60 dark:hover:border-terracotta-500/50 hover:shadow-2xl hover:shadow-terracotta-900/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-default"
    >
      {/* Ambient gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/10 via-transparent to-plum-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-terracotta-500 to-transparent opacity-40 group-hover:w-28 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-terracotta-100/70 dark:bg-terracotta-950/60 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-terracotta-600 group-hover:text-white transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <div className="text-4xl sm:text-5xl font-heading font-bold text-plum-900 dark:text-white mb-2 tracking-tight group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors duration-300">
          {count}{suffix}
        </div>
        <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400 font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Narrative / About copy */}
        <div ref={ref1 as React.RefObject<HTMLDivElement>} className="reveal grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-plum-900 dark:text-white leading-tight">
              Where Tradition{" "}
              <span className="block italic font-light text-terracotta-600 dark:text-terracotta-400">
                Meets Innovation
              </span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-light">
            <p>
              At Vastukruti Architecture & Interiors, we believe exceptional architecture is an artful expression of culture, craftsmanship, and creativity. Through refined aesthetics, thoughtful spatial planning, and meticulous attention to detail, we craft timeless spaces that embody elegance, functionality, and individuality.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              From bespoke residences and sophisticated interiors to distinguished commercial developments, every project reflects our commitment to design excellence, creating meaningful environments that inspire, elevate, and enrich the way people live and experience spaces.
            </p>
          </div>
        </div>

        {/* Horizontal Stats Row with animated count-up */}
        <div ref={ref2 as React.RefObject<HTMLDivElement>} className="reveal mt-16 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <StatItem
              target={30}
              suffix="+"
              label="Projects Delivered"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
            <StatItem
              target={6}
              suffix="+"
              label="Years of Experience"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatItem
              target={100}
              suffix="%"
              label="Client Satisfaction"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}