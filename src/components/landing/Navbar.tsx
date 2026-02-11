'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const APP_URL = '/app';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'blur-nav border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
        <a href="#" className="font-serif text-xl text-soft-black">
          StarbizVoice
        </a>

        <a
          href={APP_URL}
          className="btn-utah-gradient text-white text-sm font-medium px-5 py-2 rounded-full shadow-md shadow-primary/15"
        >
          <span>Obtener Acceso</span>
        </a>
      </div>
    </motion.nav>
  );
}
