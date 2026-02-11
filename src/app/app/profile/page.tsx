'use client';

import { useAuth } from '@/hooks/use-auth';
import { LogOut, Headphones, ChevronRight } from 'lucide-react';


export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initial = (user.name || user.email || '?')[0].toUpperCase();

  return (
    <div className="pt-4 pb-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-serif text-soft-black">Perfil</h1>
      </div>

      {/* User card */}
      <div className="mx-4 glass-card-premium rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C8963E, #B8453A)',
              boxShadow: '0 4px 12px rgba(200, 150, 62, 0.3)',
            }}
          >
            <span className="text-white font-serif text-lg">{initial}</span>
          </div>
          <div>
            <h2 className="font-bold text-soft-black text-lg">{user.name || 'Usuario'}</h2>
            <p className="text-sm text-soft-black/50">{user.email}</p>
            <span className="inline-block mt-1 badge-utah text-xs font-medium px-2 py-0.5 rounded-full">
              Acceso Premium
            </span>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="mx-4 glass-card rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center gap-3 p-4 relative z-10">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Headphones size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-soft-black flex-1">Historial</span>
          <ChevronRight size={18} className="text-soft-black/20" />
        </div>
      </div>

      {/* Actions */}
      <div className="mx-4">
        <button
          onClick={logout}
          className="w-full btn-utah-gradient text-white rounded-xl py-3.5 font-semibold text-base active:scale-95 transition-transform"
        >
          <span className="relative z-10 inline-flex items-center justify-center">
            <LogOut size={18} className="mr-2" />
            Cerrar sesion
          </span>
        </button>
      </div>

      {/* Version */}
      <p className="text-center font-serif tracking-wider text-xs text-soft-black/20 mt-8">
        StarbizVoice v0.1.0
      </p>
    </div>
  );
}
