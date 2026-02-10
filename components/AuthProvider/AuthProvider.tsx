'use client';

import { getUser } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/AuthStore';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        clearIsAuthenticated();
      }
    };

    checkAuth();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
