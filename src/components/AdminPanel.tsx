/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  X, 
  Search, 
  Calendar, 
  Phone, 
  MessageSquare, 
  User, 
  Clipboard, 
  Clock, 
  ShieldCheck, 
  Eye, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Database,
  Loader2
} from 'lucide-react';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  getDashboardStats, 
  DashboardStats,
  fetchAppointmentsFromSupabase
} from '../services/storage';
import { Appointment } from '../types';
import { CLINIC_INFO } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  onBackToHome: () => void;
}

export default function AdminPanel({ onBackToHome }: AdminPanelProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, pending: 0, approved: 0, rejected: 0, today: 0 });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showDbGuide, setShowDbGuide] = useState(false);
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  // Modal for viewing details
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // WhatsApp dispatch modal state
  const [whatsappModal, setWhatsappModal] = useState<{
    isOpen: boolean;
    appointment: Appointment;
    type: 'approved' | 'rejected';
    messageText: string;
  } | null>(null);

  useEffect(() => {
    refreshData(false);

    // 1. Supabase Realtime Subscription
    // Listens to insert, update, or delete events on the 'appointments' table
    console.log('Subscribing to Supabase Realtime updates on table "appointments"...');
    const channel = supabase
      .channel('appointments-realtime-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        (payload) => {
          console.log('Real-time database change detected in AdminPanel:', payload);
          // Silently refresh the list and update stats
          refreshData(true);
        }
      )
      .subscribe((status) => {
        console.log('Supabase Realtime connection status:', status);
      });

    // 2. Reliable 10-second polling fallback (in case publication/realtime is not enabled in Supabase console)
    const interval = setInterval(() => {
      refreshData(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  const refreshData = async (silent: boolean = false) => {
    // 1. Instantly pull cached records from local storage if not silent
    if (!silent) {
      const cachedList = getAppointments();
      setAppointments(cachedList);
      setStats(getDashboardStats());
    }

    // 2. Refresh from Supabase in background
    if (!silent) setIsSyncing(true);
    setSyncError(null);
    try {
      const freshList = await fetchAppointmentsFromSupabase();
      if (freshList) {
        setAppointments(freshList);
        setStats(getDashboardStats());
      }
    } catch (err) {
      console.error('Supabase fetch failed:', err);
      if (!silent) {
        setSyncError('Using offline storage cache. Run SQL query in Supabase to sync.');
      }
    } finally {
      if (!silent) setIsSyncing(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    setSyncError(null);
    try {
      const updated = await updateAppointmentStatus(id, newStatus);
      if (updated) {
        // Silent refresh to keep state completely consistent
        refreshData(true);
        if (selectedAppointment?.id === id) {
          setSelectedAppointment(updated);
        }
        
        // Auto generate the required WhatsApp message template
        let messageText = '';
        if (newStatus === 'approved') {
          messageText = `Hello ${updated.patientName},\n\nYour appointment with Dr. Anant at ANNANT HOMEOPATHY CLINIC has been approved.\n\nDate: ${new Date(updated.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\nTime: ${updated.time}\n\nClinic Address:\nMangyawas Road, Opposite Jyana Paradise, Mansarovar, Jaipur.\n\nFor any queries call:\n8306630477\n\nThank you.`;
        } else {
          messageText = `Hello ${updated.patientName},\n\nYour requested appointment could not be approved for the selected time slot.\n\nPlease book another slot or contact us directly at 8306630477.\n\nThank you.\nANNANT HOMEOPATHY CLINIC`;
        }

        setWhatsappModal({
          isOpen: true,
          appointment: updated,
          type: newStatus,
          messageText
        });
      }
    } catch (err: any) {
      console.error('Failed to update status on Supabase:', err);
      setSyncError(`Failed to update status: ${err.message || err}`);
    }
  };

  const sendWhatsAppMessage = (phone: string, text: string) => {
    // Standard Indian international phone prefix (91)
    const formattedPhone = phone.startsWith('91') ? phone : `91${phone}`;
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${formattedPhone}?text=${encodedText}`;
    window.open(url, '_blank');
    setWhatsappModal(null);
  };

  // Filtered appointments list
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      (apt.symptoms && apt.symptoms.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesDate = !dateFilter || apt.date === dateFilter;
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 dark:bg-gray-950 transition-colors duration-300" id="admin-workspace">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200/85 pb-6 dark:border-gray-800" id="admin-ws-header">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Doctor Workspace
              </span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                isSyncing 
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' 
                  : syncError 
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' 
                    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
              }`}>
                {isSyncing ? (
                  <>
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    Syncing Database...
                  </>
                ) : syncError ? (
                  <>
                    <AlertCircle className="h-2.5 w-2.5" />
                    Offline Cache Active
                  </>
                ) : (
                  <>
                    <Database className="h-2.5 w-2.5" />
                    Connected to Supabase
                  </>
                )}
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
              Clinic Appointment Board
            </h2>
            <p className="font-sans text-xs text-gray-500 dark:text-gray-450">
              Securely review incoming booking inquiries, evaluate symptoms, update statuses, and send WhatsApp reminders.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDbGuide(!showDbGuide)}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-900 cursor-pointer"
              id="btn-admin-db-guide"
            >
              <Database className="h-3.5 w-3.5" />
              Database Config SQL
            </button>
            <button
              onClick={refreshData}
              disabled={isSyncing}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer disabled:opacity-50"
              id="btn-admin-refresh"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={onBackToHome}
              className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 cursor-pointer"
              id="btn-admin-back-to-site"
            >
              Back to Main Web
            </button>
          </div>
        </div>

        {/* Database Config SQL collapsible helper */}
        {showDbGuide && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 dark:border-emerald-900/30 dark:bg-emerald-950/10 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Supabase Setup Instructions
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-450">
                  We've successfully linked your Supabase credentials! To enable persistent storage, copy the SQL below and run it inside your <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Supabase SQL Editor</strong> to construct the table and Row Level Security rules.
                </p>
              </div>
              <button 
                onClick={() => setShowDbGuide(false)}
                className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-[11px] font-mono text-emerald-400 leading-relaxed border border-gray-850">
{`-- Create appointments table
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous select/insert/update access so form and board work seamlessly
CREATE POLICY "Allow public access" ON appointments FOR ALL USING (true) WITH CHECK (true);

-- Enable Supabase Realtime for the table so newly booked appointments appear instantly
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;`}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`CREATE TABLE appointments (\n  id TEXT PRIMARY KEY,\n  patient_name TEXT NOT NULL,\n  phone TEXT NOT NULL,\n  whatsapp TEXT NOT NULL,\n  date TEXT NOT NULL,\n  time TEXT NOT NULL,\n  symptoms TEXT NOT NULL,\n  status TEXT NOT NULL DEFAULT 'pending',\n  created_at TEXT NOT NULL,\n  notes TEXT\n);\n\nALTER TABLE appointments ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "Allow public access" ON appointments FOR ALL USING (true) WITH CHECK (true);\n\nALTER PUBLICATION supabase_realtime ADD TABLE appointments;`);
                  alert("SQL setup script copied to clipboard!");
                }}
                className="absolute right-3 top-3 rounded bg-gray-800 px-2 py-1 text-[10px] font-semibold text-white hover:bg-gray-700"
              >
                Copy SQL
              </button>
            </div>
          </motion.div>
        )}

        {syncError && (
          <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 flex items-center gap-2 text-xs text-rose-700 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{syncError} <button onClick={() => setShowDbGuide(true)} className="underline font-semibold text-rose-800 dark:text-rose-300">Show setup guide</button>.</span>
          </div>
        )}

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5" id="admin-stats-grid">
          {/* Today's appointments */}
          <div className="rounded-2xl border border-gray-150 bg-white p-4 dark:border-gray-850 dark:bg-gray-900 shadow-sm space-y-1.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Today's Slots
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">{stats.today}</span>
              <span className="font-sans text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/20 p-4 dark:border-amber-950/20 dark:bg-amber-950/5 shadow-sm space-y-1.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-450 block">
              Pending Approval
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-amber-600 dark:text-amber-500">{stats.pending}</span>
              <span className="font-sans text-xs text-amber-500 font-medium">Await Review</span>
            </div>
          </div>

          {/* Approved Appointments */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-4 dark:border-emerald-950/20 dark:bg-emerald-950/5 shadow-sm space-y-1.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-450 block">
              Approved
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-550">{stats.approved}</span>
              <span className="font-sans text-xs text-emerald-550 font-medium">Confirmed</span>
            </div>
          </div>

          {/* Rejected Appointments */}
          <div className="rounded-2xl border border-red-100 bg-red-50/10 p-4 dark:border-red-950/10 dark:bg-red-950/5 shadow-sm space-y-1.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-red-500 block">
              Rejected
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-red-500">{stats.rejected}</span>
              <span className="font-sans text-xs text-red-400 font-medium">Cancelled</span>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-gray-150 bg-white p-4 dark:border-gray-850 dark:bg-gray-900 shadow-sm space-y-1.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Total Managed
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">{stats.total}</span>
              <span className="font-sans text-xs text-gray-450">All Time</span>
            </div>
          </div>
        </div>

        {/* List Filtration Controls */}
        <div className="rounded-3xl border border-gray-150 bg-white p-5 dark:border-gray-850 dark:bg-gray-900/60 shadow-sm space-y-4" id="admin-filters">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
            
            {/* Search Input */}
            <div className="relative sm:col-span-5">
              <Search className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient name, phone, or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-250 bg-gray-50/50 py-2.5 pr-4 pl-10 text-xs font-medium text-gray-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                id="search-input-field"
              />
            </div>

            {/* Date Picker Filter */}
            <div className="relative sm:col-span-3">
              <Calendar className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-2xl border border-gray-250 bg-gray-50/50 py-2.5 pr-4 pl-10 text-xs font-semibold text-gray-800 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                id="date-filter-field"
              />
              {dateFilter && (
                <button 
                  onClick={() => setDateFilter('')} 
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] font-bold"
                  id="btn-clear-date"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Selector Pills */}
            <div className="flex items-center gap-1.5 sm:col-span-4 justify-start sm:justify-end" id="status-tabs-container">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold capitalize cursor-pointer transition-all ${
                    statusFilter === s
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 border border-gray-150 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800'
                  }`}
                  id={`tab-status-${s}`}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Appointment Listing Container */}
        <div className="overflow-hidden rounded-3xl border border-gray-150 bg-white shadow-sm dark:border-gray-850 dark:bg-gray-900" id="appointments-list-box">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/55 border-b border-gray-150 dark:bg-gray-950/40 dark:border-gray-800 text-gray-500 dark:text-gray-450 uppercase text-[10px] tracking-wider font-extrabold">
                  <th className="p-4">Patient details</th>
                  <th className="p-4">Requested date</th>
                  <th className="p-4">Preferred time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-400 font-sans text-xs">
                      No appointments matching the filtered criteria were found.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr 
                      key={apt.id} 
                      className="hover:bg-gray-50/30 dark:hover:bg-gray-950/10 transition-colors"
                      id={`row-apt-${apt.id}`}
                    >
                      {/* Name, Contact */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                            {apt.patientName}
                          </h4>
                          <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-0.5 font-mono">
                              <Phone className="h-3 w-3 text-gray-400 shrink-0" />
                              {apt.phone}
                            </span>
                            {apt.whatsapp && (
                              <span className="flex items-center gap-0.5 font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                                <MessageSquare className="h-3 w-3 text-emerald-500 shrink-0" />
                                {apt.whatsapp}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4 font-sans text-xs font-semibold text-gray-750 text-gray-750 dark:text-gray-300">
                        {new Date(apt.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Time */}
                      <td className="p-4 font-mono text-xs text-gray-700 dark:text-gray-300">
                        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 px-2 py-1 rounded-md">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {apt.time}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide leading-none border ${
                          apt.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-950/30'
                            : apt.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-950/30'
                            : 'bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/30'
                        }`}>
                          {apt.status}
                        </span>
                      </td>

                      {/* Action Triggers */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2" id={`actions-${apt.id}`}>
                          {/* View details */}
                          <button
                            onClick={() => setSelectedAppointment(apt)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-50 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                            title="Inspect Patient Symptoms"
                            id={`btn-inspect-${apt.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {apt.status === 'pending' && (
                            <>
                              {/* Approve Button */}
                              <button
                                onClick={() => handleStatusChange(apt.id, 'approved')}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/30 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50 cursor-pointer"
                                title="Approve & Send Notification"
                                id={`btn-approve-${apt.id}`}
                              >
                                <Check className="h-4 w-4" />
                              </button>

                              {/* Reject Button */}
                              <button
                                onClick={() => handleStatusChange(apt.id, 'rejected')}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/30 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 cursor-pointer"
                                title="Reject Appointment"
                                id={`btn-reject-${apt.id}`}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          {apt.status !== 'pending' && (
                            /* Re-dispatch WhatsApp trigger manually */
                            <button
                              onClick={() => {
                                const msg = apt.status === 'approved'
                                  ? `Hello ${apt.patientName},\n\nYour appointment with Dr. Anant at ANNANT HOMEOPATHY CLINIC has been approved.\n\nDate: ${new Date(apt.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\nTime: ${apt.time}\n\nClinic Address:\nMangyawas Road, Opposite Jyana Paradise, Mansarovar, Jaipur.\n\nFor any queries call:\n8306630477\n\nThank you.`
                                  : `Hello ${apt.patientName},\n\nYour requested appointment could not be approved for the selected time slot.\n\nPlease book another slot or contact us directly at 8306630477.\n\nThank you.\nANNANT HOMEOPATHY CLINIC`;
                                setWhatsappModal({
                                  isOpen: true,
                                  appointment: apt,
                                  type: apt.status as 'approved' | 'rejected',
                                  messageText: msg
                                });
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                              title="Resend WhatsApp Notification"
                              id={`btn-whatsapp-${apt.id}`}
                            >
                              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILS OVERLAY MODAL */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" id="details-overlay">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-gray-150 p-6 sm:p-8 space-y-6 shadow-2xl dark:bg-gray-900 dark:border-gray-800">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border mb-1.5 ${
                    selectedAppointment.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : selectedAppointment.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {selectedAppointment.status}
                  </span>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    Patient Case Card
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                  id="btn-close-details"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Case Details */}
              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-350">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-extrabold text-gray-950 dark:text-white">
                      {selectedAppointment.patientName}
                    </h4>
                    <p className="font-sans text-xs text-gray-400">
                      ID: {selectedAppointment.id} • Registered: {new Date(selectedAppointment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Date / Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Requested Date</span>
                    <span className="font-sans text-xs font-semibold text-gray-800 dark:text-gray-200">
                      {new Date(selectedAppointment.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Requested Time</span>
                    <span className="font-mono text-xs text-gray-800 dark:text-gray-200">
                      {selectedAppointment.time}
                    </span>
                  </div>
                </div>

                {/* Contact Points */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Phone</span>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-400" />
                      {selectedAppointment.phone}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">WhatsApp</span>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 text-emerald-400" />
                      {selectedAppointment.whatsapp}
                    </span>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Health Symptoms / Consultation Notes</span>
                  <div className="rounded-xl bg-gray-50 p-4 border border-gray-150/50 dark:bg-gray-950 dark:border-gray-850">
                    <p className="font-sans text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {selectedAppointment.symptoms}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Footer inside Case Card */}
              {selectedAppointment.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-850">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, 'approved');
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 shadow-md transition-colors cursor-pointer"
                    id="modal-btn-approve"
                  >
                    <Check className="h-4 w-4" />
                    Approve Case
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, 'rejected');
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-50 border border-red-200 py-3 text-xs font-bold text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900 cursor-pointer"
                    id="modal-btn-reject"
                  >
                    <X className="h-4 w-4" />
                    Reject Slot
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* WHATSAPP TRIGGER MODAL */}
        {whatsappModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" id="whatsapp-modal">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 sm:p-8 space-y-6 shadow-2xl dark:bg-gray-900 dark:border-gray-800">
              
              {/* Modal Logo Banner */}
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  whatsappModal.type === 'approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                }`}>
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-gray-900 dark:text-white leading-none">
                    {whatsappModal.type === 'approved' ? 'Appointment Approved' : 'Appointment Rejected'}
                  </h3>
                  <span className="font-sans text-[11px] text-gray-400 uppercase tracking-wider block mt-1.5 font-bold">
                    WhatsApp Message Dispatcher
                  </span>
                </div>
              </div>

              {/* Informative description */}
              <p className="font-sans text-xs text-gray-505 text-gray-500 dark:text-gray-400">
                The appointment status was successfully updated in the clinic database. You can now send the pre-formatted clinical notification directly to the patient via WhatsApp.
              </p>

              {/* Text Area display */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Notification Text Preview</span>
                <div className="rounded-2xl border border-gray-150 bg-gray-50 p-4 dark:border-gray-850 dark:bg-gray-950 font-sans text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {whatsappModal.messageText}
                </div>
              </div>

              {/* Call to action */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => sendWhatsAppMessage(whatsappModal.appointment.whatsapp, whatsappModal.messageText)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  id="btn-dispatch-whatsapp"
                >
                  <MessageSquare className="h-4.5 w-4.5 fill-white text-emerald-600" />
                  Send via WhatsApp Web
                </button>
                <button
                  onClick={() => setWhatsappModal(null)}
                  className="flex-1 rounded-2xl border border-gray-250 bg-white py-3.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                  id="btn-dismiss-whatsapp"
                >
                  Dismiss
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
