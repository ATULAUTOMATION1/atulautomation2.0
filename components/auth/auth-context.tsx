'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  googleSignIn: (credential: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me/');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || 'Login failed.' };
      setUser(data.user);
      return {};
    } catch {
      return { error: 'Network error. Please check your connection and try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ error?: string }> => {
    try {
      console.log('Attempting signup for:', email);
      const res = await fetch('/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        return { error: 'Server returned an invalid response. Please try again later.' };
      }

      if (!res.ok) {
        console.error('Signup failed with status:', res.status, data);
        return { error: data.error || 'Signup failed.' };
      }
      
      console.log('Signup successful, setting user state');
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('Signup network error:', err);
      return { error: 'Network error. Please check your connection and try again.' };
    }
  };

  const googleSignIn = async (credential: string): Promise<{ error?: string }> => {
    try {
      console.log('Verifying Google credential');
      const res = await fetch('/api/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        return { error: 'Server returned an invalid response. Please try again later.' };
      }

      if (!res.ok) {
        console.error('Google auth failed:', res.status, data);
        return { error: data.error || 'Google sign-in failed.' };
      }
      
      console.log('Google auth successful');
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('Google auth network error:', err);
      return { error: 'Network error. Please check your connection and try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout/', { method: 'POST' });
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
