'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('Enlace invalido.');
      return;
    }

    async function validate() {
      try {
        const res = await fetch('/api/auth/magic-validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Enlace invalido o expirado.');
          return;
        }

        const { token: sessionToken, user } = await res.json();
        setAuth(sessionToken, user);
        router.replace('/app');
      } catch {
        setError('Error de conexion.');
      }
    }

    validate();
  }, [searchParams, router, setAuth]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background-light">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h1 className="text-xl font-bold text-dark mb-2">Error de acceso</h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <a
            href="/auth/magic"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl"
          >
            Intentar de nuevo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Verificando tu acceso...</p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-light">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
