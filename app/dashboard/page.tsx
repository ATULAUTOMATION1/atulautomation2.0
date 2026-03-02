"use client";

import { 
    Activity, 
    ArrowUpRight, 
    Bot, 
    CheckCircle, 
    Clock, 
    DollarSign, 
    PlayCircle, 
    Zap 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardOverview() {
    const [activeTab, setActiveTab] = useState("all");

    // Mock data for the client
    const stats = [
        { title: "Active AI Agents", value: "3", icon: Bot, trend: "+1 this month", color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Automated Workflows", value: "12", icon: Zap, trend: "+4 this month", color: "text-primary", bg: "bg-primary/10" },
        { title: "Hours Saved", value: "148h", icon: Clock, trend: "+24h vs last month", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Est. ROI Generated", value: "$4,250", icon: DollarSign, trend: "+15% vs last month", color: "text-violet-500", bg: "bg-violet-500/10" },
    ];

    const projects = [
        { id: 1, name: "Customer Support Bot", status: "Live", type: "AI Agent", lastTrigger: "2 mins ago", health: 100 },
        { id: 2, name: "Lead Qualification Pipeline", status: "Live", type: "Workflow", lastTrigger: "15 mins ago", health: 98 },
        { id: 3, name: "Invoice Processing", status: "In Development", type: "Workflow", lastTrigger: "N/A", health: 65 },
        { id: 4, name: "Social Media Auto-Poster", status: "Paused", type: "Workflow", lastTrigger: "2 days ago", health: 0 },
    ];

    const recentActivity = [
        { time: "10:45 AM", text: "Support Bot successfully resolved Ticket #4029" },
        { time: "09:30 AM", text: "Lead Pipeline generated 3 new qualified SQLs" },
        { time: "Yesterday", text: "Weekly Analytics Report automatically emailed" },
        { time: "Oct 24", text: "New model deployed for Lead Qualification" },
    ];

    return (
        <div className="px-5 md:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back, Demo! 👋</h1>
                    <p className="text-muted-foreground text-sm">Here's what your AI systems have been doing today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary py-2 text-sm h-10">Download Report</button>
                    <button className="btn-primary py-2 text-sm h-10">Request New Agent</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-bl-full pointer-events-none" />
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                    {stat.trend.split(' ')[0]}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                            <h3 className="text-3xl font-bold tracking-tight group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Project Status */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-sm flex flex-col">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="text-lg font-bold">Active Systems</h2>
                        <Link href="/dashboard" className="text-sm text-primary font-medium hover:underline">View All</Link>
                    </div>
                    
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-border bg-muted/20 overflow-x-auto hide-scrollbar">
                        <button onClick={() => setActiveTab("all")} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>All Systems</button>
                        <button onClick={() => setActiveTab("agents")} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'agents' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>AI Agents</button>
                        <button onClick={() => setActiveTab("workflows")} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'workflows' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>Workflows</button>
                    </div>

                    <div className="flex-1 overflow-x-auto relative">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-muted/30 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Type</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Last Run</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {projects.filter(p => activeTab === 'all' || (activeTab === 'agents' && p.type === 'AI Agent') || (activeTab === 'workflows' && p.type === 'Workflow')).map((project) => (
                                    <tr key={project.id} className="hover:bg-muted/20 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4 font-bold max-w-[200px] truncate">{project.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${project.type === 'AI Agent' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                                                {project.type === 'AI Agent' ? <Bot className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                                                {project.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {project.status === "Live" && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                                                {project.status === "Paused" && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                                                {project.status === "In Development" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                                <span className={`${project.status === 'Live' ? 'text-green-500' : project.status === 'In Development' ? 'text-blue-500' : 'text-amber-500'} font-medium`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {project.lastTrigger}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Log */}
                <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col">
                    <div className="p-6 border-b border-border flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-bold">Activity Log</h2>
                    </div>
                    <div className="p-6 flex-1 space-y-6">
                        {recentActivity.map((log, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                                        {i === 0 ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <PlayCircle className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                    {i < recentActivity.length - 1 && (
                                        <div className="w-0.5 h-full bg-border -mb-6 mt-2" />
                                    )}
                                </div>
                                <div className="pt-1 flex-1">
                                    <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{log.time}</p>
                                    <p className="text-sm text-foreground/90 leading-relaxed">{log.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-border mt-auto">
                        <button className="w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Load More History</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
