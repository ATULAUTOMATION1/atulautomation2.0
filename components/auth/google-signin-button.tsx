'use client';

import React, { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Keep refs in sync without triggering re-renders
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    try {
      const res = await fetch('/api/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) {
        onErrorRef.current?.(data.error || 'Google sign-in failed');
      } else {
        onSuccessRef.current?.();
      }
    } catch {
      onErrorRef.current?.('Google sign-in failed. Please try again.');
    }
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || !buttonRef.current) return;

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'filled_black',
          size: 'large',
          width: 380,
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'center',
        });
      } catch (err) {
        console.warn('Google Sign-In init error:', err);
      }
    };

    // If script already loaded
    if (window.google) {
      initializeGoogle();
      return;
    }

    // Wait for script to load
    const checkInterval = setInterval(() => {
      if (window.google) {
        clearInterval(checkInterval);
        initializeGoogle();
      }
    }, 300);

    // Cleanup after 10 seconds if Google never loads
    const timeout = setTimeout(() => clearInterval(checkInterval), 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [handleCredentialResponse]);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div ref={buttonRef} />
    </div>
  );
}
