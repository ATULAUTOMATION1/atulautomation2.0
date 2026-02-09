import Link from "next/link";
import { Terminal, Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Terminal className="h-6 w-6 text-primary" />
                            <span className="font-heading font-bold text-xl">
                                Atul<span className="text-primary">Automation</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We combine nature's adaptability with machine precision to build systems that grow with you.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">AI Agents</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Workflow Automation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Chatbot Development</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">CRM Integration</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold mb-4">Stay Verified</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get the latest AI automation trends delivered to your inbox.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="w-full btn-nature-primary py-2 text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Atul Automation. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
