/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentType } from 'react';
import { Activity, Sparkles, Wind, Baby, Flame, Bone } from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Activity,
  Sparkles,
  Wind,
  Baby,
  Flame,
  Bone
};

export default function Services() {
  return (
    <section className="bg-gray-50/50 py-16 md:py-24 dark:bg-gray-900/30 transition-colors duration-300" id="specialties">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="services-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            Specialized Homeopathic Solutions
          </h2>
          <p className="font-sans text-sm text-gray-505 text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Safe, scientific, and constitutional treatments tailored for a wide array of chronic, acute, and systemic disorders.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="services-grid">
          {SPECIALTIES.map((spec) => {
            const IconComponent = iconMap[spec.icon] || Activity;
            return (
              <div
                key={spec.id}
                className="group relative overflow-hidden rounded-3xl bg-white p-6 border border-gray-100 shadow-sm transition-all hover:shadow-md dark:bg-gray-900 dark:border-gray-850 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
                id={`spec-${spec.id}`}
              >
                {/* Visual Accent Glow */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-100/30 dark:bg-emerald-950/20 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors duration-300" />

                <div className="flex items-start gap-4">
                  {/* Icon Frame */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-550 text-gray-500 dark:text-gray-400 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>

                {/* Arrow hint indicator */}
                <div className="mt-4 flex justify-end">
                  <span className="font-sans text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Learn more →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center sm:text-left text-white shadow-md dark:from-emerald-700 dark:to-teal-700" id="services-cta-banner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-display text-lg font-bold">
                Looking for a treatment not listed above?
              </h4>
              <p className="font-sans text-xs text-emerald-100 max-w-2xl">
                Dr. Anant treats a comprehensive index of ailments. Fill out our simple booking scheduler or contact the clinic directly to inquire about your specific condition.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors shrink-0 shadow-md cursor-pointer"
              id="btn-services-cta"
            >
              Consult Dr. Anant
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
