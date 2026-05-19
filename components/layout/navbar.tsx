"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown, LogOut, User, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";

const navItems = [
    {
        name: "Solutions",
        subItems: [
            { name: "Services & Capabilities", href: "/capabilities" },
            { name: "Industry Solutions", href: "/industries" },
            { name: "Built-in Templates", href: "/templates" },
            { name: "Client Case Studies", href: "/case-studies" },
        ]
    },
    {
        name: "Free Tools",
        subItems: [
            { name: "AI Readiness Quiz", href: "/tools/ai-readiness-quiz" },
            { name: "ROI Calculator", href: "/tools/roi-calculator" },
            { name: "Voice AI Demo 🎙️", href: "/tools/voice-ai-demo" },
            { name: "Roast My Workflow 🔥", href: "/tools/roast-my-workflow" },
            { name: "Predictive Intent Engine 🔮", href: "/tools/predictive-intent" },
            { name: "AI Swarm Visualizer 🐝", href: "/tools/swarm" },
            { name: "Interview an AI 🎤", href: "/tools/interview-ai" },
        ]
    },
    {
        name: "Resources",
        subItems: [
            { name: "Daily AI Blog", href: "/blog" },
            { name: "Automation Courses", href: "/courses" },
            { name: "Frequently Asked Questions", href: "/faq" },
        ]
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const { user, loading, logout } = useAuth();

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        setShowUserMenu(false);
    };

    // Get user initials for avatar
    const initials = (user?.name || '')
        .split(' ')
        .filter(n => n)
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || '??';

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-0"
                    : "bg-transparent border-b border-transparent py-1"
            )}
        >
            <div className="container-custom flex items-center justify-between h-14">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-1.5 rounded-md group-hover:bg-primary/15 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5 text-primary" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 17l6-6-6-6" />
                            <path d="M12 19h8" />
                        </svg>
                    </div>
                    <span className="font-heading font-bold text-base tracking-tight">
                        Atul<span className="text-primary">Automation</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        item.subItems ? (
                            <div key={item.name} className="relative group">
                                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-lg hover:bg-muted/50 transition-all">
                                    {item.name}
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                                    <div className="bg-card border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-card">
                                        {item.subItems.map(subItem => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 px-3 py-2.5 rounded-lg transition-colors text-left flex items-center justify-between group/sub"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href!}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-lg hover:bg-muted/50 transition-all"
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                    <div className="ml-2 mr-2">
                        <ThemeToggle />
                    </div>

                    {/* Auth Buttons */}
                    {!loading && (
                        user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 ml-1 px-2 py-1.5 rounded-xl hover:bg-muted/50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                        {initials}
                                    </div>
                                </button>
                                {showUserMenu && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-3 py-2.5 border-b border-border mb-2">
                                                <p className="text-sm font-semibold truncate">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/dashboard/"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted/50 rounded-lg transition-colors mb-1"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                User Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sign Out
                                            </button>
                                        </div>

                                    </>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="btn-primary text-sm px-5 py-2 ml-1 group">
                                Sign In
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        )
                    )}
                </nav>

                {/* Mobile */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    {!loading && user && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                            {initials}
                        </div>
                    )}
                    <button
                        aria-label="Toggle navigation menu"
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
                    "md:hidden overflow-y-auto transition-all duration-300 ease-in-out border-b border-border bg-background/95 backdrop-blur-xl",
                    isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-b-0"
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
                            {item.subItems ? (
                                <div className="flex flex-col gap-1 mb-2">
                                    <div className="text-sm font-bold text-foreground px-4 py-2 mt-2 uppercase tracking-wider opacity-50">
                                        {item.name}
                                    </div>
                                    {item.subItems.map(subItem => (
                                        <Link
                                            key={subItem.name}
                                            href={subItem.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-base font-medium text-muted-foreground hover:text-foreground px-4 py-2 hover:bg-muted/50 rounded-xl block transition-colors pl-8"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    href={item.href!}
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-medium text-muted-foreground hover:text-foreground px-4 py-3 hover:bg-muted/50 rounded-xl block transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="pt-3 mt-2 border-t border-border">
                        {!loading && (
                            user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                                            {initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/dashboard/"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-foreground/80 hover:bg-muted/50 rounded-xl transition-colors mb-1"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        User Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>

                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary w-full justify-center"
                                >
                                    Sign In <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
