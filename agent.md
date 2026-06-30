# QRFlow - QR Code Generator

## Project Info
- Name: QRFlow
- Path: /home/xred/Desktop/Work/QRFlow
- Description: Modern QR Code generator with customization, download, and history
- Language: React + Vite
- Styling: Tailwind CSS v4
- Animation: Framer Motion
- QR Library: qrcode.react
- i18n: react-i18next (EN/FR/AR)
- State: localStorage for history
- Publishing: GitHub Pages

## Commands
- Run dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Communication
- Always reply in Arabic when the user speaks Arabic
- All user-facing text must be translated to EN, FR, AR
- Never create/update README or markdown unless explicitly asked

## Code Conventions
- No semicolons
- Single quotes for JS strings
- Framer Motion for animations (fadeInUp, stagger, scaleOnHover)
- Tailwind utility classes
- Glassmorphism: bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
- Gradient text: bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
- Mobile-first responsive design

## Design System
- Dark theme default with light toggle
- Glassmorphism cards
- Gradient accents (blue-400 to purple-500)
- Smooth page transitions with AnimatePresence
- Hover scale animations
- Font: Inter

## Languages
- EN (default) - LTR
- FR - LTR
- AR - RTL (dir="rtl" on html)

## Features
1. Real-time QR generation from text/URL
2. Custom foreground/background colors
3. Size control (128-512px)
4. Error correction level (L, M, Q, H)
5. Logo upload overlay in center
6. Download as PNG or SVG
7. Last 20 QR codes saved in localStorage
8. Dark/Light theme toggle
9. 3 languages (EN/FR/AR)
10. Fully responsive (mobile + desktop)

## Components
- src/App.jsx - Main layout with state management
- src/components/Header.jsx - Logo, Language switcher, Theme toggle, Color schemes
- src/components/QRGenerator.jsx - Input form with paste support
- src/components/QRPreview.jsx - QR display + download PNG/SVG
- src/components/Customizer.jsx - Color, size, EC level, logo upload
- src/components/History.jsx - localStorage history with copy/delete
- src/hooks/useLocalStorage.js - localStorage hook
- src/i18n/index.js - i18n setup with RTL support
- src/i18n/en.json fr.json ar.json - Translation files
