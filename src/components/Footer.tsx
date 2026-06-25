/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Leaf, Phone, MapPin, Award, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface FooterProps {
  onLoginClick: () => void;
  setView: (view: 'home' | 'admin') => void;
  isLoggedIn: boolean;
}

export default function Footer({ onLoginClick, setView, isLoggedIn }: FooterProps) {
  const handleScrollTo = (id: string) => {
    setView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 dark:bg-gray-950 transition-colors" id="footer-main">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12" id="footer-grid">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4" id="footer-col-brand">
            <button
              onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 text-left focus:outline-none"
              id="footer-logo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold tracking-tight text-white leading-none">
                  ANNANT HOMEOPATHY CLINIC
                </h3>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mt-1">
                  {CLINIC_INFO.tagline}
                </span>
              </div>
            </button>

            <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-sm">
              Delivering secure, permanent, non-toxic constitutional remedies in Mansarovar, Jaipur. Guided by classic therapeutic principles and evidence-based clinical practices.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-gray-550 text-gray-500 font-semibold uppercase tracking-wider">
              <Award className="h-4 w-4 text-emerald-500" />
              <span>Dr. Anant (BHMS, MD in Homeopathy)</span>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-4" id="footer-col-links">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Sitemap & Links
            </h4>
            <ul className="space-y-2.5 text-xs" id="footer-links-list">
              <li>
                <button onClick={() => handleScrollTo('about')} className="hover:text-emerald-400 hover:underline">About Doctor</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('specialties')} className="hover:text-emerald-400 hover:underline">Medical Specialties</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('booking')} className="text-emerald-400 font-bold hover:underline">Book Consultation</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('testimonials')} className="hover:text-emerald-400 hover:underline">Patient Testimonials</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('faq')} className="hover:text-emerald-400 hover:underline">Clinical FAQs</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('contact')} className="hover:text-emerald-400 hover:underline">Directions & Contact</button>
              </li>
            </ul>
          </div>

          {/* Physical Address Col */}
          <div className="md:col-span-4 space-y-4" id="footer-col-contact">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Mangyawas Road, Opposite Jyana Paradise, Mansarovar, Jaipur, Rajasthan 302020
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="font-bold text-white hover:text-emerald-400">
                  +91 {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-emerald-950/25 border border-emerald-900/35 px-3 py-2 text-gray-400 mt-1">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-sans text-[10px] leading-tight font-semibold">
                  Google Map Landmark: VP7X+94 Jaipur
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: copyright, portal trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-8 text-[11px]" id="footer-bottom">
          <p className="font-sans text-gray-500">
            © 2026 ANNANT HOMEOPATHY CLINIC. All rights reserved. Made for professional demonstration.
          </p>

          <div className="flex items-center gap-4" id="footer-bottom-actions">
            {/* Discrete link to open doctor portal */}
            <button
              onClick={isLoggedIn ? () => setView('admin') : onLoginClick}
              className="text-gray-500 hover:text-emerald-400 hover:underline font-semibold"
              id="btn-footer-doctor-login"
            >
              {isLoggedIn ? 'Access Doctor Portal' : 'Doctor Administration Login'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
