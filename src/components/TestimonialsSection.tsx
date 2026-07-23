"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Priya Mehta",
    location: "Mumbai",
    role: "Homeowner",
    text: "Vastukruti transformed our apartment beyond our imagination. The team understood our culture, our family's needs, and delivered a home that truly feels like ours. Exceptional attention to detail.",
    rating: 5,
  },
  {
    name: "Rajesh Sharma",
    location: "Pune",
    role: "Business Owner",
    text: "Our office space went from a blank floor to a workspace our employees love. The design process was seamless, and the result speaks volumes about Vastukruti's craft.",
    rating: 5,
  },
  {
    name: "Anita & Vikram Patel",
    location: "Ahmedabad",
    role: "Homeowners",
    text: "They listened to every detail of our vision and brought it to life beautifully. The blend of traditional elements with modern aesthetics is exactly what we wanted. Highly recommend!",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const r = reviews[active];

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-4">Testimonials</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16">What Our Clients Say</h2>

        <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 md:p-14 shadow-sm">
          {/* Quote mark */}
          <div className="absolute -top-6 left-10 text-8xl text-blue-100 dark:text-blue-950 font-serif leading-none select-none">&ldquo;</div>

          <div className="relative z-10">
            <Stars count={r.rating} />
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mt-6 mb-8 font-light italic">
              {r.text}
            </blockquote>
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {r.name[0]}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">{r.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{r.role} &bull; {r.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all ${i === active ? "w-8 h-3 bg-blue-600" : "w-3 h-3 bg-gray-300 dark:bg-gray-700 hover:bg-blue-400"}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}