"use client";

import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="w-full bg-[#FAF8F5] dark:bg-plum-950/70 border-y border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Heading & Inquiry Copy */}
          <div className="md:col-span-8 lg:col-span-8 space-y-5">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-light leading-[1.2] tracking-tight text-plum-950 dark:text-stone-100">
              Looking to elevate the aesthetic of your space?
            </h2>
            <p className="text-sm sm:text-base md:text-[17px] text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-2xl">
              Have a question for us? Let&apos;s talk. For all project inquiries, please email{" "}
              <a
                href="mailto:vastukrutiarchitects@gmail.com"
                className="font-normal text-plum-950 dark:text-stone-100 underline underline-offset-4 decoration-terracotta-500/70 hover:decoration-terracotta-600 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
              >
                vastukrutiarchitects@gmail.com
              </a>
            </p>
          </div>

          {/* Right Column: Minimalist Outline / Ghost Button */}
          <div className="md:col-span-4 lg:col-span-4 flex items-center md:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 border border-plum-950/90 dark:border-stone-200/90 text-plum-950 dark:text-stone-100 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:bg-plum-950 hover:text-white dark:hover:bg-stone-100 dark:hover:text-plum-950 active:scale-98 group"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}