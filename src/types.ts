/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  whatsapp: string;
  date: string;
  time: string;
  symptoms: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  treatment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface TreatmentSpecialty {
  id: string;
  title: string;
  description: string;
  icon: string;
}
