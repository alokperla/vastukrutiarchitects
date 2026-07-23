"use client";

const services = [
  {
    title: "Residential Design",
    desc: "Bespoke homes crafted around your lifestyle. From sprawling villas to compact urban apartments, we design with heart.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    title: "Commercial Spaces",
    desc: "Purposeful, inspiring workplaces that reflect your brand identity and keep teams energised every day.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7l9-4 9 4v14H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 21v-6h6v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    title: "Interior Styling",
    desc: "A seamless blend of texture, colour, and light — curated interiors that tell your unique story.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Our Services</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group p-8 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}