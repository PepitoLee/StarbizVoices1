'use client';

import Link from 'next/link';
import { Headphones } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 blur-nav border-b border-gray-200/30">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-dark rounded-lg flex items-center justify-center">
            <Headphones size={18} className="text-white" />
          </div>
          <span className="font-bold text-dark text-lg">StarbizVoice</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/magic"
            className="text-sm font-medium text-gray-600 hover:text-dark transition-colors"
          >
            Iniciar sesion
          </Link>
          <Link
            href="/app"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-500 transition-colors"
          >
            Obtener Acceso
          </Link>
        </div>
      </div>
    </nav>
  );
}
