// import { create } from 'zustand';
// import { User } from '../../types/User';

// interface AuthState {
//   user: User | null;
//   setUser: (user: User) => void;
//   clearIsAuthenticated: () => void;
// }

// export const useAuthStore = create<AuthState>()((set) => ({
//   user: null,
//   setUser: (user: User) => {
//     set(() => ({ user }));
//   },
//   clearIsAuthenticated: () => {
//     set(() => ({ user: null }));
//   },
// }));
// lib/store/authStore.ts
import { create } from 'zustand';
import { User } from '@/types/User';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
