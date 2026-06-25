/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutDoctor from './components/AboutDoctor';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentView, setView] = useState<'home' | 'admin'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('doctor@annant.com');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Initialize theme and login session from localStorage
  useEffect(() => {
    // Check Dark Mode
    const savedTheme = localStorage.getItem('annant_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Check Doctor Session
    const savedSession = localStorage.getItem('annant_doctor_session');
    if (savedSession === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('annant_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('annant_theme', 'light');
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!pin.trim()) {
      setLoginError('Please enter your secure doctor passcode.');
      return;
    }

    setIsLoggingIn(true);

    // Simulate clinical check
    setTimeout(() => {
      // Pin matches phone number (8306630477) or '1234'
      if (pin.trim() === '8306630477' || pin.trim() === '1234') {
        setIsLoggedIn(true);
        localStorage.setItem('annant_doctor_session', 'true');
        setShowLoginModal(false);
        setPin('');
        setView('admin');
      } else {
        setLoginError('Incorrect passcode. Hint: Use clinic phone number (8306630477) or 1234.');
      }
      setIsLoggingIn(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('annant_doctor_session');
    setView('home');
  };

  return (
    <div className="min-h-screen bg-white text-gray-850 selection:bg-emerald-500 selection:text-white dark:bg-gray-950 dark:text-gray-150 transition-colors duration-300 font-sans">
      
      {/* Header element */}
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentView={currentView}
        setView={setView}
        isLoggedIn={isLoggedIn}
        logout={handleLogout}
        onLoginClick={() => {
          setLoginError('');
          setShowLoginModal(true);
        }}
      />

      {/* Main Content Areas */}
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
            id="view-landing"
          >
            <Hero />
            <AboutDoctor />
            <Services />
            <AppointmentForm />
            <Testimonials />
            <FAQ />
            <ContactSection />
            <FloatingWhatsapp />
            <Footer
              onLoginClick={() => {
                setLoginError('');
                setShowLoginModal(true);
              }}
              setView={setView}
              isLoggedIn={isLoggedIn}
            />
          </motion.main>
        ) : (
          <motion.main
            key="admin-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            id="view-admin"
          >
            <AdminPanel onBackToHome={() => setView('home')} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* SECURE DOCTOR LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="login-modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-150 p-6 sm:p-8 space-y-6 shadow-2xl dark:bg-gray-900 dark:border-gray-850"
              id="login-modal-box"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                id="btn-close-login"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Header Icon & Branding */}
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-gray-900 dark:text-white leading-none mt-2">
                  Doctor Portal Login
                </h3>
                <p className="font-sans text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  ANNANT Homeopathy Clinic
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-modal-form">
                {loginError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400" id="login-error-box">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Username display field */}
                <div className="space-y-1.5">
                  <label htmlFor="login-username" className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Doctor Email ID
                  </label>
                  <input
                    id="login-username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 px-4 text-xs font-semibold text-gray-500 cursor-not-allowed dark:border-gray-800 dark:bg-gray-950"
                    disabled={true}
                  />
                </div>

                {/* Passcode input field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="login-pin" className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Secure Passcode (PIN)
                    </label>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Phone Number
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="login-pin"
                      type={showPin ? 'text' : 'password'}
                      placeholder="Enter 10-Digit PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-11 pl-4 text-sm font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                      disabled={isLoggingIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      id="btn-toggle-pin-visibility"
                    >
                      {showPin ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Explanatory notice */}
                <div className="rounded-xl bg-emerald-50/40 p-3.5 border border-emerald-100/30 dark:bg-emerald-950/10 dark:border-emerald-950/20 text-[11px] text-gray-500 dark:text-gray-400">
                  <div className="flex items-start gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Demo credentials configured! Access Dr. Anant's active dashboard using passcode <strong className="text-emerald-700 dark:text-emerald-400">8306630477</strong> (the clinic phone number) or <strong className="text-emerald-700 dark:text-emerald-400">1234</strong>.
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transform hover:-translate-y-0.5 transition-all duration-250 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  id="btn-submit-login"
                >
                  {isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Workspace'}
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
