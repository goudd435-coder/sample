/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Calendar, User, Phone, Clipboard, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { addAppointment, getAppointments } from '../services/storage';

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '11:30 AM',
  '12:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:30 PM',
  '06:00 PM',
  '07:00 PM'
];

export default function AppointmentForm() {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [error, setError] = useState('');

  // Get today's date string in YYYY-MM-DD format to prevent past bookings
  const todayStr = new Date().toISOString().split('T')[0];

  // Dynamically calculate available time slots for the chosen date
  const approvedSlots = date
    ? getAppointments()
        .filter(apt => apt.date === date && apt.status === 'approved')
        .map(apt => apt.time)
    : [];

  const availableTimeSlots = TIME_SLOTS.filter(slot => !approvedSlots.includes(slot));

  // Reset selected time if the selected date changes and makes the time slot unavailable
  useEffect(() => {
    if (date && time && approvedSlots.includes(time)) {
      setTime('');
    }
  }, [date, time]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!patientName.trim()) return setError('Please enter your full name.');
    if (!phone.trim() || phone.length < 10) return setError('Please enter a valid 10-digit phone number.');
    
    const whatsappNum = sameAsPhone ? phone : whatsapp;
    if (!sameAsPhone && (!whatsappNum.trim() || whatsappNum.length < 10)) {
      return setError('Please enter a valid 10-digit WhatsApp number.');
    }
    
    if (!date) return setError('Please choose a preferred date.');
    if (!time) return setError('Please choose a preferred time slot.');
    if (!symptoms.trim()) return setError('Please describe your symptoms briefly.');

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const result = addAppointment({
          patientName: patientName.trim(),
          phone: phone.trim(),
          whatsapp: whatsappNum.trim(),
          date,
          time,
          symptoms: symptoms.trim()
        });
        
        setSuccessData(result);
        
        // Reset Form
        setPatientName('');
        setPhone('');
        setWhatsapp('');
        setSameAsPhone(true);
        setDate('');
        setTime('');
        setSymptoms('');
      } catch (e) {
        setError('Failed to book appointment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handlePhoneChange = (val: string) => {
    // Only digits
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  const handleWhatsappChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setWhatsapp(cleaned);
  };

  const handleReset = () => {
    setSuccessData(null);
    setError('');
  };

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-gray-950 transition-colors duration-300" id="booking">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="booking-header">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Booking Portal
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white mt-1">
            Schedule Your Consultation
          </h2>
          <p className="font-sans text-xs text-gray-500 dark:text-gray-400 mt-2">
            No upfront registration fee. Fill out the details below, and our clinic assistant will confirm your slot via WhatsApp.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Form or Success Container */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/30 p-6 sm:p-10 dark:border-gray-900 dark:bg-gray-900/10 shadow-sm" id="booking-container">
          
          {successData ? (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
              id="booking-success"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle className="h-10 w-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Appointment Request Received!
                </h3>
                <p className="font-sans text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                  Your request is currently <strong className="text-amber-600 dark:text-amber-400">Pending Approval</strong> by Dr. Anant. We will send a confirmation notification to your WhatsApp number once approved.
                </p>
              </div>

              {/* Summary Card */}
              <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-5 text-left space-y-3 shadow-sm dark:bg-gray-900 dark:border-gray-850">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                  Booking Summary
                </h4>
                
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                  <div>
                    <span className="text-gray-400 block font-sans">Patient Name</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{successData.patientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-sans">Contact Number</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{successData.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-sans">Preferred Date</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(successData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-sans">Preferred Time</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{successData.time}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="rounded-2xl bg-gray-900 px-6 py-3 text-xs font-bold text-white hover:bg-gray-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors cursor-pointer"
                  id="btn-book-another"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6" id="booking-form">
              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400" id="form-error">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Grid 1: Name & Phone */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Patient Name *
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="name-input"
                      type="text"
                      placeholder="Enter Full Name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Phone Number (10 digits) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone-input"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Option and Field */}
              <div className="space-y-4 rounded-2xl bg-white p-4 border border-gray-150 dark:bg-gray-900 dark:border-gray-850">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    disabled={isSubmitting}
                    id="whatsapp-same-toggle"
                  />
                  <span className="font-sans text-xs font-semibold text-gray-750 text-gray-700 dark:text-gray-300">
                    My WhatsApp number is the same as my phone number
                  </span>
                </label>

                {!sameAsPhone && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5"
                    id="whatsapp-custom-field"
                  >
                    <label htmlFor="whatsapp-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      WhatsApp Number for Appointment Notifications *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="whatsapp-input"
                        type="tel"
                        placeholder="WhatsApp Number"
                        value={whatsapp}
                        onChange={(e) => handleWhatsappChange(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                        disabled={isSubmitting}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Grid 2: Date & Time */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label htmlFor="date-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-emerald-600/80 dark:text-emerald-400" />
                    <input
                      id="date-input"
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div className="space-y-1.5">
                  <label htmlFor="time-select" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-emerald-600/80 dark:text-emerald-400" />
                    <select
                      id="time-select"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-10 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white appearance-none"
                      disabled={isSubmitting || (date && availableTimeSlots.length === 0)}
                    >
                      {date && availableTimeSlots.length === 0 ? (
                        <option value="">No Slots Available</option>
                      ) : (
                        <>
                          <option value="">Select Time Slot</option>
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    {/* custom drop down arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg className="h-4.5 w-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {date && availableTimeSlots.length === 0 && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">
                      All slots on this date are approved. Please choose another date.
                    </p>
                  )}
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-1.5">
                <label htmlFor="symptoms-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Symptoms or Health Concerns (Required) *
                </label>
                <div className="relative">
                  <Clipboard className="absolute top-3.5 left-3.5 h-4.5 w-4.5 text-gray-400" />
                  <textarea
                    id="symptoms-input"
                    rows={3}
                    placeholder="Describe your health conditions briefly (e.g. chronic allergy, joint pain, duration, etc.)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 dark:from-emerald-500 dark:to-teal-500 disabled:opacity-75 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  id="btn-submit-booking"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5" />
                      Request Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
