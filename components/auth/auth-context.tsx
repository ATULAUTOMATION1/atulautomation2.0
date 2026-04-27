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
  signup: (name: string, email: string, password: string) => Promise<{ error?: string, step?: string }>;
  verifyOtp: (otp: string) => Promise<{ error?: string }>;
  googleSignIn: (credential: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      console.log('[Auth] Refreshing user session...');
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        console.log('[Auth] User session found:', data.user ? data.user.email : 'None');
        setUser(data.user || null);
      } else {
        console.warn('[Auth] Session check failed with status:', res.status);
        setUser(null);
      }
    } catch (err) {
      console.error('[Auth] Session check network error:', err);
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
      console.log('[Auth] Attempting login for:', email);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        console.error('[Auth] Login response not JSON:', e);
        return { error: 'Server returned an invalid response. Please try again.' };
      }

      if (!res.ok) {
        console.warn('[Auth] Login failed:', res.status, data.error);
        return { error: data.error || 'Login failed.' };
      }
      
      console.log('[Auth] Login successful');
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('[Auth] Login network error:', err);
      return { error: 'Network error. Please check your connection and try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ error?: string }> => {
    try {
      console.log('[Auth] Attempting signup for:', email);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        return { error: 'Server returned an invalid response. Please try again.' };
      }

      if (!res.ok) {
        return { error: data.error || 'Signup failed.' };
      }
      
      if (data.step === 'otp') {
        return { step: 'otp' };
      }
      
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('[Auth] Signup network error:', err);
      return { error: 'Network error. Please try again.' };
    }
  };

  const verifyOtp = async (otp: string): Promise<{ error?: string }> => {
    try {
      console.log('[Auth] Verifying OTP');
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        return { error: 'Server returned an invalid response. Please try again.' };
      }

      if (!res.ok) {
        return { error: data.error || 'Verification failed.' };
      }
      
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('[Auth] Verify OTP network error:', err);
      return { error: 'Network error. Please try again.' };
    }
  };

  const googleSignIn = async (credential: string): Promise<{ error?: string }> => {
    try {
      console.log('[Auth] Verifying Google credential');
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        return { error: 'Invalid server response.' };
      }

      if (!res.ok) return { error: data.error || 'Google sign-in failed.' };
      
      setUser(data.user);
      return {};
    } catch (err) {
      console.error('[Auth] Google sign-in network error:', err);
      return { error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      console.log('[Auth] Logging out...');
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, verifyOtp, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
