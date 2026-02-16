'use client';

import { getFullUser } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/AuthStore';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getFullUser();

        setUser(user);
      } catch (error) {
        clearUser();
      }
    };

    checkAuth();
  }, [setUser, clearUser]);

  return children;
}
