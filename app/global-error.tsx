'use client';

import { useEffect } from 'react';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background`}>
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <h2 className="text-3xl font-bold mb-4 font-heading text-red-500">Critical Error</h2>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        The application encountered a critical error. Please try reloading.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-all"
                    >
                        Try Again
                    </button>
                    <p className="mt-8 text-xs text-muted-foreground/50 font-mono">
                        Error Digest: {error.digest || 'Unknown'}
                    </p>
                </div>
            </body>
        </html>
    );
}
