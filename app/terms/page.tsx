import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Atul Automation",
    description: "Terms of Service and Conditions of Use for Atul Automation website and services.",
};

export default function TermsPage() {
    return (
        <main className="container-custom pt-32 pb-24 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Terms of Service</h1>
            <div className="text-sm text-muted-foreground mb-8">Last Updated: March 24, 2026</div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary">
                <h2>1. Agreement to Terms</h2>
                <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and <strong>Atul Automation</strong> (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the https://atulautomation.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;).</p>
                <p>You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

                <h2>2. Intellectual Property Rights</h2>
                <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
                <p>The Content and the Marks are provided on the Site &quot;AS IS&quot; for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>

                <h2>3. User Representations</h2>
                <p>By using the Site, you represent and warrant that:</p>
                <ul>
                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                    <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                    <li>You are not a minor in the jurisdiction in which you reside.</li>
                    <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
                    <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                    <li>Your use of the Site will not violate any applicable law or regulation.</li>
                </ul>

                <h2>4. Advertising and Links to Third-Party Websites</h2>
                <p>The Site may contain (or you may be sent via the Site) links to other websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (&quot;Third-Party Content&quot;).</p>
                <p>We allow advertisers to display their advertisements and other information in certain areas of the Site, such as sidebar advertisements or banner advertisements. If you are an advertiser, you shall take full responsibility for any advertisements you place on the Site and any services provided on the Site or products sold through those advertisements.</p>
                
                <h2>5. Site Management</h2>
                <p>We reserve the right, but not the obligation, to:</p>
                <ol>
                    <li>Monitor the Site for violations of these Terms of Service.</li>
                    <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service.</li>
                    <li>In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof.</li>
                    <li>Otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</li>
                </ol>

                <h2>6. Information Regarding AI Tools and Financial ROI</h2>
                <p>All calculators, ROI estimations, and performance benchmarks provided on this Site (including the ROI Calculator) are for informational purposes only. Actual results may vary depending on business size, current technological infrastructure, and market conditions. Atul Automation does not guarantee financial returns or exact operational savings.</p>

                <h2>7. Governing Law</h2>
                <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where Atul Automation operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

                <h2>8. Contact Us</h2>
                <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
                <p><strong>Atul Automation</strong><br/>
                Email: hello@atulautomation.com</p>
            </div>
        </main>
    );
}
