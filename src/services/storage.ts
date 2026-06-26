/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Appointment } from '../types';
import { DEFAULT_APPOINTMENTS } from '../data/mockData';
import { supabase } from '../lib/supabase';

const APPOINTMENTS_KEY = 'annant_homeopathy_appointments';

// Helper to check if Supabase URL has been customized or if we're connected
export function isSupabaseConnected(): boolean {
  try {
    // Basic verification of client availability
    return !!supabase;
  } catch (e) {
    return false;
  }
}

// Map database row to client Appointment type (handling both snake_case and camelCase schemas)
function mapFromDB(row: any): Appointment {
  return {
    id: row.id,
    patientName: row.patientName || row.patient_name || '',
    phone: row.phone || '',
    whatsapp: row.whatsapp || '',
    date: row.date || '',
    time: row.time || '',
    symptoms: row.symptoms || '',
    status: row.status || 'pending',
    createdAt: row.createdAt || row.created_at || new Date().toISOString(),
    notes: row.notes || undefined
  };
}

// Map client Appointment to database format (providing both snake_case and camelCase to match any table structure)
function mapToDB(apt: Appointment) {
  return {
    id: apt.id,
    patient_name: apt.patientName,
    patientName: apt.patientName, // supports camelCase table column
    phone: apt.phone,
    whatsapp: apt.whatsapp,
    date: apt.date,
    time: apt.time,
    symptoms: apt.symptoms,
    status: apt.status,
    created_at: apt.createdAt,
    createdAt: apt.createdAt, // supports camelCase table column
    notes: apt.notes
  };
}

// 1. Synchronous getAppointments from localStorage cache
export function getAppointments(): Appointment[] {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  if (!data) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(DEFAULT_APPOINTMENTS));
    return DEFAULT_APPOINTMENTS;
  }
  try {
    return JSON.parse(data) as Appointment[];
  } catch (e) {
    console.error('Failed to parse appointments', e);
    return DEFAULT_APPOINTMENTS;
  }
}

// Save directly to localStorage cache
export function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

// 2. Asynchronous fetchAppointments from Supabase
export async function fetchAppointmentsFromSupabase(): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // If table doesn't exist yet, we catch the error gracefully
      if (error.code === '42P01') {
        console.warn('Supabase table "appointments" does not exist yet. Please run the SQL setup script.');
      } else {
        console.error('Failed to fetch from Supabase:', error.message);
      }
      return getAppointments();
    }

    if (data && data.length > 0) {
      const appointments = data.map(mapFromDB);
      saveAppointments(appointments);
      return appointments;
    }
    
    // If Supabase is connected but empty, initialize with default records
    const localApts = getAppointments();
    if (localApts.length > 0 && localApts !== DEFAULT_APPOINTMENTS) {
      // Sync local appointments up to Supabase in background
      syncLocalToSupabase(localApts);
    }
    return localApts;
  } catch (err) {
    console.error('Error in fetchAppointmentsFromSupabase:', err);
    return getAppointments();
  }
}

// Helper to batch push local storage records up to Supabase
async function syncLocalToSupabase(apts: Appointment[]) {
  try {
    const rows = apts.map(mapToDB);
    await supabase.from('appointments').upsert(rows);
  } catch (err) {
    console.warn('Failed background batch sync to Supabase:', err);
  }
}

// 3. Add appointment (Sync & Local)
export function addAppointment(newApt: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
  const appointments = getAppointments();
  const appointment: Appointment = {
    ...newApt,
    id: `apt-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // Save locally first for instant feedback
  appointments.unshift(appointment);
  saveAppointments(appointments);

  // Sync to Supabase in the background
  const dbRow = mapToDB(appointment);
  supabase
    .from('appointments')
    .insert([dbRow])
    .then(({ error }) => {
      if (error) {
        console.error('Background Supabase insert error:', error.message);
      } else {
        console.log('Successfully saved to Supabase');
      }
    });

  return appointment;
}

// 4. Update appointment status (Sync & Local)
export function updateAppointmentStatus(id: string, status: 'approved' | 'rejected'): Appointment | null {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  appointments[index].status = status;
  saveAppointments(appointments);

  // Sync update to Supabase in the background
  supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .then(({ error }) => {
      if (error) {
        console.error('Background Supabase status update error:', error.message);
      } else {
        console.log('Successfully updated status in Supabase');
      }
    });

  return appointments[index];
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  today: number;
}

export function getDashboardStats(): DashboardStats {
  const appointments = getAppointments();
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  return appointments.reduce((stats, apt) => {
    stats.total += 1;
    if (apt.status === 'pending') stats.pending += 1;
    if (apt.status === 'approved') stats.approved += 1;
    if (apt.status === 'rejected') stats.rejected += 1;
    
    // Check if the appointment date matches today's date
    if (apt.date === todayStr) {
      stats.today += 1;
    }
    
    return stats;
  }, { total: 0, pending: 0, approved: 0, rejected: 0, today: 0 });
}
