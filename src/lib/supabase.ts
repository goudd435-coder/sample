/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Project ID and Publishable Key provided by the user
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://vyduvldasmsswhojddpz.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BoBHkQv7M7yNgQgI5tFO6g_acnJmMJ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * SQL snippet to create the required table in the Supabase SQL Editor:
 * 
 * CREATE TABLE appointments (
 *   id TEXT PRIMARY KEY,
 *   patient_name TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   whatsapp TEXT NOT NULL,
 *   date TEXT NOT NULL,
 *   time TEXT NOT NULL,
 *   symptoms TEXT NOT NULL,
 *   status TEXT NOT NULL DEFAULT 'pending',
 *   created_at TEXT NOT NULL,
 *   notes TEXT
 * );
 * 
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
 * 
 * -- Create Policy to allow anonymous read/write access (standard for patient public appointments form and admin portal)
 * CREATE POLICY "Allow public access" ON appointments FOR ALL USING (true) WITH CHECK (true);
 */
