import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMyPoints } from '@/services/points';

interface PointsContextValue {
  points: number;
  refresh: () => Promise<void>;
}

const PointsContext = createContext<PointsContextValue | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);

  const refresh = async () => {
    try {
      const p = await getMyPoints();
      setPoints(p);
    } catch (_e) {}
  };

  useEffect(() => {
    void refresh();
  }, []);

  return <PointsContext.Provider value={{ points, refresh }}>{children}</PointsContext.Provider>;
};

export const usePoints = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error('usePoints must be used within PointsProvider');
  return ctx;
};
