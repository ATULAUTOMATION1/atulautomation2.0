'use client';

import { useEffect } from 'react';

export default function Error({
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
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h2 className="text-2xl font-bold mb-4 font-heading">Something went wrong!</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                We encountered an issue while processing your request.
            </p>
            <button
                onClick={() => reset()}
                className="btn-nature-primary"
            >
                Try again
            </button>
        </div>
    );
}
