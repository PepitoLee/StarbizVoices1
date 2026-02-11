'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Headphones, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';

export default function MagicLinkPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDevLogin() {
    try {
      const res = await fetch('/api/auth/dev-login', { method: 'POST' });
      if (!res.ok) return;
      const data = await res.json();
      useAuthStore.getState().setAuth(data.token, data.user);
      router.push('/app');
    } catch {
      // silently fail
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al enviar el enlace');
        setLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError('Error de conexion');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background-light">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Revisa tu correo</h1>
          <p className="text-gray-500 mb-2">
            Enviamos un enlace de acceso a:
          </p>
          <p className="font-semibold text-dark mb-8">{email}</p>
          <p className="text-sm text-gray-400">
            El enlace expira en 15 minutos. Revisa tu carpeta de spam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-light">
      <div className="max-w-sm w-full">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-dark mb-8">
          <ArrowLeft size={16} />
          Volver
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-dark rounded-xl flex items-center justify-center">
            <Headphones size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-dark">StarbizVoice</h1>
            <p className="text-sm text-gray-500">Accede a tus audios</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
              Tu email de compra
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar enlace de acceso'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Usa el email con el que compraste en Hotmart
        </p>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-background-light text-gray-400">o</span>
          </div>
        </div>

        <button
          onClick={handleDevLogin}
          className="w-full mt-4 text-sm font-semibold py-3.5 rounded-xl active:scale-95 transition-all text-white"
          style={{ background: 'linear-gradient(135deg, #C8963E, #B8453A)' }}
        >
          Acceso Demo
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-2">
          Explora la app con contenido de prueba
        </p>
      </div>
    </div>
  );
}
