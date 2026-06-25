/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Keep first open by default

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-gray-950 transition-colors duration-300" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="faq-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Support Info
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-2">
            Have questions about homeopathic prescriptions? Check our clinical guidelines below or speak with Dr. Anant directly.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Accordion Container */}
        <div className="space-y-4" id="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-gray-150/60 bg-gray-50/20 dark:border-gray-900 dark:bg-gray-900/10 transition-colors"
                id={`faq-item-${faq.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus:bg-emerald-50/10 dark:focus:bg-emerald-950/5 cursor-pointer"
                  id={`faq-trigger-${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-display text-sm font-bold text-gray-900 sm:text-base dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-150 text-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400">
                    {isOpen ? <Minus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Answer Drawer */}
                {isOpen && (
                  <div className="border-t border-gray-150/60 px-5 py-4 dark:border-gray-900 animate-in fade-in duration-200" id={`faq-drawer-${faq.id}`}>
                    <p className="font-sans text-xs text-gray-600 sm:text-sm dark:text-gray-350 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
