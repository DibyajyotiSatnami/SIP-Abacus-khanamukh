# SIP Abacus Khanamukh / Maligaon — Website

Animated single-page website for **SIP Abacus, Boripara, Maligaon Centre** (Ayush Apartment, Ranigate, Guwahati, Assam 781017 · +91 87218 11184).

Built with **React + Vite + [Framer Motion](https://motion.dev)**, using the brand's orange / red / white palette from the centre's posters.

## Animations & interactive maths
- **Hero** – spring-animated "5x Better" headline, floating maths symbols, and a live abacus that solves sums on its own (or let kids tap the beads).
- **Abacus playground** – a working soroban (heaven bead = 5, earth beads = 1) with odometer-style rolling digits, auto-count and random modes.
- **Flash Anzan challenge** – numbers flash one at a time; add them mentally, then check your answer (with confetti).
- **Stats** – count-up numbers over self-drawing sine waves.
- **Programme timeline** – scroll-linked progress line.
- **Triangle puzzle** – SVG triangles that draw themselves; tap to highlight.
- **Gallery** – 3D tilt cards with shared-layout lightbox.
- Scroll progress bar, staggered reveals, animated reviews and stars. Respects `prefers-reduced-motion`.

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # preview the build
```

Centre details (phone, address, reviews, etc.) live in `src/data.js`; images are in `public/images/`.
