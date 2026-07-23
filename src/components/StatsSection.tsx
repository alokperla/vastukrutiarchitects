"use client";

import { useCountUp } from "@/lib/useCountUp";

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat target={50} suffix="+" label="Projects Completed" />
        <Stat target={8}  suffix="+"  label="Years of Experience" />
        <Stat target={15} suffix="+"  label="Cities Served" />
        <Stat target={100} suffix="%" label="Client Satisfaction" />
      </div>
    </section>
  );
}