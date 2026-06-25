/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Testimonial, FAQ, TreatmentSpecialty, Appointment } from '../types';

export const CLINIC_INFO = {
  name: 'ANNANT HOMEOPATHY CLINIC',
  tagline: 'Best Homeopathic Clinic in Jaipur',
  doctorName: 'Dr. Anant',
  specialization: 'Homeopathic Medicine',
  address: 'Mangyawas Road, Opposite Jyana Paradise, Shiv Vihar, Manyawas, Mansarovar, Jaipur, Rajasthan 302020',
  shortAddress: 'Mangyawas Road, Opposite Jyana Paradise, Mansarovar, Jaipur',
  phone: '8306630477',
  gmapsLocation: 'VP7X+94 Jaipur, Rajasthan',
  rating: 5.0,
  reviewCount: 72,
  yearsOfExperience: 12,
  happyPatients: 15000,
  email: 'info@annanthomeopathy.com'
};

export const SPECIALTIES: TreatmentSpecialty[] = [
  {
    id: 's1',
    title: 'Chronic Illnesses',
    description: 'Deep-acting constitutional remedies for long-standing conditions like Asthma, Thyroid disorders, and Hypertension.',
    icon: 'Activity'
  },
  {
    id: 's2',
    title: 'Skin & Hair Care',
    description: 'Safe and effective treatment for Psoriasis, Eczema, Acne, Alopecia (hair loss), and dandruff without side effects.',
    icon: 'Sparkles'
  },
  {
    id: 's3',
    title: 'Respiratory Allergies',
    description: 'Permanent relief from recurrent cold, cough, sinusitis, bronchitis, and allergic rhinitis by boosting immunity.',
    icon: 'Wind'
  },
  {
    id: 's4',
    title: 'Pediatric Homeopathy',
    description: 'Gentle, sweet pills for children’s immunity, behavioral issues, tonsillitis, bedwetting, and teething troubles.',
    icon: 'Baby'
  },
  {
    id: 's5',
    title: 'Digestive & Gastric Relief',
    description: 'Successful homeopathic approach for IBS, Acidity, Constipation, GERD, and Piles/Fissures.',
    icon: 'Flame'
  },
  {
    id: 's6',
    title: 'Joint & Muscle Pain',
    description: 'Effective remedies for Arthritis, Cervical Spondylosis, Sciatica, and Gout, improving joint mobility.',
    icon: 'Bone'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Sharma',
    rating: 5,
    review: 'Dr. Anant cured my chronic skin allergy of 4 years. Homeopathy takes time but the results are permanent and safe. Highly recommended!',
    treatment: 'Chronic Skin Allergy',
    date: '10 June 2026'
  },
  {
    id: 't2',
    name: 'Pooja Meena',
    rating: 5,
    review: 'I was suffering from Migraine and took severe painkillers daily. Dr. Anant started homeopathic remedies, and in 3 months my migraine frequency has dropped to zero.',
    treatment: 'Migraine Relief',
    date: '02 June 2026'
  },
  {
    id: 't3',
    name: 'Suresh Kumar',
    rating: 5,
    review: 'Excellent doctor. Explains the root cause of the disease and provides very good treatment. My Joint Pain has reduced drastically within a few weeks.',
    treatment: 'Rheumatoid Arthritis',
    date: '28 May 2026'
  },
  {
    id: 't4',
    name: 'Anjali Gupta',
    rating: 5,
    review: 'Best homeopathic clinic in Jaipur. My daughter’s recurrent tonsillitis is completely cured. Sweet homeopathic pills made pediatric treatment so easy!',
    treatment: 'Pediatric Tonsillitis',
    date: '15 May 2026'
  },
  {
    id: 't5',
    name: 'Vikram Singh',
    rating: 5,
    review: 'Professional attitude and very detailed checkup. He patiently listens to all symptoms. Highly satisfied with my Asthma treatment.',
    treatment: 'Allergic Asthma',
    date: '05 May 2026'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Are homeopathic medicines safe for children and pregnant women?',
    answer: 'Yes, homeopathic medicines are extremely safe, non-toxic, and gentle. Since they are prepared from natural sources in highly diluted micro-doses, they do not cause any harmful side effects and are perfectly safe for infants, children, and pregnant or lactating mothers.'
  },
  {
    id: 'f2',
    question: 'How long does it take for homeopathy to show results?',
    answer: 'The response depends on whether the disease is acute (recent) or chronic (long-standing). Acute ailments like cold, fever, or allergy show relief within hours or days. Chronic problems of many years may require several weeks or months to be completely uprooted, as homeopathy aims for a permanent cure rather than a temporary suppression.'
  },
  {
    id: 'f3',
    question: 'Do I need to stop all my conventional (allopathic) medications?',
    answer: 'No, you do not need to stop your ongoing allopathic medications immediately, especially for critical conditions like blood pressure, diabetes, or epilepsy. Homeopathic medicines can be safely taken alongside other treatments. As your health improves, the dosage of your conventional medicines can be gradually tapered down under supervision.'
  },
  {
    id: 'f4',
    question: 'What dietary restrictions should I follow during homeopathic treatment?',
    answer: 'Generally, it is advised to avoid consuming raw onion, garlic, ginger, mint, or drinking strong coffee immediately before or after taking homeopathic pills (keep a gap of 15-20 minutes). This is because strong odors can sometimes interfere with the absorption of the micro-doses.'
  },
  {
    id: 'f5',
    question: 'How do I store homeopathic medicines?',
    answer: 'Homeopathic medicines should be stored in a cool, dry place away from direct sunlight, moisture, and strong-smelling substances like camphor, perfumes, or essential oils. Always keep the bottles tightly closed.'
  }
];

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientName: 'Devendra Choudhary',
    phone: '9876543210',
    whatsapp: '9876543210',
    date: '2026-06-25',
    time: '11:00 AM',
    symptoms: 'Chronic acidity, digestive issues, and bloating since 6 months.',
    status: 'pending',
    createdAt: '2026-06-24T09:00:00.000Z'
  },
  {
    id: 'apt-2',
    patientName: 'Meera Sharma',
    phone: '8765432109',
    whatsapp: '8765432109',
    date: '2026-06-25',
    time: '12:30 PM',
    symptoms: 'Severe hair loss and itching on the scalp. Suspected eczema.',
    status: 'approved',
    createdAt: '2026-06-24T08:15:00.000Z'
  },
  {
    id: 'apt-3',
    patientName: 'Karan Singh',
    phone: '7654321098',
    whatsapp: '7654321098',
    date: '2026-06-26',
    time: '04:00 PM',
    symptoms: 'Joint pain in knees, difficulty climbing stairs.',
    status: 'pending',
    createdAt: '2026-06-24T09:45:00.000Z'
  },
  {
    id: 'apt-4',
    patientName: 'Sanjay Verma',
    phone: '9543210987',
    whatsapp: '9543210987',
    date: '2026-06-24',
    time: '10:00 AM',
    symptoms: 'Recurrent sneezing and allergic rhinitis in morning.',
    status: 'approved',
    createdAt: '2026-06-23T16:00:00.000Z'
  },
  {
    id: 'apt-5',
    patientName: 'Sunita Meena',
    phone: '9432109876',
    whatsapp: '9432109876',
    date: '2026-06-24',
    time: '05:30 PM',
    symptoms: 'Hypothyroidism and excessive fatigue.',
    status: 'rejected',
    createdAt: '2026-06-23T14:30:00.000Z'
  }
];
