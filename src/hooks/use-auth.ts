'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const { token, user, isAuthenticated, isLoading, clearAuth } = useAuthStore();
  const router = useRouter();

  const logout = useCallback(() => {
    clearAuth();
    router.replace('/');
  }, [clearAuth, router]);

  return { token, user, isAuthenticated, isLoading, logout };
}

export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.isLoading && !auth.isAuthenticated) {
    router.replace('/auth/magic');
  }

  return auth;
}
