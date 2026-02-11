import { create } from 'zustand';

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  clearAuth: () => void;
  loadFromStorage: () => void;
}

export type { UserProfile };

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (token, user) => {
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  loadFromStorage: () => {
    try {
      const token = sessionStorage.getItem('auth_token');
      const userStr = sessionStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr) as UserProfile;
        set({ token, user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
