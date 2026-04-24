'use client';

import React, { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-context';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const label = strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong';
  const color = strength <= 1 ? 'bg-red-500' : strength <= 3 ? 'bg-yellow-500' : 'bg-green-500';

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? color : 'bg-muted'}`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength <= 1 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
        {label} password
      </p>
    </div>
  );
}

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // Redirect if already logged in or if signup succeeds
  React.useEffect(() => {
    if (user) {
      window.location.href = redirect;
    }
  }, [user, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const result = await signup(name, email, password);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Success - user state update will trigger the useEffect redirect above
        console.log('Signup success - redirecting...');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = () => {
    // AuthContext updates 'user', triggering the redirect useEffect
  };

  return (
    <>
      {/* Google Sign-In */}
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        onError={(err) => setError(err)}
      />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or sign up with email</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-6">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="signup-name"
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="signup-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <PasswordStrength password={password} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Benefits */}
      <div className="mt-6 space-y-2">
        {['Access 7+ free AI tools', 'Read daily AI blog articles', 'Enroll in automation courses'].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
            {item}
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link
          href={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/15 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17l6-6-6-6" />
                  <path d="M12 19h8" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">
                Atul<span className="text-primary">Automation</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground text-sm">
              Join Atul Automation to unlock AI tools, courses &amp; premium content
            </p>
          </div>

          <div className="px-8 pb-10">
            <Suspense fallback={<div className="text-center text-muted-foreground py-4">Loading...</div>}>
              <SignupForm />
            </Suspense>
          </div>
        </div>

        {/* Trust Badge */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          🔒 Your data is encrypted and secure. We never share your information.
        </p>
      </div>
    </main>
  );
}
