"use client";

import { useState } from "react";
import { Home, Phone, CheckCircle } from "lucide-react";

export function RealEstateLead() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => s + 1);

    return (
        <div className="h-[400px] border border-border rounded-xl bg-background p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Home className="h-32 w-32" />
            </div>

            <h3 className="font-bold text-lg mb-6 relative z-10">Real Estate Lead Qualifier</h3>

            <div className="relative z-10 space-y-6">
                {step === 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                        <p className="text-sm text-muted-foreground">Lead form submission detected via Facebook Ads.</p>
                        <div className="bg-card border border-border p-4 rounded-lg space-y-2">
                            <div className="h-2 w-1/3 bg-muted rounded"></div>
                            <div className="h-2 w-2/3 bg-muted rounded"></div>
                        </div>
                        <button onClick={nextStep} className="btn-nature-primary w-full text-sm py-2">
                            Simulate Incoming Lead
                        </button>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center space-x-3 text-green-600">
                            <Phone className="h-5 w-5" />
                            <span className="font-bold">AI Calling Lead...</span>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-sm italic">
                            "Hi, this is Sarah from Premier Homes. I saw you were interested in the downtown property..."
                        </div>
                        <button onClick={nextStep} className="w-full py-2 bg-secondary text-white rounded-lg text-sm">
                            Lead Answers Call
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center space-x-2 text-primary">
                            <CheckCircle className="h-6 w-6" />
                            <span className="font-bold text-lg">Appointment Booked!</span>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Date:</span>
                                <span className="font-bold">Tomorrow, 2:00 PM</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Agent:</span>
                                <span className="font-bold">Assigned to Mike</span>
                            </div>
                        </div>
                        <button onClick={() => setStep(0)} className="text-xs text-muted-foreground hover:underline">
                            Reset Demo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
