import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Atul Automation",
    description: "Terms of Service for Atul Automation",
};

export default function TermsPage() {
    return (
        <main className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose dark:prose-invert">
                <p>By using Atul Automation services, you agree to these terms.</p>
                {/* Full terms content would go here */}
            </div>
        </main>
    );
}
