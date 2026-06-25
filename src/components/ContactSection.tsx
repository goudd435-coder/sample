/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, ShieldAlert, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function ContactSection() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=ANNANT%20HOMEOPATHY%20CLINIC%20Mansarovar%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-gray-50/50 py-16 md:py-24 dark:bg-gray-900/30 transition-colors duration-300" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Reach Out
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            Clinic Location & Hours
          </h2>
          <p className="font-sans text-sm text-gray-505 text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Visit us in Mansarovar, Jaipur, or dial our helper helpline for general inquiries, medications refills, or acute emergency assistance.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start" id="contact-grid">
          
          {/* Left Block: Address details, phone, hours */}
          <div className="lg:col-span-5 space-y-6" id="contact-left">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-150/60 shadow-sm dark:bg-gray-900 dark:border-gray-850 space-y-6">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                Contact Details
              </h3>
              
              <div className="space-y-4">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                      Clinic Address
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-850 text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                      {CLINIC_INFO.address}
                    </p>
                    <span className="inline-block font-sans text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-md font-semibold mt-1">
                      Google Maps: {CLINIC_INFO.gmapsLocation}
                    </span>
                  </div>
                </div>

                {/* Direct Dial Help Line */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                      Phone Number
                    </h4>
                    <a
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="block font-display text-base font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      +91 {CLINIC_INFO.phone}
                    </a>
                    <span className="font-sans text-[10px] text-gray-400 block">
                      Consultation Inquiries & Refills
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                      Email Address
                    </h4>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="block font-sans text-xs sm:text-sm text-gray-750 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Clinic Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                      Consultation Hours
                    </h4>
                    <div className="font-sans text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      <div className="flex justify-between gap-4 font-semibold">
                        <span>Monday - Saturday:</span>
                        <span className="text-right">
                          10:00 AM - 01:30 PM <br />
                          05:00 PM - 08:30 PM
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 text-rose-600 dark:text-rose-400 font-bold">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Block: Map Iframe wrapper */}
          <div className="lg:col-span-7" id="contact-right">
            <div className="relative overflow-hidden rounded-3xl border border-gray-150/60 bg-white shadow-sm dark:border-gray-850 p-2.5">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  title="Annant Homeopathy Clinic Map Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  id="gmaps-iframe"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
