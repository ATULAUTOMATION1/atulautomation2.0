'use client';

import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth/auth-context';

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
  const { googleSignIn } = useAuth();

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || !buttonRef.current) return;

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential: string }) => {
          const result = await googleSignIn(response.credential);
          if (result.error) {
            onError?.(result.error);
          } else {
            onSuccess?.();
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: 384,
        shape: 'pill',
        text: 'continue_with',
        logo_alignment: 'center',
      });
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
    }, 200);

    return () => clearInterval(checkInterval);
  }, [googleSignIn, onSuccess, onError]);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div ref={buttonRef} className="w-full" />
    </div>
  );
}
