import { create } from 'zustand';
import { User } from '@/types/User';
import { Pet } from '@/types/Pet';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addFavorite: (pet: Pet) => void;
  removeFavorite: (petId: string) => void;
  removePet: (petId: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user: {
        ...user,
        noticesFavorites: user.noticesFavorites ?? [], // <-- дефолтний масив
      },
    }),

  clearUser: () => set({ user: null }),

  addFavorite: (pet) =>
    set((state) => {
      if (!state.user) return state;
      const favorites = state.user.noticesFavorites ?? [];
      // перевірка щоб не дублювати
      const alreadyExists = state.user.noticesFavorites.some((fav) => fav._id === pet._id);

      if (alreadyExists) return state;

      return {
        user: {
          ...state.user,
          noticesFavorites: [...state.user.noticesFavorites, pet],
        },
      };
    }),

  removeFavorite: (petId) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          noticesFavorites: state.user.noticesFavorites.filter((pet) => pet._id !== petId),
        },
      };
    }),

  removePet: (petId) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          pets: state.user.pets.filter((pet) => pet._id !== petId),
        },
      };
    }),
}));
