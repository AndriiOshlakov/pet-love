'use client';

import { createContext, useContext, useState } from 'react';

type LoaderContextType = {
  loading: boolean;
  progress: number;
  setLoading: (v: boolean) => void;
  setProgress: (v: number) => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <LoaderContext.Provider value={{ loading, progress, setLoading, setProgress }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error('useLoader must be used inside LoaderProvider');
  }
  return ctx;
}
