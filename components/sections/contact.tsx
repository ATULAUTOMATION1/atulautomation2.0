"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle, Sparkles, Shield, Clock, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <section id="contact" className="section-padding bg-transparent relative">
            {/* Section accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-primary via-orange-500 to-primary rounded-3xl p-10 md:p-14 text-center text-white mb-16 overflow-hidden"
                >
                    {/* Animated shine */}
                    <motion.div
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ duration: 5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span className="text-xs font-bold tracking-wider uppercase">Limited Time Offer</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to 10x Your Business?</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Get a free automation strategy call. No commitment, just clarity.</p>
                        <a href="#contact-form" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all group">
                            Book Free Call <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" id="contact-form">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-sm relative overflow-hidden"
                    >
                        {/* Subtle gradient corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-2 relative">Send us a message</h3>
                        <p className="text-sm text-muted-foreground mb-6 relative">We respond within 24 hours, guaranteed.</p>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                        className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4"
                                    >
                                        <CheckCircle className="h-8 w-8 text-accent" />
                                    </motion.div>
                                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                                    <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="group">
                                            <input type="text" placeholder="Full Name" required className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-muted-foreground/60" />
                                        </div>
                                        <div className="group">
                                            <input type="email" placeholder="Email Address" required className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-muted-foreground/60" />
                                        </div>
                                    </div>
                                    <select className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all">
                                        <option>Select a Service</option>
                                        <option>AI Automation</option>
                                        <option>Chatbot Development</option>
                                        <option>Workflow Automation</option>
                                        <option>AI Marketing</option>
                                        <option>CRM Solutions</option>
                                        <option>Other</option>
                                    </select>
                                    <textarea placeholder="Tell us about your project..." rows={4} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none placeholder:text-muted-foreground/60" />
                                    <button type="submit" className="btn-primary group w-full sm:w-auto shadow-lg shadow-primary/20">
                                        Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Info cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {[
                            { icon: Mail, label: "Email", value: "Hello@atulautomation.com", color: "text-primary", bg: "bg-primary/8", href: "mailto:Hello@atulautomation.com" },
                            { icon: Phone, label: "WhatsApp", value: "+91 85188 24480", color: "text-emerald-500", bg: "bg-emerald-500/8", href: "https://wa.me/918518824480" },
                            { icon: MapPin, label: "Location", value: "India · Remote Worldwide", color: "text-blue-500", bg: "bg-blue-500/8", href: "#" },
                        ].map((info, i) => {
                            const Icon = info.icon;
                            return (
                                <a key={i} href={info.href} className="block group bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-5 w-5 ${info.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium mb-0.5">{info.label}</p>
                                            <p className="text-sm font-semibold group-hover:text-primary transition-colors">{info.value}</p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}

                        {/* Trust badges */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Why trust us</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: Shield, label: "SSL Secured", color: "text-emerald-500" },
                                    { icon: Clock, label: "24h Response", color: "text-blue-500" },
                                    { icon: Sparkles, label: "Free Consult", color: "text-primary" },
                                    { icon: Award, label: "200+ Projects", color: "text-violet-500" },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-xl">
                                        <t.icon className={`h-3.5 w-3.5 ${t.color} shrink-0`} />
                                        <span className="text-xs font-medium">{t.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
