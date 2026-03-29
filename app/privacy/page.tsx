import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Atul Automation",
    description: "Privacy Policy for Atul Automation, covering data collection, cookies, Google AdSense, and user rights.",
};

export default function PrivacyPage() {
    return (
        <main className="container-custom pt-32 pb-24 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy</h1>
            <div className="text-sm text-muted-foreground mb-8">Last Updated: March 24, 2026</div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary">
                <h2>1. Introduction</h2>
                <p>Welcome to <strong>Atul Automation</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at atulautomation@gmail.com.</p>
                <p>When you visit our website (https://atulautomation.com) and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy practices. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.</p>

                <h2>2. Information We Collect</h2>
                <p>We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, and other technical information.</p>
                
                <h2>3. Use of Cookies and Tracking Technologies</h2>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                
                <h3>Google Analytics</h3>
                <p>We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website. Google&apos;s privacy policy is available at: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.</p>

                <h3>Google AdSense and DoubleClick DART Cookie</h3>
                <p>As a third-party vendor, Google uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.</p>
                <p>Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.</p>
                <p>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
                <p>You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</p>

                <h2>4. How We Use Your Information</h2>
                <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                <ul>
                    <li>To facilitate account creation and logon process.</li>
                    <li>To send you marketing and promotional communications.</li>
                    <li>To fulfill and manage your orders or inquiries.</li>
                    <li>To deliver targeted advertising to you (including Google AdSense).</li>
                </ul>

                <h2>5. Will Your Information Be Shared With Anyone?</h2>
                <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share data based on the following legal basis:</p>
                <ul>
                    <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                    <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                </ul>

                <h2>6. Your Privacy Rights (GDPR &amp; CCPA)</h2>
                <p>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
                <ul>
                    <li>The right to request access and obtain a copy of your personal information.</li>
                    <li>The right to request rectification or erasure.</li>
                    <li>The right to restrict the processing of your personal information.</li>
                    <li>If applicable, the right to data portability.</li>
                </ul>
                <p>If you are a resident in the European Economic Area (EEA) or California and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.</p>

                <h2>7. Contact Us</h2>
                <p>If you have questions or comments about this policy, you may email us at hello@atulautomation.com.</p>
            </div>
        </main>
    );
}
