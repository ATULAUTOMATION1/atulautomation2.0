import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Atul Automation",
    description: "Privacy Policy for Atul Automation",
};

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose dark:prose-invert">
                <p>Atul Automation matches industry standard privacy practices. </p>
                <p>Your data is processed securely and never shared with third parties without consent.</p>
                {/* Full policy content would go here */}
            </div>
        </main>
    );
}
