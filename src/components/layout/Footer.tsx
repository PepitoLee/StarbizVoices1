'use client';

import { Headphones } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 text-white/50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
              <Headphones size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">StarbizVoice</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Terminos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} StarbizVoice. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
