"use client";

import { useReveal } from "@/lib/useReveal";

export default function AboutSection() {
  const ref1 = useReveal();
  const ref2 = useReveal();

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "8+",  label: "Years of Experience" },
    { value: "100%",label: "Client Satisfaction" },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref1 as React.RefObject<HTMLDivElement>} className="reveal">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-4">About Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Where Tradition
            <span className="block italic font-light text-gray-500 dark:text-gray-400">Meets Innovation</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            At Vastukruti Architects, we believe that great architecture is born at the intersection of culture, craft, and creativity. Our team brings a meticulous eye for detail and a deep respect for the spaces people inhabit.
          </p>
          <p className="text-gray-500 dark:text-gray-500 leading-relaxed">
            From intimate residential interiors to expansive commercial developments, we approach every project with the same passion: to create environments that feel both beautiful and deeply liveable.
          </p>
        </div>

        <div ref={ref2 as React.RefObject<HTMLDivElement>} className="reveal grid grid-cols-3 gap-6" style={{ transitionDelay: "0.15s" }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}