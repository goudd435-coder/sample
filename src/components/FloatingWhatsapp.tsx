/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function FloatingWhatsapp() {
  const whatsappMessage = `Hello Dr. Anant, I would like to inquire about homeopathic consultation at ANNANT HOMEOPATHY CLINIC.`;
  const whatsappUrl = `https://wa.me/91${CLINIC_INFO.phone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 transition-all duration-250 cursor-pointer group"
      title="Chat with Dr. Anant on WhatsApp"
      aria-label="Contact clinic on WhatsApp"
      id="floating-whatsapp-trigger"
    >
      {/* Pulse Outer Rings */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 group-hover:opacity-40 animate-ping -z-10" />
      
      {/* Icon */}
      <MessageCircle className="h-7 w-7 fill-white text-[#25D366]" />
    </a>
  );
}
