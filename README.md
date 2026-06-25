# Annant Homeopathy Clinic & Research Centre

An elegant, fully-featured clinical portal and appointment scheduler built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**. Centered around classic therapeutic principles and constitutional treatment, the application provides a seamless medical workspace for patients to register consultations and the doctor to manage clinical schedules.

Designed with a **Clean Minimalism** design language, this portal utilizes spacious padding, subtle transition animations, custom-crafted widgets, and a clear semantic hierarchy.

---

## Key Features

- 🏥 **Patient Appointment Booking Form**: A fully structured request pipeline where patients can submit their demographic details, contact information, consultation date, time-slot selection, and main clinical complaints.
- 🕒 **Approved Slot De-duplication**: Integrated real-time booking validation. Once the doctor approves an appointment, that specific time slot is dynamically removed from the active slot selection list for that day to prevent double-booking.
- 🔐 **Secure Doctor Dashboard**: A discrete portal accessible through secure credentials. Allows the clinical team to review pending cases, filter schedules, approve/reject appointments, and export files.
- 💬 **Direct WhatsApp Integration**: Integrated floating communication triggers and quick-links configured with pre-filled, context-aware WhatsApp templates for immediate consultation support.
- 📊 **Clinical Visualizers**: Staggered interactive dashboard counters showcasing metrics for pending, approved, and active daily patient queues.
- 🌓 **Aesthetic Transitions & Light/Dark Mode**: High-contrast modern interface with fluid layout animations (using `motion/react`) supporting system-preferred and toggleable light/dark modes.

---

## Demo Passcode Credentials

To access the administrative workspace:
- **Email**: `doctor@annant.com` (Pre-configured)
- **Secure PIN (Passcode)**: `8306630477` (the clinic's official phone number) or `1234`

---

## Technical Stack & Configuration

The project is built on modern, production-ready libraries:

- **Frontend Core**: [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) (fast hot module replacements and optimized static asset packaging)
- **Languages**: [TypeScript](https://www.typescriptlang.org/) (strict static typing and interfaces)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern component utility styling with customized theme tokens)
- **Animations**: [Motion](https://motion.dev/) (hardware-accelerated, native layout and entry transitions)
- **Icons**: [Lucide React](https://lucide.dev/) (unified outline vector graphics)

---

## Project Structure

```bash
├── src
│   ├── components        # UI components (Hero, About, Booking, FAQ, AdminPanel, etc.)
│   │   ├── AboutDoctor.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FAQ.tsx
│   │   ├── FloatingWhatsapp.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   └── Testimonials.tsx
│   ├── data              # Static mock data and clinical configurations
│   │   └── mockData.ts
│   ├── services          # Client-side durable persistence handlers
│   │   └── storage.ts
│   ├── types.ts          # Unified clinical TypeScript types and schemas
│   ├── App.tsx           # Primary application view-controller and router
│   ├── index.css         # Entry CSS with Tailwind configuration and theme definitions
│   └── main.tsx          # Client-side initialization file
├── index.html            # Static HTML entry page
├── package.json          # Project manifest and dependencies
├── tsconfig.json         # TypeScript compiler configurations
└── vite.config.ts        # Vite execution environment configuration
```

---

## Local Development Installation

Follow these steps to run the application on your local machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and npm installed.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/annant-homeopathy-clinic.git
cd annant-homeopathy-clinic
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Local Server
```bash
npm run dev
```
The server will boot and open the application. Typically, the default local URL will be `http://localhost:3000` or `http://localhost:5173`.

### 5. Build for Production
To bundle a production-ready build:
```bash
npm run build
```
This command compiles and packages the static files (HTML, CSS, TSX bundle) inside the `/dist` directory, optimized for deployment to platforms such as Netlify, Vercel, Firebase Hosting, or Cloud Run.

---

## License
Distributed under the Apache-2.0 License. See the header of source files for license declarations.
