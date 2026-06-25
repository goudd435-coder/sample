/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sun, Moon, Lock, LogOut, Menu, X, Leaf } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentView: 'home' | 'admin';
  setView: (view: 'home' | 'admin') => void;
  isLoggedIn: boolean;
  logout: () => void;
  onLoginClick: () => void;
}

export default function Header({
  isDarkMode,
  toggleDarkMode,
  currentView,
  setView,
  isLoggedIn,
  logout,
  onLoginClick
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setView('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-gray-800/80 dark:bg-gray-950/90" id="header-main">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <button
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          id="btn-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-sm font-extrabold tracking-tight text-gray-900 sm:text-base dark:text-white leading-none">
              ANNANT
            </h1>
            <p className="font-sans text-[10px] font-medium tracking-wider text-emerald-600 dark:text-emerald-400 uppercase leading-none mt-0.5">
              Homeopathy Clinic
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" id="nav-desktop">
          {currentView === 'home' ? (
            <>
              <button onClick={() => handleNavClick('about')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-about">About Doctor</button>
              <button onClick={() => handleNavClick('specialties')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-specialties">Specialties</button>
              <button onClick={() => handleNavClick('booking')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-booking">Book Appointment</button>
              <button onClick={() => handleNavClick('testimonials')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-testimonials">Reviews</button>
              <button onClick={() => handleNavClick('faq')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-faq">FAQs</button>
              <button onClick={() => handleNavClick('contact')} className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" id="nav-contact">Contact</button>
            </>
          ) : (
            <button
              onClick={() => setView('home')}
              className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              id="nav-back-home"
            >
              ← Back to Main Website
            </button>
          )}
        </nav>

        {/* Actions (Theme Toggle & Login/Logout) */}
        <div className="flex items-center gap-3" id="header-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            id="btn-theme-toggle"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Login/Logout Button */}
          {currentView === 'admin' ? (
            isLoggedIn ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                id="btn-doctor-logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : null
          ) : (
            <button
              onClick={isLoggedIn ? () => setView('admin') : onLoginClick}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md shadow-gray-900/10 dark:shadow-emerald-950/20 cursor-pointer"
              id="btn-doctor-portal"
            >
              <Lock className="h-4 w-4" />
              <span>{isLoggedIn ? 'Doctor Portal' : 'Doctor Login'}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 md:hidden dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Toggle mobile menu"
            id="btn-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 px-4 py-4 dark:border-gray-800 dark:bg-gray-950/95 space-y-2 animate-in slide-in-from-top duration-200" id="nav-mobile-drawer">
          {currentView === 'home' ? (
            <>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all"
                id="mob-nav-about"
              >
                About Doctor
              </button>
              <button
                onClick={() => handleNavClick('specialties')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all"
                id="mob-nav-specialties"
              >
                Specialties
              </button>
              <button
                onClick={() => handleNavClick('booking')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all text-emerald-600 dark:text-emerald-400"
                id="mob-nav-booking"
              >
                Book Appointment
              </button>
              <button
                onClick={() => handleNavClick('testimonials')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all"
                id="mob-nav-testimonials"
              >
                Patient Reviews
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all"
                id="mob-nav-faq"
              >
                FAQs
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-emerald-400 transition-all"
                id="mob-nav-contact"
              >
                Contact & Address
              </button>
            </>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); setView('home'); }}
              className="block w-full text-center px-4 py-2.5 text-base font-semibold text-emerald-600 dark:text-emerald-400"
              id="mob-nav-back"
            >
              ← Back to Main Website
            </button>
          )}
        </div>
      )}
    </header>
  );
}
