import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, getCurrentUser as getCurrentUserService } from '@/services/auth';
import { registerForPushToken } from '@/services/push';

interface User {
  id: number;
  name: string;
  roles: string[];
  [key: string]: any;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const currentUser = await getCurrentUserService(storedToken);
          setUser(currentUser);
          void registerForPushToken();
        }
      } catch (error) {
        // token invalid or user fetch failed
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  const login = async (username: string, password: string) => {
    const { token: newToken, user: newUser } = await loginService(username, password);
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    void registerForPushToken();
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
