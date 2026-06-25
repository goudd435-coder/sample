/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Briefcase, HeartHandshake, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function AboutDoctor() {
  const qualifications = [
    { title: 'BHMS', school: 'Rajasthan University of Health Sciences (RUHS)', desc: 'Bachelor of Homeopathic Medicine and Surgery. Grounded in clinical pathology and classical homeopathic therapeutics.' },
    { title: 'MD (Homeopathy)', school: 'Post Graduate Clinical Specialization', desc: 'Advanced clinical study in repertory, materia medica, and constitutional homeopathy for chronic disease management.' }
  ];

  const pillars = [
    {
      icon: GraduationCap,
      title: 'Top-tier Qualifications',
      description: 'Fully qualified medical professional with rigorous training in conventional medicine and advanced homeopathy.'
    },
    {
      icon: Briefcase,
      title: '12+ Years of Practice',
      description: 'Successfully diagnosed and treated over 15,000 cases of complex physical and psychosomatic disorders.'
    },
    {
      icon: HeartHandshake,
      title: 'Patient-Centered Focus',
      description: 'Belief in exhaustive case-taking to understand physical, mental, and emotional symptoms before prescribing.'
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-gray-950 transition-colors duration-300" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="about-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Meet the Doctor
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            Dedicated to Natural & Scientific Healing
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start" id="about-grid">
          
          {/* Left Side: Profile Card */}
          <div className="lg:col-span-5" id="about-left">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-emerald-50/30 p-8 border border-gray-100 shadow-sm dark:from-gray-900/40 dark:to-emerald-950/5 dark:border-gray-900">
              <div className="space-y-6">
                
                {/* Visual Circle Emblem */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 opacity-20 blur" />
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-display text-4xl font-extrabold shadow-inner">
                      DA
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                    {CLINIC_INFO.doctorName}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Senior Consultant & Founder
                  </p>
                  <p className="font-sans text-xs text-gray-500 dark:text-gray-400">
                    Reg. No: RUHS-H/2014/1102
                  </p>
                </div>

                <blockquote className="border-l-2 border-emerald-500 pl-4 py-1 italic font-sans text-sm text-gray-600 dark:text-gray-300">
                  "Homeopathy does not just treat the disease; it treats the whole person. Our remedies stimulate the body's natural defense systems to recover safely and permanently."
                </blockquote>

                {/* Practical info points */}
                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Specialized in Constitutional Prescriptions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Experts in Recurrent & Chronic Ailments</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Zero Chemical Toxicity Protocols</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Qualifications, Experience, Pillars */}
          <div className="lg:col-span-7 space-y-8" id="about-right">
            
            {/* Short Bio Intro */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold text-gray-950 dark:text-white">
                About Dr. Anant
              </h3>
              <p className="font-sans text-gray-650 text-gray-700 dark:text-gray-300 leading-relaxed">
                Dr. Anant is an experienced and highly trusted Homeopathic Doctor dedicated to providing safe, effective, and personalized treatments for patients of all ages in Mansarovar, Jaipur. His meticulous clinical analysis, combined with classic and modern clinical homeopathy, has helped thousands reclaim their long-term wellness.
              </p>
            </div>

            {/* Three Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="about-pillars">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 dark:border-gray-900 dark:bg-gray-900/20">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">
                      {p.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Qualifications Timeline */}
            <div className="space-y-4" id="about-qualifications">
              <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Academic & Professional Qualifications
              </h4>
              <div className="space-y-4 border-l border-gray-200 dark:border-gray-800 pl-4 ml-1">
                {qualifications.map((q, idx) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Ring indicator */}
                    <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-emerald-500 bg-white dark:bg-gray-950" />
                    
                    <h5 className="font-display text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {q.title}
                    </h5>
                    <p className="font-sans text-xs font-semibold text-gray-800 dark:text-gray-200">
                      {q.school}
                    </p>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {q.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
