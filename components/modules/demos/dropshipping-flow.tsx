"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck, CreditCard } from "lucide-react";

export function DropshippingFlow() {
    const steps = [
        { icon: <ShoppingCart />, label: "Order Received", color: "text-blue-500" },
        { icon: <CreditCard />, label: "Payment Verified", color: "text-green-500" },
        { icon: <Package />, label: "Supplier Notified", color: "text-purple-500" },
        { icon: <Truck />, label: "Shipped & Tracked", color: "text-orange-500" },
    ];

    return (
        <div className="h-[400px] border border-border rounded-xl bg-background p-6 flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-8 text-center">Automated Dropshipping Pipeline</h3>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[20px] top-6 bottom-6 w-0.5 bg-border md:left-6 md:right-6 md:top-[20px] md:bottom-auto md:h-0.5 md:w-auto" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex md:flex-col items-center gap-4 md:gap-2 z-10"
                        >
                            <div className={`h-12 w-12 rounded-full bg-background border-2 border-primary flex items-center justify-center ${step.color} shadow-sm`}>
                                {step.icon}
                            </div>
                            <div className="bg-card border border-border px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                                {step.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg text-xs font-mono text-muted-foreground">
                <div className="flex justify-between items-center mb-1">
                    <span>STATUS:</span>
                    <span className="text-green-500 font-bold">ACTIVE</span>
                </div>
                <p>&gt; Monitoring Shopify Store for New Orders...</p>
                <p>&gt; Order #1024 detected. Processing...</p>
                <p>&gt; Supplier AliExpress notified via API.</p>
            </div>
        </div>
    );
}
