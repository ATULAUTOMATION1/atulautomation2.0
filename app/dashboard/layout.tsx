import { Metadata } from "next";
import Link from "next/link";
import { 
    LayoutDashboard, 
    Bot, 
    BarChart3, 
    Settings, 
    LogOut,
    Bell,
    ChevronDown,
    Zap
} from "lucide-react";

export const metadata: Metadata = {
    title: "Client Portal | Atul Automation",
    description: "Manage your AI automation projects and view ROI analytics.",
    // Prevent search engines from indexing the private dashboard
    robots: {
        index: false,
        follow: false,
    }
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 md:h-screen sticky top-0 flex flex-col z-20 hidden md:flex">
                <div className="p-6 border-b border-border">
                    <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                        <span className="text-primary">&gt;_</span> Atul<span className="opacity-80">Automation</span>
                    </Link>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Menu</p>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium">
                        <LayoutDashboard className="h-4 w-4" /> Overview
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors font-medium">
                        <Bot className="h-4 w-4" /> AI Agents
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors font-medium">
                        <Zap className="h-4 w-4" /> Workflows
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors font-medium">
                        <BarChart3 className="h-4 w-4" /> Analytics
                    </Link>
                </nav>

                <div className="p-4 border-t border-border">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors font-medium mb-1">
                        <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-medium">
                        <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-30">
                <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <span className="text-primary">&gt;_</span> Atul<span className="opacity-80">Automation</span>
                </Link>
                <div className="flex items-center gap-3">
                    <button className="p-2 relative rounded-full hover:bg-muted transition-colors">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-1.5 right-2 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full border border-border overflow-hidden bg-muted">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Client" alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Topbar (visible mainly on desktop) */}
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm hidden md:flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Dashboard / <span className="text-foreground ml-1">Overview</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="p-2 relative rounded-full hover:bg-muted transition-colors border border-border bg-card">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer group">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-bold leading-none mb-1">Demo Client</p>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Acme Corp</p>
                            </div>
                            <div className="w-9 h-9 rounded-full border-2 border-primary/20 bg-muted overflow-hidden group-hover:border-primary transition-colors">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Client" alt="Profile" />
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-x-hidden pt-4 pb-12">
                     {children}
                </div>
            </main>
        </div>
    );
}
