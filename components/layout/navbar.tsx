"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Services", href: "/#services" },
    { name: "AI Modules", href: "/#modules" },
    { name: "Demo Tools", href: "/#tools" },
    { name: "Learn", href: "/#learn" },
    { name: "Community", href: "/#community" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="container-custom flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Terminal className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight">
                        Atul<span className="text-primary">Automation</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Link
                        href="#contact"
                        className="btn-nature-primary text-sm px-6 py-2"
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <div className="flex items-center space-x-4 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                        className="md:hidden border-t border-border bg-background"
                    >
                        <div className="container-custom py-4 flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 hover:bg-muted/50 rounded-lg"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border">
                                <Link
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-nature-primary w-full justify-center"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
