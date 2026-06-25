/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Appointment } from '../types';
import { DEFAULT_APPOINTMENTS } from '../data/mockData';

const APPOINTMENTS_KEY = 'annant_homeopathy_appointments';

export function getAppointments(): Appointment[] {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  if (!data) {
    // Pre-populate with realistic mock appointments
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

export function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function addAppointment(newApt: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
  const appointments = getAppointments();
  const appointment: Appointment = {
    ...newApt,
    id: `apt-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  appointments.unshift(appointment); // Add to the top of the list
  saveAppointments(appointments);
  return appointment;
}

export function updateAppointmentStatus(id: string, status: 'approved' | 'rejected'): Appointment | null {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  appointments[index].status = status;
  saveAppointments(appointments);
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
