"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Terminal, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
                        <Terminal className="h-4.5 w-4.5 text-primary" />
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
                    >
                        <div className="container-custom py-4 flex flex-col gap-1">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base font-medium text-muted-foreground hover:text-foreground px-4 py-3 hover:bg-muted/50 rounded-xl block transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
