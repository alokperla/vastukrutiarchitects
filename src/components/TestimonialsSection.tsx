"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const reviews = [
  {
    name: "Divit Shah",
    location: "SOLAPUR",
    role: "Homeowner",
    text: "Vastukruti Architects exceeded our expectations. Professional, creative, and attentive, they delivered a functional and stunning design on time and within budget. Highly recommended.",
    rating: 5,
  },
  {
    name: "Rohan Jagtap",
    location: "PUNE",
    role: "Business Owner",
    text: "A very creative, thoughtful, and patient architecture firm. Professional. Great attention to details. I can’t imagine better or more talented people to work with.",
    rating: 5,
  },
  {
    name: "Anita & Vikram Patel",
    location: "MUMBAI",
    role: "Homeowners",
    text: "They listened to every detail of our vision and brought it to life beautifully. The blend of traditional elements with modern aesthetics is exactly what we wanted. Highly recommend!",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds per slide

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((newIndex: number) => {
    setFade(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(newIndex);
      setFade(true);
    }, 220);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((active + 1) % reviews.length);
  }, [active, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((active - 1 + reviews.length) % reviews.length);
  }, [active, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToSlide((active + 1) % reviews.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, isPaused, goToSlide]);

  const r = reviews[active];

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-plum-900 dark:text-white mb-16">
          What Our Clients Say
        </h2>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-plum-50/40 dark:bg-gray-900/80 border border-plum-100 dark:border-gray-800 rounded-3xl p-8 sm:p-10 md:p-14 shadow-sm group"
        >
          {/* Quote mark */}
          <div className="absolute -top-6 left-10 text-8xl text-terracotta-200/60 dark:text-plum-900/60 font-serif leading-none select-none pointer-events-none">
            &ldquo;
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-plum-100 dark:border-gray-700 shadow-md flex items-center justify-center text-plum-900 dark:text-white hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-plum-100 dark:border-gray-700 shadow-md flex items-center justify-center text-plum-900 dark:text-white hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className={`relative z-10 transition-all duration-300 ease-in-out ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Stars count={r.rating} />
            <blockquote className="text-xl md:text-2xl text-plum-900 dark:text-gray-200 leading-relaxed mt-6 mb-8 font-light italic min-h-[5rem] flex items-center justify-center">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 rounded-full bg-terracotta-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-terracotta-600/30">
                {r.name[0]}
              </div>
              <div className="text-left">
                <div className="font-semibold text-plum-900 dark:text-white">{r.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {r.role} &bull; {r.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots with width and color transition */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === active
                  ? "w-8 h-2.5 bg-terracotta-600 shadow-sm shadow-terracotta-600/50"
                  : "w-2.5 h-2.5 bg-plum-200 dark:bg-gray-700 hover:bg-terracotta-400"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}