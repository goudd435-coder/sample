/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Calendar, Phone, Award, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';
// @ts-ignore
import drAnantPhoto from '../assets/images/dr_anant_real_photo_1782378021238.jpg';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-16 md:py-24 dark:bg-gray-950/40 border-b border-slate-100 dark:border-gray-900" id="hero">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-50/30 blur-3xl dark:bg-emerald-950/5" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-slate-100/40 blur-3xl dark:bg-gray-900/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8" id="hero-left">
            {/* Top Badge: Star Reviews */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 border border-emerald-100 dark:border-emerald-950/30 dark:bg-emerald-950/30"
              id="hero-badge"
            >
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {CLINIC_INFO.rating.toFixed(1)} Rating ({CLINIC_INFO.reviewCount} Patient Reviews)
              </span>
            </motion.div>

            {/* Headline & Subtitle */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white"
                id="hero-title"
              >
                <span className="block text-gray-900 dark:text-white leading-tight">Your Trusted Homeopathic</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400 leading-tight">
                  Healthcare Partner
                </span>
                <span className="block text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl mt-1 font-bold">
                  in Jaipur
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-base text-gray-600 sm:text-lg dark:text-gray-300 max-w-xl"
                id="hero-subtitle"
              >
                Personalized Homeopathic Treatment for a Healthier Life. Safe, gentle, permanent, and scientific remedies for chronic and acute illnesses.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              id="hero-cta-buttons"
            >
              <button
                onClick={() => handleScrollTo('booking')}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 dark:from-emerald-500 dark:to-teal-500 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                id="btn-hero-book"
              >
                <Calendar className="h-5 w-5" />
                Book Appointment
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition-all cursor-pointer"
                id="btn-hero-contact"
              >
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Contact Clinic
              </button>
            </motion.div>

            {/* Counter Stats Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/60"
              id="hero-stats"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl leading-none">
                    {CLINIC_INFO.yearsOfExperience}+
                  </span>
                </div>
                <p className="font-sans text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Years of Experience
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl leading-none">
                    15k+
                  </span>
                </div>
                <p className="font-sans text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Happy Patients
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl leading-none">
                    100%
                  </span>
                </div>
                <p className="font-sans text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Safe & Natural
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visuals: Doctor Photo Placeholder Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="hero-right">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm"
              id="hero-avatar-container"
            >
              {/* Patient Statistics Floating Badges from Clean Minimalism */}
              <div className="absolute -left-6 sm:-left-12 top-10 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 dark:bg-gray-900 dark:border-gray-850 z-10">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {CLINIC_INFO.rating.toFixed(1)} <span className="text-yellow-400 font-normal">★</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-tight">
                  {CLINIC_INFO.reviewCount}+ Patient Reviews
                </p>
              </div>
              <div className="absolute -right-4 sm:-right-8 bottom-20 bg-emerald-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl z-10 dark:bg-emerald-950/90 border border-emerald-800/40">
                <p className="text-xl sm:text-2xl font-extrabold">{CLINIC_INFO.yearsOfExperience}+</p>
                <p className="text-[9px] opacity-90 uppercase font-bold tracking-wider leading-none">Years Experience</p>
              </div>

              {/* Custom Doctor Avatar Card */}
              <div className="relative overflow-hidden rounded-[40px] bg-white border-b-[8px] border-emerald-500 shadow-2xl dark:bg-gray-900 dark:border-gray-850 p-5 space-y-5">
                
                {/* Visual Avatar Placeholder representing clinical consultation */}
                <div className="relative h-72 w-full rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-emerald-100/30 dark:border-emerald-850/20">
                  <img
                    src={drAnantPhoto}
                    alt={CLINIC_INFO.doctorName}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    id="hero-doctor-avatar-img"
                  />
                  
                  {/* Glowing Medical Cross Badge overlay */}
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 animate-pulse">
                    <span className="text-xl font-bold font-display">+</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-md p-3 border border-white/40 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        In Clinic Consultation Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doctor Bio Details Overlay */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                      {CLINIC_INFO.doctorName}
                    </h3>
                    <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      <span>{CLINIC_INFO.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <p className="font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {CLINIC_INFO.specialization} (BHMS, MD)
                  </p>
                  
                  <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-1 border-t border-gray-100 dark:border-gray-800">
                    Jaipur’s trusted specialist delivering custom holistic wellness protocols built specifically for your constitutional profile.
                  </p>
                </div>

                {/* Patient Safety Badge */}
                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 p-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-sans text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                    Certified Homeopathic Medicine Practitioner
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
