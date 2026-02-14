"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Terminal, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Services", href: "/#services" },
    { name: "AI Modules", href: "/#modules-demo" },
    { name: "Playground", href: "/#interactive-demos" },
    { name: "Community", href: "/#community" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <div className="container-custom flex items-center justify-between h-16 md:h-18">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/15 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5 text-primary" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 17l6-6-6-6" />
                            <path d="M12 19h8" />
                        </svg>
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight">
                        Atul<span className="text-primary">Automation</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-lg hover:bg-muted/50 transition-all"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="ml-2 mr-2">
                        <ThemeToggle />
                    </div>
                    <Link href="#contact" className="btn-primary text-sm px-5 py-2 ml-1 group">
                        Get Started
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </nav>

                {/* Mobile */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border bg-background/95 backdrop-blur-xl",
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-b-0"
                )}
            >
                <div className="container-custom py-4 flex flex-col gap-1">
                    {navItems.map((item, i) => (
                        <div
                            key={item.name}
                            className={cn(
                                "transition-all duration-300 transform",
                                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-medium text-muted-foreground hover:text-foreground px-4 py-3 hover:bg-muted/50 rounded-xl block transition-colors"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                    <div className="pt-3 mt-2 border-t border-border">
                        <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary w-full justify-center"
                        >
                            Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
