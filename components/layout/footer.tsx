"use client";

import Link from "next/link";
import { Terminal, Send, ArrowRight, Heart } from "lucide-react";

const footerLinks = {
    Services: [
        { name: "AI Automation", href: "#services" },
        { name: "Chatbot Development", href: "#services" },
        { name: "Workflow Automation", href: "#services" },
        { name: "AI Marketing", href: "#services" },
    ],
    Company: [
        { name: "About Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#contact" },
    ],
    Resources: [
        { name: "Documentation", href: "#" },
        { name: "Community", href: "#community" },
        { name: "API Reference", href: "#" },
        { name: "Status", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border relative overflow-hidden">
            {/* Subtle gradient accent at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-4">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                            <div className="bg-gradient-to-br from-primary/15 to-primary/5 p-2.5 rounded-xl group-hover:from-primary/20 transition-colors">
                                <Terminal className="h-4.5 w-4.5 text-primary" />
                            </div>
                            <span className="font-heading font-bold text-lg">
                                Atul<span className="text-primary">Automation</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                            Building intelligent AI systems that help businesses automate, scale, and grow.
                        </p>
                        {/* Newsletter */}
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-muted-foreground/60"
                            />
                            <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-orange-600 hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="md:col-span-2">
                            <h4 className="text-sm font-bold mb-4 text-foreground">{title}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* CTA */}
                    <div className="md:col-span-2">
                        <h4 className="text-sm font-bold mb-4">Get Started</h4>
                        <p className="text-sm text-muted-foreground mb-4">Ready to automate? Let&apos;s talk.</p>
                        <Link href="#contact" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all group">
                            Contact Us <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-border">
                <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Atul Automation. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 order-first sm:order-none mb-4 sm:mb-0">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-muted-foreground">
                            Made to Automate in <span className="text-orange-600 dark:text-orange-500">India</span> 🇮🇳
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
