/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  return (
    <section className="bg-gray-50/50 py-16 md:py-24 dark:bg-gray-900/30 transition-colors duration-300" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="testimonials-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            What Our Patients Say
          </h2>
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-2">
            Read real feedback and success stories from patients who found permanent healing through our specialized homeopathic treatments.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" id="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-3xl bg-white p-6 border border-gray-150/60 shadow-sm flex flex-col justify-between dark:bg-gray-900 dark:border-gray-850"
              id={`test-${t.id}`}
            >
              {/* Quote Icon overlay */}
              <div className="absolute top-4 right-4 text-emerald-100 dark:text-emerald-950/20">
                <Quote className="h-10 w-10 rotate-180 transform" />
              </div>

              <div className="space-y-4">
                {/* Stars and rating */}
                <div className="flex text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-sans text-xs text-gray-600 dark:text-gray-350 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              {/* Patient Identity info */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                    {t.name}
                  </h4>
                  <span className="font-sans text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mt-0.5">
                    {t.treatment}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[10px] text-gray-400 block">
                    Verified Patient
                  </span>
                  <span className="font-mono text-[9px] text-gray-400">
                    {t.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Reviews Banner with Clinic Info */}
        <div className="mt-12 rounded-2xl bg-white border border-gray-150 dark:bg-gray-900/40 dark:border-gray-850 p-6 text-center" id="testimonials-stats-banner">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 mb-2">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>5.0 out of 5.0 Star Rated Practitioner</span>
          </div>
          <p className="font-sans text-xs font-medium text-gray-700 dark:text-gray-300">
            "Over <strong>72+ five-star reviews</strong> on Google Maps. We are proud of our commitment to safety, integrity, and clinical excellence."
          </p>
        </div>

      </div>
    </section>
  );
}
