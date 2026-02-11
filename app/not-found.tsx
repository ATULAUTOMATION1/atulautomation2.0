import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h2 className="text-4xl font-bold mb-4 font-heading">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-md">
                The automation workflow you are looking for does not exist or has been moved.
            </p>
            <Link href="/" className="btn-primary">
                Return Home
            </Link>
        </div>
    );
}
