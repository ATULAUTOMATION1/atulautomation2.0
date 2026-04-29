'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

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
  const [loadError, setLoadError] = useState(false);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Keep refs in sync
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    try {
      console.log('[Auth] Google credential received, verifying...');
      const res = await fetch('/api/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('[Auth] Google verification failed:', data.error);
        onErrorRef.current?.(data.error || 'Google sign-in failed');
      } else {
        console.log('[Auth] Google sign-in successful');
        onSuccessRef.current?.();
      }
    } catch (err) {
      console.error('[Auth] Google verification network error:', err);
      onErrorRef.current?.('Google sign-in failed. Please try again.');
    }
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('[Auth] Google Client ID missing from environment variables');
      return;
    }

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;
      console.log('[Auth] Initializing Google Sign-In button...');

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'filled_black',
          size: 'large',
          width: 320, // Reduced width slightly to ensure it fits mobile
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'center',
        });
        console.log('[Auth] Google Sign-In button rendered');
      } catch (err) {
        console.warn('[Auth] Google Sign-In render error:', err);
        setLoadError(true);
      }
    };

    // Check if script is loaded
    if (window.google) {
      initializeGoogle();
    } else {
      console.log('[Auth] Waiting for Google GSI script to load...');
      intervalId = setInterval(() => {
        if (window.google) {
          console.log('[Auth] Google GSI script detected');
          clearInterval(intervalId);
          initializeGoogle();
        }
      }, 500);

      // Fail after 8 seconds
      timeoutId = setTimeout(() => {
        if (!window.google) {
          console.error('[Auth] Google GSI script failed to load within 8s');
          clearInterval(intervalId);
          setLoadError(true);
        }
      }, 8000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleCredentialResponse]);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-center min-h-[44px]">
        {!clientId ? (
          <div className="text-xs text-red-500 bg-red-500/10 p-2 rounded-lg border border-dashed border-red-500/20 w-full text-center">
            Config Error: Google Client ID is missing.
          </div>
        ) : loadError ? (
          <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded-lg border border-dashed border-border w-full text-center">
            Google Sign-In is temporarily unavailable. 
            <br />
            Please use your email to continue.
          </div>
        ) : (
          <div ref={buttonRef} />
        )}
      </div>
    </div>
  );
}
